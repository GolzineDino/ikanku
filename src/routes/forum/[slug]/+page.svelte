<script>
  import { page } from '$app/stores';
  import { supabase, BUCKET, ago } from '$lib/supabase';
  import { bySlug } from '$lib/topics';
  import { photos } from '$lib/photos';
  import { user } from '$lib/auth';
  import Hero from '$lib/Hero.svelte';
  $: slug = $page.params.slug;
  $: t = bySlug(slug);
  let list = [], loading = true, title = '', body = '', file = null, busy = false, error = '', open = false;
  $: if (slug) load();
  async function load() {
    loading = true;
    const { data } = await supabase.from('questions').select('id,title,author_name,created_at,image_url,answers(count)').eq('topic', slug).order('created_at', { ascending: false });
    list = data || []; loading = false;
  }
  async function post() {
    error = ''; busy = true;
    let image_url = null, image_path = null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) { error = 'Ukuran foto maksimal 5 MB.'; busy = false; return; }
      image_path = `${$user.id}/${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;
      const { error: ue } = await supabase.storage.from(BUCKET).upload(image_path, file);
      if (ue) { error = 'Gagal mengunggah foto: ' + ue.message; busy = false; return; }
      image_url = supabase.storage.from(BUCKET).getPublicUrl(image_path).data.publicUrl;
    }
    const { error: e } = await supabase.from('questions').insert({ topic: slug, title, body, image_url, image_path, user_id: $user.id, author_name: $user.user_metadata?.username || $user.email.split('@')[0] });
    busy = false;
    if (e) { error = e.message; return; }
    title = body = ''; file = null; open = false; load();
  }
</script>
<svelte:head><title>{t?.title ?? 'Forum'} – Ikan.ku</title></svelte:head>
{#if t}
<Hero small><a href="/" style="color:#7fe0f5">← Semua forum</a><h1 style="font-size:clamp(2rem,5vw,3.6rem);margin-top:10px">{t.icon} {t.title}</h1></Hero>
<main><div class="wrap">
  <section class="info" style="margin-top:-70px;position:relative;z-index:5">
    <h2>Panduan singkat</h2><p>{t.intro}</p>
    <div class="facts">{#each t.facts as f}<div class="fact"><b>{f[0]}</b><span>{f[1]}</span></div>{/each}</div>
    <ul class="tips">{#each t.tips as x}<li>{x}</li>{/each}</ul>
  </section>
  <div class="layout">
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
        <h2 style="font-size:1.7rem;color:var(--deep)">Tanya jawab</h2>
        {#if $user}<button class="btn coral" on:click={() => (open = !open)}>{open ? 'Tutup' : '+ Tulis pertanyaan'}</button>{:else}<a class="btn" href="/login">Masuk untuk bertanya</a>{/if}
      </div>
      {#if open && $user}
        <form class="card" style="margin-bottom:20px" on:submit|preventDefault={post}>
          <label for="t">Judul</label><input id="t" bind:value={title} minlength="5" maxlength="200" required placeholder="Ringkas dan jelas" />
          <label for="b">Deskripsi</label><textarea id="b" bind:value={body} required placeholder="Ceritakan kondisi kolam, jenis ikan, dan masalahnya"></textarea>
          <label for="f">Foto (opsional)</label><input id="f" type="file" accept="image/*" on:change={(e) => (file = e.target.files[0] || null)} />
          {#if error}<div class="err">{error}</div>{/if}
          <button class="btn" style="margin-top:16px" disabled={busy}>{busy ? 'Mengirim…' : 'Kirim pertanyaan'}</button>
        </form>
      {/if}
      {#if loading}<div class="empty">Memuat…</div>
      {:else}{#each list as q}
        <a class="q" href="/q/{q.id}"><div class="cnt">{q.answers?.[0]?.count ?? 0}<small>jawaban</small></div>
          <div><h3>{q.title}</h3><div class="meta">{q.author_name} · {ago(q.created_at)}</div></div>
          {#if q.image_url}<img class="th" src={q.image_url} alt="" />{/if}</a>
      {:else}<div class="empty">Belum ada pertanyaan di forum ini. Tulis yang pertama! 🐠</div>{/each}{/if}
    </div>
    <aside class="side">{#each photos.slice(0, 3) as p}<div class="photo"><img src={p.src} alt={p.cap} loading="lazy" /><span>{p.cap}</span></div>{/each}</aside>
  </div>
</div></main>
{:else}<main><div class="wrap"><div class="empty">Forum tidak ditemukan. <a href="/">Kembali</a></div></div></main>{/if}
