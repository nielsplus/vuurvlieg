/* Verborgen bezoekersteller: een glazen fles met vuurvliegjes rechtsonder.
   Bij hover (of tik op mobiel) verschijnt het aantal bezoeken.
   Tellen gebeurt via de gratis Abacus-dienst, één keer per browsersessie. */
(() => {
  const API = "https://abacus.jasoncameron.dev";
  const NS = "vuurvlieg.com", KEY = "visits";

  const css = `
    .vv-jar { position: fixed; right: 16px; bottom: 14px; z-index: 50; width: 26px; height: 37px; padding: 0;
      background: none; border: 0; cursor: pointer; opacity: .28; transition: opacity .6s, transform .6s; }
    .vv-jar:hover, .vv-jar:focus-visible, .vv-jar.open { opacity: 1; transform: translateY(-1px); outline: none; opacity: .9; }
    .vv-jar svg { width: 100%; height: 100%; overflow: visible; display: block; }
    .vv-glass { fill: rgba(200,168,75,.03); stroke: rgba(200,168,75,.45); stroke-width: 1.4; }
    .vv-shine { fill: none; stroke: rgba(255,255,255,.12); stroke-width: 1.2; stroke-linecap: round; }
    .vv-cork { fill: #4a3c24; }
    .vv-fly { fill: #aaff44; animation: vv-blink 4s ease-in-out infinite, vv-drift 7s ease-in-out infinite; transform-box: fill-box; }
    @keyframes vv-blink { 0%,100% { opacity: .1 } 50% { opacity: .75; } }
    @keyframes vv-drift { 0%,100% { transform: translate(0,0) } 33% { transform: translate(2px,-3px) } 66% { transform: translate(-2px,2px) } }
    .vv-tip { position: absolute; right: 0; bottom: calc(100% + 10px); white-space: nowrap; pointer-events: none;
      font: 11px/1 'Inter', system-ui, sans-serif; letter-spacing: 1.5px; color: rgba(200,168,75,.8);
      background: rgba(10,10,10,.85); border: 1px solid rgba(200,168,75,.2); padding: 6px 10px; border-radius: 2px;
      opacity: 0; transform: translateY(4px); transition: opacity .3s, transform .3s; }
    .vv-tip b { font-family: 'Cormorant Garamond', 'Times New Roman', serif; font-size: 15px; font-weight: 500; color: #e9e4d6; margin-right: 6px; letter-spacing: .5px; }
    .vv-jar:hover .vv-tip, .vv-jar:focus-visible .vv-tip, .vv-jar.open .vv-tip { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { .vv-fly { animation: none; opacity: .8; } }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "vv-jar";
  btn.innerHTML = `
    <svg viewBox="0 0 38 54" aria-hidden="true">
      <rect class="vv-cork" x="13" y="1" width="12" height="6" rx="1.5"/>
      <path class="vv-glass" d="M14 7h10v6c0 1.5 1 2.3 2.6 3.2C31.5 19 34 22.5 34 28v18c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V28c0-5.5 2.5-9 7.4-11.8C13 15.3 14 14.5 14 13z"/>
      <path class="vv-shine" d="M9 30v12"/>
      <g class="vv-flies"></g>
    </svg>
    <span class="vv-tip"></span>`;
  document.body.appendChild(btn);

  const tip = btn.querySelector(".vv-tip");
  const flies = btn.querySelector(".vv-flies");
  let count = null;

  /* Taal volgt de keuze op de profielpagina, anders de taal van de pagina */
  const nl = () => {
    let saved = null;
    try { saved = localStorage.getItem("vuurvlieg-lang"); } catch (e) {}
    return (saved || document.documentElement.lang || "").startsWith("nl");
  };
  const fmt = n => n.toLocaleString(nl() ? "nl-NL" : "en-GB");
  function label() {
    const word = nl() ? (count === 1 ? "bezoek" : "bezoeken") : (count === 1 ? "visit" : "visits");
    tip.innerHTML = count === null ? (nl() ? "Vuurvliegjes tellen…" : "Counting fireflies…") : `<b>${fmt(count)}</b>${word}`;
    btn.setAttribute("aria-label", count === null ? "Visitor counter" : `${fmt(count)} ${word}`);
  }

  /* Meer bezoeken = meer vuurvliegjes in de fles (3 tot 9) */
  function fill(n) {
    const amount = Math.max(3, Math.min(9, 3 + Math.floor(Math.log10((n || 0) + 1) * 1.5)));
    const spots = [[12,40],[24,44],[19,32],[27,34],[11,47],[17,46],[23,25],[13,30],[28,47]];
    flies.innerHTML = spots.slice(0, amount).map(([x, y], i) =>
      `<circle class="vv-fly" cx="${x}" cy="${y}" r="${1.3 + (i % 3) * .35}" style="animation-delay:${(i * .7) % 2.6}s,${(i * 1.3) % 5}s"/>`).join("");
  }
  fill(0);
  label();

  btn.addEventListener("mouseenter", label);
  btn.addEventListener("focus", label);
  btn.addEventListener("click", () => { label(); btn.classList.toggle("open"); });
  document.addEventListener("click", e => { if (!btn.contains(e.target)) btn.classList.remove("open"); });

  let counted = false;
  try { counted = sessionStorage.getItem("vv-counted") === "1"; } catch (e) {}
  fetch(`${API}/${counted ? "get" : "hit"}/${NS}/${KEY}`)
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(d => {
      if (typeof d.value !== "number") return;
      count = d.value;
      try { sessionStorage.setItem("vv-counted", "1"); } catch (e) {}
      fill(count);
      label();
    })
    .catch(() => { tip.textContent = nl() ? "Teller even niet bereikbaar" : "Counter unavailable"; });
})();
