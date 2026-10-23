/* Приложение: главная, страница темы по шаблону из 5 блоков, общий тест. Маршруты: #/, #/<id темы>, #/quiz */
(() => {
  const { t } = NA;
  const app = document.getElementById("app");
  const UI = {
    brand: ["Атлас мозга", "Brain Atlas"],
    title: ["Нейронаука руками", "Neuroscience you can touch"],
    lede: ["Короткие интерактивные темы: от одного нейрона до целого мозга. Каждая тема — идея, интерактив, путь сигнала, болезни и проверка.", "Short interactive topics, from a single neuron to the whole brain. Each one: the idea, a hands-on demo, the signal pathway, disorders and a check."],
    progress: ["Пройдено", "Completed"], of: ["из", "of"],
    quizAll: ["Общий тест по всем темам", "Mixed quiz across all topics"],
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

  function home() {
    const all = ready(), n = all.filter(x => NA.done.has(x.id)).length;
    app.innerHTML = `
      <section class="hero">
        <h1>${t(UI.title)}</h1>
        <p class="lede">${t(UI.lede)}</p>
        <div class="progress"><span class="score">${t(UI.progress)} ${n} ${t(UI.of)} ${all.length}</span><div class="meter"><i style="width:${n / all.length * 100}%"></i></div><a class="btn ghost" href="#/quiz">${t(UI.quizAll)}</a></div>
      </section>
      ${NA.levels.map(l => `
        <section class="level">
          <div class="level-head"><h2>${t(l.n)}</h2><p class="tip">${t(l.d)}</p></div>
          <div class="grid">${NA.topics.filter(x => x.level === l.id).map(card).join("")}</div>
        </section>`).join("")}`;
  }
  function card(x) {
    const st = x.soon ? "soon" : NA.done.has(x.id) ? "done" : "ready";
    return `<a class="tcard ${st}" href="#/${x.id}"><span class="k">${t(UI[st])}</span><h3>${t(x.title)}</h3><p>${t(x.sub)}</p></a>`;
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
