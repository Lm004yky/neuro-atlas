/* Атлас: карта областей мозга. Данные областей — объект R, SVG — SURF (кора) и DEEP (глубокие структуры). */
(() => {
const t = NA.t;
const R = {
  frontal:{n:["Лобная доля","Frontal lobe"],l:"Lobus frontalis",f:["Планирование, принятие решений, контроль импульсов, рабочая память, личность. Префронтальная кора созревает последней, примерно к 25 годам.","Planning, decisions, impulse control, working memory, personality. The prefrontal cortex matures last, around age 25."],d:["Расторможенность, апатия, изменение личности. Классический случай: Финеас Гейдж, 1848 год, металлический лом прошёл через лобную долю.","Disinhibition, apathy, personality change. Classic case: Phineas Gage, 1848, an iron rod went through his frontal lobe."],m:["Лоб = директор: решает, тормозит, планирует.","Frontal = the CEO: decides, brakes, plans."],q:["Почему после травмы лба человек может стать грубым и импульсивным?","Why can a frontal injury make someone rude and impulsive?"],a:["Нарушен тормозной контроль префронтальной коры.","The prefrontal cortex loses its braking control."]},
  parietal:{n:["Теменная доля","Parietal lobe"],l:"Lobus parietalis",f:["Объединяет ощущения тела, пространственную ориентацию, внимание, счёт.","Combines body sensations, spatial orientation, attention, arithmetic."],d:["При поражении правой доли — игнорирование левой половины пространства (неглект). При поражении левой — синдром Герстмана: нарушены счёт и письмо, человек путает право и лево.","Right-side damage: ignoring the left half of space (neglect). Left-side damage: Gerstmann syndrome — trouble with arithmetic and writing, left–right confusion."],m:["Темя = GPS: карта тела и пространства.","Parietal = GPS: a map of body and space."],q:["Что такое неглект?","What is neglect?"],a:["Человек не замечает половину пространства (обычно левую) при поражении правой теменной доли.","The person ignores half of space (usually the left) after right parietal damage."]},
  occipital:{n:["Затылочная доля","Occipital lobe"],l:"Lobus occipitalis",f:["Обработка зрения: первичная зрительная кора (V1) и зрительные ассоциативные зоны.","Vision: primary visual cortex (V1) and visual association areas."],d:["Корковая слепота, выпадение половины поля зрения (гемианопсия), зрительные агнозии.","Cortical blindness, loss of half the visual field (hemianopia), visual agnosias."],m:["Глаза спереди, а видим затылком.","Eyes in front, but we see with the back of the head."],q:["Где находится первичная зрительная кора?","Where is the primary visual cortex?"],a:["В затылочной доле, по краям шпорной борозды (поле 17).","In the occipital lobe, along the calcarine sulcus (area 17)."]},
  temporal:{n:["Височная доля","Temporal lobe"],l:"Lobus temporalis",f:["Слух, понимание речи, узнавание лиц и предметов, память (внутри неё лежит гиппокамп).","Hearing, language comprehension, recognising faces and objects, memory (the hippocampus sits inside)."],d:["Нарушение понимания речи, прозопагнозия (человек не узнаёт лица), нарушения памяти, височная эпилепсия.","Impaired comprehension, prosopagnosia (can’t recognise faces), memory problems, temporal lobe epilepsy."],m:["Висок рядом с ухом, значит слух.","Temple next to the ear, so hearing."],q:["Как называется неспособность узнавать лица?","What is the inability to recognise faces called?"],a:["Прозопагнозия, нарушена веретенообразная извилина.","Prosopagnosia, from damage to the fusiform gyrus."]},
  cerebellum:{n:["Мозжечок","Cerebellum"],l:"Cerebellum",f:["Координация, равновесие, точность и плавность движений, моторное обучение. Содержит больше половины всех нейронов мозга.","Coordination, balance, smooth and precise movement, motor learning. Holds over half of all brain neurons."],d:["Атаксия (шаткая походка), интенционный тремор (дрожь при приближении к цели), нистагм, смазанная речь.","Ataxia (unsteady gait), intention tremor (shaking near the target), nystagmus, slurred speech."],m:["Мозжечок = тренер: не начинает движение, а шлифует его.","Cerebellum = the coach: it doesn’t start a movement, it polishes it."],q:["Какой тест врач делает, чтобы проверить мозжечок?","Which bedside test checks the cerebellum?"],a:["Пальценосовую пробу: при поражении появляется интенционный тремор.","Finger-to-nose test: damage shows as intention tremor."]},
  brainstem:{n:["Ствол мозга","Brainstem"],l:"Truncus encephali",f:["Средний мозг, мост и продолговатый мозг. Отвечает за дыхание, сердцебиение и бодрствование. Здесь ядра черепных нервов III–XII.","Midbrain, pons and medulla. Controls breathing, heartbeat and wakefulness. Home to cranial nerve nuclei III–XII."],d:["Кома, остановка дыхания. Перекрёстные синдромы: черепной нерв нарушен на стороне очага, а слабость на противоположной стороне тела.","Coma, respiratory arrest. Crossed syndromes: cranial nerve deficit on the lesion side, weakness on the opposite side of the body."],m:["Ствол = системы жизнеобеспечения.","Brainstem = life support."],q:["Почему поражение продолговатого мозга опасно для жизни?","Why is damage to the medulla life-threatening?"],a:["Там находятся центры дыхания и кровообращения.","It holds the breathing and circulation centres."]},
  motor:{n:["Первичная моторная кора","Primary motor cortex"],l:"Gyrus precentralis · area 4",f:["Запускает произвольные движения. Работает перекрёстно: левое полушарие управляет правой половиной тела. Тело представлено на коре в виде моторного гомункулуса.","Launches voluntary movement. Crossed: the left hemisphere moves the right side. The body is mapped as the motor homunculus."],d:["Слабость или паралич противоположной стороны тела (гемипарез).","Weakness or paralysis of the opposite side (hemiparesis)."],m:["ПРЕцентральная = ПРиказывает мышцам.","PREcentral = PREpares movement."],q:["Почему у моторного гомункулуса огромные руки и губы?","Why does the motor homunculus have huge hands and lips?"],a:["Им нужен самый точный контроль, поэтому им отведено больше коры.","They need the finest control, so they get more cortex."]},
  sensory:{n:["Соматосенсорная кора","Somatosensory cortex"],l:"Gyrus postcentralis · areas 3, 1, 2",f:["Принимает осязание, боль, температуру и ощущение положения тела. Тоже работает перекрёстно, есть сенсорный гомункулус.","Receives touch, pain, temperature and body position. Also crossed, with a sensory homunculus."],d:["Онемение и потеря чувствительности на противоположной стороне тела.","Numbness and loss of sensation on the opposite side."],m:["ПОСТцентральная = ПОСТупают ощущения.","POSTcentral = the POST office for sensations."],q:["Какая извилина находится сразу за центральной бороздой?","Which gyrus lies just behind the central sulcus?"],a:["Постцентральная, это соматосенсорная кора.","The postcentral gyrus, the somatosensory cortex."]},
  broca:{n:["Зона Брока","Broca’s area"],l:"Areas 44, 45 · left inferior frontal gyrus",f:["Производство речи: грамматика и артикуляция.","Speech production: grammar and articulation."],d:["Афазия Брока: человек понимает речь, но говорит медленно, с трудом, «телеграфным стилем». Он осознаёт свою ошибку.","Broca’s aphasia: understands speech but talks slowly and effortfully, in “telegram style”. Aware of the errors."],m:["Брока — бормочет с трудом, но понимает.","Broca = broken speech, but understands."],q:["Пациент понимает вопросы, но отвечает «Я… магазин… хлеб». Какая это афазия?","A patient understands questions but answers “I… shop… bread”. Which aphasia?"],a:["Афазия Брока (моторная, экспрессивная).","Broca’s (expressive) aphasia."]},
  wernicke:{n:["Зона Вернике","Wernicke’s area"],l:"Area 22 · left superior temporal gyrus",f:["Понимание речи.","Understanding speech."],d:["Афазия Вернике: речь беглая, но бессмысленная («словесный салат»). Человек плохо понимает других и не замечает своих ошибок.","Wernicke’s aphasia: fluent but meaningless speech (“word salad”). Poor comprehension, unaware of errors."],m:["Вернике — Вообще не понимает, но говорит много.","Wernicke = wordy but wrong."],q:["Чем отличается речь при афазии Вернике от афазии Брока?","How does Wernicke’s aphasia differ from Broca’s?"],a:["При Вернике речь беглая, но бессмысленная, понимание нарушено. При Брока понимание сохранено, а речь затруднена.","Wernicke’s: fluent nonsense, poor comprehension. Broca’s: comprehension intact, speech laboured."]},
  auditory:{n:["Первичная слуховая кора (A1)","Primary auditory cortex (A1)"],l:"Areas 41, 42 · Heschl’s gyri",f:["Лежит на верхней поверхности височной доли. Хранит карту частот, как в улитке. Получает сигналы от обоих ушей.","Sits on the upper surface of the temporal lobe. Keeps a frequency map, just like the cochlea. Gets input from both ears."],d:["Одностороннее поражение почти не снижает слух, но ухудшает локализацию звука. Двустороннее даёт корковую глухоту. Поражение справа может вызвать амузию: человек перестаёт узнавать мелодии.","One-sided damage barely reduces hearing but worsens sound localisation. Both sides: cortical deafness. Right-side damage can cause amusia — melodies stop making sense."],m:["Гешль слышит: поля 41–42 прямо над ухом.","Heschl hears: areas 41–42 right above the ear."],q:["Почему инсульт в одной височной доле не вызывает глухоту на одно ухо?","Why doesn’t a stroke in one temporal lobe cause deafness in one ear?"],a:["Начиная с верхней оливы, каждое ухо проецируется в оба полушария.","From the superior olive on, each ear projects to both hemispheres."]},
  visual:{n:["Первичная зрительная кора (V1)","Primary visual cortex (V1)"],l:"Area 17 · calcarine sulcus",f:["Первое корковое звено зрения: края, ориентация линий, контраст. Правое поле зрения обрабатывается в левом полушарии.","First cortical stage of vision: edges, line orientation, contrast. The right visual field is processed on the left."],d:["Выпадение противоположной половины поля зрения. При поражении обеих сторон — корковая слепота.","Loss of the opposite half of the visual field. Both sides: cortical blindness."],m:["V1 = Video 1: первый экран для картинки с глаз.","V1 = Video 1: the first screen for the eyes’ picture."],q:["Куда идёт сигнал от сетчатки до V1?","What is the route from retina to V1?"],a:["Сетчатка → зрительный нерв → перекрест → латеральное коленчатое тело таламуса → V1.","Retina → optic nerve → chiasm → lateral geniculate nucleus of the thalamus → V1."]},
  thalamus:{n:["Таламус","Thalamus"],l:"Thalamus",f:["Ретранслятор: передаёт в кору почти все ощущения, кроме обоняния. Регулирует внимание и сон.","The relay: passes almost every sense to the cortex except smell. Regulates attention and sleep."],d:["Таламический синдром: потеря чувствительности, затем сильная спонтанная боль.","Thalamic syndrome: loss of sensation, then severe spontaneous pain."],m:["Таламус = секретарь коры: всё входящее идёт через него (кроме запахов).","Thalamus = the cortex’s secretary: all incoming mail goes through it (except smells)."],q:["Какое чувство идёт в кору в обход таламуса?","Which sense bypasses the thalamus?"],a:["Обоняние.","Smell."]},
  hypothalamus:{n:["Гипоталамус","Hypothalamus"],l:"Hypothalamus",f:["Гомеостаз: голод, жажда, температура, суточные ритмы, гормоны (управляет гипофизом).","Homeostasis: hunger, thirst, temperature, daily rhythms, hormones (controls the pituitary)."],d:["Нарушения аппетита, температуры, сна, гормональные расстройства (несахарный диабет).","Problems with appetite, temperature, sleep; hormone disorders (diabetes insipidus)."],m:["Гипоталамус = термостат и холодильник тела.","Hypothalamus = the body’s thermostat and fridge."],q:["Какой железой управляет гипоталамус?","Which gland does the hypothalamus control?"],a:["Гипофизом, через рилизинг-гормоны и напрямую (окситоцин, АДГ).","The pituitary, via releasing hormones and directly (oxytocin, ADH)."]},
  hippocampus:{n:["Гиппокамп","Hippocampus"],l:"Hippocampus",f:["Формирует новые воспоминания о фактах и событиях и пространственную память.","Forms new memories of facts and events, and spatial memory."],d:["Антероградная амнезия: человек не может запоминать новое. Пациент Г. М. (1953) после удаления гиппокампов. Одна из первых зон, поражаемых при болезни Альцгеймера.","Anterograde amnesia: can’t form new memories. Patient H.M. (1953) after removal of both hippocampi. One of the first areas hit by Alzheimer’s."],m:["Гиппокамп = морской конёк, который «сохраняет» день. Ночью во сне он передаёт память в кору.","Hippocampus = the seahorse that “saves” your day, then uploads it to the cortex during sleep."],q:["Что не мог делать пациент Г. М.?","What couldn’t patient H.M. do?"],a:["Формировать новые долговременные воспоминания о фактах и событиях. Моторные навыки он осваивал.","Form new long-term memories of facts and events. He could still learn motor skills."]},
  amygdala:{n:["Миндалевидное тело","Amygdala"],l:"Corpus amygdaloideum",f:["Страх, оценка угрозы, эмоциональная окраска воспоминаний.","Fear, threat detection, emotional colouring of memories."],d:["Отсутствие страха (болезнь Урбаха–Вите). При двустороннем удалении вместе с височными долями — синдром Клювера–Бьюси.","No fear (Urbach–Wiethe disease). Bilateral removal with the temporal lobes: Klüver–Bucy syndrome."],m:["Миндалина = сигнализация: «Опасно!».","Amygdala = the alarm: “Danger!”"],q:["Почему эмоциональные события запоминаются лучше?","Why are emotional events remembered better?"],a:["Миндалина усиливает работу гиппокампа при эмоциях.","The amygdala boosts the hippocampus during emotion."]},
  striatum:{n:["Базальные ганглии (стриатум)","Basal ganglia (striatum)"],l:"Nucleus caudatus + putamen",f:["Выбор и запуск движений, торможение лишних движений, привычки, система награды.","Selecting and starting movements, suppressing unwanted ones, habits, reward."],d:["Болезнь Хантингтона: непроизвольные движения (хорея). Болезнь Паркинсона: стриатум не получает дофамин.","Huntington’s: involuntary movements (chorea). Parkinson’s: the striatum is starved of dopamine."],m:["Базальные ганглии = вышибала: пропускает нужное движение и не пускает лишнее.","Basal ganglia = the bouncer: lets the right movement in, keeps the rest out."],q:["Какие два пути проходят через базальные ганглии?","Which two pathways run through the basal ganglia?"],a:["Прямой (облегчает движение) и непрямой (тормозит его).","Direct (facilitates movement) and indirect (suppresses it)."]},
  nigra:{n:["Чёрная субстанция","Substantia nigra"],l:"Substantia nigra",f:["Дофаминовые нейроны, которые посылают дофамин в стриатум. Тёмная из-за нейромеланина.","Dopamine neurons projecting to the striatum. Dark because of neuromelanin."],d:["Болезнь Паркинсона: гибель 60–80% нейронов. Тремор покоя, ригидность, замедленность движений.","Parkinson’s: 60–80% of neurons lost. Resting tremor, rigidity, slowness."],m:["Чёрная гаснет → Паркинсон.","Black goes dark → Parkinson’s."],q:["Почему при Паркинсоне дают L-ДОФА, а не дофамин?","Why give L-DOPA rather than dopamine in Parkinson’s?"],a:["Дофамин не проходит гематоэнцефалический барьер, а L-ДОФА проходит.","Dopamine can’t cross the blood–brain barrier; L-DOPA can."]},
  callosum:{n:["Мозолистое тело","Corpus callosum"],l:"Corpus callosum",f:["Около 200 млн аксонов, соединяющих левое и правое полушария.","About 200 million axons linking the left and right hemispheres."],d:["Синдром «расщеплённого мозга»: предмет в левой руке человек не может назвать, потому что речь в левом полушарии.","Split-brain: can’t name an object held in the left hand, because speech lives on the left."],m:["Мозолистое тело = мост между полушариями.","Corpus callosum = the bridge between hemispheres."],q:["Почему пациент с рассечённым мозолистым телом не называет предмет в левой руке?","Why can’t a split-brain patient name an object in the left hand?"],a:["Сигнал от левой руки идёт в правое полушарие, а речь в левом. Связи между ними нет.","The left hand reports to the right hemisphere, speech is on the left, and the bridge is cut."]}
};

const LB={lAmyg:["миндалина","amygdala"],lStem:["ствол","brainstem"],lParietal:["теменная","parietal"],lStri:["стриатум","striatum"],lThal:["таламус","thalamus"],lOccipital:["затылочная","occipital"],lTemporal:["височная","temporal"],lHypo:["гипоталамус","hypothalamus"],lCereb:["мозжечок","cerebellum"],lFrontal:["лобная","frontal"],lHippo:["гиппокамп","hippocampus"],lNigra:["чёрная субстанция","substantia nigra"],lCallosum:["мозолистое тело","corpus callosum"]};
const SURF = () => `<g class="surface">
          <path class="part lobe" data-id="brainstem" style="fill:var(--tissue-2)" d="M330,300 C345,298 370,298 386,302 L378,398 C365,404 350,404 340,398 Z"/>
          <path class="part lobe" data-id="cerebellum" style="fill:var(--tissue-2)" d="M392,292 C418,262 500,260 522,284 C538,312 512,348 470,350 C428,352 392,330 392,292 Z"/>
          <path class="gyri" d="M405,300 C440,285 490,282 515,295 M402,315 C440,302 495,302 520,312 M410,330 C445,322 490,322 510,330"/>
          <path class="part lobe" data-id="frontal" style="fill:var(--tissue)" d="M75,235 C45,170 80,85 175,62 C215,53 255,52 285,58 L245,205 C200,212 150,222 120,240 C100,245 85,243 75,235 Z"/>
          <path class="part lobe" data-id="parietal" style="fill:var(--tissue)" d="M285,58 C350,58 410,75 445,105 L425,205 C370,200 300,200 245,205 Z"/>
          <path class="part lobe" data-id="occipital" style="fill:var(--tissue)" d="M445,105 C500,135 535,190 520,245 C505,265 470,262 440,250 L425,205 Z"/>
          <path class="part lobe" data-id="temporal" style="fill:var(--tissue)" d="M120,240 C150,222 200,212 245,205 C300,200 370,200 425,205 L440,250 C430,285 380,305 320,305 C240,305 160,295 130,275 C115,265 112,250 120,240 Z"/>
          <path class="gyri" d="M100,150 C140,140 180,150 215,135 M95,195 C140,185 180,195 225,180 M150,95 C170,120 200,110 240,100 M320,95 C350,110 380,100 415,120 M310,150 C350,140 380,160 420,150 M460,150 C480,175 500,190 510,215 M160,265 C220,255 300,262 400,250 M180,285 C250,280 330,288 410,275"/>
          <path class="part strip" data-id="motor" style="stroke:var(--hema)" d="M271,64 C262,110 248,160 234,202"/>
          <path class="part strip" data-id="sensory" style="stroke:var(--calm)" d="M298,66 C290,110 274,160 258,202"/>
          <ellipse class="part spot" data-id="broca" style="fill:var(--myelin);stroke:var(--myelin)" cx="180" cy="200" rx="26" ry="16"/>
          <ellipse class="part spot" data-id="wernicke" style="fill:var(--myelin);stroke:var(--myelin)" cx="372" cy="222" rx="26" ry="15"/>
          <ellipse class="part spot" data-id="auditory" style="fill:var(--calm);stroke:var(--calm)" cx="300" cy="216" rx="22" ry="10"/>
          <ellipse class="part spot" data-id="visual" style="fill:var(--eosin);stroke:var(--eosin)" cx="505" cy="215" rx="16" ry="28"/>
          <text class="lbl" x="120" y="130" >${L("lFrontal")}</text><text class="lbl" x="335" y="125" >${L("lParietal")}</text>
          <text class="lbl" x="455" y="170" >${L("lOccipital")}</text><text class="lbl" x="230" y="275" >${L("lTemporal")}</text>
          <text class="lbl" x="445" y="318" >${L("lCereb")}</text><text class="lbl" x="390" y="385" >${L("lStem")}</text>
        </g>`;
const DEEP = () => `<g class="deep-g" hidden>
          <path class="ghost-shape" d="M75,235 C45,170 80,85 175,62 C260,50 400,60 445,105 C500,135 535,190 520,245 C505,265 470,262 440,250 C430,285 380,305 320,305 C240,305 160,295 130,275 C100,260 85,250 75,235 Z"/>
          <path class="ghost-shape" d="M392,292 C418,262 500,260 522,284 C538,312 512,348 470,350 C428,352 392,330 392,292 Z"/>
          <path class="part deep" data-id="brainstem2" style="fill:var(--tissue-2);stroke:var(--tissue-edge)" d="M330,280 C345,278 370,278 386,282 L378,398 C365,404 350,404 340,398 Z"/>
          <path class="part deep" data-id="callosum" style="fill:none;stroke:var(--hema);stroke-width:14;stroke-linecap:round" d="M205,140 C250,92 370,90 420,138"/>
          <path class="part deep" data-id="striatum" style="fill:var(--calm);stroke:var(--calm)" d="M222,170 C210,135 255,118 300,124 C340,130 362,150 360,178 C356,182 350,182 348,178 C346,156 330,142 298,138 C262,135 245,148 252,172 C258,195 225,198 222,170 Z"/>
          <ellipse class="part deep" data-id="thalamus" style="fill:var(--myelin);stroke:var(--myelin)" cx="318" cy="172" rx="30" ry="19"/>
          <ellipse class="part deep" data-id="hypothalamus" style="fill:var(--hema);stroke:var(--hema)" cx="278" cy="210" rx="18" ry="10"/>
          <ellipse class="part deep" data-id="amygdala" style="fill:var(--eosin);stroke:var(--eosin)" cx="282" cy="250" rx="14" ry="11"/>
          <path class="part deep" data-id="hippocampus" style="fill:none;stroke:var(--calm);stroke-width:12;stroke-linecap:round" d="M300,256 C322,268 356,266 380,250 C392,240 394,226 386,220"/>
          <ellipse class="part deep" data-id="nigra" style="fill:var(--ink);stroke:var(--ink)" cx="356" cy="300" rx="14" ry="6"/>
          <text class="lbl" x="275" y="100" >${L("lCallosum")}</text><text class="lbl" x="350" y="168" >${L("lThal")}</text>
          <text class="lbl" x="150" y="168" >${L("lStri")}</text><text class="lbl" x="190" y="214" >${L("lHypo")}</text>
          <text class="lbl" x="205" y="256" >${L("lAmyg")}</text><text class="lbl" x="395" y="248" >${L("lHippo")}</text>
          <text class="lbl" x="250" y="304" >${L("lNigra")}</text>
        </g>`;
R.brainstem2 = R.brainstem;
const L = k => t(LB[k]);
const surfaceIds = ["frontal","parietal","occipital","temporal","cerebellum","brainstem","motor","sensory","broca","wernicke","auditory","visual"];
const deepIds = ["thalamus","hypothalamus","hippocampus","amygdala","striatum","nigra","callosum"];

NA.register({
  id: "atlas", level: "brain",
  title: ["Карта мозга", "Brain map"],
  sub: ["Доли, центры речи и глубокие структуры", "Lobes, speech areas and deep structures"],
  idea: ["Мозг устроен слоями, как город: в стволе — системы жизнеобеспечения, в мозжечке — координация, в глубине — эмоции и память, а кора сверху думает, говорит и планирует. У каждой области своя работа, поэтому по симптомам врач понимает, где поражение.", "The brain is built in layers like a city: the brainstem runs life support, the cerebellum coordinates, deep structures handle emotion and memory, and the cortex on top thinks, speaks and plans. Each region has its job, so symptoms tell a doctor where the damage is."],
  analogy: ["Лоб — директор, темя — GPS, затылок — экран, висок — микрофон, мозжечок — тренер, ствол — электростанция.", "Frontal = CEO, parietal = GPS, occipital = screen, temporal = microphone, cerebellum = coach, brainstem = power plant."],
  plays: [
    {
      title: ["Нажимайте на области", "Click the regions"],
      html: () => `<div class="row"><div class="seg" role="group"><button class="vs">${t(["Кора снаружи","Outer cortex"])}</button><button class="vd">${t(["Глубокие структуры","Deep structures"])}</button></div></div>
        <div class="split"><div class="stage"><svg class="brain" viewBox="40 40 520 380" role="img">${SURF()}${DEEP()}</svg></div><article class="card info" aria-live="polite"></article></div>`,
      init(root) {
        const svg = root.querySelector(".brain"), info = root.querySelector(".info"), parts = [...svg.querySelectorAll(".part")];
        function show(id) {
          const r = R[id];
          parts.forEach(p => p.classList.toggle("active", p.dataset.id === id));
          info.innerHTML = `<div><h3>${t(r.n)}</h3><div class="latin">${r.l}</div></div>
            <div class="facts"><div class="fact"><b>${t(["Функция","Function"])}</b>${t(r.f)}</div><div class="fact"><b>${t(["Если повреждена","If damaged"])}</b>${t(r.d)}</div></div>
            <div class="mnemo">${t(r.m)}</div>`;
        }
        NA.clickable(parts, p => t(R[p.dataset.id].n), p => show(p.dataset.id));
        const view = deep => {
          svg.querySelector(".surface").hidden = deep; svg.querySelector(".deep-g").hidden = !deep;
          root.querySelector(".vs").setAttribute("aria-pressed", !deep); root.querySelector(".vd").setAttribute("aria-pressed", deep);
          show(deep ? "hippocampus" : "frontal");
        };
        root.querySelector(".vs").onclick = () => view(false);
        root.querySelector(".vd").onclick = () => view(true);
        view(false);
      }
    },
    {
      title: ["Тренажёр: что подсвечено?", "Drill: what is highlighted?"],
      html: () => `<div class="split"><div class="stage"><svg class="qs" viewBox="40 40 520 380" role="img"></svg></div>
        <article class="card"><p class="score sc"></p><div class="opts"></div><p class="why fb"></p><button class="btn nx" style="justify-self:start">${t(["Следующий","Next"])}</button></article></div>`,
      init(root) {
        const pool = [...surfaceIds, ...deepIds], qs = root.querySelector(".qs"), opts = root.querySelector(".opts"), fb = root.querySelector(".fb");
        let ok = 0, tot = 0, cur, locked;
        const score = () => root.querySelector(".sc").textContent = t(["Верно ","Correct "]) + ok + t([" из "," of "]) + tot;
        function next() {
          locked = false; cur = pool[Math.floor(Math.random() * pool.length)];
          const deep = deepIds.includes(cur);
          qs.innerHTML = deep ? DEEP() : SURF();
          const g = qs.firstElementChild; g.hidden = false;
          qs.querySelectorAll(".lbl").forEach(x => x.remove());
          qs.querySelectorAll(".part").forEach(p => { p.classList.toggle("active", p.dataset.id === cur); p.style.cursor = "default" });
          const others = NA.shuffle(pool.filter(x => x !== cur && deepIds.includes(x) === deep)).slice(0, 3);
          opts.replaceChildren(...NA.shuffle([cur, ...others]).map(id => {
            const b = document.createElement("button"); b.textContent = t(R[id].n); b.dataset.id = id;
            b.onclick = () => {
              if (locked) return; locked = true; tot++; const right = id === cur; if (right) ok++;
              b.classList.add(right ? "ok" : "bad"); opts.querySelector(`[data-id="${cur}"]`).classList.add("ok");
              fb.textContent = (right ? t(["Верно. ","Correct. "]) : t(["Это ","It’s "]) + t(R[cur].n) + ". ") + t(R[cur].m); score();
            };
            return b;
          }));
          fb.textContent = "";
        }
        root.querySelector(".nx").onclick = next; score(); next();
      }
    }
  ],
  path: {
    note: ["Снизу вверх — от древних отделов к новым. Чем выше, тем сложнее функции.", "Bottom to top, from ancient parts to newer ones. The higher up, the more complex the job."],
    steps: [
      { n: ["Ствол", "Brainstem"], d: ["Дыхание, сердцебиение, бодрствование. Ядра черепных нервов.", "Breathing, heartbeat, wakefulness. Cranial nerve nuclei."] },
      { n: ["Мозжечок", "Cerebellum"], d: ["Координация и точность движений, моторное обучение.", "Coordination, precise movement, motor learning."] },
      { n: ["Таламус", "Thalamus"], d: ["Ретранслятор: почти все чувства проходят через него в кору.", "The relay: nearly every sense passes through it to the cortex."] },
      { n: ["Лимбика", "Limbic"], d: ["Миндалина (страх), гиппокамп (память), гипоталамус (гормоны и голод).", "Amygdala (fear), hippocampus (memory), hypothalamus (hormones, hunger)."] },
      { n: ["Кора", "Cortex"], d: ["Восприятие, речь, решения. Лобная кора созревает последней — к 25 годам.", "Perception, language, decisions. The frontal cortex matures last, by about 25."] }
    ]
  },
  broken: [
    { n: ["Финеас Гейдж, 1848", "Phineas Gage, 1848"], d: ["Лом прошёл через лобную долю. Гейдж выжил, но из спокойного стал грубым и импульсивным — так узнали, что лоб тормозит поведение.", "An iron rod went through his frontal lobe. He survived but turned rude and impulsive — revealing that the frontal lobe brakes behaviour."] },
    { n: ["Пациент Г. М., 1953", "Patient H.M., 1953"], d: ["Удалили оба гиппокампа. Он больше не мог запоминать новые факты, но учился новым движениям — значит, память бывает разной.", "Both hippocampi were removed. He could no longer learn new facts but could learn new movements — so there are different kinds of memory."] },
    { n: ["Расщеплённый мозг", "Split brain"], d: ["После рассечения мозолистого тела предмет в левой руке нельзя назвать: рука сообщает правому полушарию, а речь в левом.", "After the corpus callosum is cut, an object in the left hand can’t be named: the hand reports to the right hemisphere, speech lives on the left."] }
  ],
  quiz: [
    { q: ["Пациент понимает речь, но говорит «Я… магазин… хлеб». Где поражение?", "A patient understands speech but says “I… shop… bread”. Where is the damage?"], o: [["Зона Брока", "Broca’s area"], ["Зона Вернике", "Wernicke’s area"], ["Затылочная доля", "Occipital lobe"], ["Мозжечок", "Cerebellum"]], why: ["Брока отвечает за производство речи; понимание при этом сохранено.", "Broca’s area produces speech; comprehension stays intact."] },
    { q: ["Какое чувство идёт в кору в обход таламуса?", "Which sense bypasses the thalamus?"], o: [["Обоняние", "Smell"], ["Зрение", "Vision"], ["Слух", "Hearing"], ["Осязание", "Touch"]], why: ["Обонятельные сигналы идут прямо в обонятельную кору.", "Smell signals go straight to the olfactory cortex."] },
    { q: ["При болезни Паркинсона гибнут нейроны…", "In Parkinson’s disease, neurons die in the…"], o: [["чёрной субстанции", "substantia nigra"], ["гиппокампа", "hippocampus"], ["миндалины", "amygdala"], ["мозолистого тела", "corpus callosum"]], why: ["Они посылают дофамин в стриатум; без него движения замедляются.", "They send dopamine to the striatum; without it, movement slows down."] }
  ]
});
})();
