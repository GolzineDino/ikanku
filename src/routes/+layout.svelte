<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { user, ready } from '$lib/auth';
  import { goto } from '$app/navigation';
  onMount(() => {
    supabase.auth.getSession().then(({ data }) => { user.set(data.session?.user ?? null); ready.set(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => user.set(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  });
  async function logout() { await supabase.auth.signOut(); goto('/'); }
</script>
<svelte:head><title>Ikan.ku – Forum Budidaya Ikan</title></svelte:head>
<header class="nav"><div class="wrap">
  <a class="brand" href="/">🐟 Ikan<span>.ku</span></a>
  <nav>
    <a class="l" href="/#forum">Forum</a>
    {#if $user}
      <span class="l" style="color:#7fe0f5">Halo, {$user.user_metadata?.username || $user.email.split('@')[0]}</span>
      <button class="btn sm ghost" on:click={logout}>Keluar</button>
    {:else}<a class="btn sm" href="/login">Masuk / Daftar</a>{/if}
  </nav>
</div></header>
<slot />
<footer><div class="wrap">🌊 Ikan.ku – berbagi ilmu budidaya, dari benih sampai panen.</div></footer>
