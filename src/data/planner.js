export const themePalettes = {
  light: {
    bg: '#EAF6FF',
    surface: '#BFE4FF',
    surfaceAlt: '#F7FBFF',
    primary: '#2F8DFF',
    primaryStrong: '#0A2E5C',
    accent: '#79C6FF',
    text: '#0A2E5C',
    muted: '#2A4B66',
    border: 'rgba(42, 75, 102, 0.12)',
    glow: 'rgba(47, 141, 255, 0.22)'
  },
  dark: {
    bg: '#050814',
    surface: '#24263E',
    surfaceAlt: '#1A1B2E',
    primary: '#3B5BDB',
    primaryStrong: '#0A2E5C',
    accent: '#2E3154',
    text: '#EAF6FF',
    muted: '#B6C7F3',
    border: 'rgba(182, 199, 243, 0.12)',
    glow: 'rgba(59, 91, 219, 0.28)'
  }
};

export const subjectMeta = {
  math: { label: 'Matemática', short: 'Mat' },
  language: { label: 'Linguagens', short: 'Lng' },
  humanas: { label: 'Humanas', short: 'Hum' },
  nature: { label: 'Natureza', short: 'Nat' },
  essay: { label: 'Redação', short: 'Red' }
};

export const studyOrder = ['math', 'language', 'humanas', 'nature', 'essay'];

export const curriculum = {
  math: [
    'Porcentagem',
    'Regra de três',
    'Razão e proporção',
    'Matemática financeira',
    'Juros simples',
    'Juros compostos',
    'Função do 1º grau',
    'Função do 2º grau',
    'Funções exponenciais',
    'Logaritmos básicos',
    'Geometria plana',
    'Geometria espacial',
    'Trigonometria',
    'Progressão aritmética',
    'Progressão geométrica',
    'Estatística',
    'Probabilidade',
    'Análise de gráficos'
  ],
  language: [
    'Interpretação de texto',
    'Gêneros textuais',
    'Figuras de linguagem',
    'Funções da linguagem',
    'Coesão textual',
    'Concordância verbal',
    'Concordância nominal',
    'Regência verbal',
    'Crase',
    'Variação linguística',
    'Literatura brasileira',
    'Modernismo',
    'Semântica',
    'Intertextualidade',
    'Denotação e conotação',
    'Tipologia textual',
    'Argumentação',
    'Ortografia e acentuação'
  ],
  humanas: [
    'Feudalismo',
    'Absolutismo',
    'Iluminismo',
    'Revolução Francesa',
    'Revolução Industrial',
    'Imperialismo',
    'Primeira Guerra Mundial',
    'Segunda Guerra Mundial',
    'Guerra Fria',
    'Globalização',
    'Ditadura Militar',
    'República Velha',
    'Era Vargas',
    'Filosofia antiga',
    'Filosofia moderna',
    'Sociologia clássica',
    'Cidadania',
    'Geopolítica'
  ],
  nature: [
    'Ecologia',
    'Citologia',
    'Genética',
    'Evolução',
    'Biotecnologia',
    'Química orgânica',
    'Eletroquímica',
    'Termologia',
    'Ondulatória',
    'Óptica',
    'Estequiometria',
    'Soluções',
    'Tabela periódica',
    'Ligações químicas',
    'Fisiologia humana',
    'Química ambiental',
    'Hidrostática',
    'Cinemática'
  ],
  essay: [
    'Introdução',
    'Tese',
    'Desenvolvimento I',
    'Desenvolvimento II',
    'Coesão',
    'Coerência',
    'Repertório sociocultural',
    'Direitos humanos',
    'Proposta de intervenção',
    'Competência 1',
    'Competência 2',
    'Competência 3',
    'Competência 4',
    'Competência 5',
    'Conectivos',
    'Estrutura ENEM',
    'Tema contemporâneo',
    'Revisão final'
  ]
};

export const videoChannels = [
  { name: 'Ferretto Matemática', area: 'Matemática', note: 'aulas diretas e resolução guiada', url: 'https://www.youtube.com/results?search_query=Ferretto+Matem%C3%A1tica' },
  { name: 'Professor Noslen', area: 'Linguagens', note: 'gramática, leitura e interpretação', url: 'https://www.youtube.com/results?search_query=Professor+Noslen' },
  { name: 'Biologia Total', area: 'Natureza', note: 'explicações visuais e objetivas', url: 'https://www.youtube.com/results?search_query=Biologia+Total' },
  { name: 'Química em Ação', area: 'Natureza', note: 'química do básico ao avançado', url: 'https://www.youtube.com/results?search_query=Qu%C3%ADmica+em+A%C3%A7%C3%A3o' },
  { name: 'Parabólica', area: 'Humanas', note: 'história, geografia e atualidades', url: 'https://www.youtube.com/results?search_query=Parab%C3%B3lica+Hist%C3%B3ria' },
  { name: 'Se Liga Nessa História', area: 'Humanas', note: 'linha do tempo e revisão prática', url: 'https://www.youtube.com/results?search_query=Se+Liga+Nessa+Hist%C3%B3ria' }
];

export const essayTopics = [
  'Desafios da saúde mental entre jovens',
  'Impactos da desinformação na sociedade',
  'Mobilidade urbana nas grandes cidades',
  'Uso consciente da tecnologia na educação',
  'Valorização da cultura regional brasileira'
];

export const repertoires = [
  'Constituição Federal de 1988',
  'Declaração Universal dos Direitos Humanos',
  'Paulo Freire',
  'Zygmunt Bauman',
  'Milton Santos',
  'Sérgio Buarque de Holanda',
  'Cidadania digital',
  'Ulisses de Atenas'
];

export const connectors = [
  'Além disso',
  'Portanto',
  'Desse modo',
  'Entretanto',
  'Em síntese',
  'Por conseguinte',
  'Ademais',
  'Logo'
];

export const baseQuestions = [
  {
    id: 'q1',
    subject: 'math',
    prompt: 'Um produto de R$ 200 recebe desconto de 15%. Qual o valor final?',
    options: ['R$ 160', 'R$ 170', 'R$ 180', 'R$ 190'],
    answer: 1,
    explanation: '15% de 200 é 30, então o preço final é R$ 170.'
  },
  {
    id: 'q2',
    subject: 'language',
    prompt: 'A tese de um texto argumentativo costuma aparecer em qual parte?',
    options: ['Introdução', 'Conclusão', 'Rodapé', 'Título'],
    answer: 0,
    explanation: 'A tese orienta a argumentação desde a introdução.'
  },
  {
    id: 'q3',
    subject: 'humanas',
    prompt: 'O Iluminismo valorizava principalmente:',
    options: ['Razão e ciência', 'Feudalismo', 'Isolamento cultural', 'Absolutismo religioso'],
    answer: 0,
    explanation: 'O pensamento iluminista exaltava razão, ciência e progresso.'
  },
  {
    id: 'q4',
    subject: 'nature',
    prompt: 'A unidade básica dos seres vivos é a:',
    options: ['Molécula', 'Célula', 'Átomo', 'Tecido'],
    answer: 1,
    explanation: 'A célula é a unidade estrutural e funcional dos seres vivos.'
  },
  {
    id: 'q5',
    subject: 'math',
    prompt: 'Qual a média aritmética de 6, 8 e 10?',
    options: ['7', '8', '9', '10'],
    answer: 1,
    explanation: 'A soma é 24 e 24 ÷ 3 = 8.'
  },
  {
    id: 'q6',
    subject: 'language',
    prompt: 'Figuras de linguagem servem principalmente para:',
    options: ['Aumentar expressividade', 'Corrigir ortografia', 'Eliminar coesão', 'Trocar a pontuação'],
    answer: 0,
    explanation: 'Elas ampliam sentido, ênfase e expressividade.'
  }
];

export const settingsDefaults = {
  profileName: 'Estudante ENEM',
  weeklyGoal: 5,
  studyMinutes: 90,
  notifications: true
};

export const scheduleStart = '2026-07-05';
export const enemDate = '2026-11-08';

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' });

export function pad(value) {
  return String(value).padStart(2, '0');
}

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromISODate(value) {
  return new Date(`${value}T00:00:00`);
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getDaysUntilEnem(today = new Date()) {
  const target = fromISODate(enemDate);
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((target - startOfToday) / 86400000));
}

function createContentItem(subject, index, topic, weekNumber, date) {
  return {
    id: `${subject}-${index + 1}`,
    subject,
    subjectLabel: subjectMeta[subject].label,
    topic,
    weekNumber,
    date,
    title: topic,
    description: `${subjectMeta[subject].label} - semana ${weekNumber}.`,
    scheduledFor: date
  };
}

export function buildSchedule() {
  const start = fromISODate(scheduleStart);
  const weeks = [];
  const items = [];

  for (let weekIndex = 0; weekIndex < 18; weekIndex += 1) {
    const weekStart = addDays(start, weekIndex * 7);
    const weekNumber = weekIndex + 1;
    const topics = {
      math: curriculum.math[weekIndex],
      language: curriculum.language[weekIndex],
      humanas: curriculum.humanas[weekIndex],
      nature: curriculum.nature[weekIndex],
      essay: curriculum.essay[weekIndex]
    };

    const days = [
      {
        date: toISODate(weekStart),
        weekday: 'Domingo',
        type: 'study',
        subject: 'math',
        subjectLabel: subjectMeta.math.label,
        title: topics.math,
        description: 'Bloco forte de matemática com resolução objetiva e curta.',
        contentId: `math-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 1)),
        weekday: 'Segunda',
        type: 'study',
        subject: 'language',
        subjectLabel: subjectMeta.language.label,
        title: topics.language,
        description: 'Leitura, interpretação e treino de repertório linguístico.',
        contentId: `language-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 2)),
        weekday: 'Terça',
        type: 'rest',
        subject: null,
        subjectLabel: 'Descanso',
        title: 'Descanso ativo',
        description: 'Recuperação e revisão leve.',
        contentId: null
      },
      {
        date: toISODate(addDays(weekStart, 3)),
        weekday: 'Quarta',
        type: 'study',
        subject: 'humanas',
        subjectLabel: subjectMeta.humanas.label,
        title: topics.humanas,
        description: 'História, geografia e filosofia em revisão estratégica.',
        contentId: `humanas-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 4)),
        weekday: 'Quinta',
        type: 'study',
        subject: 'nature',
        subjectLabel: subjectMeta.nature.label,
        title: topics.nature,
        description: 'Ciências da Natureza com foco em fixação prática.',
        contentId: `nature-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 5)),
        weekday: 'Sexta',
        type: 'study',
        subject: 'essay',
        subjectLabel: subjectMeta.essay.label,
        title: `${topics.essay} e revisão leve`,
        description: 'Redação, repertórios e revisão curta de fechamento.',
        contentId: `essay-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 6)),
        weekday: 'Sábado',
        type: weekIndex % 2 === 0 ? 'simulado' : 'rest',
        subject: weekIndex % 2 === 0 ? 'simulado' : null,
        subjectLabel: weekIndex % 2 === 0 ? 'Simulado' : 'Descanso',
        title: weekIndex % 2 === 0 ? 'Simulado completo' : 'Descanso ou revisão livre',
        description: weekIndex % 2 === 0 ? 'Treino cronometrado da semana.' : 'Uso livre para recuperação mental.',
        contentId: null
      }
    ];

    weeks.push({ weekNumber, start: toISODate(weekStart), days });

    Object.keys(topics).forEach((subject) => {
      items.push(createContentItem(subject, weekIndex, topics[subject], weekNumber, days.find((day) => day.subject === subject)?.date || toISODate(weekStart)));
    });
  }

  return { weeks, items };
}

export const schedule = buildSchedule();

export function formatFriendlyDate(value) {
  return fromISODate(value).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });
}

export function formatLongDate(value) {
  return fromISODate(value).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });
}

export function formatMonthLabel(value) {
  return monthFormatter.format(fromISODate(value));
}