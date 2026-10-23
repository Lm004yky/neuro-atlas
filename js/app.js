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
  const SPOTS = { atlas: [165, 150], neuron: [345, 120], synapse: [395, 160], hearing: [300, 222], vestibular: [462, 300],
    vision: [500, 205], touch: [287, 95], movement: [258, 95], memory: [345, 262], emotion: [282, 258], sleep: [358, 350], glia: [215, 195] };
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
          <svg viewBox="40 40 520 380" role="img" aria-label="${t(UI.mapHint)}">
            <defs><radialGradient id="tissueG" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="var(--tissue-2)"/><stop offset="1" stop-color="var(--tissue)"/></radialGradient></defs>
            <path class="b-stem" d="M330,290 C345,288 370,288 386,292 L378,398 C365,404 350,404 340,398 Z"/>
            <path class="b-cer" d="M392,292 C418,262 500,260 522,284 C538,312 512,348 470,350 C428,352 392,330 392,292 Z"/>
            <path class="b-cer-g" d="M405,300 C440,285 490,282 515,295 M402,315 C440,302 495,302 520,312 M410,330 C445,322 490,322 510,330"/>
            <path class="b-cx" d="M75,235 C45,170 80,85 175,62 C260,50 400,60 445,105 C500,135 535,190 520,245 C505,265 470,262 440,250 C430,285 380,305 320,305 C240,305 160,295 130,275 C100,260 85,250 75,235 Z"/>
            <path class="b-g" d="M100,150 C140,140 180,150 215,135 M95,195 C140,185 180,195 225,180 M150,95 C170,120 200,110 240,100 M271,64 C262,110 248,160 234,202 M320,95 C350,110 380,100 415,120 M310,150 C350,140 380,160 420,150 M460,150 C480,175 500,190 510,215 M120,240 C200,212 330,198 425,205 M160,265 C220,255 300,262 400,250"/>
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
