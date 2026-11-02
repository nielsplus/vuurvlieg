/* Lumen: gedeelde code voor alle pagina's onder /lumen/.
   Taalkeuze (zelfde als het profiel: ?lang=nl, anders de laatst gekozen taal, anders Engels),
   kopregel met link terug naar de homepage, data laden en Markdown tonen. */
(() => {
  let LANG = "en";
  try {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    const saved = localStorage.getItem("vuurvlieg-lang");
    LANG = [fromUrl, saved].find(l => l === "en" || l === "nl") || "en";
  } catch (e) {}

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[LANG] ?? v.nl ?? v.en ?? "") : (v ?? "");

  const UI = {
    en: { home: "vuurvlieg.com", lumen: "Lumen", atlas: "Agentic Atlas", lights: "Glimmers", foot: "Lumen · agentic AI, mapped. A personal project; all names and data in examples are fictional.", loadErr: "This content could not be loaded." },
    nl: { home: "vuurvlieg.com", lumen: "Lumen", atlas: "Agentic Atlas", lights: "Lichtpunten", foot: "Lumen · agentic AI in kaart. Een persoonlijk project; alle namen en data in voorbeelden zijn verzonnen.", loadErr: "Deze inhoud kon niet worden geladen." }
  };
  const MONTHS = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
  };
  const FLAG_EN = '<svg viewBox="0 0 60 30" aria-hidden="true"><clipPath id="lm-uk-c"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="lm-uk-t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#lm-uk-c)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#lm-uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>';
  const FLAG_NL = '<svg viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="6" fill="#21468B"/><rect width="9" height="4" fill="#fff"/><rect width="9" height="2" fill="#AE1C28"/></svg>';

  const renderers = [];
  let active = "";

  function header() {
    const u = UI[LANG];
    let nav = document.querySelector(".lm-nav");
    if (!nav) { nav = document.createElement("nav"); nav.className = "lm-nav"; document.body.prepend(nav); }
    const link = (key, href, label) => `<li><a href="${href}"${active === key ? ' aria-current="page"' : ""}>${esc(label)}</a></li>`;
    nav.innerHTML = `<div class="wrap${document.body.dataset.wide ? " wide" : ""}">
      <a class="lm-home" href="/"><span aria-hidden="true">←</span> VUURVLIEG</a>
      <ul class="lm-links">${link("lumen", "/lumen/", u.lumen)}${link("atlas", "/lumen/atlas/", u.atlas)}${link("lights", "/lumen/lichtpunten/", u.lights)}</ul>
      <div class="lang-switch" role="group" aria-label="Language / Taal">
        <button type="button" data-lang="en" aria-label="English" aria-pressed="${LANG === "en"}">${FLAG_EN} EN</button>
        <button type="button" data-lang="nl" aria-label="Nederlands" aria-pressed="${LANG === "nl"}">${FLAG_NL} NL</button>
      </div></div>`;
    nav.querySelectorAll(".lang-switch button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
    let foot = document.querySelector("footer.lm-foot");
    if (!foot) { foot = document.createElement("footer"); foot.className = "lm-foot"; document.body.appendChild(foot); }
    foot.innerHTML = `${esc(u.foot)}<a class="motto" href="/">LUMEN IN TENEBRIS</a>`;
    document.documentElement.lang = LANG;
  }

  function setLang(l) {
    if (l === LANG) return;
    LANG = l;
    try { localStorage.setItem("vuurvlieg-lang", l); } catch (e) {}
    const y = scrollY;
    header();
    renderers.forEach(fn => fn(true));
    scrollTo(0, y);
  }

  async function json(path) {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error(path + ": " + r.status);
    return r.json();
  }

  /* Datum "2026-10" of "2026-10-08" als "October 2026" / "oktober 2026" */
  function month(d) {
    const [y, m] = String(d).split("-").map(Number);
    return m ? `${MONTHS[LANG][m - 1]} ${y}` : String(y);
  }
  function fullDate(d) {
    const [y, m, day] = String(d).split("-").map(Number);
    if (!day) return month(d);
    return LANG === "nl" ? `${day} ${MONTHS.nl[m - 1]} ${y}` : `${day} ${MONTHS.en[m - 1]} ${y}`;
  }

  /* Front matter (eenvoudige YAML: sleutel: waarde, [a, b] en lijstjes met "- ") */
  function frontMatter(text) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!m) return { meta: {}, body: text };
    const meta = {}; let listKey = null;
    m[1].split(/\r?\n/).forEach(line => {
      const item = line.match(/^\s+-\s+(.*)$/);
      if (item && listKey) { meta[listKey].push(item[1].trim()); return; }
      const kv = line.match(/^([\w-]+):\s*(.*)$/);
      if (!kv) return;
      const [, k, v] = kv;
      if (v === "") { meta[k] = []; listKey = k; return; }
      listKey = null;
      meta[k] = /^\[.*\]$/.test(v) ? v.slice(1, -1).split(",").map(s => s.trim()).filter(Boolean) : v.trim();
    });
    return { meta, body: text.slice(m[0].length) };
  }

  /* Kleine Markdown-weergave: koppen, alinea's, lijsten, citaten, vet, cursief, code en links.
     Alle tekst wordt eerst ge-escaped; alleen http(s)- en relatieve links worden links. */
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/|\.\.?\/)[^)\s]+)\)/g, (all, label, url) => `<a href="${url}"${/^https?:/.test(url) ? ' rel="noopener" target="_blank"' : ""}>${label}</a>`);
  }
  function markdown(text) {
    const out = []; let para = [], list = null;
    const flushP = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
    const flushL = () => { if (list) { out.push(`<${list.tag}>${list.items.map(i => `<li>${inline(i)}</li>`).join("")}</${list.tag}>`); list = null; } };
    text.split(/\r?\n/).forEach(line => {
      let m;
      if (!line.trim()) { flushP(); flushL(); return; }
      if ((m = line.match(/^(#{2,4})\s+(.*)$/))) { flushP(); flushL(); const n = Math.min(m[1].length, 3); out.push(`<h${n}>${inline(m[2])}</h${n}>`); return; }
      if ((m = line.match(/^>\s?(.*)$/))) { flushP(); flushL(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); return; }
      if ((m = line.match(/^\s*[-*]\s+(.*)$/))) { flushP(); if (!list || list.tag !== "ul") { flushL(); list = { tag: "ul", items: [] }; } list.items.push(m[1]); return; }
      if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) { flushP(); if (!list || list.tag !== "ol") { flushL(); list = { tag: "ol", items: [] }; } list.items.push(m[1]); return; }
      flushL(); para.push(line.trim());
    });
    flushP(); flushL();
    return out.join("\n");
  }

  function reveal(root = document) {
    const els = root.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach(e => io.observe(e));
  }

  /* Zwevende vuurvliegjes op de achtergrond, dezelfde als op het profiel */
  function fireflies() {
    if (document.getElementById("fireflies")) return;
    const c = document.createElement("canvas"); c.id = "fireflies"; c.setAttribute("aria-hidden", "true");
    document.body.prepend(c);
    const ctx = c.getContext("2d"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, flies = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(40, (w * h) / 32000));
      flies = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: 1 + Math.random() * 1.8, p: Math.random() * Math.PI * 2, s: .008 + Math.random() * .018
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        if (!reduce) {
          f.p += f.s; f.x += f.vx + Math.sin(f.p * .7) * .15; f.y += f.vy + Math.cos(f.p * .5) * .15;
          if (f.x < -20) f.x = w + 20; if (f.x > w + 20) f.x = -20;
          if (f.y < -20) f.y = h + 20; if (f.y > h + 20) f.y = -20;
        }
        const a = .15 + .85 * Math.pow((Math.sin(f.p) + 1) / 2, 3);
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 9);
        g.addColorStop(0, `rgba(170,255,68,${.5 * a})`);
        g.addColorStop(1, "rgba(170,255,68,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(240,255,220,${a})`; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * .6, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) requestAnimationFrame(draw);
    };
    addEventListener("resize", () => { resize(); if (reduce) draw(); });
    resize(); draw();
  }

  /* Het schild van de homepage met één vuurvlieg erin: de agent binnen zijn controles */
  const SHIELD = `<figure class="shield">
  <svg viewBox="110 80 380 500" aria-hidden="true">
    <defs><radialGradient id="sh-bg" cx="50%" cy="45%" r="45%"><stop offset="0%" stop-color="#c8a84b" stop-opacity="0.07"/><stop offset="100%" stop-color="#030303" stop-opacity="0"/></radialGradient></defs>
    <rect width="600" height="700" fill="url(#sh-bg)"/>
    <path d="M300 100 L460 160 V360 Q460 480 300 560 Q140 480 140 360 V160 Z" fill="#080808"/>
    <path d="M300 100 L460 160 V360 Q460 480 300 560 Q140 480 140 360 V160 Z" fill="none" stroke="#c8a84b" stroke-width="2.5"/>
    <path d="M300 118 L445 173 V357 Q445 466 300 541 Q155 466 155 357 V173 Z" fill="none" stroke="#c8a84b" stroke-width="0.8" opacity="0.35"/>
    <g transform="translate(300,300)"><g class="agent">
      <circle class="halo" r="18"/>
      <circle r="3" fill="#ffffff" opacity="0.95"/>
    </g></g>
  </svg>
</figure>`;

  window.Lumen = {
    get lang() { return LANG; },
    T, esc, json, month, fullDate, frontMatter, markdown, reveal,
    shield: () => SHIELD,
    ui: k => UI[LANG][k],
    /* start("atlas", render): kopregel tekenen en render(isSwitch) nu en bij elke taalwissel aanroepen */
    start(key, render) {
      active = key;
      header();
      fireflies();
      if (render) { renderers.push(render); render(false); }
    }
  };
})();
