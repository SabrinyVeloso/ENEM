export const contentResources = {
  "Função do 1º Grau": [
    { title: "Exercícios de Função Afim - Lista", url: "https://www.khanacademy.org/math/algebra" },
    { title: "Questões ENEM: Função Afim", url: "https://www.google.com/search?q=questões+função+1º+grau+enem" },
    { title: "Videoaula: Função do 1º Grau", url: "https://www.youtube.com/results?search_query=função+do+1º+grau+videoaula" }
  ],
  "Função do 2º Grau": [
    { title: "Exercícios de Parábola", url: "https://www.khanacademy.org/math/algebra" },
    { title: "Questões ENEM: Função Quadrática", url: "https://www.google.com/search?q=questões+função+2º+grau+enem" },
    { title: "Videoaula: Função do 2º Grau", url: "https://www.youtube.com/results?search_query=função+do+2º+grau+videoaula" }
  ],
  "Citologia": [
    { title: "Questões de Citologia", url: "https://www.google.com/search?q=questões+citologia+enem" },
    { title: "Videoaula: Citologia", url: "https://www.youtube.com/results?search_query=citologia+videoaula" }
  ]
};

export const subjectResources = {
  math: [
    { title: "Lista de exercícios - Matemática", url: "https://www.khanacademy.org/math" },
    { title: "Banco de questões ENEM - Matemática", url: "https://www.google.com/search?q=questões+matemática+enem" }
  ],
  nature: [
    { title: "Recursos de Biologia", url: "https://www.youtube.com/results?search_query=biologia+enem" }
  ],
  language: [
    { title: "Exercícios de Interpretação de Texto", url: "https://www.google.com/search?q=interpretação+de+texto+exercícios" }
  ],
  humanas: [
    { title: "Questões de Humanas", url: "https://www.google.com/search?q=questões+humanas+enem" }
  ],
  essay: [
    { title: "Prática de Redação", url: "https://www.google.com/search?q=prática+redação+enem" }
  ]
};

export function generateSearchLinks(content) {
  const q = encodeURIComponent(content);
  return [
    { title: `Questões ENEM`, url: `https://www.google.com/search?q=${q}+questões+enem` },
    { title: `Exercícios Resolvidos`, url: `https://www.google.com/search?q=${q}+exercícios+resolvidos` },
    { title: `Videoaula`, url: `https://www.google.com/search?q=${q}+videoaula` }
  ];
}
