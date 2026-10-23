/* Приложение: главная, страница темы по шаблону из 5 блоков, общий тест. Маршруты: #/, #/<id темы>, #/quiz */
(() => {
  const { t } = NA;
  const app = document.getElementById("app");
  const UI = {
    brand: ["Атлас мозга", "Brain Atlas"],
    kicker: ["Нейронаука · интерактивный курс", "Neuroscience · interactive course"],
    title: ["Атлас мозга", "Brain Atlas"],
    lede: ["Как мозг слышит, держит равновесие и решает, стрелять нейрону или нет. Каждая тема — схема, которую можно потрогать.", "How the brain hears, keeps balance and decides whether a neuron fires. Every topic is a diagram you can touch."],
    mapHint: ["Точки — темы курса там, где они живут в мозге", "Dots mark where each topic lives in the brain"],
    start: ["Начать с нейрона →", "Start with the neuron →"], cont: ["Продолжить: ", "Continue: "], again2: ["Всё пройдено — повторить", "All done — review"],
    progress: ["Пройдено", "Completed"], of: ["из", "of"],
    quizAll: ["Общий тест", "Mixed quiz"], soonList: ["Скоро:", "Coming soon:"],
    done: ["пройдено", "done"], ready: ["открыть", "open"], soon: ["скоро", "soon"],
    back: ["← Все темы", "← All topics"],
    b1: ["Идея за 30 секунд", "The idea in 30 seconds"],
    b2: ["Потрогай", "Try it"],
    b3: ["Как это в мозге", "How it runs in the brain"],
    b4: ["Если сломалось", "When it breaks"],
    b5: ["Проверь себя", "Check yourself"],
    run: ["▶ Провести сигнал", "▶ Send the signal"], prev: ["Назад", "Back"], next: ["Дальше", "Next"],
    right: ["Верно.", "Correct."], wrong: ["Не совсем.", "Not quite."],
    allDone: ["Тема пройдена: ", "Topic complete: "], correct: ["верно", "correct"],
    nextTopic: ["Следующая тема →", "Next topic →"], prevTopic: ["← Предыдущая", "← Previous"],
    soonH: ["Тема в работе", "Topic in progress"],
    soonP: ["Здесь будет тот же шаблон: идея, интерактив, путь сигнала, болезни и вопросы. План:", "It will follow the same template: idea, demo, pathway, disorders and questions. Plan:"],
    quizH: ["Общий тест", "Mixed quiz"], quizL: ["10 случайных вопросов из всех пройденных и открытых тем.", "10 random questions from all available topics."], again: ["Ещё 10 вопросов", "10 more questions"]
  };
  const ready = () => NA.topics.filter(x => !x.soon);
  const ordered = () => NA.levels.flatMap(l => ready().filter(x => x.level === l.id));

  /* Где тема «живёт» в мозге — точки на схеме главной (координаты в системе viewBox 40 40 520 380) */
  const SPOTS = { atlas: [160, 150], neuron: [385, 100], synapse: [430, 150], hearing: [312, 246], vestibular: [490, 312],
    vision: [522, 196], touch: [322, 92], movement: [280, 92], memory: [365, 282], emotion: [285, 284], sleep: [375, 372], glia: [205, 205] };
  /* Мозг сбоку (левое полушарие, лоб слева). Доли — цветные области, обрезанные силуэтом коры */
  const CORTEX = "M70,230 C58,150 120,70 230,50 C330,34 452,58 512,118 C556,163 562,228 532,266 C512,290 472,292 442,282 C412,314 342,330 272,322 C212,316 172,302 152,284 C140,272 150,258 172,254 C150,262 96,262 70,230 Z";
  const SULCI = [
    "M172,254 C240,232 320,222 395,205 C405,200 410,190 413,180",
    "M302,44 C290,88 302,120 282,150 C270,175 264,200 259,228",
    "M264,50 C252,92 260,124 240,158 C230,178 228,198 224,236",
    "M340,48 C330,92 342,124 322,158 C314,178 310,198 307,220",
    "M108,138 C150,126 190,140 240,116", "M94,190 C140,176 186,196 230,180", "M120,232 C150,220 180,226 214,212",
    "M332,140 C372,128 402,150 452,138 C476,134 496,148 506,170",
    "M372,176 C392,170 404,184 424,180", "M484,104 C470,140 494,170 482,204",
    "M470,232 C494,242 514,236 536,224", "M206,282 C262,262 330,256 422,238", "M234,306 C292,296 352,292 432,268",
    "M140,92 C160,104 182,96 200,84", "M402,92 C420,100 436,92 456,98"
  ];
  const brainSVG = () => {
    const folia = [...Array(7)].map((_, i) => `<path d="M${424 + i * 3},${290 + i * 9} C${464 + i},${280 + i * 9} ${518 - i * 3},${280 + i * 9} ${554 - i * 6},${292 + i * 8}"/>`).join("");
    return `<defs>
      <radialGradient id="tissueG" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="color-mix(in srgb,var(--tissue-2) 70%,var(--surface))"/><stop offset="1" stop-color="var(--tissue)"/></radialGradient>
      <clipPath id="cxClip"><path d="${CORTEX}"/></clipPath>
      <filter id="soft" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity=".28"/></filter></defs>
      <g filter="url(#soft)">
        <path class="b-cer" d="M416,290 C436,258 520,252 550,282 C572,312 544,354 488,356 C440,358 404,332 416,290 Z"/>
        <g class="b-fol">${folia}</g>
        <path class="b-stem" d="M346,296 C340,316 336,334 344,352 C352,372 354,392 360,408 C366,420 388,420 394,406 C392,384 394,360 404,338 C412,320 414,306 412,296 Z"/>
        <path class="b-cx" d="${CORTEX}"/>
        <g clip-path="url(#cxClip)" class="lobes">
          <path fill="var(--hema)" d="M0,0 L302,0 L302,44 C290,88 302,120 282,150 C270,175 264,200 259,228 L172,254 L0,320 Z"/>
          <path fill="var(--calm)" d="M302,0 L486,0 L484,104 C470,140 494,170 482,204 L413,180 C410,190 405,200 395,205 L259,228 C264,200 270,175 282,150 C302,120 290,88 302,44 Z"/>
          <path fill="var(--myelin)" d="M486,0 L600,0 L600,420 L442,282 L482,204 C494,170 470,140 484,104 Z"/>
          <path fill="var(--eosin)" d="M172,254 L259,228 L395,205 C405,200 410,190 413,180 L482,204 L442,282 L442,440 L210,440 L150,290 Z"/>
        </g>
        <g class="b-g">${SULCI.map(d => `<path d="${d}"/>`).join("")}</g>
        <path class="b-edge" d="${CORTEX}"/>
      </g>`;
  };
  const ICONS = {
    neuron: "M12 9.5a2.5 2.5 0 1 0 .01 0M12 12v9M10 8 6 4M14 8l4-4M9.5 10.5H4M14.5 10.5H20",
    synapse: "M5 3v5a7 7 0 0 0 14 0V3M5 21h14M9 16v.01M12 17.5v.01M15 16v.01",
    hearing: "M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0M10 9a2 2 0 0 1 4 0",
    vestibular: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 1 1",
    atlas: "M8 5a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 4 4h8a3 3 0 0 0 4-4 3 3 0 0 0-1-5 3 3 0 0 0-3-3 3 3 0 0 0-4 0 3 3 0 0 0-4 0M12 5v14"
  };
  const icon = id => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[id] || ICONS.atlas}"/></svg>`;

  function home() {
    const all = ordered(), n = all.filter(x => NA.done.has(x.id)).length;
    const nextUp = all.find(x => !NA.done.has(x.id));
    const cta = n === 0 ? [all[0], t(UI.start)] : nextUp ? [nextUp, t(UI.cont) + t(nextUp.title) + " →"] : [all[0], t(UI.again2)];
    const dots = NA.topics.filter(x => SPOTS[x.id]).map(x => {
      const [cx, cy] = SPOTS[x.id], on = !x.soon;
      return `<a href="#/${x.id}" class="spot-l ${on ? "on" : ""}" aria-label="${t(x.title)}">
        ${on ? `<circle class="halo" cx="${cx}" cy="${cy}" r="14"/>` : ""}<circle class="dot" cx="${cx}" cy="${cy}" r="${on ? 7 : 4.5}"/>
        ${on ? `<text class="tag" x="${cx + 12}" y="${cy - 10}">${t(x.title)}</text>` : `<title>${t(x.title)} · ${t(UI.soon)}</title>`}</a>`;
    }).join("");
    app.innerHTML = `
      <section class="home-hero">
        <div class="hero-txt">
          <span class="eyebrow">${t(UI.kicker)}</span>
          <h1 class="display">${t(UI.title)}</h1>
          <p class="lede">${t(UI.lede)}</p>
          <div class="row"><a class="btn big-btn" href="#/${cta[0].id}">${cta[1]}</a><a class="btn ghost" href="#/quiz">${t(UI.quizAll)}</a></div>
          <div class="progress"><span class="score">${t(UI.progress)} ${n} ${t(UI.of)} ${all.length}</span><div class="meter"><i style="width:${n / all.length * 100}%"></i></div></div>
        </div>
        <figure class="hero-map">
          <svg viewBox="40 20 540 410" role="img" aria-label="${t(UI.mapHint)}">
            ${brainSVG()}
            ${dots}
          </svg>
          <figcaption class="tip">${t(UI.mapHint)}</figcaption>
        </figure>
      </section>
      ${NA.levels.map((l, i) => {
        const items = NA.topics.filter(x => x.level === l.id), rd = items.filter(x => !x.soon), sn = items.filter(x => x.soon);
        return `<section class="level">
          <div class="level-head"><span class="lvl-n">0${i + 1}</span><div><h2>${t(l.n)}</h2><p class="tip">${t(l.d)}</p></div></div>
          ${rd.length ? `<div class="grid">${rd.map(card).join("")}</div>` : ""}
          ${sn.length ? `<p class="soon-line"><span>${t(UI.soonList)}</span> ${sn.map(x => `<a href="#/${x.id}">${t(x.title)}</a>`).join("")}</p>` : ""}
        </section>`;
      }).join("")}`;
  }
  function card(x) {
    const dn = NA.done.has(x.id);
    return `<a class="tcard ${dn ? "done" : ""}" href="#/${x.id}">${icon(x.id)}<div><h3>${t(x.title)}</h3><p>${t(x.sub)}</p></div>${dn ? `<span class="k">✓ ${t(UI.done)}</span>` : ""}</a>`;
  }

  function topic(x) {
    const lvl = NA.levels.find(l => l.id === x.level);
    if (x.soon) {
      app.innerHTML = `<a class="back" href="#/">${t(UI.back)}</a>
        <section class="hero"><span class="eyebrow">${t(lvl.n)}</span><h1>${t(x.title)}</h1><p class="lede">${t(x.sub)}</p></section>
        <section class="card"><h3>${t(UI.soonH)}</h3><p>${t(UI.soonP)}</p><ul>${(x.plan || []).map(p => `<li>${t(p)}</li>`).join("")}</ul></section>`;
      return;
    }
    const list = ordered(), i = list.indexOf(x), prev = list[i - 1], next = list[i + 1];
    app.innerHTML = `<a class="back" href="#/">${t(UI.back)}</a>
      <section class="hero"><span class="eyebrow">${t(lvl.n)}</span><h1>${t(x.title)}</h1><p class="lede">${t(x.sub)}</p></section>
      <section class="block"><div class="bhead"><span class="num">1</span><h2>${t(UI.b1)}</h2></div>
        <p class="idea">${t(x.idea)}</p>${x.analogy ? `<div class="mnemo">${t(x.analogy)}</div>` : ""}</section>
      <section class="block"><div class="bhead"><span class="num">2</span><h2>${t(UI.b2)}</h2></div><div id="plays" class="play"></div></section>
      ${x.path ? `<section class="block"><div class="bhead"><span class="num">3</span><h2>${t(UI.b3)}</h2></div><div id="path"></div></section>` : ""}
      <section class="block"><div class="bhead"><span class="num">${x.path ? 4 : 3}</span><h2>${t(UI.b4)}</h2></div>
        <div class="broken">${x.broken.map(b => `<article class="card"><h3>${t(b.n)}</h3><p>${t(b.d)}</p></article>`).join("")}</div></section>
      <section class="block"><div class="bhead"><span class="num">${x.path ? 5 : 4}</span><h2>${t(UI.b5)}</h2></div><div id="quiz"></div></section>
      <nav class="navnext">${prev ? `<a class="btn ghost" href="#/${prev.id}">${t(UI.prevTopic)} ${t(prev.title)}</a>` : "<span></span>"}${next ? `<a class="btn" href="#/${next.id}">${t(next.title)} · ${t(UI.nextTopic)}</a>` : ""}</nav>`;
    const plays = app.querySelector("#plays");
    x.plays.forEach(p => {
      const wrap = document.createElement("div"); wrap.className = "play";
      wrap.innerHTML = (p.title ? `<h3>${t(p.title)}</h3>` : "") + p.html();
      plays.append(wrap); p.init(wrap);
    });
    if (x.path) pathway(app.querySelector("#path"), x.path);
    quiz(app.querySelector("#quiz"), x.quiz.map(q => ({ ...q, topic: x })), () => NA.markDone(x.id));
  }

  /* Блок 3: путь сигнала — узлы на линии, шаги и кнопка «провести сигнал» */
  function pathway(root, P) {
    const steps = P.steps;
    root.innerHTML = `<div class="split"><div class="stage"><svg viewBox="0 0 640 210" role="img"></svg><div class="row"><button class="btn run">${t(UI.run)}</button></div></div>
      <article class="card">${P.note ? `<p class="tip">${t(P.note)}</p>` : ""}<div class="steps"></div><p class="caption"></p>
      <div class="row"><button class="btn ghost pv">${t(UI.prev)}</button><button class="btn nx">${t(UI.next)}</button></div></article></div>`;
    const svg = root.querySelector("svg"), gap = 540 / (steps.length - 1), X = i => 50 + i * gap;
    svg.append(NA.svgEl("line", { x1: X(0), x2: X(steps.length - 1), y1: 100, y2: 100, stroke: "var(--line)", "stroke-width": 4 }));
    if (P.branch) {
      const bx = X(P.branch.at);
      svg.append(NA.svgEl("path", { d: `M${bx - 70},190 C${bx},190 ${bx},150 ${bx},112`, fill: "none", stroke: "var(--calm)", "stroke-width": 2, "stroke-dasharray": "5 4" }));
      const bt = NA.svgEl("text", { class: "lbl", x: bx - 78, y: 194, "text-anchor": "end" }); bt.textContent = t(P.branch.label); svg.append(bt);
    }
    const pulse = NA.svgEl("circle", { cx: X(0), cy: 100, r: 7, fill: "var(--myelin)", opacity: 0 });
    const nodes = steps.map((s, i) => {
      const g = NA.svgEl("g", { class: "anode" }); g.append(NA.svgEl("circle", { cx: X(i), cy: 100, r: 12 }));
      const tx = NA.svgEl("text", { class: "lbl", x: X(i), y: i % 2 ? 140 : 72, "text-anchor": "middle" }); tx.textContent = t(s.n); g.append(tx);
      svg.append(g); return g;
    });
    svg.append(pulse);
    NA.clickable(nodes, g => t(steps[nodes.indexOf(g)].n), g => go(nodes.indexOf(g)));
    const stepsEl = root.querySelector(".steps"), cap = root.querySelector(".caption");
    steps.forEach((_, i) => { const b = document.createElement("button"); b.textContent = i + 1; b.onclick = () => go(i); stepsEl.append(b) });
    let cur = 0;
    function go(i) {
      cur = Math.max(0, Math.min(steps.length - 1, i));
      nodes.forEach((g, j) => { g.classList.toggle("on", j === cur); g.classList.toggle("done", j < cur) });
      [...stepsEl.children].forEach((b, j) => b.setAttribute("aria-current", j === cur));
      cap.innerHTML = `<b>${cur + 1}. ${t(steps[cur].n)}.</b> ${t(steps[cur].d)}`;
    }
    root.querySelector(".pv").onclick = () => go(cur - 1);
    root.querySelector(".nx").onclick = () => go(cur + 1);
    let busy = false;
    root.querySelector(".run").onclick = () => {
      if (busy) return; busy = true; const per = 900, t0 = performance.now(); go(0);
      (function frame(now) {
        if (!svg.isConnected) return;
        const p = (now - t0) / per, i = Math.min(steps.length - 1, Math.floor(p));
        if (i !== cur) go(i);
        pulse.setAttribute("opacity", i < steps.length - 1 ? 1 : 0);
        pulse.setAttribute("cx", Math.min(X(i) + (NA.still ? 0 : (p - i) * gap), X(steps.length - 1)));
        if (p < steps.length) requestAnimationFrame(frame); else { busy = false; pulse.setAttribute("opacity", 0) }
      })(t0);
    };
    go(0);
  }

  /* Блок 5 и общий тест: вопросы с вариантами и объяснением */
  function quiz(root, qs, onDone, showTopic) {
    let answered = 0, ok = 0;
    root.innerHTML = `<div class="qlist"></div><p class="caption res"></p>`;
    const list = root.querySelector(".qlist"), res = root.querySelector(".res");
    qs.forEach(q => {
      const box = document.createElement("div"); box.className = "q";
      box.innerHTML = `${showTopic ? `<span class="from">${t(q.topic.title)}</span>` : ""}<h3>${t(q.q)}</h3><div class="opts"></div><p class="why" hidden></p>`;
      const opts = box.querySelector(".opts"), why = box.querySelector(".why");
      let locked = false;
      NA.shuffle(q.o.map((o, i) => [o, i])).forEach(([o, i]) => {
        const b = document.createElement("button"); b.textContent = t(o); b.dataset.i = i;
        b.onclick = () => {
          if (locked) return; locked = true; answered++;
          const right = i === 0; if (right) ok++;
          b.classList.add(right ? "ok" : "bad");
          opts.querySelector('[data-i="0"]').classList.add("ok");
          why.hidden = false; why.innerHTML = `<b>${t(right ? UI.right : UI.wrong)}</b> ${t(q.why)}`;
          if (answered === qs.length) { res.textContent = `${t(UI.allDone)}${ok} ${t(UI.of)} ${qs.length} ${t(UI.correct)}.`; onDone && onDone() }
        };
        opts.append(b);
      });
      list.append(box);
    });
  }

  function mixed() {
    const pool = NA.shuffle(ready().flatMap(x => x.quiz.map(q => ({ ...q, topic: x })))).slice(0, 10);
    app.innerHTML = `<a class="back" href="#/">${t(UI.back)}</a><section class="hero"><h1>${t(UI.quizH)}</h1><p class="lede">${t(UI.quizL)}</p></section><div id="quiz"></div><div><button class="btn" id="again">${t(UI.again)}</button></div>`;
    quiz(app.querySelector("#quiz"), pool, null, true);
    app.querySelector("#again").onclick = mixed;
  }

  function route() {
    const id = location.hash.replace(/^#\/?/, "");
    document.documentElement.lang = NA.lang;
    document.getElementById("brand").textContent = t(UI.brand);
    document.getElementById("l-ru").setAttribute("aria-pressed", NA.lang === "ru");
    document.getElementById("l-en").setAttribute("aria-pressed", NA.lang === "en");
    const x = NA.topics.find(tp => tp.id === id);
    if (id === "quiz") mixed(); else if (x) topic(x); else home();
    document.title = (x ? t(x.title) + " · " : "") + t(UI.brand);
  }
  const setLang = l => { NA.setLang(l); route() };
  document.getElementById("l-ru").onclick = () => setLang("ru");
  document.getElementById("l-en").onclick = () => setLang("en");
  addEventListener("hashchange", () => { route(); scrollTo(0, 0) });
  route();
})();
