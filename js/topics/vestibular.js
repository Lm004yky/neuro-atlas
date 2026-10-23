NA.register({
  id: "vestibular", level: "systems",
  title: ["Равновесие", "Balance"],
  sub: ["Вестибулярная система: внутреннее ухо как гироскоп", "The vestibular system: your inner-ear gyroscope"],
  idea: ["Рядом с улиткой лежат два датчика движения. Полукружные каналы чувствуют повороты головы, отолиты — наклон и ускорение. Мозг сверяет их с глазами и телом и держит взгляд и осанку.", "Next to the cochlea sit two motion sensors. Semicircular canals feel head turns, otoliths feel tilt and acceleration. The brain checks them against the eyes and body to keep gaze and posture steady."],
  analogy: ["Возьмите стакан с водой и резко поверните: стакан уже повернулся, а вода ещё на месте. Каналы чувствуют именно это отставание жидкости.", "Turn a glass of water sharply: the glass has turned but the water hasn’t yet. The canals sense exactly that lag of the fluid."],
  plays: [
    {
      title: ["Карусель: почему кружится голова", "Merry-go-round: why you get dizzy"],
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 0 640 250" role="img">
          <g class="ring"><circle cx="170" cy="125" r="80" fill="none" stroke="var(--tissue-2)" stroke-width="26"/><circle cx="170" cy="125" r="93" fill="none" stroke="var(--tissue-edge)" stroke-width="1.5"/><circle cx="170" cy="125" r="67" fill="none" stroke="var(--tissue-edge)" stroke-width="1.5"/>
            <path class="cup" d="M170,32 Q170,45 170,58" stroke="var(--eosin)" stroke-width="8" stroke-linecap="round" fill="none"/></g>
          <g class="fluid" fill="var(--hema)"></g>
          <text class="lbl" x="170" y="240" text-anchor="middle">${NA.t(["канал, вид сверху · розовое — купула", "canal, top view · pink = cupula"])}</text>
          <circle cx="470" cy="115" r="62" fill="var(--tissue)" stroke="var(--tissue-edge)" stroke-width="2"/>
          <circle cx="447" cy="105" r="13" fill="var(--surface)" stroke="var(--tissue-edge)"/><circle cx="493" cy="105" r="13" fill="var(--surface)" stroke="var(--tissue-edge)"/>
          <circle class="pl" cx="447" cy="105" r="6" fill="var(--ink)"/><circle class="pr" cx="493" cy="105" r="6" fill="var(--ink)"/>
          <path d="M450,145 Q470,155 490,145" stroke="var(--tissue-edge)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <text class="lbl" x="470" y="205" text-anchor="middle">${NA.t(["глаза", "eyes"])}</text>
        </svg>
        <div class="row"><button class="btn spin">${NA.t(["▶ Начать вращение", "▶ Start spinning"])}</button><button class="btn ghost stop">${NA.t(["■ Остановиться", "■ Stop"])}</button></div>
        <div class="meter"><i class="m" style="background:var(--eosin)"></i></div>
        <p class="caption feel" aria-live="polite"></p></div>
        <article class="card"><h3>${NA.t(["Что происходит?", "What’s going on?"])}</h3>
          <p>${NA.t(["Голова поворачивается — жидкость отстаёт и гнёт купулу, как ветер флажок. Через пару секунд жидкость догоняет, и чувство вращения пропадает. Остановились — жидкость ещё течёт и гнёт купулу в обратную сторону: мозгу кажется, что вы крутитесь назад.", "The head turns, the fluid lags and bends the cupula like wind bends a flag. After a few seconds the fluid catches up and the feeling fades. When you stop, the fluid keeps flowing and bends the cupula the other way, so the brain thinks you’re spinning backwards."])}</p>
          <div class="mnemo">${NA.t(["Каналы чувствуют не вращение, а его <b>изменение</b>: начало и конец.", "Canals sense not rotation but its <b>change</b>: start and stop."])}</div></article></div>`,
      init(root) {
        const q = s => root.querySelector("." + s), ring = q("ring"), cup = q("cup"), m = q("m"), feel = q("feel"), pl = q("pl"), pr = q("pr");
        const dots = [...Array(8)].map(() => { const c = NA.svgEl("circle", { r: 5 }); q("fluid").append(c); return c });
        const TAU = 3;
        let hv = 0, hAng = 0, fv = 0, fAng = 0, run = false, last = 0, msg = "";
        function draw() {
          const rel = hv - fv, c = Math.max(-1, Math.min(1, rel / 180));
          ring.setAttribute("transform", `rotate(${hAng} 170 125)`);
          dots.forEach((d, i) => { const a = (fAng + i * 45) * Math.PI / 180; d.setAttribute("cx", 170 + 80 * Math.cos(a)); d.setAttribute("cy", 125 + 80 * Math.sin(a)) });
          cup.setAttribute("d", `M170,32 Q${170 - c * 26},45 ${170 - c * 8},58`);
          pl.setAttribute("cx", 447 - c * 6); pr.setAttribute("cx", 493 - c * 6);
          m.style.width = Math.abs(c) * 100 + "%";
          const t = NA.t(Math.abs(rel) < 12
            ? (hv ? ["Жидкость догнала канал: мозг думает, что вы <b>стоите</b>, хотя вы всё ещё крутитесь!", "The fluid caught up: the brain thinks you’re <b>still</b>, though you’re spinning!"] : ["Всё спокойно. Нажмите «Начать вращение».", "All calm. Press “Start spinning”."])
            : (hv ? ["Жидкость отстаёт и гнёт купулу: мозг чувствует <b>вращение</b>.", "The fluid lags and bends the cupula: the brain feels <b>rotation</b>."] : ["Вы стоите, а жидкость ещё течёт: <b>мир кружится</b>, глаза дёргаются — это нистагм.", "You’ve stopped but the fluid flows on: <b>the world spins</b> and the eyes twitch — nystagmus."]));
          if (t !== msg) { msg = t; feel.innerHTML = t }
        }
        function loop(now) {
          if (!root.isConnected) return;
          const dt = Math.min(.05, (now - last) / 1000); last = now;
          hAng += hv * dt; fv += (hv - fv) * dt / TAU; fAng += fv * dt; draw();
          if (hv || Math.abs(hv - fv) > 1) requestAnimationFrame(loop); else { fv = hv; run = false; draw() }
        }
        const start = () => { if (run) return; run = true; last = performance.now(); requestAnimationFrame(loop) };
        q("spin").onclick = () => { hv = 180; start() };
        q("stop").onclick = () => { hv = 0; start() };
        draw();
      }
    },
    {
      title: ["Отолиты: камешки на желе", "Otoliths: pebbles on jelly"],
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 0 640 220" role="img">
          <line x1="60" y1="190" x2="580" y2="190" stroke="var(--line)" stroke-dasharray="6 4"/>
          <g class="oto"><rect x="-160" y="0" width="320" height="34" rx="6" fill="var(--tissue-2)" stroke="var(--tissue-edge)"/>
            <g class="hairs" stroke="var(--hema)" stroke-width="4" stroke-linecap="round"></g>
            <g class="gel"><rect x="-160" y="-46" width="320" height="16" rx="5" fill="var(--calm)" opacity=".45"/><g class="crys" fill="var(--myelin)"></g></g></g>
          <text class="lbl" x="60" y="210">${NA.t(["горизонт", "horizon"])}</text>
        </svg>
        <div class="row"><label>${NA.t(["Наклон головы", "Head tilt"])}</label><input type="range" class="tilt" min="-40" max="40" value="0" style="flex:1;min-width:160px"><span class="score tv"></span></div>
        <p class="tip note"></p></div>
        <article class="card"><h3>${NA.t(["Два отолитовых органа", "Two otolith organs"])}</h3>
          <p>${NA.t(["Утрикулус лежит горизонтально: ускорение машины, наклон вбок. Саккулус стоит вертикально: лифт, прыжок. Кристаллы карбоната кальция тяжелее желе, поэтому гравитация тянет их и гнёт волоски.", "The utricle lies flat: car acceleration, sideways tilt. The saccule stands upright: lifts, jumps. Calcium carbonate crystals are heavier than the jelly, so gravity drags them and bends the hairs."])}</p></article></div>`,
      init(root) {
        const q = s => root.querySelector("." + s), tilt = q("tilt");
        const hairs = [-130, -90, -50, -10, 30, 70, 110, 150].map(x => { const l = NA.svgEl("line", { x1: x - 10, y1: 0, x2: x - 10, y2: -30 }); q("hairs").append(l); return [l, x - 10] });
        for (let i = 0; i < 24; i++) q("crys").append(NA.svgEl("rect", { x: -152 + i * 13, y: -54 + (i % 3) * 2, width: 9, height: 7, rx: 2, transform: `rotate(${(i * 37) % 30 - 15} ${-148 + i * 13} -50)` }));
        function draw() {
          const a = +tilt.value, sh = Math.sin(a * Math.PI / 180) * 22;
          q("oto").setAttribute("transform", `translate(320,150) rotate(${a})`); q("gel").setAttribute("transform", `translate(${sh},0)`);
          hairs.forEach(([l, x]) => l.setAttribute("x2", x + sh));
          q("tv").textContent = a + "°";
          q("note").textContent = NA.t(a === 0 ? ["Голова прямо: желе ровно, волоски прямые.", "Head upright: jelly level, hairs straight."] : ["Желе с кристаллами сползает вниз и гнёт волоски. Мозг понимает: голова наклонена " + (a > 0 ? "вправо" : "влево") + ".", "The crystal-laden jelly slides downhill and bends the hairs. The brain reads: head tilted " + (a > 0 ? "right" : "left") + "."]);
        }
        tilt.oninput = draw; draw();
      }
    }
  ],
  path: {
    steps: [
      { n: ["Каналы, отолиты", "Canals, otoliths"], d: ["Волосковые клетки чувствуют поворот и наклон.", "Hair cells sense turning and tilt."] },
      { n: ["VIII нерв", "VIII nerve"], d: ["Вестибулярная часть того же нерва, что и слух.", "The vestibular branch of the same nerve as hearing."] },
      { n: ["Вестиб. ядра", "Vestib. nuclei"], d: ["Ядра в стволе мозга раздают сигнал сразу в несколько мест.", "Brainstem nuclei send the signal to several places at once."] },
      { n: ["Глаза", "Eyes"], d: ["Рефлекс VOR: голова повернулась влево — глаза сдвинулись вправо. Взгляд стоит на месте за 10 мс.", "VOR reflex: head turns left, eyes move right. Gaze stays put within 10 ms."] },
      { n: ["Спинной мозг", "Spinal cord"], d: ["Мышцы спины и ног выравнивают осанку, чтобы вы не упали.", "Back and leg muscles straighten posture so you don’t fall."] },
      { n: ["Мозжечок", "Cerebellum"], d: ["Калибрует рефлексы. Фигуристы тренируют его не кружиться после вращения.", "Calibrates the reflexes. Skaters train it to ignore dizziness after spins."] },
      { n: ["Таламус → кора", "Thalamus → cortex"], d: ["Осознанное чувство движения и положения тела в пространстве.", "The conscious sense of motion and where your body is in space."] }
    ]
  },
  broken: [
    { n: ["ДППГ", "BPPV"], d: ["Самое частое головокружение. Кристаллы отолитов попадают в канал: поворот в кровати — и мир крутится 10–30 секунд. Лечится манёвром Эпли.", "The commonest vertigo. Otolith crystals drift into a canal: roll over in bed and the world spins for 10–30 s. Treated with the Epley manoeuvre."] },
    { n: ["Укачивание", "Motion sickness"], d: ["Глаза говорят «стоим» (читаете в машине), ухо — «едем». Мозг видит конфликт и включает тошноту. Помогает смотреть на горизонт.", "Eyes say “still” (reading in a car), the ear says “moving”. The brain sees a conflict and triggers nausea. Looking at the horizon helps."] },
    { n: ["Вестибулярный неврит", "Vestibular neuritis"], d: ["Воспаление нерва с одной стороны: сильное головокружение на несколько дней, слух при этом в норме.", "One-sided nerve inflammation: severe vertigo for days, while hearing stays normal."] }
  ],
  quiz: [
    { q: ["Почему кружится голова сразу после остановки карусели?", "Why are you dizzy right after the ride stops?"], o: [["Жидкость в каналах ещё движется", "The canal fluid is still moving"], ["Отолиты выпали", "The otoliths fell out"], ["Устали глаза", "The eyes are tired"], ["Падает давление", "Blood pressure drops"]], why: ["Эндолимфа по инерции течёт дальше и гнёт купулу в обратную сторону.", "Endolymph keeps flowing by inertia and bends the cupula the other way."] },
    { q: ["Что чувствуют отолиты?", "What do the otoliths sense?"], o: [["Наклон и линейное ускорение", "Tilt and linear acceleration"], ["Вращение", "Rotation"], ["Звук", "Sound"], ["Боль", "Pain"]], why: ["Тяжёлые кристаллы тянет гравитация или инерция при разгоне.", "Heavy crystals are pulled by gravity or by inertia when you speed up."] },
    { q: ["Зачем нужен вестибуло-окулярный рефлекс?", "What is the vestibulo-ocular reflex for?"], o: [["Держит взгляд неподвижным при движении головы", "Keeps gaze steady when the head moves"], ["Фокусирует хрусталик", "Focuses the lens"], ["Сужает зрачок", "Narrows the pupil"], ["Закрывает веки", "Closes the eyelids"]], why: ["Без него при ходьбе мир прыгал бы перед глазами.", "Without it, the world would bounce as you walk."] }
  ]
});
