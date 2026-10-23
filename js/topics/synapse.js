NA.register({
  id: "synapse", level: "cell",
  title: ["Синапс", "Synapse"],
  sub: ["Как электрический сигнал становится химическим и обратно", "How an electrical signal turns chemical and back"],
  idea: ["Нейроны не касаются друг друга. Между ними щель в 20 нм. Импульс выбрасывает в неё молекулы-медиаторы, а соседний нейрон ловит их рецепторами. Почти все лекарства для мозга действуют именно здесь.", "Neurons don’t touch. There is a 20 nm gap between them. An impulse releases transmitter molecules into it, and the next neuron catches them with receptors. Almost every brain drug acts right here."],
  analogy: ["Как записка через пропасть: бросил (выброс), поймали (рецептор), записку надо убрать, иначе её будут читать вечно (обратный захват).", "Like a note thrown across a gap: thrown (release), caught (receptor), and then it must be cleared away, or it gets read forever (reuptake)."],
  plays: [
    {
      title: ["Синапс по шагам", "The synapse step by step"],
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 0 600 330" role="img">
          <path class="pre syn-el" d="M110,0 L110,120 C110,175 160,190 300,190 C440,190 490,175 490,120 L490,0 Z" fill="var(--tissue)" stroke="var(--hema)" stroke-width="3"/>
          <path class="post syn-el" d="M60,330 L60,250 C60,238 70,232 90,232 L510,232 C530,232 540,238 540,250 L540,330 Z" fill="var(--tissue-2)" stroke="var(--calm)" stroke-width="3"/>
          <rect x="150" y="170" width="16" height="22" rx="3" fill="var(--myelin)"/><rect x="434" y="170" width="16" height="22" rx="3" fill="var(--myelin)"/>
          <rect x="470" y="110" width="16" height="24" rx="3" fill="var(--hema)"/><text class="lbl" x="420" y="105">${NA.t(["транспортер", "transporter"])}</text>
          ${[190, 260, 330, 400].map(x => `<rect x="${x}" y="226" width="22" height="14" rx="3" fill="var(--calm)"/>`).join("")}
          <g class="ves syn-el">${[[240, 90], [300, 70], [360, 95]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="18" fill="var(--surface)" stroke="var(--eosin)" stroke-width="2"/><circle cx="${x - 5}" cy="${y - 4}" r="3" fill="var(--eosin)"/><circle cx="${x + 5}" cy="${y + 4}" r="3" fill="var(--eosin)"/>`).join("")}</g>
          <g class="ca syn-el" fill="var(--myelin)"><circle cx="158" cy="160" r="4"/><circle cx="170" cy="148" r="4"/><circle cx="148" cy="140" r="4"/><circle cx="442" cy="160" r="4"/><circle cx="430" cy="146" r="4"/><circle cx="452" cy="138" r="4"/><text class="lbl" x="120" y="128">Ca²⁺</text></g>
          <g class="nt syn-el" fill="var(--eosin)">${[201, 271, 341, 411].map(x => `<circle cx="${x}" cy="218" r="4"/>`).join("")}<circle cx="236" cy="208" r="4"/><circle cx="306" cy="210" r="4"/><circle cx="376" cy="206" r="4"/></g>
          <g class="ions syn-el" fill="var(--calm)"><text class="lbl" x="200" y="292">${NA.t(["Na⁺ входит → возбуждение", "Na⁺ enters → excitation"])}</text>${[201, 271, 341, 411].map((x, i) => `<circle cx="${x}" cy="${262 + (i % 2) * 6}" r="4"/>`).join("")}</g>
          <g class="back syn-el" fill="var(--eosin)"><circle cx="478" cy="150" r="4"/><circle cx="470" cy="168" r="4"/><circle cx="455" cy="200" r="4"/></g>
          <text class="lbl" x="220" y="30">${NA.t(["пресинаптическая терминаль", "presynaptic terminal"])}</text>
          <text class="lbl" x="255" y="214">${NA.t(["щель ~20 нм", "cleft ~20 nm"])}</text>
          <text class="lbl" x="210" y="320">${NA.t(["постсинаптический нейрон", "postsynaptic neuron"])}</text>
        </svg></div>
        <article class="card"><div class="steps"></div><p class="caption cap"></p><div class="row"><button class="btn ghost pv">${NA.t(["Назад", "Back"])}</button><button class="btn nx">${NA.t(["Дальше", "Next"])}</button></div></article></div>`,
      init(root) {
        const S = [
          { t: ["<b>Импульс</b> приходит в терминаль.", "<b>An impulse</b> reaches the terminal."], on: [] },
          { t: ["<b>Открываются Ca²⁺-каналы.</b> Кальций входит — это команда «выпустить медиатор».", "<b>Ca²⁺ channels open.</b> Calcium enters: the “release” command."], on: ["ca"] },
          { t: ["<b>Экзоцитоз.</b> Пузырьки сливаются с мембраной с помощью белков SNARE.", "<b>Exocytosis.</b> Vesicles fuse with the membrane using SNARE proteins."], on: ["ca"], move: true },
          { t: ["<b>Медиатор пересекает щель</b> и садится на рецепторы.", "<b>Transmitter crosses the cleft</b> and binds receptors."], on: ["nt"], move: true },
          { t: ["<b>Каналы открываются.</b> Na⁺ входит — возбуждение. Если входит Cl⁻ (ГАМК) — торможение.", "<b>Channels open.</b> Na⁺ in means excitation; Cl⁻ in (GABA) means inhibition."], on: ["nt", "ions"], move: true },
          { t: ["<b>Уборка.</b> Медиатор захватывается обратно транспортером или расщепляется ферментом.", "<b>Clean-up.</b> Transmitter is taken back up by a transporter or broken down by an enzyme."], on: ["back"] }
        ];
        const steps = root.querySelector(".steps"), cap = root.querySelector(".cap"), q = s => root.querySelector("." + s);
        let st = 0;
        S.forEach((_, i) => { const b = document.createElement("button"); b.textContent = i + 1; b.onclick = () => go(i); steps.append(b) });
        function go(i) {
          st = Math.max(0, Math.min(S.length - 1, i)); const s = S[st];
          [...steps.children].forEach((b, j) => b.setAttribute("aria-current", j === st));
          cap.innerHTML = NA.t(s.t);
          ["ca", "nt", "ions", "back"].forEach(k => q(k).style.opacity = s.on.includes(k) ? 1 : 0);
          q("ves").style.transform = s.move ? "translateY(80px)" : "none"; q("ves").style.opacity = st >= 3 ? .35 : 1;
          q("pre").style.fill = st === 0 ? "color-mix(in srgb,var(--myelin) 30%,var(--tissue))" : "var(--tissue)";
          q("post").style.fill = st === 4 ? "color-mix(in srgb,var(--calm) 30%,var(--tissue-2))" : "var(--tissue-2)";
        }
        q("pv").onclick = () => go(st - 1); q("nx").onclick = () => go(st + 1); go(0);
      }
    },
    {
      title: ["Аптечка: что вещества делают с синапсом", "Pharmacy: what drugs do to a synapse"],
      html: () => `<div class="split"><div class="stage">
        <div class="seg drugs" role="group"></div>
        <svg viewBox="0 0 600 170" role="img">
          <text class="lbl" x="20" y="30">${NA.t(["медиатор в щели", "transmitter in cleft"])}</text>
          <rect x="20" y="40" width="560" height="22" rx="11" fill="var(--bg)" stroke="var(--line)"/><rect class="b1" x="20" y="40" height="22" rx="11" fill="var(--eosin)" style="transition:width .4s var(--ease-out)"/>
          <text class="lbl" x="20" y="100">${NA.t(["ответ следующего нейрона", "response of the next neuron"])}</text>
          <rect x="20" y="110" width="560" height="22" rx="11" fill="var(--bg)" stroke="var(--line)"/><rect class="b2" x="20" y="110" height="22" rx="11" fill="var(--calm)" style="transition:width .4s var(--ease-out)"/>
          <line x1="300" x2="300" y1="34" y2="140" stroke="var(--tissue-edge)" stroke-dasharray="3 3"/><text class="lbl" x="300" y="160" text-anchor="middle">${NA.t(["норма", "normal"])}</text>
        </svg></div>
        <article class="card"><h3 class="dn"></h3><p class="dd"></p></article></div>`,
      init(root) {
        const D = [
          { n: ["Без вещества", "No drug"], a: .5, r: .5, d: ["Обычная работа: медиатор вышел, подействовал и убран.", "Normal: transmitter released, acts, cleared."] },
          { n: ["СИОЗС", "SSRI"], a: .8, r: .72, d: ["Антидепрессанты (флуоксетин) блокируют обратный захват серотонина. Медиатор дольше остаётся в щели.", "Antidepressants (fluoxetine) block serotonin reuptake, so transmitter stays in the cleft longer."] },
          { n: ["Ботокс", "Botox"], a: .03, r: .02, d: ["Ботулотоксин режет белки SNARE: пузырьки не сливаются, ацетилхолин не выходит, мышца расслаблена.", "Botulinum toxin cuts SNARE proteins: vesicles can’t fuse, no acetylcholine, the muscle relaxes."] },
          { n: ["Кураре", "Curare"], a: .5, r: .03, d: ["Яд для стрел садится на рецепторы ацетилхолина и закрывает их. Медиатор есть, а ответа нет — паралич.", "The arrow poison blocks acetylcholine receptors. Transmitter is there, but no response — paralysis."] },
          { n: ["Никотин", "Nicotine"], a: .5, r: .8, d: ["Похож на ацетилхолин и сам включает его рецепторы — агонист.", "Mimics acetylcholine and switches its receptors on by itself — an agonist."] },
          { n: ["Зарин", "Sarin"], a: .97, r: .97, d: ["Блокирует фермент ацетилхолинэстеразу. Медиатор не убирается, мышцы сводит судорогой.", "Blocks the enzyme acetylcholinesterase. Transmitter isn’t cleared, muscles seize."] }
        ];
        const seg = root.querySelector(".drugs"), b1 = root.querySelector(".b1"), b2 = root.querySelector(".b2");
        const pick = i => {
          [...seg.children].forEach((b, j) => b.setAttribute("aria-pressed", j === i));
          b1.setAttribute("width", 560 * D[i].a); b2.setAttribute("width", 560 * D[i].r);
          root.querySelector(".dn").textContent = NA.t(D[i].n); root.querySelector(".dd").textContent = NA.t(D[i].d);
        };
        D.forEach((x, i) => { const b = document.createElement("button"); b.textContent = NA.t(x.n); b.onclick = () => pick(i); seg.append(b) });
        pick(0);
      }
    }
  ],
  path: {
    steps: [
      { n: ["Импульс", "Impulse"], d: ["Электрический сигнал дошёл до конца аксона.", "The electrical signal reaches the end of the axon."] },
      { n: ["Ca²⁺", "Ca²⁺"], d: ["Кальций входит в терминаль.", "Calcium enters the terminal."] },
      { n: ["Выброс", "Release"], d: ["Пузырьки выпускают медиатор в щель.", "Vesicles release transmitter into the cleft."] },
      { n: ["Рецептор", "Receptor"], d: ["Медиатор садится на рецептор соседа.", "Transmitter binds the neighbour’s receptor."] },
      { n: ["Ответ", "Response"], d: ["У соседа меняется напряжение: возбуждение или торможение.", "The neighbour’s voltage shifts: excitation or inhibition."] },
      { n: ["Уборка", "Clean-up"], d: ["Обратный захват или фермент. Синапс готов к следующему сигналу.", "Reuptake or an enzyme. The synapse is ready for the next signal."] }
    ]
  },
  broken: [
    { n: ["Миастения", "Myasthenia gravis"], d: ["Антитела разрушают рецепторы ацетилхолина на мышцах. К вечеру опускаются веки и устают мышцы.", "Antibodies destroy acetylcholine receptors on muscle. By evening the eyelids droop and muscles tire."] },
    { n: ["Болезнь Паркинсона", "Parkinson’s disease"], d: ["Гибнут нейроны, выделяющие дофамин. Дают L-ДОФА: сам дофамин не проходит в мозг, а его предшественник проходит.", "Dopamine neurons die. Patients get L-DOPA: dopamine can’t enter the brain, its precursor can."] },
    { n: ["Депрессия", "Depression"], d: ["Связана с нарушением серотониновой и других систем. СИОЗС усиливают серотониновый сигнал.", "Linked to disturbed serotonin and other systems. SSRIs boost the serotonin signal."] }
  ],
  quiz: [
    { q: ["Какой ион запускает выброс медиатора?", "Which ion triggers transmitter release?"], o: [["Ca²⁺", "Ca²⁺"], ["Na⁺", "Na⁺"], ["K⁺", "K⁺"], ["Cl⁻", "Cl⁻"]], why: ["Кальций входит через потенциалзависимые каналы и запускает слияние пузырьков.", "Calcium enters through voltage-gated channels and triggers vesicle fusion."] },
    { q: ["Как работают антидепрессанты СИОЗС?", "How do SSRI antidepressants work?"], o: [["Блокируют обратный захват серотонина", "Block serotonin reuptake"], ["Разрушают серотонин", "Destroy serotonin"], ["Блокируют рецепторы серотонина", "Block serotonin receptors"], ["Режут белки SNARE", "Cut SNARE proteins"]], why: ["Серотонин дольше остаётся в щели и сильнее действует.", "Serotonin stays in the cleft longer and acts more strongly."] },
    { q: ["ГАМК открывает Cl⁻-каналы. Что получит следующий нейрон?", "GABA opens Cl⁻ channels. What does the next neuron get?"], o: [["Торможение", "Inhibition"], ["Возбуждение", "Excitation"], ["Новый миелин", "New myelin"], ["Ничего", "Nothing"]], why: ["Cl⁻ отодвигает мембрану от порога — нейрону труднее выстрелить.", "Cl⁻ moves the membrane away from threshold, so firing is harder."] }
  ]
});
