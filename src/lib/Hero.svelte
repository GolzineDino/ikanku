<script>
  export let small = false;
  const b = Array.from({ length: 14 }, (_, i) => ({ l: (i * 71) % 100, s: 8 + ((i * 13) % 26), d: 9 + ((i * 7) % 12), y: (i * 3) % 8 }));
</script>
<section class="hero" class:sm={small}>
  <div class="bubbles">{#each b as x}<span style="left:{x.l}%;width:{x.s}px;height:{x.s}px;animation-duration:{x.d}s;animation-delay:-{x.y}s"></span>{/each}</div>
  <div class="swim" aria-hidden="true">🐟</div>
  <div class="wrap"><slot /></div>
  <svg class="waves" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
    <path class="w1" fill="#17a2c8" fill-opacity=".45" d="M-100 60 C200 10 400 110 700 60 S1200 10 1540 60 V110 H-100Z"/>
    <path class="w2" fill="#f3fbfd" d="M-100 80 C250 30 450 120 760 80 S1250 40 1540 80 V110 H-100Z"/>
  </svg>
</section>
