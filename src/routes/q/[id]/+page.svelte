<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { supabase, BUCKET, ago } from '$lib/supabase';
  import { bySlug } from '$lib/topics';
  import { user } from '$lib/auth';
  let q = null, answers = [], text = '', busy = false, error = '', loading = true;
  $: id = $page.params.id;
  $: if (id) load();
  const name = () => $user.user_metadata?.username || $user.email.split('@')[0];
  async function load() {
    const { data } = await supabase.from('questions').select('*').eq('id', id).maybeSingle();
    q = data;
    const r = await supabase.from('answers').select('*').eq('question_id', id).order('created_at');
    answers = r.data || []; loading = false;
  }
  async function reply() {
    error = ''; busy = true;
    const { error: e } = await supabase.from('answers').insert({ question_id: id, body: text, user_id: $user.id, author_name: name() });
    busy = false;
    if (e) error = e.message; else { text = ''; load(); }
  }
  async function delAnswer(a) { if (confirm('Hapus jawaban ini?')) { await supabase.from('answers').delete().eq('id', a.id); load(); } }
  async function delQuestion() {
    if (!confirm('Hapus pertanyaan beserta semua jawabannya?')) return;
    if (q.image_path) await supabase.storage.from(BUCKET).remove([q.image_path]);
    const { error: e } = await supabase.from('questions').delete().eq('id', id);
    if (e) alert(e.message); else goto('/forum/' + q.topic);
  }
</script>
<svelte:head><title>{q?.title ?? 'Pertanyaan'} – Ikan.ku</title></svelte:head>
<main style="padding-top:34px"><div class="wrap" style="max-width:820px">
  {#if loading}<div class="empty">Memuat…</div>
  {:else if !q}<div class="empty">Pertanyaan tidak ditemukan atau sudah dihapus. <a href="/">Kembali</a></div>
  {:else}
    <a href="/forum/{q.topic}">← {bySlug(q.topic)?.title}</a>
    <article class="card" style="margin-top:12px">
      <h1 style="font-size:2rem;color:var(--deep)">{q.title}</h1>
      <div class="who"><span class="avatar">{q.author_name[0].toUpperCase()}</span>{q.author_name} · {ago(q.created_at)}
        {#if $user?.id === q.user_id}<button class="btn sm danger" on:click={delQuestion}>🗑 Hapus</button>{/if}</div>
      <p class="qbody" style="margin-top:14px">{q.body}</p>
      {#if q.image_url}<img class="qimg" src={q.image_url} alt="Foto dari penanya" />{/if}
    </article>
    <h2 class="sec" style="font-size:1.5rem">{answers.length} Jawaban</h2>
    <div class="card">
      {#each answers as a}
        <div class="ans"><p>{a.body}</p><div class="who"><span class="avatar">{a.author_name[0].toUpperCase()}</span>{a.author_name} · {ago(a.created_at)}
          {#if $user?.id === a.user_id}<button class="btn sm danger" on:click={() => delAnswer(a)}>Hapus</button>{/if}</div></div>
      {:else}<p style="color:var(--muted)">Belum ada jawaban. Bagikan pengalamanmu!</p>{/each}
    </div>
    <div class="card" style="margin-top:20px">
      <h3>Jawaban Anda</h3>
      {#if $user}
        <form on:submit|preventDefault={reply}><textarea bind:value={text} required placeholder="Tulis jawaban atau pengalaman Anda"></textarea>
          {#if error}<div class="err">{error}</div>{/if}
          <button class="btn" style="margin-top:14px" disabled={busy}>Kirim jawaban</button></form>
      {:else}<p style="margin:10px 0"><a class="btn" href="/login">Masuk untuk menjawab</a></p>{/if}
    </div>
  {/if}
</div></main>
