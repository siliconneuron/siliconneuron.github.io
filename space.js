/* The pointer is the sun. Wherever it sits relative to the Earth, that side is
   lit; the far side falls into night, and the stars shift a little behind.
   Left alone (or on a touch screen) the light drifts slowly on its own.
   The page is complete without this file: the CSS has a resting light. */
(() => {
  const hero = document.querySelector(".hero");
  const earth = document.querySelector(".earth-wrap");
  if (!hero || !earth) return;

  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const steerable = matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (v) => Math.max(-1, Math.min(1, v));
  const IDLE_MS = 6000;

  let targetX = -0.45, targetY = -0.35; // matches the resting light in the CSS
  let x = targetX, y = targetY;
  let frameId = 0, inView = true, lastSteer = -IDLE_MS;
  const born = performance.now();

  function frame(now) {
    frameId = 0;
    if (!steerable.matches || now - lastSteer > IDLE_MS) {
      const t = (now - born) / 1000;
      targetX = Math.cos(t * 0.12) * 0.62;
      targetY = Math.sin(t * 0.12) * 0.34 - 0.18;
    }
    x += (targetX - x) * 0.06;
    y += (targetY - y) * 0.06;
    hero.style.setProperty("--px", x.toFixed(4));
    hero.style.setProperty("--py", y.toFixed(4));
    run();
  }

  function run() {
    if (!frameId && inView && !still.matches) frameId = requestAnimationFrame(frame);
  }

  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const r = earth.getBoundingClientRect();
    targetX = clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth * 0.45));
    targetY = clamp((e.clientY - (r.top + r.height / 2)) / (innerHeight * 0.45));
    lastSteer = performance.now();
    run();
  }, { passive: true });

  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; run(); }).observe(hero);
  still.addEventListener("change", run);
  run();
})();
