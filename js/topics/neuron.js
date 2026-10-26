NA.register({
  id: "neuron", level: "cell",
  title: ["Нейрон и импульс", "Neuron and impulse"],
  sub: ["Как одна клетка решает: стрелять или молчать", "How one cell decides: fire or stay silent"],
  idea: ["Нейрон собирает тысячи маленьких сигналов. Если их сумма доходит до порога, он посылает импульс — всегда одинаковый, по принципу «всё или ничего».", "A neuron sums thousands of small inputs. If the total reaches threshold, it fires an impulse — always the same size, all or nothing."],
  analogy: ["Как смыв в унитазе: нажал слабо — ничего, нажал до щелчка — смывает полностью. Половины смыва не бывает.", "Like a toilet flush: press too lightly and nothing happens; press past the click and it flushes fully. There is no half flush."],
  plays: [
    {
      title: ["Порог: «всё или ничего»", "Threshold: all or nothing"],
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 0 640 240" role="img">
          <line x1="50" y1="20" x2="50" y2="215" stroke="var(--line)"/><line x1="50" y1="215" x2="620" y2="215" stroke="var(--line)"/>
          <line class="th" x1="50" x2="620" stroke="var(--eosin)" stroke-dasharray="6 4"/>
          <line class="rest" x1="50" x2="620" stroke="var(--tissue-edge)" stroke-dasharray="2 4"/>
          <text class="lbl thl" x="620" text-anchor="end"></text><text class="lbl restl" x="620" text-anchor="end"></text>
          <text class="lbl" x="44" y="30" text-anchor="end">+30</text><text class="lbl" x="44" y="210" text-anchor="end">−80</text>
          <path class="trace" fill="none" stroke="var(--hema)" stroke-width="3" stroke-linejoin="round"/>
          <text class="lbl" x="335" y="234" text-anchor="middle">${NA.t(["время, мс", "time, ms"])}</text>
        </svg>
        <div class="row"><label>${NA.t(["Сила стимула", "Stimulus"])}</label><input type="range" class="s" min="0" max="30" value="10" style="flex:1;min-width:140px"><span class="score sv"></span></div>
        <div class="row"><button class="btn go">${NA.t(["⚡ Стимулировать", "⚡ Stimulate"])}</button></div>
      </div><article class="card"><p class="caption out"></p><p class="tip">${NA.t(["Попробуйте 10 мВ, потом 16 мВ, потом 30 мВ. Заметьте: пик при 16 и при 30 одинаковый.", "Try 10 mV, then 16 mV, then 30 mV. Notice: the peak is the same at 16 and at 30."])}</p></article></div>`,
      init(root) {
        const Y = v => 20 + (30 - v) / 110 * 195;
        const th = root.querySelector(".th"), rest = root.querySelector(".rest");
        th.setAttribute("y1", Y(-55)); th.setAttribute("y2", Y(-55)); rest.setAttribute("y1", Y(-70)); rest.setAttribute("y2", Y(-70));
        const thl = root.querySelector(".thl"), restl = root.querySelector(".restl");
        thl.setAttribute("y", Y(-55) - 6); thl.textContent = NA.t(["порог −55 мВ", "threshold −55 mV"]);
        restl.setAttribute("y", Y(-70) + 16); restl.textContent = NA.t(["покой −70 мВ", "rest −70 mV"]);
        const s = root.querySelector(".s"), sv = root.querySelector(".sv"), trace = root.querySelector(".trace"), out = root.querySelector(".out");
        const V = (x, st) => {
          if (x < 120) return -70;
          const k = x - 120;
          if (-70 + st < -55) return -70 + st * Math.exp(-k / 60) * Math.min(1, k / 12);
          if (k < 20) return -70 + st * k / 20;
          if (k < 45) return -70 + st + (30 - (-70 + st)) * (k - 20) / 25;
          if (k < 90) return 30 - 110 * (k - 45) / 45;
          return -80 + 10 * (1 - Math.exp(-(k - 90) / 70));
        };
        const draw = (st, upto) => {
          let d = "";
          for (let x = 0; x <= upto; x += 2) d += (d ? "L" : "M") + (50 + x) + "," + Y(V(x, st)).toFixed(1);
          trace.setAttribute("d", d);
        };
        const label = () => { sv.textContent = "+" + s.value + (NA.lang === "en" ? " mV" : " мВ") };
        s.oninput = label; label(); draw(0, 570);
        out.textContent = NA.t(["Нажмите «Стимулировать».", "Press “Stimulate”."]);
        root.querySelector(".go").onclick = () => {
          const st = +s.value, t0 = performance.now(), fired = -70 + st >= -55;
          (function frame(now) {
            if (!root.isConnected) return;
            const p = NA.still ? 1 : Math.min(1, (now - t0) / 1200); draw(st, 570 * p);
            if (p < 1) requestAnimationFrame(frame);
          })(t0);
          out.innerHTML = fired
            ? NA.t(["<b>Импульс!</b> Порог пройден: Na⁺-каналы открылись лавиной, мембрана взлетела до +30 мВ. Потом K⁺ выходит, и потенциал падает даже ниже покоя.", "<b>Spike!</b> Threshold crossed: Na⁺ channels opened in an avalanche and the membrane shot to +30 mV. Then K⁺ leaves and the voltage dips below rest."])
            : NA.t(["<b>Тишина.</b> Не хватило до порога — сигнал затух. Нейрон ничего не передал дальше.", "<b>Silence.</b> Not enough to reach threshold, so the bump faded. Nothing was passed on."]);
        };
      }
    },
    {
      title: ["Строение нейрона и бег импульса", "Neuron parts and the travelling impulse"],
      /* Части нейрона — прозрачные «горячие зоны» поверх иллюстрации (координаты в viewBox 0 0 1179 634) */
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 20 1179 600" role="img" class="art-cell">
          <g class="art">${NA.art.neuron}</g>
          <ellipse class="np hz" data-n="dendrites" cx="180" cy="330" rx="165" ry="270"/>
          <ellipse class="np hz" data-n="soma" cx="280" cy="400" rx="75" ry="65"/>
          <ellipse class="np hz" data-n="nucleus" cx="272" cy="410" rx="28" ry="26"/>
          <ellipse class="np hz" data-n="hillock" cx="368" cy="385" rx="26" ry="22"/>
          <g class="np hz" data-n="myelin">${[[430, 402, 8], [545, 428, 4], [660, 435, -2], [765, 400, -25], [840, 322, -55]].map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="52" ry="26" transform="rotate(${a} ${x} ${y})"/>`).join("")}</g>
          <g class="np hz" data-n="node">${[[487, 413], [602, 435], [717, 422], [808, 365]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14"/>`).join("")}</g>
          <ellipse class="np hz" data-n="terminal" cx="1050" cy="200" rx="135" ry="140"/>
          <circle class="pulse" r="16" cx="368" cy="385" opacity="0"/>
          <text class="lbl big-l" x="40" y="70">${NA.t(["дендриты", "dendrites"])}</text><text class="lbl big-l" x="230" y="510">${NA.t(["тело", "soma"])}</text><text class="lbl big-l" x="470" y="365">${NA.t(["миелин", "myelin"])}</text><text class="lbl big-l" x="560" y="490">${NA.t(["перехват Ранвье", "node of Ranvier"])}</text><text class="lbl big-l" x="960" y="380">${NA.t(["терминали", "terminals"])}</text>
        </svg>
        <p class="credit tip">${NA.t(["Иллюстрация", "Illustration"])}: Quasar Jarosz, <a href="https://commons.wikimedia.org/wiki/File:Neuron_Hand-tuned.svg" target="_blank" rel="noopener">CC BY-SA 3.0</a></p>
        <div class="row"><button class="btn fire">${NA.t(["▶ Запустить импульс", "▶ Fire an impulse"])}</button><span class="tip ft"></span></div>
      </div><article class="card info" aria-live="polite"></article></div>`,
      init(root) {
        const N = {
          dendrites: [["Дендриты", "Dendrites"], ["Принимают сигналы от тысяч других нейронов. Шипики на дендритах — места синапсов, при обучении их число меняется.", "Receive signals from thousands of other neurons. Dendritic spines are synapse sites; their number changes with learning."]],
          soma: [["Тело клетки (сома)", "Cell body (soma)"], ["Суммирует входящие сигналы: возбуждающие толкают к порогу, тормозные отталкивают.", "Adds up the inputs: excitatory ones push towards threshold, inhibitory ones pull away."]],
          nucleus: [["Ядро", "Nucleus"], ["Хранит ДНК. Долговременная память требует новых белков, поэтому гены в ядре важны для запоминания.", "Stores DNA. Long-term memory needs new proteins, so genes in the nucleus matter for remembering."]],
          hillock: [["Аксонный холмик", "Axon hillock"], ["Зона запуска. Здесь решается, будет импульс или нет: это и есть порог из игры выше.", "The trigger zone. This is where the fire-or-not decision happens: the threshold from the demo above."]],
          myelin: [["Аксон в миелине", "Myelinated axon"], ["Аксон несёт импульс к терминалям, иногда больше метра. Жёлтые клетки — шванновские, они наматываются на аксон слоями миелина и ускоряют проведение до 120 м/с.", "The axon carries the impulse to the terminals, sometimes over a metre. The yellow Schwann cells wrap it in layers of myelin, speeding conduction up to 120 m/s."]],
          node: [["Перехваты Ранвье", "Nodes of Ranvier"], ["Промежутки без миелина. Импульс «прыгает» от перехвата к перехвату — поэтому быстро.", "Gaps in the myelin. The impulse jumps from node to node, which is why it is fast."]],
          terminal: [["Терминали", "Terminals"], ["Здесь электрический сигнал превращается в химический — см. следующую тему «Синапс».", "Here the electrical signal becomes chemical — see the next topic, Synapse."]]
        };
        const info = root.querySelector(".info"), parts = [...root.querySelectorAll(".np")];
        const show = k => { parts.forEach(g => g.classList.toggle("active", g.dataset.n === k)); info.innerHTML = `<h3>${NA.t(N[k][0])}</h3><p>${NA.t(N[k][1])}</p>` };
        NA.clickable(parts, g => NA.t(N[g.dataset.n][0]), g => show(g.dataset.n));
        show("hillock");
        const pulse = root.querySelector(".pulse"), ft = root.querySelector(".ft");
        const hops = [[368, 385, ["Холмик: порог пройден", "Hillock: threshold crossed"]], [487, 413, ["Перехват 1", "Node 1"]], [602, 435, ["Перехват 2", "Node 2"]], [717, 422, ["Перехват 3", "Node 3"]], [808, 365, ["Перехват 4", "Node 4"]], [880, 270, ["Конец аксона", "End of axon"]], [1040, 190, ["Терминаль: выброс медиатора", "Terminal: transmitter released"]]];
        let busy = false;
        root.querySelector(".fire").onclick = () => {
          if (busy) return; busy = true; pulse.setAttribute("opacity", 1);
          hops.forEach(([x, y, txt], i) => setTimeout(() => {
            pulse.setAttribute("cx", x); pulse.setAttribute("cy", y); ft.textContent = NA.t(txt);
            if (i === hops.length - 1) setTimeout(() => { pulse.setAttribute("opacity", 0); busy = false; ft.textContent = "" }, 900);
          }, i * 380));
        };
      }
    }
  ],
  path: {
    steps: [
      { n: ["Дендриты", "Dendrites"], d: ["Сигналы от соседей приходят как маленькие сдвиги напряжения.", "Inputs from neighbours arrive as small voltage bumps."] },
      { n: ["Тело", "Soma"], d: ["Сдвиги складываются: возбуждающие плюс, тормозные минус.", "Bumps add up: excitatory plus, inhibitory minus."] },
      { n: ["Холмик", "Hillock"], d: ["Сумма дошла до −55 мВ — рождается импульс.", "The sum hits −55 mV and an impulse is born."] },
      { n: ["Аксон", "Axon"], d: ["Импульс бежит, прыгая между перехватами Ранвье.", "The impulse runs, jumping between nodes of Ranvier."] },
      { n: ["Терминаль", "Terminal"], d: ["Импульс открывает Ca²⁺-каналы и запускает выброс медиатора.", "The impulse opens Ca²⁺ channels and triggers transmitter release."] }
    ]
  },
  broken: [
    { n: ["Рассеянный склероз", "Multiple sclerosis"], d: ["Иммунитет разрушает миелин. Импульс идёт медленно или теряется: слабость, онемение, проблемы со зрением.", "The immune system strips myelin. Impulses slow down or get lost: weakness, numbness, vision problems."] },
    { n: ["Местный наркоз", "Local anaesthesia"], d: ["Лидокаин у стоматолога блокирует Na⁺-каналы. Порог недостижим, и сигнал боли не уходит в мозг.", "Lidocaine at the dentist blocks Na⁺ channels. Threshold can’t be reached, so pain signals never leave."] },
    { n: ["Эпилепсия", "Epilepsy"], d: ["Нейроны слишком легко доходят до порога и стреляют все вместе. Получается «электрическая буря» — приступ.", "Neurons reach threshold too easily and fire together, creating an electrical storm — a seizure."] }
  ],
  quiz: [
    { q: ["Что будет, если стимул в два раза сильнее порогового?", "What happens if the stimulus is twice the threshold?"], o: [["Импульс той же высоты", "A spike of the same height"], ["Импульс в два раза выше", "A spike twice as high"], ["Два импульса подряд всегда", "Always two spikes in a row"], ["Нейрон не ответит", "No response"]], why: ["Закон «всё или ничего»: высота импульса не зависит от силы стимула. Сила кодируется частотой импульсов.", "All or nothing: spike height doesn’t depend on stimulus strength. Strength is coded by spike frequency."] },
    { q: ["Где решается, будет ли импульс?", "Where is the fire-or-not decision made?"], o: [["В аксонном холмике", "Axon hillock"], ["В ядре", "Nucleus"], ["В терминали", "Terminal"], ["В миелине", "Myelin"]], why: ["В холмике больше всего Na⁺-каналов, поэтому порог здесь самый низкий.", "The hillock has the densest Na⁺ channels, so its threshold is lowest."] },
    { q: ["Зачем аксону миелин?", "Why does an axon need myelin?"], o: [["Ускоряет проведение импульса", "Speeds up conduction"], ["Питает нейрон", "Feeds the neuron"], ["Хранит память", "Stores memory"], ["Вырабатывает медиатор", "Makes transmitter"]], why: ["Импульс перескакивает между перехватами Ранвье — это сальтаторное проведение.", "The impulse jumps between nodes of Ranvier — saltatory conduction."] }
  ]
});
