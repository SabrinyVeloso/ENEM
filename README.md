# ENEM Planner

Plataforma mobile-first de estudos para o ENEM construída com **React**, **Vite**, **Tailwind CSS** e **React Router**. O projeto foi desenhado para funcionar como um app premium no celular, com navegação rápida, rotas reais e persistência local via `localStorage`.

## Destaques

- Interface mobile-first com glassmorphism, gradientes suaves, ícones e microanimações
- Menu lateral animado e navegação entre páginas reais
- PWA com instalação no celular e suporte offline
- Home com cronograma, contador do ENEM, calendário e progresso
- Conteúdos com filtros, pesquisa e status de estudo
- Redação com editor, repertórios, conectivos e autosave
- Exercícios com correção automática e histórico
- Simulados com cronômetro, resultado e desempenho
- Videoaulas, estatísticas, configurações e conquistas
- Tema claro e escuro usando as duas paletas enviadas

## Paletas de Cor

- Tema claro: `#EAF6FF`, `#BFE4FF`, `#79C6FF`, `#2F8DFF`, `#0A2E5C`
- Tema escuro: `#1A1B2E`, `#24263E`, `#2E3154`, `#3B5BDB`, `#050814`

## Tecnologias

- React 18
- Vite
- Tailwind CSS
- React Router
- JavaScript moderno
- `localStorage`
- Service worker PWA

## Estrutura

```text
enem-planner/
├── index.html
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   └── styles/
├── public/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Como executar

1. Instale as dependências com `npm install`.
2. Inicie o ambiente de desenvolvimento com `npm run dev`.
3. Gere a build final com `npm run build`.
4. Visualize a build com `npm run preview`.

## Publicação

O projeto está pronto para **GitHub Pages** ou **Vercel**.

### GitHub Pages

1. Faça o push do repositório para o GitHub.
2. Configure o Pages para publicar a branch principal.
3. Como o app usa `HashRouter` e `base: './'`, os caminhos ficam compatíveis com deploy estático.

### Vercel

1. Importe o repositório no Vercel.
2. O Vite será detectado automaticamente.
3. A publicação funciona sem ajustes extras.

## Observações

- O projeto é totalmente estático, roda sem backend e funciona offline depois da primeira carga.
- Todas as informações persistem no navegador.
- A experiência foi desenhada para uso diário no celular.