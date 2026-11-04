/* Agentic Intake Atlas, in de vuurvlieg-stijl en tweetalig.
   Inhoud (levels, blokken, evolutie, concepten, trends) komt uit /lumen/data/*.json;
   hier staan alleen de bediening en de tekening. */
(() => {
const { T, esc } = Lumen;
const nl = () => Lumen.lang === "nl";
const L = (a, b) => nl() ? a : b;

/* Vaste teksten van de pagina */
const U = {
  nl: {
    fwEyebrow: "Het framework", fwTitle: "Lumen Agentic Atlas", fwLead: "Mijn framework voor agentic AI. Het laat zien hoe een agentarchitectuur groeit over zes maturity levels, en welke controles (de harness) daarin meegroeien. Ik gebruik het om architecturen te ontwerpen en om elke nieuwe ontwikkeling te plaatsen.",
    kern: "Een agent verdient zijn ruimte met controles, niet andersom.",
    pEyebrow: "Drie principes",
    p: [["De harness groeit mee met wat een agent mag.", "Hoe meer een agent zelf mag doen, hoe meer controles erbij komen."], ["Zo deterministisch mogelijk, zo probabilistisch als nodig.", "Het model begrijpt en stelt voor; code valideert, autoriseert en voert uit. Niet elk proces wordt beter met een agent."], ["Het werk zit op de naden.", "Tussen model en code, tussen agent en bronsystemen, en tussen agent en mens. Daar zit de integrator."]],
    mapEyebrow: "De plaat",
    title: "De plaat: een agentarchitectuur per level",
    sub: "Een agentarchitectuur voor klantverzoeken bij een fictieve organisatie, op Google Cloud. Kies een maturity level en zie de architectuur en de harness meegroeien. Kijk door de integrator-bril en klik op elk blok voor uitleg.",
    tags: ["fictieve organisatie", "synthetische data", "publieke Google Cloud-componenten", "conceptschets"],
    lens: "Integrator-bril", controls: "Bediening",
    maturity: "Maturity level", svgT: "Agentarchitectuur",
    svgD: "Kanaal, harness-diensten, agent-runtime met sessiestatus, model en tools, kennisbank en andere agents, API-gateway met MCP-tools, bronsystemen en human review. Welke blokken zichtbaar zijn, hangt af van het gekozen maturity level.",
    lg: { det: "Deterministisch: code", prob: "Probabilistisch: model", human: "Mens beslist", har: "Harness", evo: "Groene ondertitel: nieuw of veranderd op dit level", k: "Kerngebied integrator", m: "Integrator denkt mee" },
    concepts: "Concepten per level", trendlog: "Trendlog",
    tlead: "Elke nieuwe trend gaat door dezelfde vier vragen: op welk level hoort het, welk blok verandert, wat betekent het voor de harness en wat moet de integrator ermee? Klik op een trend om het antwoord en de betrokken blokken te zien. Verwerkt = opgenomen in de Atlas; beoordeeld = bekeken, de Atlas verandert (nog) niet.",
    th: ["Datum", "Trend", "Level", "Blok", "Atlas"],
    foot: "Conceptschets voor een persoonlijk leerproject. Alle namen en klanten zijn verzonnen. Componentnamen verwijzen naar publiek beschikbare Google Cloud-diensten (Gemini, Gemini Enterprise Agent Platform met Agent Runtime, Agent Identity, Agent Gateway, Memory Bank en Agent Inbox, Agent Development Kit, Vertex AI Search, Knowledge Catalog, Model Armor, Sensitive Data Protection, IAM, Apigee met MCP, Cloud Logging en Trace) en de open standaarden MCP en A2A.",
    zones: { kan: "Kanaal", mod: "Model en tools", run: "Agent-runtime", ken: "Kennis en agents", bron: "Bronsystemen en data", ctl: "Control plane" },
    harlabel: "HARNESS · GROEIT MEE PER LEVEL",
    type: { det: "CODE", prob: "MODEL", human: "MENS" }, typelong: { det: "deterministisch", prob: "probabilistisch", human: "mens beslist" },
    ir: { kern: "Kerngebied integrator", mee: "Integrator denkt mee", geen: "Vooral andere rollen" },
    st: { reviewed: "beoordeeld", mapped: "verwerkt" },
    hOn: (a, b) => `Harness op dit level: ${a} van ${b}`, from: "vanaf L",
    integT: "Integrator-bril", integQ: "Waar maakt de integrator het verschil?",
    integP: "De integrator werkt op de naden van het systeem: tussen model en code, tussen agent en bronsystemen, en tussen agent en mens. Gevulde stippen zijn kerngebied, open stippen betekenen meedenken. Blokken zonder stip liggen vooral bij andere rollen.",
    iBelang: "Integratorbelang",
    introT: "Werkpaneel", hint: "Klik op een blok, een concept of een trend voor uitleg.",
    trend: "Trend", q: ["1. Op welk level?", "2. Welk blok verandert?", "3. Wat betekent het voor de harness?", "4. Wat moet de integrator ermee?"], status: "Atlas", source: "bron", lichtpunt: "lees het lichtpunt",
    onLevel: lv => `Op level ${lv}`, evolT: "Hoe dit blok verandert per level",
    block: "Bouwblok", gcloud: "Google Cloud", what: "Wat het doet", why: "Waarom het er zit",
    lvSince: (lv, s) => `level ${lv} · sinds L${s}`, lvFrom: lv => `vanaf level ${lv}`,
    comesAt: (lv, n) => `Komt erbij vanaf level ${lv} (${n}).`, harOff: "Staat nu uit. Zet de harness aan om dit blok mee te laten draaien.",
    concept: (lv, n) => `Concept · level ${lv} (${n})`, relBlocks: "Betrokken blokken", conceptLater: lv => `Dit concept wordt pas belangrijk vanaf level ${lv}. Kies dat level om het in de flow te zien.`,
    hlNote: "Uitgelicht vanuit een lichtpunt: de betrokken blokken zijn groenblauw omrand.",
    loadErr: "De Atlas kon zijn data niet laden. Open de pagina via de website (of een lokale server), niet als los bestand."
  },
  en: {
    fwEyebrow: "The framework", fwTitle: "Lumen Agentic Atlas", fwLead: "My framework for agentic AI. It shows how an agent architecture grows over six maturity levels, and which controls (the harness) grow along with it. I use it to design architectures and to place every new development.",
    kern: "An agent earns its room to act through controls, not the other way around.",
    pEyebrow: "Three principles",
    p: [["The harness grows with what an agent may do.", "The more an agent may do on its own, the more controls are added."], ["As deterministic as possible, as probabilistic as needed.", "The model understands and proposes; code validates, authorises and executes. Not every process gets better with an agent."], ["The work sits on the seams.", "Between model and code, between agent and source systems, and between agent and people. That is where the integrator works."]],
    mapEyebrow: "The map",
    title: "The map: an agent architecture per level",
    sub: "An agent architecture for customer requests at a fictional organisation, on Google Cloud. Choose a maturity level and watch the architecture and the harness grow. Look through the integrator lens and click any block for an explanation.",
    tags: ["fictional organisation", "synthetic data", "public Google Cloud components", "concept sketch"],
    lens: "Integrator lens", controls: "Controls",
    maturity: "Maturity level", svgT: "Agent architecture",
    svgD: "Channel, harness services, agent runtime with session state, model and tools, knowledge base and other agents, API gateway with MCP tools, source systems and human review. Which blocks are visible depends on the chosen maturity level.",
    lg: { det: "Deterministic: code", prob: "Probabilistic: model", human: "A person decides", har: "Harness", evo: "Green subtitle: new or changed at this level", k: "Integrator core area", m: "Integrator contributes" },
    concepts: "Concepts per level", trendlog: "Trend log",
    tlead: "Every new trend goes through the same four questions: which level does it belong to, which block changes, what does it mean for the harness and what should the integrator do with it? Click a trend to see the answer and the blocks involved. Mapped = worked into the Atlas; reviewed = assessed, the Atlas does not change (yet).",
    th: ["Date", "Trend", "Level", "Block", "Atlas"],
    foot: "Concept sketch for a personal learning project. All names and customers are made up. Component names refer to publicly available Google Cloud services (Gemini, Gemini Enterprise Agent Platform with Agent Runtime, Agent Identity, Agent Gateway, Memory Bank and Agent Inbox, Agent Development Kit, Vertex AI Search, Knowledge Catalog, Model Armor, Sensitive Data Protection, IAM, Apigee with MCP, Cloud Logging and Trace) and the open standards MCP and A2A.",
    zones: { kan: "Channel", mod: "Model and tools", run: "Agent runtime", ken: "Knowledge and agents", bron: "Source systems and data", ctl: "Control plane" },
    harlabel: "HARNESS · GROWS WITH EACH LEVEL",
    type: { det: "CODE", prob: "MODEL", human: "HUMAN" }, typelong: { det: "deterministic", prob: "probabilistic", human: "a person decides" },
    ir: { kern: "Integrator core area", mee: "Integrator contributes", geen: "Mostly other roles" },
    st: { reviewed: "reviewed", mapped: "mapped" },
    hOn: (a, b) => `Harness at this level: ${a} of ${b}`, from: "from L",
    integT: "Integrator lens", integQ: "Where does the integrator make the difference?",
    integP: "The integrator works on the seams of the system: between model and code, between agent and source systems, and between agent and people. Filled dots are core area, open dots mean contributing. Blocks without a dot sit mostly with other roles.",
    iBelang: "Integrator relevance",
    introT: "Work panel", hint: "Click a block, a concept or a trend for an explanation.",
    trend: "Trend", q: ["1. Which level?", "2. Which block changes?", "3. What does it mean for the harness?", "4. What should the integrator do with it?"], status: "Atlas", source: "source", lichtpunt: "read the Glimmer",
    onLevel: lv => `At level ${lv}`, evolT: "How this block changes per level",
    block: "Building block", gcloud: "Google Cloud", what: "What it does", why: "Why it is there",
    lvSince: (lv, s) => `level ${lv} · since L${s}`, lvFrom: lv => `from level ${lv}`,
    comesAt: (lv, n) => `Added from level ${lv} (${n}).`, harOff: "Currently off. Turn the harness on to let this block take part.",
    concept: (lv, n) => `Concept · level ${lv} (${n})`, relBlocks: "Blocks involved", conceptLater: lv => `This concept only becomes important from level ${lv}. Choose that level to see it in the flow.`,
    hlNote: "Highlighted from a Glimmer: the blocks involved have a teal outline.",
    loadErr: "The Atlas could not load its data. Open the page through the website (or a local server), not as a loose file."
  }
};
const u = () => U[Lumen.lang];

let LEVELS = [], NODES = {}, EV = {}, CONCEPTS = [], CBYK = {}, TRENDS = [], HL = [];
const DIRECT = [["input","armor"],["armor","sdp"],["sdp","orch"],["input","orch"],["gateway","crm"],["gateway","core"],["orch","crm"],["orch","core"],["gateway","data"],["orch","data"],["bus","core"]];
const PIPE = [["input","gemini"],["sdp","gemini"],["gemini","kb"],["gemini","reply"],["gemini","extract"],["extract","validator"],["validator","core"],["extract","core"],["core","reply"],["armor","reply"]];
const HUB = ["gemini","extract","gateway","validator","policy","audit","hitl","state","ident","reply","armor","kb","a2a","registry","bus"];

function evAt(id, lv) { const e = EV[id] || {}; const top = Math.max(lv, NODES[id].lv); let r = {}; for (let i = 0; i <= top; i++) if (e[i]) r = Object.assign({}, r, e[i]); return r; }
function labelOf(id, lv) { const e = evAt(id, lv), n = NODES[id]; return { l: T(e.l || n.l), s: T(e.s || n.s), d: T(e.d || "") }; }

/* ---------- Opbouw van de pagina ---------- */
const $ = id => document.getElementById(id);
let svg; const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); (parent || svg).appendChild(e); return e; }
function txt(tag, attrs, s, parent) { const e = el(tag, attrs, parent); e.textContent = s; return e; }

function shell() {
  const t = u();
  $("atlas").innerHTML = `
  <section class="fw">
    <div class="hero-grid"><div>
    <div class="eyebrow">${esc(t.fwEyebrow)}</div>
    <h1 class="lm-title">${esc(t.fwTitle)}</h1>
    <p class="kern">${esc(t.kern)}</p>
    <p class="lead">${esc(t.fwLead)}</p>
    </div>${Lumen.shield()}</div>
    <div class="eyebrow" style="margin-top:40px">${esc(t.pEyebrow)}</div>
    <div class="principles">${t.p.map((p, i) => `<div class="lm-card principle"><div class="n">${i + 1}</div><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p></div>`).join("")}</div>
  </section>
  <header>
    <div class="eyebrow">${esc(t.mapEyebrow)}</div>
    <h2 class="lm-h2" style="margin-bottom:0">${esc(t.title)}</h2>
    <p class="sub">${esc(t.sub)}</p>
    <div class="tagline">${t.tags.map(x => `<span class="pill">${esc(x)}</span>`).join("")}</div>
  </header>
  <div class="main">
    <section class="card">
      <div class="cardhead"><h2>${esc(t.maturity)}</h2>
        <button id="lens" class="switch" aria-pressed="false"><span class="dot" aria-hidden="true"></span><span>${esc(t.lens)}</span></button></div>
      <div class="levels" id="levels" role="radiogroup" aria-label="${esc(t.maturity)}"></div>
      <p class="lvdesc" id="lvdesc"></p>
      <div class="hstrip" id="hstrip"></div>
      <div class="diagram"><svg id="svg" viewBox="0 0 1000 700" role="img" aria-labelledby="svgT svgD"><title id="svgT">${esc(t.svgT)}</title><desc id="svgD">${esc(t.svgD)}</desc></svg></div>
      <div class="legend">
        <span><i class="sw det"></i>${esc(t.lg.det)}</span>
        <span><i class="sw prob"></i>${esc(t.lg.prob)}</span>
        <span><i class="sw human"></i>${esc(t.lg.human)}</span>
        <span><i class="sw har"></i>${esc(t.lg.har)}</span>
        <span><i class="sw evo"></i>${esc(t.lg.evo)}</span>
        <span id="lgK" hidden><i class="sw ik"></i>${esc(t.lg.k)}</span>
        <span id="lgM" hidden><i class="sw im"></i>${esc(t.lg.m)}</span>
      </div>
    </section>
    <aside class="card panel" id="panel" aria-live="polite"></aside>
  </div>
  <section class="card"><h2>${esc(t.concepts)}</h2><div class="chips" id="chips"></div></section>
  <section class="card"><h2>${esc(t.trendlog)}</h2><p class="tlead">${esc(t.tlead)}</p>
    <div class="tlwrap"><table class="tl"><thead><tr>${t.th.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody id="trendrows"></tbody></table></div></section>
  <p class="foot">${esc(t.foot)}</p>`;
  svg = $("svg");
}

let edgeEls = {};
function zone(id, x, y, w, h, label) { const g = el("g", { id, class: "zg" }); el("rect", { x, y, width: w, height: h, rx: 6, class: "zone" }, g); txt("text", { x: x + 10, y: y + 18, class: "zonelabel" }, label, g); }
function drawSvg() {
  edgeEls = {};
  const t = u();
  const defs = el("defs", {}); const pat = el("pattern", { id: "dots", width: 20, height: 20, patternUnits: "userSpaceOnUse" }, defs);
  el("circle", { cx: 1, cy: 1, r: .8, style: "fill:rgba(200,168,75,.10)" }, pat);
  const mk = el("marker", { id: "ah", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, defs);
  el("path", { d: "M0,0 L10,5 L0,10 z", style: "fill:var(--accent)" }, mk);
  el("rect", { x: 0, y: 0, width: 1000, height: 700, fill: "url(#dots)" });
  zone("zKan", 14, 222, 148, 268, t.zones.kan);
  zone("zMod", 156, 428, 328, 120, t.zones.mod);
  zone("zRun", 280, 236, 420, 124, t.zones.run);
  zone("zKen", 156, 588, 350, 100, t.zones.ken);
  zone("zBron", 520, 588, 466, 100, t.zones.bron);
  zone("zCtl", 14, 48, 148, 100, t.zones.ctl);
  const fr = el("rect", { x: 166, y: 52, width: 814, height: 92, rx: 8, class: "harframe", id: "harframe" });
  el("rect", { x: 766, y: 254, width: 168, height: 92, rx: 8, class: "harframe", id: "harframe2" });
  el("rect", { x: 586, y: 448, width: 208, height: 84, rx: 8, class: "harframe", id: "harframe3" });
  txt("text", { x: 178, y: 68, class: "harlabel", id: "harlabel" }, t.harlabel);
  const add = (a, b, cat) => {
    const k = a + "-" + b; if (edgeEls[k]) return; const A = NODES[a], B = NODES[b];
    const p = el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "edge" + (["input-orch", "orch-crm", "orch-core", "orch-data"].includes(k) ? " bypass" : "") });
    p.dataset.cat = cat; p.dataset.a = a; p.dataset.b = b; svg.insertBefore(p, fr.nextSibling); edgeEls[k] = p;
  };
  DIRECT.forEach(([a, b]) => add(a, b, "direct")); PIPE.forEach(([a, b]) => add(a, b, "pipe")); HUB.forEach(n => add("orch", n, "hub"));
  for (const id in NODES) {
    const n = NODES[id];
    const g = el("g", { class: "node " + n.t + " i" + n.ir, "data-id": id, tabindex: 0, role: "button", "aria-label": T(n.l) + ", " + t.typelong[n.t] });
    el("rect", { x: n.x - n.w / 2, y: n.y - n.h / 2, width: n.w, height: n.h, rx: n.t === "det" ? 3 : 14 }, g);
    txt("text", { x: n.x - n.w / 2 + 10, y: n.y - n.h / 2 + 14, class: "nt", id: "nt-" + id }, t.type[n.t] + " · L" + n.lv, g);
    txt("text", { x: n.x - n.w / 2 + 10, y: n.y + 4, class: "nl", id: "nl-" + id }, T(n.l), g);
    txt("text", { x: n.x - n.w / 2 + 10, y: n.y + 20, class: "ns", id: "ns-" + id }, T(n.s), g);
    if (n.ir !== "geen") el("circle", { cx: n.x + n.w / 2 - 11, cy: n.y - n.h / 2 + 11, r: n.ir === "kern" ? 6 : 5, class: "imark " + n.ir }, g);
    g.addEventListener("click", () => showNode(id));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showNode(id); } });
  }
}

/* Tekst die niet in een blok past, wordt iets smaller gezet */
function fitText(id) {
  const n = NODES[id];
  ["nl-", "ns-"].forEach(p => {
    const e = $(p + id); if (!e) return;
    e.removeAttribute("textLength"); e.removeAttribute("lengthAdjust");
    const max = n.w - 20 - (p === "nl-" && n.ir !== "geen" ? 0 : 0);
    try { if (e.getComputedTextLength() > max) { e.setAttribute("textLength", max); e.setAttribute("lengthAdjust", "spacingAndGlyphs"); } } catch (er) {}
  });
}

let S0 = { h: true, lv: 4, lens: false, sel: null, concept: null, trendSel: null };
function reset() {
  paint(); renderLevels(); renderTrends();
  if (S0.sel) showNode(S0.sel); else if (S0.trendSel != null) trendPanel(S0.trendSel); else if (S0.concept) showConcept(S0.concept, true); else renderIntro();
}
function vis(id) { const n = NODES[id]; return n.lv <= S0.lv && (!n.har || S0.h); }
function edgeOp(k, e) {
  const a = e.dataset.a, b = e.dataset.b, cat = e.dataset.cat, lv = S0.lv, h = S0.h;
  if (!vis(a) || !vis(b)) return .04;
  if (cat === "pipe") { if (lv > 2) return .04; if (k === "input-gemini" && h && lv >= 1) return .15; if (k === "extract-core" && h) return .15; return 1; }
  if (cat === "hub") return lv >= 3 ? 1 : .04;
  if (k === "input-orch" || k === "orch-crm" || k === "orch-core" || k === "orch-data") return h ? .15 : 1;
  if (k === "sdp-orch") return lv >= 3 ? 1 : .04;
  return 1;
}
function paint() {
  svg.classList.toggle("lens", S0.lens);
  document.querySelectorAll(".node").forEach(g => {
    const id = g.dataset.id; const n = NODES[id];
    g.classList.remove("sel", "off", "rel", "ghost");
    if (n.lv > S0.lv) g.classList.add("ghost"); else if (n.har && !S0.h) g.classList.add("off");
    if (S0.sel === id) g.classList.add("sel");
    if (S0.concept && CBYK[S0.concept].rel.includes(id)) g.classList.add("rel");
    if (S0.trendSel != null && TRENDS[S0.trendSel].rel.includes(id)) g.classList.add("rel");
    if (HL.includes(id) && !S0.concept && S0.trendSel == null) g.classList.add("rel");
  });
  const lv = S0.lv, h = S0.h;
  $("harframe").style.opacity = $("harlabel").style.opacity = h && lv >= 1 ? 1 : .12;
  $("harframe2").style.opacity = h && lv >= 4 ? 1 : .08;
  $("harframe3").style.opacity = h && lv >= 3 ? 1 : .08;
  $("zRun").style.opacity = lv >= 3 ? 1 : .25; $("zKen").style.opacity = lv >= 1 ? 1 : .25; $("zBron").style.opacity = lv >= 2 ? 1 : .25; $("zCtl").style.opacity = lv >= 5 ? 1 : .25;
  for (const k in edgeEls) edgeEls[k].style.opacity = edgeOp(k, edgeEls[k]);
  $("lens").setAttribute("aria-pressed", S0.lens); $("lgK").hidden = $("lgM").hidden = !S0.lens;
  document.querySelectorAll(".chip").forEach(c => { c.setAttribute("aria-pressed", c.dataset.c === S0.concept); c.classList.toggle("later", CBYK[c.dataset.c].lv > lv); });
  updateLabels();
}
function badge(t) { return '<span class="badge b-' + t + '">' + esc(u().typelong[t]) + "</span>"; }
function integNote(n) { return S0.lens ? '<div class="note n-integ"><b>' + esc(u().ir[n.ir]) + "</b>" + esc(T(n.it)) + "</div>" : ""; }
function renderLevels() {
  const t = u();
  $("levels").innerHTML = LEVELS.map((lvl, i) => '<button class="lvb" role="radio" aria-checked="' + (i === S0.lv) + '" data-lv="' + i + '"><b>L' + i + "</b><span>" + esc(T(lvl.n)) + "</span></button>").join("");
  document.querySelectorAll(".lvb").forEach(b => b.onclick = () => { S0.lv = +b.dataset.lv; reset(); });
  const lvl = LEVELS[S0.lv];
  const on = HSTRIP.filter(id => NODES[id].lv <= S0.lv).length;
  $("hstrip").innerHTML = '<span class="hsl">' + esc(t.hOn(on, HSTRIP.length)) + "</span>" + HSTRIP.map(id => { const n = NODES[id], a = n.lv <= S0.lv; return '<button class="hs' + (a ? " on" : "") + '" data-id="' + id + '"><i>L' + n.lv + "</i>" + esc(T(n.l)) + "</button>"; }).join("");
  document.querySelectorAll(".hs").forEach(b => b.onclick = () => showNode(b.dataset.id));
  $("lvdesc").innerHTML = "<b>Level " + S0.lv + " · " + esc(T(lvl.n)) + ".</b> " + esc(T(lvl.d)) + (S0.lens ? ' <span class="iw">' + esc(t.iBelang) + ": " + esc(T(lvl.iw).toLowerCase()) + ". " + esc(T(lvl.it)) + "</span>" : "");
}
function renderIntro() {
  const t = u();
  if (S0.lens) {
    $("panel").innerHTML = "<h2>" + esc(t.integT) + '</h2><p class="ptitle">' + esc(t.integQ) + "</p><p>" + esc(t.integP) + '</p><ul class="ilist">' + LEVELS.map((lvl, i) => "<li><b>L" + i + '</b><span><span class="w">' + esc(T(lvl.iw)) + ".</span> " + esc(T(lvl.it)) + "</span></li>").join("") + "</ul>";
    return;
  }
  $("panel").innerHTML = "<h2>" + esc(t.introT) + '</h2><p class="hint">' + esc(t.hint) + "</p>" + (HL.length ? '<div class="note n-ok" style="background:var(--harness-soft);color:var(--harness)">' + esc(t.hlNote) + "</div>" : "");
}
function renderTrends() {
  const tb = $("trendrows"); if (!tb) return; const t = u();
  tb.innerHTML = TRENDS.map((x, i) => '<tr class="' + (i === S0.trendSel ? "on" : "") + '" data-i="' + i + '" tabindex="0"><td class="td-d">' + esc(Lumen.month(x.datum)) + "</td><td>" + esc(T(x.t)) + '</td><td class="td-l">L' + x.lv + "</td><td>" + x.rel.map(r => esc(T(NODES[r].l))).join(", ") + '</td><td><span class="st st-' + esc(x.st) + '">' + esc(t.st[x.st] || x.st) + "</span></td></tr>").join("");
  tb.querySelectorAll("tr").forEach(r => { const go = () => showTrend(+r.dataset.i); r.onclick = go; r.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }; });
}
function showTrend(i) { if (S0.trendSel === i) { S0.trendSel = null; paint(); renderTrends(); renderIntro(); return; } S0.trendSel = i; S0.sel = null; S0.concept = null; S0.lv = TRENDS[i].lv; reset(); }
function trendPanel(i) {
  const x = TRENDS[i], t = u();
  $("panel").innerHTML = "<h2>" + esc(t.trend) + " · " + esc(Lumen.month(x.datum)) + '</h2><p class="ptitle">' + esc(T(x.t)) + "</p><p>" + esc(T(x.wat)) + '</p><div class="lbl">' + esc(t.q[0]) + "</div><p>Level " + x.lv + " (" + esc(T(LEVELS[x.lv].n)) + ')</p><div class="lbl">' + esc(t.q[1]) + "</div><p>" + esc(T(x.blok)) + '</p><div class="lbl">' + esc(t.q[2]) + "</div><p>" + esc(T(x.har)) + '</p><div class="lbl">' + esc(t.q[3]) + "</div><p>" + esc(T(x.int)) + '</p><div class="lbl">' + esc(t.status) + '</div><p><span class="st st-' + esc(x.st) + '">' + esc(t.st[x.st] || x.st) + "</span>" + (x.src ? ' · <a href="' + esc(x.src) + '" rel="noopener" target="_blank">' + esc(t.source) + "</a>" : "") + (x.lichtpunt ? ' · <a href="/lumen/lichtpunten/lees.html?id=' + encodeURIComponent(x.lichtpunt) + '">' + esc(t.lichtpunt) + "</a>" : "") + "</p>";
}
function updateLabels() {
  const lv = S0.lv, t = u();
  for (const id in NODES) {
    const n = NODES[id], c = labelOf(id, lv);
    $("nl-" + id).textContent = c.l; $("ns-" + id).textContent = c.s; $("nt-" + id).textContent = t.type[n.t] + (n.lv <= lv ? " · L" + lv : " · " + t.from + n.lv);
    fitText(id);
    const changed = (n.lv === lv && lv > 0) || (n.lv < lv && EV[id] && EV[id][lv]);
    document.querySelector('.node[data-id="' + id + '"]').classList.toggle("evo", !!changed);
  }
}
function evoHtml(id) {
  const e = EV[id]; if (!e) return ""; const n = NODES[id], t = u(); const ks = Object.keys(e).map(Number).sort((a, b) => a - b);
  const cur = n.lv > S0.lv ? -1 : ks.filter(k => k <= S0.lv).pop(); const c = labelOf(id, S0.lv);
  let h = (cur >= 0 && c.d) ? '<div class="lbl">' + esc(t.onLevel(S0.lv)) + "</div><p>" + esc(c.d) + "</p>" : "";
  if (ks.length > 1) h += '<div class="lbl">' + esc(t.evolT) + '</div><ol class="evol">' + ks.map(k => '<li class="' + (k === cur ? "cur" : "") + '"><b>L' + k + "</b><span><em>" + esc((e[k].l ? T(e[k].l) + ": " : "") + T(e[k].s || "")) + "</em>" + esc(T(e[k].d || "")) + "</span></li>").join("") + "</ol>";
  return h;
}
function showNode(id) {
  S0.sel = id; S0.concept = null; S0.trendSel = null; paint(); const n = NODES[id], t = u();
  let extra = "";
  if (n.lv > S0.lv) extra = '<div class="note n-warn">' + esc(t.comesAt(n.lv, T(LEVELS[n.lv].n))) + "</div>";
  else if (n.har && !S0.h) extra = '<div class="note n-warn">' + esc(t.harOff) + "</div>";
  $("panel").innerHTML = "<h2>" + esc(t.block) + '</h2><p class="ptitle">' + esc(labelOf(id, S0.lv).l) + "</p><div>" + badge(n.t) + (n.har ? '<span class="badge b-har">harness</span>' : "") + '<span class="badge b-lv">' + esc(n.lv <= S0.lv ? t.lvSince(S0.lv, n.lv) : t.lvFrom(n.lv)) + '</span></div><div class="lbl">' + esc(t.gcloud) + "</div><p>" + esc(T(n.g)) + '</p><div class="lbl">' + esc(t.what) + "</div><p>" + esc(T(n.what)) + "</p>" + evoHtml(id) + '<div class="lbl">' + esc(t.why) + "</div><p>" + esc(T(n.why)) + "</p>" + extra + integNote(n);
}
function showConcept(c, keep) {
  S0.trendSel = null; if (!keep) S0.concept = S0.concept === c ? null : c; S0.sel = null; paint();
  if (!S0.concept) { renderIntro(); return; } const k = CBYK[S0.concept], t = u();
  $("panel").innerHTML = "<h2>" + esc(t.concept(k.lv, T(LEVELS[k.lv].n))) + '</h2><p class="ptitle">' + esc(T(k.t)) + "</p><p>" + esc(T(k.d)) + '</p><div class="lbl">' + esc(t.relBlocks) + "</div><p>" + k.rel.map(r => esc(T(NODES[r].l))).join(" · ") + "</p>" + (k.lv > S0.lv ? '<div class="note n-warn">' + esc(t.conceptLater(k.lv)) + "</div>" : "");
}
function renderChips() {
  $("chips").innerHTML = [...CONCEPTS].sort((a, b) => a.lv - b.lv).map(c => '<button class="chip" data-c="' + c.k + '" aria-pressed="false"><i>L' + c.lv + "</i>" + esc(T(c.t)) + "</button>").join("");
  document.querySelectorAll(".chip").forEach(c => c.onclick = () => showConcept(c.dataset.c));
}
function wire() {
  $("lens").onclick = () => { S0.lens = !S0.lens; paint(); renderLevels(); if (S0.sel) showNode(S0.sel); else if (S0.concept) showConcept(S0.concept, true); else if (S0.trendSel != null) trendPanel(S0.trendSel); else renderIntro(); };
}

/* Bij een taalwissel: alles opnieuw tekenen in de nieuwe taal, met dezelfde stand (level, bril, selectie) */
function relang() { shell(); drawSvg(); renderChips(); wire(); reset(); }

let HSTRIP = [], READY = false;
Promise.all([Lumen.json("/lumen/data/blokken.json"), Lumen.json("/lumen/data/concepten.json"), Lumen.json("/lumen/data/trends.json")])
  .then(([b, c, tr]) => {
    LEVELS = b.levels; NODES = b.blokken; EV = b.evolutie; HSTRIP = b.harnessStrook;
    CONCEPTS = c.concepten; CONCEPTS.forEach(x => CBYK[x.k] = x);
    TRENDS = [...tr.trends].sort((x, y) => y.datum.localeCompare(x.datum));
    /* ?lv=5&blokken=orch,gemini : vanuit een lichtpunt een level kiezen en blokken uitlichten */
    const q = new URLSearchParams(location.search);
    const lv = parseInt(q.get("lv"), 10); if (lv >= 0 && lv < LEVELS.length) S0.lv = lv;
    HL = (q.get("blokken") || "").split(",").filter(k => NODES[k]);
    READY = true;
    shell(); drawSvg(); renderChips(); wire(); reset();
  })
  .catch(err => { $("atlas").innerHTML = '<p class="loading">' + esc(u().loadErr) + "</p>"; console.error(err); });

Lumen.start("atlas", isSwitch => { if (READY && isSwitch) relang(); });
})();
