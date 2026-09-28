<script>
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import Hero from '$lib/Hero.svelte';
  let mode = 'login', email = '', password = '', username = '', error = '', info = '', busy = false;
  async function submit() {
    error = info = ''; busy = true;
    if (mode === 'login') {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password });
      if (e) error = 'Email atau kata sandi salah.'; else goto('/');
    } else {
      const { data, error: e } = await supabase.auth.signUp({ email, password, options: { data: { username: username || email.split('@')[0] } } });
      if (e) error = e.message;
      else if (data.session) goto('/');
      else info = 'Pendaftaran berhasil. Cek email Anda untuk konfirmasi, lalu masuk.';
    }
    busy = false;
  }
</script>
<svelte:head><title>Masuk – Ikan.ku</title></svelte:head>
<Hero small><h1 style="text-align:center;font-size:3rem">Ayo nyemplung! 🌊</h1></Hero>
<main><div class="wrap"><div class="card login">
  <div class="tabs"><button class:on={mode==='login'} on:click={() => (mode='login')}>Masuk</button><button class:on={mode==='register'} on:click={() => (mode='register')}>Daftar</button></div>
  <form on:submit|preventDefault={submit}>
    {#if mode === 'register'}<label for="u">Nama tampilan</label><input id="u" bind:value={username} placeholder="mis. Pak Budi" />{/if}
    <label for="e">Email</label><input id="e" type="email" bind:value={email} required />
    <label for="p">Kata sandi</label><input id="p" type="password" bind:value={password} minlength="6" required />
    {#if error}<div class="err">{error}</div>{/if}{#if info}<div class="ok">{info}</div>{/if}
    <button class="btn" style="width:100%;justify-content:center;margin-top:18px" disabled={busy}>{mode==='login' ? 'Masuk' : 'Buat akun'}</button>
  </form>
</div></div></main>
