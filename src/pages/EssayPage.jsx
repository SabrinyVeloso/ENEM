import React, { useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatusBadge } from '../components/Ui';
import { SparkIcon, ChartIcon } from '../components/Icons';

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clampScore(value) {
  return Math.max(0, Math.min(200, Math.round(value)));
}

function scoreBand(level) {
  if (level >= 5) return 200;
  if (level >= 4) return 160;
  if (level >= 3) return 120;
  if (level >= 2) return 80;
  if (level >= 1) return 40;
  return 0;
}

function getTopicKeywords(topic) {
  const stopWords = new Set(['desafios', 'para', 'da', 'de', 'do', 'das', 'dos', 'no', 'na', 'nas', 'nos', 'e', 'o', 'a', 'as', 'os', 'em', 'um', 'uma', 'brasil', 'brasileira', 'brasileiro', 'sociedade', 'sociais']);
  const topicText = topic.replace(/^\d{4}\s*-\s*/, '').toLowerCase();
  return topicText
    .split(/[^a-zà-ú0-9]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length > 3 && !stopWords.has(word));
}

function analyzeEssay(text, topic = '') {
  const cleanText = text.trim();
  if (!cleanText) {
    return {
      total: 0,
      strengths: [],
      improvements: ['Escreva o texto para iniciar a correção.'],
      suggestion: 'Escreva seu texto para receber a correção.',
      competencies: [
        { id: 'c1', label: 'Competência 1', score: 0 },
        { id: 'c2', label: 'Competência 2', score: 0 },
        { id: 'c3', label: 'Competência 3', score: 0 },
        { id: 'c4', label: 'Competência 4', score: 0 },
        { id: 'c5', label: 'Competência 5', score: 0 }
      ],
      paragraphCount: 0,
      wordCount: 0,
      connectorCount: 0
    };
  }

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const paragraphs = cleanText ? cleanText.split(/\n\s*\n/).filter((part) => part.trim().length > 0) : [];
  const sentences = cleanText.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean);
  const punctuationCount = (cleanText.match(/[.,;:!?]/g) || []).length;
  const connectorCount = (cleanText.match(/\b(além disso|portanto|entretanto|desse modo|ademáis|assim|logo|por conseguinte|em síntese)\b/gi) || []).length;
  const topicKeywords = getTopicKeywords(topic);
  const topicHits = topicKeywords.filter((keyword) => cleanText.toLowerCase().includes(keyword));
  const topicCoverage = topicKeywords.length ? topicHits.length / topicKeywords.length : 0;
  const hasIntervention = /interven|proposta|governo|escola|sociedade|fam[ií]lia/i.test(cleanText);
  const hasThesis = /\b(defendo|percebe-se|nota-se|constata-se|é possível|fica evidente)\b/i.test(cleanText);
  const repertoireMatch = /Constitui[cç][aã]o|direitos humanos|Freire|Bauman|Santos|Buarque|cidadania|democracia|educa[cç][aã]o/i.test(cleanText);
  const hasAgent = /escola|governo|estado|fam[ií]lia|mídia|sociedade|prefeitura|ministerio|ministério/i.test(cleanText);
  const hasAction = /garant|promov|incentiv|ampli|desenvolv|combater|reduzir|criar|implementar|oferecer/i.test(cleanText);
  const hasMeans = /por meio|atrav[eé]s|com apoio|mediante|utilizando/i.test(cleanText);
  const hasPurpose = /para|a fim de|com o objetivo|visando/i.test(cleanText);
  const hasRights = /direitos humanos|constitui[cç][aã]o|cidadania/i.test(cleanText);
  const strongLength = words.length >= 120;
  const solidLength = words.length >= 90;
  const wellStructured = paragraphs.length >= 2 || sentences.length >= 4;
  const connectedText = connectorCount >= 2 || punctuationCount >= 6;
  const topicAligned = topicCoverage >= 0.5 || topicHits.length >= 2;
  const essayFlow = /primeiramente|em primeiro lugar|além disso|por outro lado|dessa forma|desse modo|logo|portanto|conclui-se|em síntese/i.test(cleanText);

  const competency1 = scoreBand((solidLength ? 2 : 0) + (strongLength ? 1 : 0) + (wellStructured ? 1 : 0) + (punctuationCount >= 6 ? 1 : 0) + (hasThesis ? 1 : 0));
  const competency2 = scoreBand((topicAligned ? 2 : 0) + (hasThesis ? 1 : 0) + (repertoireMatch ? 1 : 0) + (wellStructured ? 1 : 0) + (words.length >= 110 ? 1 : 0));
  const competency3 = scoreBand((words.length >= 100 ? 1 : 0) + (words.length >= 140 ? 1 : 0) + (hasThesis ? 1 : 0) + (essayFlow ? 1 : 0) + ((/primeiramente|além disso|por outro lado|além de|em seguida|por fim/i.test(cleanText)) ? 1 : 0));
  const competency4 = scoreBand((connectorCount >= 1 ? 1 : 0) + (connectorCount >= 2 ? 1 : 0) + (connectorCount >= 3 ? 1 : 0) + (connectedText ? 1 : 0) + (paragraphs.length >= 2 ? 1 : 0));
  const competency5 = scoreBand((hasIntervention ? 1 : 0) + (hasAgent ? 1 : 0) + (hasAction ? 1 : 0) + (hasMeans ? 1 : 0) + ((hasPurpose || hasRights) ? 1 : 0));

  const competencies = [
    { id: 'c1', label: 'Competência 1', score: competency1 },
    { id: 'c2', label: 'Competência 2', score: competency2 },
    { id: 'c3', label: 'Competência 3', score: competency3 },
    { id: 'c4', label: 'Competência 4', score: competency4 },
    { id: 'c5', label: 'Competência 5', score: competency5 }
  ];

  const total = Math.min(1000, competencies.reduce((acc, item) => acc + item.score, 0));

  const strengths = [];
  const improvements = [];

  if (words.length >= 180) strengths.push('Boa extensão textual para a proposta do ENEM.'); else improvements.push('Amplie o texto para chegar com mais segurança à faixa ideal de 20 a 30 linhas.');
  if (paragraphs.length >= 3) strengths.push('Estrutura de parágrafos está organizada.'); else improvements.push('Separe introdução, desenvolvimento e conclusão em blocos visíveis.');
  if (connectorCount >= 2) strengths.push('Há progressão textual com conectivos.'); else improvements.push('Use mais conectivos para dar fluidez entre as ideias.');
  if (hasIntervention) strengths.push('A conclusão sinaliza proposta de intervenção.'); else improvements.push('Inclua proposta de intervenção com agente, ação, meio e finalidade.');
  if (hasThesis) strengths.push('A tese aparece com clareza.'); else improvements.push('Deixe a tese explícita já na introdução.');

  const suggestion = cleanText
    ? `Tese sugerida: ${pickRandom([
        'é urgente discutir o impacto social do tema no cotidiano brasileiro.',
        'exige intervenção articulada entre escola, família e poder público.',
        'precisa ser enfrentado com educação, informação e políticas públicas.'
      ])}`
    : 'Escreva seu texto para receber a correção.';

  return {
    total,
    strengths,
    improvements,
    suggestion,
    competencies,
    paragraphCount: paragraphs.length,
    wordCount: words.length,
    connectorCount
  };
}

export default function EssayPage() {
  const { state, essayTopics, actions } = usePlanner();
  const draft = state.essayDraft;
  const [analysisTopic, setAnalysisTopic] = useState(draft.topic);

  const wordCount = useMemo(() => draft.text.trim().split(/\s+/).filter(Boolean).length, [draft.text]);
  const analysis = useMemo(() => analyzeEssay(draft.text, draft.topic), [draft.text, draft.topic]);

  function updateDraft(next) {
    actions.updateEssayDraft({ ...draft, ...next });
    if (next.topic) setAnalysisTopic(next.topic);
  }

  function randomTopic() {
    const nextTopic = pickRandom(essayTopics);
    updateDraft({ topic: nextTopic });
    setAnalysisTopic(nextTopic);
  }

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Redação" title="Corretor IA de redação" subtitle="Escreva sua redação em uma folha pautada, sorteie um tema único e acompanhe a análise de forma limpa." icon={<SparkIcon className="h-4 w-4" />} />
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Tema atual</p>
              <strong className="mt-1 block text-2xl font-black tracking-tight text-[var(--text)]">{analysisTopic || 'Tema ainda não sorteado'}</strong>
            </div>
            <StatusBadge status={analysisTopic ? 'simulado' : 'pending'}>{analysisTopic ? 'sorteado' : 'aguardando'}</StatusBadge>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3 sm:p-4">
              <textarea
                className="input-shell essay-paper min-h-[320px] w-full resize-none rounded-[24px] p-4 leading-[2rem] sm:min-h-[380px]"
                placeholder="Escreva sua redação aqui..."
                value={draft.text}
                onChange={(event) => updateDraft({ text: event.target.value })}
              />
            </div>

            <button type="button" className="app-button-secondary w-full" onClick={randomTopic}>
              🎲 Sortear Tema
            </button>

            <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Tema sorteado</p>
              <p className="mt-2 text-base font-bold leading-7 text-[var(--text)]">{analysisTopic || 'Toque em Sortear Tema para receber um tema aleatório.'}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="app-button-primary" onClick={() => actions.saveEssay(draft)}>
                Salvar redação
              </button>
              <button type="button" className="app-button-secondary" onClick={() => updateDraft({ text: '' })}>
                Limpar
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4">
          <GlassCard className="p-4 sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Métricas</p>
            <strong className="mt-2 block text-4xl font-black">{wordCount}</strong>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">palavras no rascunho atual</p>
            <div className="mt-3"><ProgressBar value={Math.min(100, Math.round((wordCount / 250) * 100))} /></div>
            <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-white/5 p-4 text-sm leading-6 text-[var(--muted)]">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Escala ENEM</p>
              <p className="mt-2 text-[var(--text)]">A nota vai de 0 a 1000, com 5 competências de até 200 pontos cada.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge status="pending">0</StatusBadge>
                <StatusBadge status="pending">40</StatusBadge>
                <StatusBadge status="pending">80</StatusBadge>
                <StatusBadge status="pending">120</StatusBadge>
                <StatusBadge status="pending">160</StatusBadge>
                <StatusBadge status="pending">200</StatusBadge>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5">
            <SectionHeader eyebrow="IA" title="Correção automática" subtitle="A análise abaixo simula um corretor inteligente local com feedback rápido." icon={<ChartIcon className="h-4 w-4" />} />
            <div className="mt-4 grid gap-3">
              <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Nota estimada</p>
                <strong className="mt-2 block text-4xl font-black text-[var(--text)]">{analysis.total}</strong>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">de 1000 pontos</p>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4 text-sm leading-6 text-[var(--muted)]">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Resumo rápido</p>
                <p className="mt-2 text-[var(--text)]">{analysis.suggestion}</p>
                <p className="mt-3">Parágrafos: {analysis.paragraphCount} · Palavras: {analysis.wordCount}</p>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Competências ENEM</p>
                <div className="mt-3 grid gap-2">
                  {analysis.competencies.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-[18px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] px-3 py-2">
                      <span className="text-sm font-semibold text-[var(--text)]">{item.label}</span>
                      <strong className="text-sm font-black text-[var(--text)]">{item.score}/200</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Pontos fortes</p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--text)]">
                  {analysis.strengths.length ? analysis.strengths.map((item) => <li key={item}>• {item}</li>) : <li>• Escreva um pouco mais para a análise ficar mais precisa.</li>}
                </ul>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Melhorias</p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--text)]">
                  {analysis.improvements.length ? analysis.improvements.map((item) => <li key={item}>• {item}</li>) : <li>• Texto bem estruturado. Faça uma revisão final de clareza.</li>}
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Histórico" title="Últimas redações" subtitle="Tudo fica salvo localmente e pode ser retomado depois." />
          <div className="mt-4 grid gap-3">
            {state.essays.length === 0 ? (
              <EmptyState title="Nenhuma redação salva" subtitle="Escreva o primeiro texto para iniciar o histórico." />
            ) : (
              state.essays.slice(0, 6).map((essay) => (
                <div key={essay.id} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <strong className="text-sm font-black text-[var(--text)]">{essay.topic}</strong>
                    <StatusBadge status="done">salvo</StatusBadge>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{essay.text}</p>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}