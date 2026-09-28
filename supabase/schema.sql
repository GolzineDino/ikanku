-- Jalankan di Supabase > SQL Editor
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  title text not null check (char_length(title) between 5 and 200),
  body text not null,
  image_url text,
  image_path text,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  body text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  created_at timestamptz not null default now()
);
create index if not exists questions_topic_idx on public.questions(topic, created_at desc);
create index if not exists answers_q_idx on public.answers(question_id, created_at);

alter table public.questions enable row level security;
alter table public.answers enable row level security;
create policy "questions_read" on public.questions for select using (true);
create policy "questions_insert" on public.questions for insert to authenticated with check (auth.uid() = user_id);
create policy "questions_delete" on public.questions for delete to authenticated using (auth.uid() = user_id);
create policy "answers_read" on public.answers for select using (true);
create policy "answers_insert" on public.answers for insert to authenticated with check (auth.uid() = user_id);
create policy "answers_delete" on public.answers for delete to authenticated using (auth.uid() = user_id);

-- Storage untuk foto pertanyaan
insert into storage.buckets (id, name, public) values ('question-images','question-images', true) on conflict do nothing;
create policy "img_read" on storage.objects for select using (bucket_id = 'question-images');
create policy "img_upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "img_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);
