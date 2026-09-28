<script>
  import { onMount } from 'svelte';
  import { supabase, ago } from '$lib/supabase';
  import { topics } from '$lib/topics';
  import { photos } from '$lib/photos';
  import { user } from '$lib/auth';
  import Hero from '$lib/Hero.svelte';
  let recent = [], counts = {}, total = 0;
  onMount(async () => {
    const { data } = await supabase.from('questions').select('id,title,topic,author_name,created_at,answers(count)').order('created_at', { ascending: false }).limit(200);
    recent = (data || []).slice(0, 5);
    (data || []).forEach((q) => (counts[q.topic] = (counts[q.topic] || 0) + 1));
    counts = counts; total = (data || []).length;
  });
  const tname = (s) => topics.find((t) => t.slug === s)?.title || s;
</script>
<Hero>
  <div class="grid">
    <div>
      <h1>Selamat datang di Ikan<em>.ku</em> 🐟✨</h1>
      <p class="lead">Sedang memulai budidaya atau ingin panenmu makin maksimal? Di sini kita saling berbagi pengalaman, solusi, dan tips praktis: dari memilih benih, meracik pakan, sampai menjaga air tetap jernih dan sehat.</p>
      <div class="cta">
        <a class="btn coral" href="#forum">Jelajahi forum</a>
        {#if !$user}<a class="btn ghost" href="/login">Gabung gratis</a>{/if}
      </div>
      <div class="stats"><div><b>5</b><small>Forum topik</small></div><div><b>{total}</b><small>Pertanyaan</small></div><div><b>24/7</b><small>Diskusi terbuka</small></div></div>
    </div>
    <div class="collage">{#each photos as p}<figure><img src={p.src} alt={p.cap} loading="lazy" /><figcaption>{p.cap}</figcaption></figure>{/each}</div>
  </div>
</Hero>
<main><div class="wrap">
  <h2 class="sec" id="forum">Pilih forum diskusi</h2>
  <p class="sub">Setiap forum berisi panduan singkat dan ruang tanya jawab.</p>
  <div class="topics">
    {#each topics as t}
      <a class="tcard" href="/forum/{t.slug}"><span class="ic">{t.icon}</span><h3>{t.title}</h3><p>{t.short}</p><div class="n">{counts[t.slug] || 0} pertanyaan · Baca panduan</div></a>
    {/each}
  </div>
  <h2 class="sec">Pertanyaan terbaru</h2>
  {#each recent as q}
    <a class="q" href="/q/{q.id}"><div class="cnt">{q.answers?.[0]?.count ?? 0}<small>jawaban</small></div>
      <div><h3>{q.title}</h3><div class="meta">{tname(q.topic)} · {q.author_name} · {ago(q.created_at)}</div></div></a>
  {:else}<div class="empty">Belum ada pertanyaan. Jadilah yang pertama bertanya! 🌊</div>{/each}
</div></main>
