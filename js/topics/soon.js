/* Темы в работе: показываются на главной как «скоро». Чтобы сделать тему, перенесите её в свой файл по образцу hearing.js */
[
  { id: "glia", level: "cell", title: ["Глия", "Glia"], sub: ["Клетки, которые кормят, изолируют и чистят нейроны", "Cells that feed, insulate and clean neurons"],
    plan: [["Астроциты и гематоэнцефалический барьер", "Astrocytes and the blood–brain barrier"], ["Олигодендроциты и миелин", "Oligodendrocytes and myelin"], ["Микроглия — иммунитет мозга", "Microglia, the brain’s immune system"]] },
  { id: "vision", level: "systems", title: ["Зрение", "Vision"], sub: ["От сетчатки до V1 и дальше", "From retina to V1 and beyond"],
    plan: [["Интерактив: слепое пятно и иллюзии", "Demo: blind spot and illusions"], ["Путь: сетчатка → перекрест → ЛКТ → V1", "Pathway: retina → chiasm → LGN → V1"], ["Поражения: гемианопсия, прозопагнозия", "Disorders: hemianopia, prosopagnosia"]] },
  { id: "touch", level: "systems", title: ["Осязание и боль", "Touch and pain"], sub: ["Рецепторы кожи и гомункулус", "Skin receptors and the homunculus"],
    plan: [["Интерактив: сенсорный гомункулус", "Demo: the sensory homunculus"], ["Путь боли и теория «ворот»", "The pain pathway and gate control"], ["Фантомные боли", "Phantom limb pain"]] },
  { id: "movement", level: "systems", title: ["Движение", "Movement"], sub: ["Кора, базальные ганглии и мозжечок", "Cortex, basal ganglia and cerebellum"],
    plan: [["Интерактив: рефлекс и произвольное движение", "Demo: reflex vs voluntary movement"], ["Путь: моторная кора → спинной мозг → мышца", "Pathway: motor cortex → spinal cord → muscle"], ["Паркинсон, Хантингтон, атаксия", "Parkinson’s, Huntington’s, ataxia"]] },
  { id: "memory", level: "systems", title: ["Память", "Memory"], sub: ["Как гиппокамп сохраняет день", "How the hippocampus saves your day"],
    plan: [["Интерактив: рабочая память на числах", "Demo: working memory with digits"], ["Виды памяти и где они живут", "Kinds of memory and where they live"], ["Амнезия и болезнь Альцгеймера", "Amnesia and Alzheimer’s"]] },
  { id: "emotion", level: "systems", title: ["Эмоции", "Emotion"], sub: ["Миндалина, страх и награда", "Amygdala, fear and reward"],
    plan: [["Интерактив: реакция «бей или беги»", "Demo: fight or flight"], ["Дофамин и система награды", "Dopamine and reward"], ["Тревога и зависимость", "Anxiety and addiction"]] },
  { id: "sleep", level: "systems", title: ["Сон", "Sleep"], sub: ["Циклы сна и зачем мозгу ночь", "Sleep cycles and why the brain needs night"],
    plan: [["Интерактив: гипнограмма за ночь", "Demo: a night’s hypnogram"], ["Циркадные ритмы и гипоталамус", "Circadian rhythms and the hypothalamus"], ["Бессонница и нарколепсия", "Insomnia and narcolepsy"]] }
].forEach(x => NA.register({ ...x, soon: true }));
