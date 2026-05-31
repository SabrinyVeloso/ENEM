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

export const priorityMeta = {
  hot: {
    label: '🔥 Cai muito',
    frequency: 'Muito alta',
    importance: 'Altíssima',
    difficulty: 'Prioridade máxima',
    rank: 4
  },
  frequent: {
    label: '📈 Frequente',
    frequency: 'Alta',
    importance: 'Alta',
    difficulty: 'Prioridade alta',
    rank: 3
  },
  medium: {
    label: '📚 Médio',
    frequency: 'Média',
    importance: 'Média',
    difficulty: 'Prioridade média',
    rank: 2
  },
  hard: {
    label: '🧠 Difícil',
    frequency: 'Média',
    importance: 'Alta',
    difficulty: 'Conteúdo desafiador',
    rank: 1
  }
};

export const studyOrder = ['math', 'language', 'humanas', 'nature', 'essay'];

export const curriculum = {
  math: [
    { title: 'Porcentagem', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Cálculo rápido, desconto, acréscimo e variação percentual.' },
    { title: 'Regra de três', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Proporcionalidade direta e inversa em problemas do cotidiano.' },
    { title: 'Razão e proporção', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Comparação entre grandezas e leitura de relações matemáticas.' },
    { title: 'Leitura de gráficos', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Interpretação de eixos, tendências e comparação de dados visuais.' },
    { title: 'Interpretação de tabelas', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Extração de informação direta e comparação entre linhas e colunas.' },
    { title: 'Análise de gráficos', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Leitura crítica de gráficos de barras, linhas, setores e funções.' },
    { title: 'Matemática financeira', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Planejamento financeiro, preço, parcelas e decisões de consumo.' },
    { title: 'Juros simples', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Cálculo de rendimento e dívidas com taxa linear no tempo.' },
    { title: 'Juros compostos', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Crescimento exponencial aplicado a investimentos e empréstimos.' },
    { title: 'Geometria plana', priority: 'frequent', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Áreas, perímetros, polígonos, círculo e relações métricas.' },
    { title: 'Geometria espacial', priority: 'frequent', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Volumes, prismas, cilindros, cones e pirâmides.' },
    { title: 'Escala', priority: 'frequent', difficulty: 'Fácil', importance: 4, frequency: 'Alta', description: 'Mapas, plantas, redução e ampliação em representações proporcionais.' },
    { title: 'Função do 1º grau', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Crescimento linear, raiz da função e interpretação do gráfico.' },
    { title: 'Função do 2º grau', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Parábola, vértice, raízes e leitura de comportamento.' },
    { title: 'Trigonometria', priority: 'frequent', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Seno, cosseno, tangente e aplicação em triângulos.' },
    { title: 'Funções trigonométricas', priority: 'hard', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Periodicidade, leitura de curvas e fenômenos oscilatórios.' },
    { title: 'Funções exponenciais', priority: 'hard', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Crescimento, decaimento e modelagem exponencial.' },
    { title: 'Logaritmos', priority: 'hard', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Propriedades logarítmicas e resolução de equações.' },
    { title: 'Progressão aritmética', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Sequência linear, termo geral e soma de termos.' },
    { title: 'Progressão geométrica', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Sequência multiplicativa, termo geral e soma finita.' },
    { title: 'Estatística', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Média, dispersão e leitura de dados para análise de contexto.' },
    { title: 'Média, moda e mediana', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Medidas de tendência central cobradas com frequência.' },
    { title: 'Probabilidade', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Espaço amostral, evento e chance em situações variadas.' },
    { title: 'Análise combinatória', priority: 'medium', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Princípio fundamental da contagem, arranjo, combinação e permutação.' },
    { title: 'Conjuntos', priority: 'medium', difficulty: 'Fácil', importance: 3, frequency: 'Média', description: 'Operações com conjuntos, união, interseção e diagramas.' },
    { title: 'Geometria analítica', priority: 'hard', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Plano cartesiano, distância, ponto médio e equação da reta.' },
    { title: 'Razão entre grandezas', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Comparação de medidas em contexto prático e interdisciplinar.' }
  ],
  language: [
    { title: 'Interpretação de texto', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Muito alta', description: 'Leitura literal, inferência, intenção e ideia central.' },
    { title: 'Linguagem verbal e não verbal', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Relação entre imagem, texto e sentido construído pelo conjunto.' },
    { title: 'Gêneros textuais', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Crônica, reportagem, artigo, tirinha, propaganda e carta.' },
    { title: 'Interpretação de propaganda', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Recursos persuasivos, apelo visual e linguagem de consumo.' },
    { title: 'Análise de tirinhas', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Humor, ironia, crítica social e relação entre quadros.' },
    { title: 'Análise de memes', priority: 'frequent', difficulty: 'Fácil', importance: 4, frequency: 'Alta', description: 'Contexto, ironia, cultura digital e leitura rápida.' },
    { title: 'Análise de músicas', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Média', description: 'Letra, tema, figura de linguagem e crítica social.' },
    { title: 'Funções da linguagem', priority: 'frequent', difficulty: 'Fácil', importance: 4, frequency: 'Alta', description: 'Referencial, emotiva, conativa, poética e fática.' },
    { title: 'Figuras de linguagem', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Metáfora, metonímia, ironia, hipérbole, antítese e outras.' },
    { title: 'Coesão textual', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Conectivos, substituição lexical e encadeamento das ideias.' },
    { title: 'Semântica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Sentido das palavras, contexto e efeitos de significado.' },
    { title: 'Denotação e conotação', priority: 'frequent', difficulty: 'Fácil', importance: 4, frequency: 'Alta', description: 'Sentido literal e figurado aplicado em textos variados.' },
    { title: 'Intertextualidade', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Diálogo entre textos, referências e recriação de sentidos.' },
    { title: 'Argumentação', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Tese, repertório, argumento e contra-argumento.' },
    { title: 'Tipologia textual', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Narrativo, descritivo, dissertativo e injuntivo.' },
    { title: 'Variação linguística', priority: 'medium', difficulty: 'Fácil', importance: 3, frequency: 'Média', description: 'Registros, variantes regionais, sociais e históricas.' },
    { title: 'Ortografia e acentuação', priority: 'medium', difficulty: 'Fácil', importance: 3, frequency: 'Média', description: 'Regras de grafia, acento e uso correto da língua padrão.' },
    { title: 'Concordância verbal', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Relação entre verbo e sujeito em diferentes construções.' },
    { title: 'Concordância nominal', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Ajuste entre substantivo, adjetivo, artigo e numeral.' },
    { title: 'Regência verbal', priority: 'hard', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Vínculo entre verbo e complemento com preposição adequada.' },
    { title: 'Crase', priority: 'hard', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Uso do acento grave em fusão de preposição com artigo.' },
    { title: 'Literatura brasileira', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Autores, escolas literárias e leitura histórica da literatura.' },
    { title: 'Modernismo', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Primeira, segunda e terceira fases com contexto histórico.' },
    { title: 'Movimentos literários', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Barroco, Arcadismo, Romantismo, Realismo e demais escolas.' },
    { title: 'Artes', priority: 'medium', difficulty: 'Fácil', importance: 3, frequency: 'Média', description: 'Leitura de obra, contexto cultural e linguagem artística.' }
  ],
  humanas: [
    { title: 'Geopolítica', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Muito alta', description: 'Relações internacionais, blocos, disputas e território.' },
    { title: 'Globalização', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Muito alta', description: 'Fluxos, redes, economia mundial e desigualdades.' },
    { title: 'Atualidades', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Muito alta', description: 'Temas contemporâneos com leitura crítica e contextualizada.' },
    { title: 'História do Brasil: República Velha', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Coronelismo, café com leite, movimentos sociais e política.' },
    { title: 'Era Vargas', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Estado Novo, industrialização, trabalhismo e centralização.' },
    { title: 'Ditadura Militar', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Regime autoritário, repressão, resistência e redemocratização.' },
    { title: 'Cidadania', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Direitos, participação social, democracia e vida coletiva.' },
    { title: 'Conflitos atuais', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Guerras, tensões políticas e efeitos humanitários contemporâneos.' },
    { title: 'Guerra Fria', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Bipolaridade, corrida armamentista e influência global.' },
    { title: 'Industrialização', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Transformações produtivas, trabalho e urbanização.' },
    { title: 'Urbanização', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Crescimento urbano, segregação e infraestrutura.' },
    { title: 'Demografia', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Pirâmide etária, natalidade, mortalidade e migrações.' },
    { title: 'Cartografia', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Mapas, coordenadas, projeções e leitura espacial.' },
    { title: 'Meio ambiente', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Sustentabilidade, impactos ambientais e preservação.' },
    { title: 'Geografia econômica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Produção, indústria, energia e cadeias globais.' },
    { title: 'Clima', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Massas de ar, fenômenos climáticos e relevo atmosférico.' },
    { title: 'Agropecuária', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Campo brasileiro, produção, mecanização e território.' },
    { title: 'Migrações', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Fluxos migratórios internos e externos, causas e efeitos.' },
    { title: 'Feudalismo', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Sociedade medieval, relações de poder e economia agrária.' },
    { title: 'Absolutismo', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Centralização do poder monárquico e contexto europeu.' },
    { title: 'Iluminismo', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Razão, ciência, crítica ao absolutismo e direitos.' },
    { title: 'Revolução Francesa', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Mudanças políticas, sociais e ideológicas na França.' },
    { title: 'Revolução Industrial', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Maquinização, urbanização e transformação do trabalho.' },
    { title: 'Imperialismo', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Expansão europeia, dominação e disputa por territórios.' },
    { title: 'Primeira Guerra Mundial', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Crises europeias, alianças e consequências globais.' },
    { title: 'Segunda Guerra Mundial', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Totalitarismos, conflito global e reorganização do mundo.' },
    { title: 'Filosofia antiga', priority: 'medium', difficulty: 'Difícil', importance: 3, frequency: 'Média', description: 'Socrates, Platão, Aristóteles e bases do pensamento filosófico.' },
    { title: 'Filosofia moderna', priority: 'medium', difficulty: 'Difícil', importance: 3, frequency: 'Média', description: 'Racionalismo, empirismo, contratualismo e crítica moderna.' },
    { title: 'Sociologia clássica', priority: 'medium', difficulty: 'Difícil', importance: 3, frequency: 'Média', description: 'Durkheim, Marx, Weber e análise social da modernidade.' }
  ],
  nature: [
    { title: 'Ecologia', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Muito alta', description: 'Relações ecológicas, cadeias, biomas e equilíbrio ambiental.' },
    { title: 'Cadeia alimentar', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Fluxo de energia, produtores, consumidores e decompositores.' },
    { title: 'Citologia', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Organelas, membrana, metabolismo e funções celulares.' },
    { title: 'Genética', priority: 'hot', difficulty: 'Difícil', importance: 5, frequency: 'Muito alta', description: 'Herança, DNA, RNA, dominância e problemas clássicos.' },
    { title: 'Evolução', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Seleção natural, adaptação e teoria evolutiva.' },
    { title: 'Biotecnologia', priority: 'medium', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Transgênicos, clonagem, PCR e aplicações tecnológicas.' },
    { title: 'Fisiologia humana', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Sistemas do corpo humano e seus funcionamentos integrados.' },
    { title: 'Fisiologia vegetal', priority: 'medium', difficulty: 'Difícil', importance: 4, frequency: 'Média', description: 'Transporte, fotossíntese, hormônios e crescimento vegetal.' },
    { title: 'Vírus e bactérias', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Doenças, prevenção, estrutura e relações com o ser humano.' },
    { title: 'Imunologia', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Defesa do corpo, vacinas, anticorpos e imunidade.' },
    { title: 'Reprodução humana', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Sistema reprodutor, ciclo menstrual, fecundação e saúde.' },
    { title: 'Bioquímica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Carboidratos, lipídios, proteínas, enzimas e energia.' },
    { title: 'Sustentabilidade', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Consumo consciente, reciclagem, recursos e futuro ambiental.' },
    { title: 'Química orgânica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Funções orgânicas, hidrocarbonetos e aplicações do cotidiano.' },
    { title: 'Eletroquímica', priority: 'hot', difficulty: 'Difícil', importance: 5, frequency: 'Alta', description: 'Pilha, eletrólise, oxirredução e energia química.' },
    { title: 'Termoquímica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Reações endotérmicas, exotérmicas e variação de energia.' },
    { title: 'Reações químicas', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Tipos de reação, balanceamento e leitura de equações.' },
    { title: 'Tabela periódica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Propriedades periódicas, grupos, períodos e tendência química.' },
    { title: 'Ligações químicas', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Iônica, covalente e metálica, polaridade e estrutura.' },
    { title: 'Soluções', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Concentração, diluição, solubilidade e preparo.' },
    { title: 'pH', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Acidez, basicidade e escala de pH em situações reais.' },
    { title: 'Separação de misturas', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Filtração, destilação, centrifugação, decantação e mais.' },
    { title: 'Estequiometria', priority: 'frequent', difficulty: 'Difícil', importance: 4, frequency: 'Alta', description: 'Relação molar, cálculo químico e rendimento de reação.' },
    { title: 'Química ambiental', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Poluição, tratamento, efeito estufa e impacto ambiental.' },
    { title: 'Termologia', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Calor, temperatura, dilatação e equilíbrio térmico.' },
    { title: 'Ondulatória', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Som, luz, frequência, amplitude e fenômenos ondulatórios.' },
    { title: 'Óptica', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Espelhos, lentes, refração e formação de imagens.' },
    { title: 'Hidrostática', priority: 'medium', difficulty: 'Média', importance: 3, frequency: 'Média', description: 'Pressão, empuxo, densidade e fluidos em equilíbrio.' },
    { title: 'Cinemática', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Velocidade, aceleração, gráficos e leitura de movimento.' },
    { title: 'Dinâmica', priority: 'frequent', difficulty: 'Difícil', importance: 4, frequency: 'Alta', description: 'Forças, interações e análise de movimentos.' },
    { title: 'Leis de Newton', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Inércia, força resultante e ação e reação.' },
    { title: 'Trabalho e energia', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Potência, energia mecânica e conservação.' },
    { title: 'Eletricidade', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Corrente, tensão, potência e consumo de energia.' },
    { title: 'Circuitos elétricos', priority: 'hot', difficulty: 'Difícil', importance: 5, frequency: 'Alta', description: 'Associação de resistores, leitura de esquemas e aplicações.' },
    { title: 'Energia e potência', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Uso de energia em eletrodomésticos, máquinas e sistemas.' }
  ],
  essay: [
    { title: 'Introdução', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Abertura objetiva com contextualização e tese.' },
    { title: 'Tese', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Posicionamento claro que guia todo o texto.' },
    { title: 'Desenvolvimento I', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Primeiro argumento com repertório e explicação.' },
    { title: 'Desenvolvimento II', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Segundo argumento articulado com progressão lógica.' },
    { title: 'Coesão', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Conectivos, substituições e encadeamento textual.' },
    { title: 'Coerência', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Manutenção do sentido, lógica e consistência entre ideias.' },
    { title: 'Repertório sociocultural', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Referências legítimas e produtivas para a argumentação.' },
    { title: 'Direitos humanos', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Eixo central de temas do ENEM e da proposta de intervenção.' },
    { title: 'Proposta de intervenção', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Agente, ação, meio, finalidade e detalhamento.' },
    { title: 'Competência 1', priority: 'medium', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Norma culta, ortografia e estrutura linguística.' },
    { title: 'Competência 2', priority: 'medium', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Compreensão da proposta, tema e repertório pertinente.' },
    { title: 'Competência 3', priority: 'medium', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Seleção, organização e defesa dos argumentos.' },
    { title: 'Competência 4', priority: 'medium', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Coesão, conectivos e progressão textual.' },
    { title: 'Competência 5', priority: 'medium', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Solução proposta com respeito aos direitos humanos.' },
    { title: 'Estrutura ENEM', priority: 'hot', difficulty: 'Fácil', importance: 5, frequency: 'Alta', description: 'Modelo de 4 a 7 parágrafos com função estratégica.' },
    { title: 'Modelos de introdução', priority: 'frequent', difficulty: 'Fácil', importance: 4, frequency: 'Alta', description: 'Estruturas prontas para começar rápido e com segurança.' },
    { title: 'Modelos de conclusão', priority: 'frequent', difficulty: 'Fácil', importance: 4, frequency: 'Alta', description: 'Fechamentos consistentes com proposta de intervenção.' },
    { title: 'Temas atuais', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Assuntos contemporâneos para treinar repertório e tese.' },
    { title: 'Repertórios por tema', priority: 'frequent', difficulty: 'Média', importance: 4, frequency: 'Alta', description: 'Banco de referências organizado por assunto recorrente.' },
    { title: 'Prática semanal', priority: 'hot', difficulty: 'Média', importance: 5, frequency: 'Alta', description: 'Treino constante para manter produção e correção em alta.' }
  ]
};

export const videoChannels = [
  {
    subject: 'Matemática',
    name: 'Ferretto Matemática',
    note: 'resolução objetiva e base forte para as questões mais cobradas.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Ferretto+Matem%C3%A1tica',
    photo: createAvatarDataUri({ initials: 'MA', from: '#2f8dff', to: '#79c6ff', accent: '#ffffff' })
  },
  {
    subject: 'Português',
    name: 'Professor Noslen',
    note: 'leitura, gramática e interpretação com explicação direta.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Professor+Noslen',
    photo: createAvatarDataUri({ initials: 'PT', from: '#3b5bdb', to: '#2e3154', accent: '#c7d2fe' })
  },
  {
    subject: 'Artes',
    name: 'Arte na Escola',
    note: 'contexto artístico, leitura de obras e repertório visual.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Arte+na+Escola',
    photo: createAvatarDataUri({ initials: 'AR', from: '#ec4899', to: '#f97316', accent: '#fde68a' })
  },
  {
    subject: 'História',
    name: 'Parabólica História',
    note: 'linha do tempo, atualidades e leitura crítica dos fatos.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Parab%C3%B3lica+Hist%C3%B3ria',
    photo: createAvatarDataUri({ initials: 'HI', from: '#7c3aed', to: '#a855f7', accent: '#e9d5ff' })
  },
  {
    subject: 'Geografia',
    name: 'GeoProfessor',
    note: 'mapas, território, clima e temas do mundo contemporâneo.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=geografia+enem+canal',
    photo: createAvatarDataUri({ initials: 'GE', from: '#0ea5e9', to: '#2563eb', accent: '#bae6fd' })
  },
  {
    subject: 'Filosofia',
    name: 'Filosofia com Lucas',
    note: 'pensamento crítico e autores centrais para a prova.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=filosofia+enem+canal',
    photo: createAvatarDataUri({ initials: 'FI', from: '#16a34a', to: '#14b8a6', accent: '#d1fae5' })
  },
  {
    subject: 'Sociologia',
    name: 'Sociologia em Foco',
    note: 'sociedade, cidadania e temas atuais explicados com clareza.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=sociologia+enem+canal',
    photo: createAvatarDataUri({ initials: 'SO', from: '#f43f5e', to: '#fb7185', accent: '#ffe4e6' })
  },
  {
    subject: 'Biologia',
    name: 'Biologia Total',
    note: 'explicações visuais para ecologia, genética e fisiologia.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Biologia+Total',
    photo: createAvatarDataUri({ initials: 'BI', from: '#22c55e', to: '#15803d', accent: '#dcfce7' })
  },
  {
    subject: 'Química',
    name: 'Química em Ação',
    note: 'conteúdo direto, exercícios e revisão dos pontos-chave.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Qu%C3%ADmica+em+A%C3%A7%C3%A3o',
    photo: createAvatarDataUri({ initials: 'QU', from: '#f59e0b', to: '#f97316', accent: '#ffedd5' })
  },
  {
    subject: 'Física',
    name: 'Física 2.0',
    note: 'conceitos essenciais, resolução guiada e foco em questões.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=F%C3%ADsica+2.0+ENEM',
    photo: createAvatarDataUri({ initials: 'FS', from: '#2563eb', to: '#0f172a', accent: '#bfdbfe' })
  },
  {
    subject: 'Redação',
    name: 'Professora Pamba',
    note: 'estrutura, repertório e prática para montar um texto forte.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=Professora+Pamba+reda%C3%A7%C3%A3o',
    photo: createAvatarDataUri({ initials: 'RE', from: '#8b5cf6', to: '#ec4899', accent: '#f5d0fe' })
  },
  {
    subject: 'Dicas ENEM',
    name: 'Débora Aladim',
    note: 'orientação de estudo, atualidades e dicas para a prova.',
    actionLabel: 'Abrir Canal',
    url: 'https://www.youtube.com/results?search_query=D%C3%A9bora+Aladim+ENEM',
    photo: createAvatarDataUri({ initials: 'EN', from: '#fb7185', to: '#f59e0b', accent: '#fff1f2' })
  }
];

function createAvatarDataUri({ initials, from, to, accent }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
        <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.9)" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="56" fill="url(#bg)" />
      <circle cx="72" cy="76" r="42" fill="rgba(255,255,255,0.16)" />
      <circle cx="198" cy="54" r="34" fill="rgba(255,255,255,0.14)" />
      <circle cx="196" cy="198" r="46" fill="rgba(255,255,255,0.08)" />
      <path d="M58 192c18-32 43-48 70-48s52 16 70 48" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="10" stroke-linecap="round" />
      <circle cx="128" cy="104" r="44" fill="rgba(255,255,255,0.2)" />
      <path d="M96 194c7-22 23-34 32-34s25 12 32 34" fill="rgba(255,255,255,0.22)" />
      <text x="128" y="140" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="64" font-weight="900" fill="white" letter-spacing="-3">${initials}</text>
      <rect x="28" y="28" width="200" height="200" rx="44" fill="none" stroke="url(#ring)" stroke-width="4" opacity="0.8" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const essayTopics = [
  '2025 - Perspectivas acerca do envelhecimento na sociedade brasileira',
  '2024 - Desafios para a valorização da herança africana no Brasil',
  '2023 - Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
  '2022 - Desafios para a valorização de comunidades e povos tradicionais no Brasil',
  '2021 - Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
  '2020 - O estigma associado às doenças mentais na sociedade brasileira',
  '2020 - O desafio de reduzir as desigualdades entre as regiões do Brasil',
  '2019 - Democratização do acesso ao cinema no Brasil',
  '2018 - Manipulação do comportamento do usuário pelo controle de dados na Internet',
  '2017 - Desafios para a formação educacional de surdos no Brasil',
  '2016 - Caminhos para combater a intolerância religiosa no Brasil',
  '2015 - A persistência da violência contra a mulher na sociedade brasileira',
  '2014 - Publicidade infantil em questão no Brasil',
  '2013 - Efeitos da implantação da Lei Seca no Brasil',
  '2012 - Movimento imigratório para o Brasil no século 21',
  '2011 - Viver em rede no século XXI: os limites entre o público e o privado',
  '2010 - O trabalho na construção da dignidade humana',
  '2009 - O indivíduo frente à ética nacional',
  '2008 - Como preservar a floresta Amazônica',
  '2007 - O desafio de se conviver com a diferença',
  '2006 - O poder de transformação da leitura',
  '2005 - O trabalho infantil na realidade brasileira',
  '2004 - Como garantir a liberdade de informação e evitar abusos nos meios de comunicação',
  '2003 - A violência na sociedade brasileira: como mudar as regras desse jogo?',
  '2002 - O direito de votar: como fazer dessa conquista um meio para promover as transformações sociais de que o Brasil necessita?',
  '2001 - Desenvolvimento e preservação ambiental: como conciliar interesses em conflito?',
  '2000 - Direitos da criança e do adolescente: como enfrentar esse desafio nacional?',
  '1999 - Cidadania e participação social',
  '1998 - Viver e aprender'
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
  profileName: '',
  weeklyGoal: 5,
  studyMinutes: 90,
  notifications: true,
  onboardCompleted: false,
  studyDaysCount: 5,
  studyDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
  studyHoursPerDay: 90,
  targetScore: '700+',
  level: 'Intermediário'
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

function makeTopicSummary(topic) {
  const priority = priorityMeta[topic.priority] || priorityMeta.medium;
  return {
    ...topic,
    priorityLabel: priority.label,
    priorityRank: priority.rank
  };
}

function pickWeeklyTopic(list, weekIndex) {
  return list[Math.min(weekIndex, list.length - 1)];
}

function createContentItem(subject, index, topic, weekNumber, date) {
  const summary = makeTopicSummary(topic);
  return {
    id: `${subject}-${index + 1}`,
    subject,
    subjectLabel: subjectMeta[subject].label,
    topic: summary.title,
    weekNumber,
    date,
    title: summary.title,
    description: `${subjectMeta[subject].label} - ${summary.frequency}, ${summary.difficulty.toLowerCase()}.`,
    scheduledFor: date,
    priority: summary.priority,
    priorityLabel: summary.priorityLabel,
    difficulty: summary.difficulty,
    importance: summary.importance,
    frequency: summary.frequency,
    blocks: ['Teoria', 'Exercícios', 'Revisão']
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
      math: pickWeeklyTopic(curriculum.math, weekIndex),
      language: pickWeeklyTopic(curriculum.language, weekIndex),
      humanas: pickWeeklyTopic(curriculum.humanas, weekIndex),
      nature: pickWeeklyTopic(curriculum.nature, weekIndex),
      essay: pickWeeklyTopic(curriculum.essay, weekIndex)
    };

    const days = [
      {
        date: toISODate(weekStart),
        weekday: 'Domingo',
        type: 'study',
        subject: 'math',
        subjectLabel: subjectMeta.math.label,
        title: topics.math.title,
        description: `${topics.math.priorityLabel} · Teoria, exercícios e revisão em matemática aplicada.`,
        focus: topics.math.frequency,
        blocks: ['Teoria', 'Exercícios', 'Revisão'],
        contentId: `math-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 1)),
        weekday: 'Segunda',
        type: 'study',
        subject: 'language',
        subjectLabel: subjectMeta.language.label,
        title: topics.language.title,
        description: `${topics.language.priorityLabel} · Interpretação, análise textual e gramática estratégica.`,
        focus: topics.language.frequency,
        blocks: ['Teoria', 'Exercícios', 'Revisão'],
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
        title: topics.humanas.title,
        description: `${topics.humanas.priorityLabel} · História do Brasil, geopolítica e leitura crítica do mundo.`,
        focus: topics.humanas.frequency,
        blocks: ['Teoria', 'Exercícios', 'Revisão'],
        contentId: `humanas-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 4)),
        weekday: 'Quinta',
        type: 'study',
        subject: 'nature',
        subjectLabel: subjectMeta.nature.label,
        title: topics.nature.title,
        description: `${topics.nature.priorityLabel} · Natureza com foco em prova, aplicação e resolução objetiva.`,
        focus: topics.nature.frequency,
        blocks: ['Teoria', 'Exercícios', 'Revisão'],
        contentId: `nature-${weekNumber}`
      },
      {
        date: toISODate(addDays(weekStart, 5)),
        weekday: 'Sexta',
        type: 'study',
        subject: 'essay',
        subjectLabel: subjectMeta.essay.label,
        title: `${topics.essay.title} e revisão leve`,
        description: `${topics.essay.priorityLabel} · Redação, repertório, estrutura ENEM e fechamento.`,
        focus: topics.essay.frequency,
        blocks: ['Teoria', 'Exercícios', 'Revisão'],
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

  Object.entries(curriculum).forEach(([subject, topics]) => {
    topics.forEach((topic, index) => {
      if (index < 18) return;
      const weekNumber = index + 1;
      items.push(createContentItem(subject, index, topic, weekNumber, scheduleStart));
    });
  });

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

const weekdayOrder = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const weekdayLabelByKey = {
  sun: 'Domingo',
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado'
};

function normalizeStudyDays(studyDays = []) {
  const filtered = studyDays.filter((day) => weekdayOrder.includes(day));
  if (filtered.length > 0) return filtered;
  return ['mon', 'tue', 'wed', 'thu', 'fri'];
}

function buildBalancedTopicQueue() {
  const subjectOrder = studyOrder;
  const subjectBuckets = Object.fromEntries(subjectOrder.map((subject) => [subject, curriculum[subject].map((topic, index) => ({ ...topic, subject, index }))]));
  const queue = [];
  let cursor = 0;

  while (true) {
    let pushed = false;
    subjectOrder.forEach((subject) => {
      const topic = subjectBuckets[subject][cursor];
      if (topic) {
        queue.push(topic);
        pushed = true;
      }
    });

    if (!pushed) break;
    cursor += 1;
  }

  return queue;
}

function calculateTopicsPerSession(totalTopics, totalStudyDays, studyMinutes) {
  if (!totalStudyDays) return totalTopics;
  const required = Math.ceil(totalTopics / totalStudyDays);
  const minutesBonus = studyMinutes >= 120 ? 1 : studyMinutes >= 90 ? 0 : 0;
  return Math.max(1, required + minutesBonus);
}

export function buildAdaptiveSchedule(settings = {}) {
  const start = fromISODate(scheduleStart);
  const end = fromISODate(enemDate);
  const studyDays = normalizeStudyDays(settings.studyDays || []);
  const studyMinutes = Number(settings.studyHoursPerDay || settings.studyMinutes || 90);
  const topicQueue = buildBalancedTopicQueue();
  const totalDays = Math.max(1, Math.ceil((end - start) / 86400000) + 1);

  let totalStudyDays = 0;
  for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
    const day = addDays(start, dayIndex);
    const weekdayKey = weekdayOrder[day.getDay()];
    if (studyDays.includes(weekdayKey)) totalStudyDays += 1;
  }

  const topicsPerSession = calculateTopicsPerSession(topicQueue.length, totalStudyDays, studyMinutes);
  const weeks = [];
  const items = [];
  let queueIndex = 0;

  for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
    const currentDate = addDays(start, dayIndex);
    const weekdayKey = weekdayOrder[currentDate.getDay()];
    const isStudyDay = studyDays.includes(weekdayKey);
    const weekNumber = Math.floor(dayIndex / 7) + 1;
    const weekBucket = weeks[weekNumber - 1] || { weekNumber, start: toISODate(addDays(start, (weekNumber - 1) * 7)), days: [] };

    let dayEntry;
    if (isStudyDay && queueIndex < topicQueue.length) {
      const assignedTopics = topicQueue.slice(queueIndex, queueIndex + topicsPerSession);
      queueIndex += assignedTopics.length;
      const primary = assignedTopics[0];
      dayEntry = {
        date: toISODate(currentDate),
        weekday: weekdayLabelByKey[weekdayKey],
        type: 'study',
        subject: primary.subject,
        subjectLabel: subjectMeta[primary.subject].label,
        title: primary.title,
        description: `${subjectMeta[primary.subject].label} · ${assignedTopics.length} conteúdo${assignedTopics.length > 1 ? 's' : ''} nesta sessão.`,
        focus: primary.frequency,
        blocks: ['Teoria', 'Exercícios', 'Revisão'],
        contentId: `${primary.subject}-${primary.index + 1}`,
        assignedContentIds: assignedTopics.map((topic) => `${topic.subject}-${topic.index + 1}`),
        assignedTopics: assignedTopics.map((topic) => topic.title)
      };

      assignedTopics.forEach((topic) => {
        const itemId = `${topic.subject}-${topic.index + 1}`;
        items.push({
          ...createContentItem(topic.subject, topic.index, topic, weekNumber, toISODate(currentDate)),
          id: itemId,
          scheduledFor: toISODate(currentDate),
          assignedSessionSize: topicsPerSession
        });
      });
    } else if (weekdayKey === 'sat') {
      dayEntry = {
        date: toISODate(currentDate),
        weekday: weekdayLabelByKey[weekdayKey],
        type: 'simulado',
        subject: 'simulado',
        subjectLabel: 'Simulado',
        title: 'Simulado ou revisão longa',
        description: 'Espaço para consolidar o que foi estudado na semana.',
        contentId: null
      };
    } else {
      dayEntry = {
        date: toISODate(currentDate),
        weekday: weekdayLabelByKey[weekdayKey],
        type: 'rest',
        subject: null,
        subjectLabel: 'Descanso',
        title: 'Descanso ativo',
        description: 'Recuperação e revisão leve.',
        contentId: null
      };
    }

    weekBucket.days.push(dayEntry);
    weeks[weekNumber - 1] = weekBucket;
  }

  return { weeks, items };
}