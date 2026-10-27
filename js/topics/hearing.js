NA.register({
  id: "hearing", level: "systems",
  title: ["Слух", "Hearing"],
  sub: ["Как колебания воздуха становятся музыкой в голове", "How air vibrations become music in your head"],
  idea: ["Ухо превращает колебания воздуха в импульсы, а улитка заодно раскладывает звук по частотам: каждая точка мембраны отвечает своей ноте. Эта карта частот сохраняется до самой коры.", "The ear turns air vibration into impulses, and the cochlea sorts sound by frequency: each spot on its membrane answers one note. That frequency map is kept all the way to the cortex."],
  analogy: ["Улитка — пианино наоборот. У пианино каждая струна звучит своей нотой, а улитка слышит аккорд и разбирает его обратно на ноты.", "The cochlea is a piano in reverse. A piano plays one note per string; the cochlea hears a chord and splits it back into notes."],
  plays: [
    {
      title: ["Путь звука через ухо", "Sound’s journey through the ear"],
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 10 660 490" role="img" class="art-cell ear-art">
          <g class="art">${NA.art.ear}</g>
          <g class="ep hz" data-e="pinna"><ellipse cx="85" cy="255" rx="68" ry="215"/></g>
          <g class="ep hz" data-e="canal"><rect x="150" y="276" width="200" height="50" rx="10"/></g>
          <g class="ep hz" data-e="drum"><ellipse cx="373" cy="305" rx="16" ry="36"/></g>
          <g class="ep hz" data-e="oss"><rect x="340" y="205" width="110" height="68" rx="12"/></g>
          <g class="ep hz" data-e="canals"><ellipse cx="440" cy="196" rx="48" ry="52"/></g>
          <g class="ep hz" data-e="coch"><circle cx="495" cy="291" r="46"/></g>
          <g class="ep hz" data-e="nerve"><path d="M535,262 L640,238 L646,276 L540,302 Z"/></g>
          <g class="waves" opacity="0"><path class="wv" d="M0,-18 C8,-9 8,9 0,18"/><path class="wv" d="M-16,-18 C-8,-9 -8,9 -16,18"/><path class="wv" d="M-32,-18 C-24,-9 -24,9 -32,18"/></g>
          <ellipse class="glow drum" cx="373" cy="305" rx="12" ry="34"/><rect class="glow oss" x="345" y="212" width="100" height="56" rx="12"/><circle class="glow coch" cx="495" cy="291" r="42"/>
          <circle class="np2 pulse" cx="540" cy="282" r="8" opacity="0"/>
          <text class="lbl" x="150" y="372">${NA.t(["наружное ухо", "outer ear"])}</text><text class="lbl" x="250" y="200">${NA.t(["среднее ухо", "middle ear"])}</text><text class="lbl" x="470" y="380">${NA.t(["внутреннее ухо", "inner ear"])}</text><text class="lbl" x="560" y="225">${NA.t(["→ в мозг", "→ to brain"])}</text>
        </svg>
        <div class="row"><button class="btn go">${NA.t(["▶ Пустить звук в ухо", "▶ Send a sound in"])}</button><span class="tip">${NA.t(["или нажмите на часть уха", "or click a part of the ear"])}</span></div>
        <p class="caption cap"></p>
        <p class="credit tip">${NA.t(["Иллюстрация", "Illustration"])}: Lars Chittka, Axel Brockmann, <a href="https://commons.wikimedia.org/wiki/File:Anatomy_of_the_Human_Ear.svg" target="_blank" rel="noopener">CC BY 2.5</a></p></div>
        <article class="card info" aria-live="polite"></article></div>`,
      init(root) {
        const E = {
          pinna: [["Ушная раковина", "Pinna"], ["Ловит звук как воронка. Складки чуть меняют звук сверху и снизу — так мозг понимает высоту источника.", "A funnel for sound. Its folds colour sounds from above and below, so the brain can tell elevation."]],
          canal: [["Слуховой проход", "Ear canal"], ["Трубка около 2,5 см. Резонирует около 3 кГц и сама усиливает частоты речи.", "A 2.5 cm tube. It resonates near 3 kHz, boosting speech frequencies."]],
          drum: [["Барабанная перепонка", "Eardrum"], ["Тоньше бумаги (0,1 мм). Дрожит вместе с давлением воздуха.", "Thinner than paper (0.1 mm). It shakes with the air pressure."]],
          oss: [["Слуховые косточки", "Ossicles"], ["Молоточек, наковальня и стремечко. Усиливают давление примерно в 20 раз — иначе звук отразился бы от жидкости улитки.", "Malleus, incus, stapes. They boost pressure about 20× — otherwise sound would bounce off the cochlear fluid."]],
          coch: [["Улитка", "Cochlea"], ["Спираль из 2,75 витка с жидкостью. Здесь колебания становятся импульсами — смотрите следующий интерактив.", "A fluid-filled spiral of 2.75 turns. Vibration becomes impulses here — see the next demo."]],
          canals: [["Полукружные каналы", "Semicircular canals"], ["Это уже не слух, а равновесие — отдельная тема «Равновесие».", "Not hearing but balance — see the Balance topic."]],
          nerve: [["Слуховой нерв (VIII)", "Auditory nerve (VIII)"], ["Около 30 000 волокон. Каждое настроено на свою частоту.", "About 30,000 fibres, each tuned to its own frequency."]]
        };
        const info = root.querySelector(".info"), cap = root.querySelector(".cap"), parts = [...root.querySelectorAll(".ep")];
        const show = k => { parts.forEach(g => g.classList.toggle("active", g.dataset.e === k)); info.innerHTML = `<h3>${NA.t(E[k][0])}</h3><p>${NA.t(E[k][1])}</p>` };
        NA.clickable(parts, g => NA.t(E[g.dataset.e][0]), g => show(g.dataset.e));
        show("oss"); cap.textContent = NA.t(["Нажмите кнопку и следите за волной.", "Press the button and follow the wave."]);
        const stages = [["pinna", ["Волна влетает в слуховой проход…", "A wave enters the ear canal…"]], ["oss", ["…перепонка дрожит, косточки бьют в овальное окно…", "…the eardrum shakes, the ossicles hit the oval window…"]], ["coch", ["…в улитке бежит волна, волосковые клетки срабатывают…", "…a wave runs through the cochlea and hair cells fire…"]], ["nerve", ["…и нерв несёт импульсы в мозг. Меньше чем за 10 мс.", "…and the nerve carries impulses to the brain. Under 10 ms."]]];
        const q = s => root.querySelector("." + s), waves = q("waves"), drum = q("drum"), oss = q("oss"), coch = q("coch"), np = q("np2");
        let busy = false;
        q("go").onclick = () => {
          if (busy) return; busy = true; let stage = -1;
          try { NA.tone(440, .6, .08) } catch (e) {}
          const T = 3200, t0 = performance.now();
          (function frame(now) {
            if (!root.isConnected) return;
            const p = Math.min(1, (now - t0) / T), s = p < .35 ? 0 : p < .5 ? 1 : p < .75 ? 2 : 3;
            if (s !== stage) { stage = s; cap.textContent = NA.t(stages[s][1]); show(stages[s][0]) }
            if (!NA.still) {
              waves.setAttribute("opacity", p < .37 ? 1 : 0); waves.setAttribute("transform", `translate(${40 + Math.min(1, p / .35) * 318},301)`);
              const vib = p >= .35 && p < .55 ? Math.sin(now / 25) * 3 : 0;
              drum.style.opacity = oss.style.opacity = vib ? 1 : 0; drum.setAttribute("transform", `translate(${vib},0)`); oss.setAttribute("transform", `translate(${vib},0)`);
              coch.style.opacity = p >= .5 && p < .8 ? .5 + .5 * Math.sin(now / 90) : 0;
              const k = (p - .75) / .25; np.setAttribute("opacity", k > 0 && k < 1 ? 1 : 0); np.setAttribute("cx", 540 + Math.max(0, k) * 100); np.setAttribute("cy", 282 - Math.max(0, k) * 24);
            }
            if (p < 1) requestAnimationFrame(frame); else { busy = false; waves.setAttribute("opacity", 0); np.setAttribute("opacity", 0); coch.style.opacity = drum.style.opacity = oss.style.opacity = 0 }
          })(t0);
        };
      }
    },
    {
      title: ["Улитка: где звучит нота", "The cochlea: where each note lands"],
      html: () => `<div class="split"><div class="stage">
        <svg viewBox="0 0 640 200" role="img">
          <text class="lbl" x="60" y="30">${NA.t(["базилярная мембрана (улитка развёрнута)", "basilar membrane (cochlea unrolled)"])}</text>
          <path d="M60,104 L600,80 L600,140 L60,116 Z" fill="var(--tissue)" stroke="var(--tissue-edge)" stroke-width="1.5"/>
          <path class="wave" fill="none" stroke="var(--eosin)" stroke-width="2.5" stroke-linejoin="round"/>
          <line class="peak" y1="52" y2="160" stroke="var(--hema)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <g class="ticks"></g>
          <text class="lbl" x="60" y="192">${NA.t(["основание · узкое и жёсткое", "base · narrow and stiff"])}</text>
          <text class="lbl" x="600" y="52" text-anchor="end">${NA.t(["верхушка · широкая и мягкая", "apex · wide and floppy"])}</text>
        </svg>
        <div class="row"><label>${NA.t(["Частота", "Frequency"])}</label><input type="range" class="f" min="0" max="1000" value="566" style="flex:1;min-width:160px"><span class="score fv"></span></div>
        <div class="row"><button class="btn play">${NA.t(["▶ Послушать", "▶ Listen"])}</button><div class="seg pres" role="group"></div></div>
        <p class="tip note"></p></div>
        <article class="card"><h3>${NA.t(["Почему так?", "Why?"])}</h3><p>${NA.t(["У входа мембрана узкая и жёсткая, как короткая струна — тут отвечают высокие. К верхушке она шире и мягче — там низкие. Мозг узнаёт высоту по тому, <b>какие</b> волосковые клетки сработали.", "Near the entrance the membrane is narrow and stiff like a short string, so high notes peak there. Towards the apex it is wide and floppy, so low notes peak there. The brain reads pitch from <b>which</b> hair cells fired."])}</p>
        <div class="mnemo">${NA.t(["Основание «слышит» все звуки и изнашивается первым: с возрастом сначала пропадают высокие.", "The base “hears” every sound and wears out first: with age, high pitches go first."])}</div></article></div>`,
      init(root) {
        const q = s => root.querySelector("." + s), slider = q("f"), wave = q("wave"), peak = q("peak"), fv = q("fv"), note = q("note");
        const toF = v => 20 * Math.pow(1000, v / 1000), toV = f => Math.log(f / 20) / Math.log(1000) * 1000;
        /* функция Гринвуда: место на мембране (0 = верхушка, 1 = основание) */
        const toX = f => 600 - Math.min(1, Math.log10(f / 165.4 + .88) / 2.1) * 540;
        [20, 100, 500, 1000, 4000, 10000, 20000].forEach(f => {
          const x = toX(f); q("ticks").append(NA.svgEl("line", { x1: x, x2: x, y1: 150, y2: 158, stroke: "var(--tissue-edge)" }));
          const tx = NA.svgEl("text", { class: "lbl", x, y: 172, "text-anchor": "middle" }); tx.textContent = NA.fmtHz(f); q("ticks").append(tx);
        });
        const hint = f => NA.t(f < 250 ? ["Низкие: гул, бас. Волна бежит почти до верхушки.", "Low: rumble, bass. The wave runs almost to the apex."] : f < 2000 ? ["Средние: голос и гласные.", "Mid: voices and vowels."] : f < 5000 ? ["Самая чувствительная зона уха: согласные, плач ребёнка.", "The ear’s most sensitive zone: consonants, a baby’s cry."] : f < 12000 ? ["Высокие: «с», «ш». Громкий шум бьёт сюда первым, особенно около 4 кГц.", "High: “s”, “sh”. Loud noise damages this zone first, especially near 4 kHz."] : ["Очень высокие: многие взрослые их уже не слышат.", "Very high: many adults can no longer hear these."]);
        let phase = 0;
        function draw() {
          const f = toF(+slider.value), P = toX(f); let d = "";
          for (let x = 60; x <= 600; x += 2) {
            const env = x <= P ? .12 + .88 * Math.pow((x - 60) / (P - 59), 3) : Math.exp(-Math.pow((x - P) / 14, 2));
            const k = .05 + .3 * Math.min(1, (x - 60) / (P - 59));
            d += (d ? "L" : "M") + x + "," + (110 - 36 * env * Math.sin(phase + k * (x - 60))).toFixed(1);
          }
          wave.setAttribute("d", d); peak.setAttribute("x1", P); peak.setAttribute("x2", P);
          fv.textContent = NA.fmtHz(f); note.textContent = hint(f);
        }
        let busy = false;
        function play() {
          if (busy) return;
          try { NA.tone(toF(+slider.value)) } catch (e) { return }
          busy = true; const t0 = performance.now();
          (function tick(now) {
            if (!root.isConnected) return;
            if (!NA.still) { phase = -(now - t0) / 60; draw() }
            if (now - t0 < 1000) requestAnimationFrame(tick); else { busy = false; phase = 0; draw() }
          })(t0);
        }
        slider.oninput = draw; q("play").onclick = play;
        [[100, ["бас", "bass"]], [1000, ["голос", "voice"]], [4000, ["плач", "cry"]], [12000, ["шипение", "hiss"]]].forEach(([f, n]) => {
          const b = document.createElement("button"); b.textContent = NA.fmtHz(f) + " · " + NA.t(n);
          b.onclick = () => { slider.value = toV(f); draw(); play() }; q("pres").append(b);
        });
        draw();
      }
    },
    {
      title: ["Две игры: возраст ушей и «где звук?»", "Two games: ear age and “where is it?”"],
      html: () => `<div class="two">
        <article class="card"><h3>${NA.t(["Сколько лет вашим ушам?", "How old are your ears?"])}</h3>
          <p class="tip">${NA.t(["Тоны идут от 8 кГц вверх. Динамики ноутбука часто не играют выше 15–16 кГц, так что это игра, а не диагноз. Начните с тихой громкости.", "Tones climb from 8 kHz. Laptop speakers often stop at 15–16 kHz, so this is a game, not a diagnosis. Start quietly."])}</p>
          <div class="big hf"></div><div class="meter"><i class="hb"></i></div>
          <div class="row"><button class="btn hp">${NA.t(["▶ Сыграть", "▶ Play"])}</button><button class="btn ghost hy">${NA.t(["Слышу", "I hear it"])}</button><button class="btn ghost hn">${NA.t(["Не слышу", "Can’t hear"])}</button><button class="btn ghost hr">${NA.t(["Заново", "Restart"])}</button></div>
          <p class="caption hres" aria-live="polite"></p></article>
        <article class="card"><h3>${NA.t(["Где звук? Нужны наушники", "Where is it? Headphones needed"])}</h3>
          <p class="tip">${NA.t(["Щелчок приходит в одно ухо на 0,5 мс раньше. Громкость одинаковая — только время. Нейроны верхней оливы ловят эту разницу.", "The click reaches one ear 0.5 ms earlier. Same loudness, only timing. Neurons in the superior olive catch the gap."])}</p>
          <div class="row"><button class="btn lp">${NA.t(["▶ Щелчок", "▶ Click"])}</button><button class="btn ghost ll">${NA.t(["← Слева", "← Left"])}</button><button class="btn ghost lr">${NA.t(["Справа →", "Right →"])}</button></div>
          <p class="score ls"></p><p class="tip lf" aria-live="polite"></p>
          <b>${NA.t(["Сдвиньте задержку сами:", "Move the delay yourself:"])}</b>
          <div class="row"><input type="range" class="itd" min="-700" max="700" step="50" value="300" style="flex:1;min-width:140px"><button class="btn ghost ip">▶</button></div>
          <span class="score iv"></span></article></div>`,
      init(root) {
        const q = s => root.querySelector("." + s);
        const HT = [8000, 10000, 12000, 14000, 15000, 16000, 17000, 18000, 19000];
        let hi = 0, heard = 0, played = false, over = false;
        const age = f => NA.t(f >= 17000 ? ["до 25 лет", "under 25"] : f >= 16000 ? ["около 25–30", "about 25–30"] : f >= 15000 ? ["около 30–40", "about 30–40"] : f >= 14000 ? ["около 40–50", "about 40–50"] : f >= 12000 ? ["около 50–60", "about 50–60"] : ["за 60, или динамики не тянут", "60+, or your speakers can’t play it"]);
        function render() {
          q("hf").textContent = NA.fmtHz(HT[Math.min(hi, HT.length - 1)]); q("hb").style.width = hi / HT.length * 100 + "%";
          q("hy").disabled = q("hn").disabled = over || !played; q("hp").disabled = over;
          q("hres").innerHTML = !over ? "" : heard
            ? NA.t([`Самый высокий тон: <b>${NA.fmtHz(heard)}</b>. Ушам примерно <b>${age(heard)}</b>.`, `Highest tone heard: <b>${NA.fmtHz(heard)}</b>. Your ears sound <b>${age(heard)}</b>.`])
            : NA.t(["Не услышали даже 8 кГц. Проверьте громкость.", "Didn’t hear even 8 kHz. Check the volume."]);
        }
        q("hp").onclick = () => { try { NA.tone(HT[hi], 1.2, .1) } catch (e) { return } played = true; render() };
        q("hy").onclick = () => { heard = HT[hi]; hi++; played = false; over = hi >= HT.length; render() };
        q("hn").onclick = () => { played = false; over = true; render() };
        q("hr").onclick = () => { hi = 0; heard = 0; played = false; over = false; render() };
        render();
        let side = 0, ok = 0, tot = 0;
        const score = () => { q("ls").textContent = NA.t(["Верно ", "Correct "]) + ok + NA.t([" из ", " of "]) + tot };
        q("lp").onclick = () => { side = Math.random() < .5 ? -1 : 1; try { NA.clicks(side * 500) } catch (e) { return } q("lf").textContent = NA.t(["Где был звук?", "Where was it?"]) };
        const guess = s => {
          if (!side) return; tot++; const right = s === side; if (right) ok++;
          q("lf").textContent = right ? NA.t(["Верно! Олива сработала.", "Right! Your olive did its job."]) : NA.t(["Нет, с другой стороны. Без наушников почти невозможно.", "No, the other side. Nearly impossible without headphones."]);
          side = 0; score();
        };
        q("ll").onclick = () => guess(-1); q("lr").onclick = () => guess(1); score();
        const itd = q("itd"), iv = () => { const v = +itd.value; q("iv").textContent = v === 0 ? NA.t(["0 мкс — звук по центру", "0 µs — centred"]) : Math.abs(v) + NA.t([" мкс, раньше " + (v > 0 ? "правое" : "левое") + " ухо", " µs, " + (v > 0 ? "right" : "left") + " ear first"]) };
        itd.oninput = iv; iv(); q("ip").onclick = () => { try { NA.clicks(+itd.value) } catch (e) {} };
      }
    }
  ],
  path: {
    note: ["Мнемоника <b>E. COLI MA</b>: Eighth nerve, Cochlear nuclei, Olive, Lateral lemniscus, Inferior colliculus, MGB, Auditory cortex.", "Mnemonic <b>E. COLI MA</b>: Eighth nerve, Cochlear nuclei, Olive, Lateral lemniscus, Inferior colliculus, MGB, Auditory cortex."],
    branch: { at: 3, label: ["от другого уха", "from the other ear"] },
    steps: [
      { n: ["Улитка", "Cochlea"], d: ["Волосковые клетки превращают колебания в сигнал.", "Hair cells turn vibration into a signal."] },
      { n: ["VIII нерв", "VIII nerve"], d: ["E — Eighth nerve. Несёт сигнал в ствол мозга.", "E — Eighth nerve. Carries the signal into the brainstem."] },
      { n: ["Кохл. ядра", "Cochlear n."], d: ["C — Cochlear nuclei. До сюда — только своё ухо: поражение здесь даёт глухоту на одно ухо.", "C — Cochlear nuclei. Up to here, one ear only: damage here deafens that ear."] },
      { n: ["Олива", "Olive"], d: ["O — Superior olive. Первая встреча двух ушей: сравнение времени и громкости. Это игра «Где звук?».", "O — Superior olive. The two ears meet: timing and loudness compared. That is the “Where is it?” game."] },
      { n: ["Лат. петля", "Lat. lemn."], d: ["L — Lateral lemniscus. Пучок волокон вверх к среднему мозгу.", "L — Lateral lemniscus. A fibre bundle up to the midbrain."] },
      { n: ["Нижн. холмик", "Inf. coll."], d: ["I — Inferior colliculus. Поворачивает голову к резкому звуку раньше, чем вы его осознали.", "I — Inferior colliculus. Turns your head to a sudden noise before you are aware of it."] },
      { n: ["МКТ", "MGB"], d: ["M — Medial geniculate body, станция таламуса. Medial = Music, Lateral = Light.", "M — Medial geniculate body, the thalamic relay. Medial = Music, Lateral = Light."] },
      { n: ["A1", "A1"], d: ["A — Auditory cortex, извилины Гешля. Рядом зона Вернике, где звук становится словами.", "A — Auditory cortex, Heschl’s gyri. Next door, Wernicke’s area turns sound into words."] }
    ]
  },
  broken: [
    { n: ["Кондуктивная тугоухость", "Conductive hearing loss"], d: ["Звук не доходит до улитки: серная пробка, отит, сросшиеся косточки. Проба Вебера: камертон на темени звучит громче в больном ухе.", "Sound doesn’t reach the cochlea: wax, otitis, fused ossicles. Weber test: a tuning fork on the head sounds louder in the bad ear."] },
    { n: ["Нейросенсорная тугоухость", "Sensorineural hearing loss"], d: ["Гибнут волосковые клетки или нерв: громкий шум, возраст, некоторые антибиотики. Камертон громче в здоровом ухе. Клетки у человека не восстанавливаются.", "Hair cells or the nerve die: loud noise, age, some antibiotics. The fork is louder in the good ear. Human hair cells don’t regrow."] },
    { n: ["Поражение слуховой коры", "Auditory cortex damage"], d: ["Одна сторона — слух почти в норме (пути двусторонние), но хуже локализация. Справа — может пропасть узнавание мелодий (амузия).", "One side: hearing nearly normal (pathways are bilateral) but worse localisation. Right side: melodies may stop making sense (amusia)."] }
  ],
  quiz: [
    { q: ["Где на мембране улитки отвечают высокие звуки?", "Where on the cochlear membrane do high pitches peak?"], o: [["У основания, рядом с овальным окном", "At the base, by the oval window"], ["У верхушки", "At the apex"], ["По всей длине одинаково", "Equally along its length"], ["В полукружных каналах", "In the semicircular canals"]], why: ["Основание узкое и жёсткое, как короткая струна.", "The base is narrow and stiff, like a short string."] },
    { q: ["Где впервые встречаются сигналы от двух ушей?", "Where do the two ears’ signals first meet?"], o: [["В верхней оливе", "Superior olive"], ["В улитке", "Cochlea"], ["В коре", "Cortex"], ["В кохлеарных ядрах", "Cochlear nuclei"]], why: ["Олива сравнивает время и громкость — так мы находим источник звука.", "The olive compares timing and loudness — that is how we locate sound."] },
    { q: ["Почему инсульт в одной височной доле не вызывает глухоту на одно ухо?", "Why doesn’t a stroke in one temporal lobe deafen one ear?"], o: [["С оливы каждое ухо идёт в оба полушария", "From the olive, each ear projects to both hemispheres"], ["Слух вообще не в коре", "Hearing isn’t in the cortex"], ["Уши соединены нервом", "The ears are joined by a nerve"], ["Мозжечок заменяет кору", "The cerebellum takes over"]], why: ["Двусторонние пути — страховка слуха.", "Bilateral pathways insure hearing."] }
  ]
});
