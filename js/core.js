/* Ядро: язык, хранилище, звук, хелперы SVG и реестр тем.
   Любой текст пишется парой [ru, en] и выводится через NA.t(). */
const NA = (() => {
  const store = {
    get(k) { try { return localStorage.getItem(k) } catch (e) { return null } },
    set(k, v) { try { localStorage.setItem(k, v) } catch (e) {} }
  };
  let lang = store.get("lang") === "en" ? "en" : "ru";
  const t = x => Array.isArray(x) ? x[lang === "en" ? 1 : 0] : (x ?? "");

  /* Уровни курса — в этом порядке темы показываются на главной */
  const levels = [
    { id: "cell", n: ["Клетка", "Cell"], d: ["Как работает один нейрон и как нейроны говорят друг с другом", "How one neuron works and how neurons talk"] },
    { id: "systems", n: ["Системы", "Systems"], d: ["Чувства, движение, память и эмоции: путь сигнала от рецептора до коры", "Senses, movement, memory and emotion: from receptor to cortex"] },
    { id: "brain", n: ["Мозг целиком", "Whole brain"], d: ["Карта областей и что бывает, когда они повреждены", "A map of regions and what happens when they are damaged"] }
  ];
  const topics = [];
  const register = tp => topics.push(tp);

  const NS = "http://www.w3.org/2000/svg";
  const svgEl = (tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e };
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);

  /* Звук */
  let ctx = null;
  const AC = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
  function tone(f, dur = 1, vol = .12) {
    const c = AC(), o = c.createOscillator(), g = c.createGain(), s = c.currentTime;
    o.frequency.value = f;
    g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(vol, s + .05);
    g.gain.setValueAtTime(vol, s + dur - .1); g.gain.linearRampToValueAtTime(0, s + dur);
    o.connect(g).connect(c.destination); o.start(s); o.stop(s + dur + .02);
  }
  /* Три щелчка с межушной задержкой: itd > 0 — правое ухо слышит раньше */
  function clicks(itdUs) {
    const c = AC(), sr = c.sampleRate, len = Math.floor(sr * .5), b = c.createBuffer(2, len, sr);
    const d = Math.round(Math.abs(itdUs) * 1e-6 * sr);
    const lead = b.getChannelData(itdUs > 0 ? 1 : 0), lag = b.getChannelData(itdUs > 0 ? 0 : 1);
    [0, .15, .3].forEach(t0 => {
      const s0 = Math.floor(t0 * sr);
      for (let i = 0; i < Math.floor(sr * .012); i++) {
        const v = (Math.random() * 2 - 1) * Math.exp(-i / (sr * .002)) * .5;
        lead[s0 + i] += v; if (s0 + i + d < len) lag[s0 + i + d] += v;
      }
    });
    const src = c.createBufferSource(); src.buffer = b; src.connect(c.destination); src.start();
  }
  const fmtHz = f => f >= 1000
    ? (f / 1000).toFixed(f < 10000 ? 1 : 0).replace(".0", "") + (lang === "en" ? " kHz" : " кГц")
    : Math.round(f) + (lang === "en" ? " Hz" : " Гц");

  /* Прогресс */
  const done = new Set(JSON.parse(store.get("done") || "[]"));
  const markDone = id => { done.add(id); store.set("done", JSON.stringify([...done])) };

  /* Кликабельные части схемы: клавиатура + aria */
  function clickable(nodes, label, on) {
    nodes.forEach(n => {
      n.setAttribute("tabindex", "0"); n.setAttribute("role", "button");
      if (label) n.setAttribute("aria-label", label(n));
      n.addEventListener("click", () => on(n));
      n.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); on(n) } });
    });
  }

  return {
    store, t, levels, topics, register, svgEl, still, shuffle, AC, tone, clicks, fmtHz, done, markDone, clickable,
    get lang() { return lang },
    setLang(l) { lang = l; store.set("lang", l) }
  };
})();
