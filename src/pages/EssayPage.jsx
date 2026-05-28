import React, { useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatusBadge } from '../components/Ui';
import { SparkIcon, PenIcon, ChartIcon, BookIcon, SettingsIcon } from '../components/Icons';

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function analyzeEssay(text) {
  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const paragraphs = cleanText ? cleanText.split(/\n\s*\n/).filter((part) => part.trim().length > 0) : [];
  const connectorCount = (cleanText.match(/\b(além disso|portanto|entretanto|desse modo|ademáis|assim|logo|por conseguinte|em síntese)\b/gi) || []).length;
  const hasIntervention = /interven|proposta|governo|escola|sociedade|fam[ií]lia/i.test(cleanText);
  const hasThesis = /\b(defendo|percebe-se|nota-se|constata-se|é possível|fica evidente)\b/i.test(cleanText);
  const introScore = hasThesis ? 10 : 6;
  const developmentScore = Math.min(12, Math.round((paragraphs.length >= 3 ? 12 : paragraphs.length * 4) + Math.min(4, connectorCount)));
  const conclusionScore = hasIntervention ? 20 : 12;
  const languageScore = Math.min(20, Math.round(8 + Math.min(12, words.length / 18) + Math.min(4, connectorCount * 2)));
  const repertoireScore = /Constitui[cç][aã]o|direitos humanos|Freire|Bauman|Santos|Buarque/i.test(cleanText) ? 20 : 10;
  const total = Math.min(100, introScore + developmentScore + conclusionScore + languageScore + repertoireScore);

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
    paragraphCount: paragraphs.length,
    wordCount: words.length,
    connectorCount
  };
}

export default function EssayPage() {
  const { state, essayTopics, connectors, actions } = usePlanner();
  const draft = state.essayDraft;
  const [analysisTopic, setAnalysisTopic] = useState(draft.topic);

  const wordCount = useMemo(() => draft.text.trim().split(/\s+/).filter(Boolean).length, [draft.text]);
  const analysis = useMemo(() => analyzeEssay(draft.text), [draft.text]);

  function updateDraft(next) {
    actions.updateEssayDraft({ ...draft, ...next });
    if (next.topic) setAnalysisTopic(next.topic);
  }

  function insertToken(token) {
    updateDraft({ text: `${draft.text}${draft.text ? ' ' : ''}${token}` });
  }

  function randomTopic() {
    const nextTopic = pickRandom(essayTopics);
    updateDraft({ topic: nextTopic });
    setAnalysisTopic(nextTopic);
  }

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Redação" title="Corretor IA de redação" subtitle="Escreva seu texto, sorteie um tema e receba uma análise automática com pontos fortes e o que melhorar." icon={<SparkIcon className="h-4 w-4" />} />
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Tema atual</p>
              <strong className="mt-1 block text-2xl font-black tracking-tight text-[var(--text)]">{analysisTopic}</strong>
            </div>
            <StatusBadge status="simulado">autosave</StatusBadge>
          </div>

          <div className="mt-4 space-y-3">
            <select className="input-shell w-full" value={draft.topic} onChange={(event) => updateDraft({ topic: event.target.value })}>
              {essayTopics.map((topic) => <option key={topic}>{topic}</option>)}
            </select>

            <textarea
              className="input-shell min-h-[260px] w-full rounded-[28px] p-4 leading-7"
              placeholder="Escreva sua redação aqui..."
              value={draft.text}
              onChange={(event) => updateDraft({ text: event.target.value })}
            />

            <div className="flex flex-wrap gap-2">
              {connectors.map((item) => (
                <button key={item} type="button" onClick={() => insertToken(item)} className="app-button-secondary rounded-full">
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="app-button-primary" onClick={() => actions.saveEssay(draft)}>
                Salvar redação
              </button>
              <button type="button" className="app-button-secondary" onClick={() => updateDraft({ text: '' })}>
                Limpar
              </button>
              <button type="button" className="app-button-secondary" onClick={randomTopic}>
                Sortear tema
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4">
          <GlassCard className="p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Métricas</p>
            <strong className="mt-2 block text-4xl font-black">{wordCount}</strong>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">palavras no rascunho atual</p>
            <div className="mt-3"><ProgressBar value={Math.min(100, Math.round((wordCount / 250) * 100))} /></div>
          </GlassCard>

          <GlassCard className="p-4">
            <SectionHeader eyebrow="IA" title="Correção automática" subtitle="A análise abaixo simula um corretor inteligente local com feedback rápido." icon={<ChartIcon className="h-4 w-4" />} />
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Nota estimada</p>
                <strong className="mt-2 block text-4xl font-black text-[var(--text)]">{analysis.total}</strong>
              </div>
              <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Sugestão de tese</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text)]">{analysis.suggestion}</p>
              </div>
              <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Pontos fortes</p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--text)]">
                  {analysis.strengths.length ? analysis.strengths.map((item) => <li key={item}>• {item}</li>) : <li>• Escreva um pouco mais para a IA marcar os pontos fortes.</li>}
                </ul>
              </div>
              <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Melhorias</p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--text)]">
                  {analysis.improvements.length ? analysis.improvements.map((item) => <li key={item}>• {item}</li>) : <li>• Texto bem estruturado. Faça uma revisão final de clareza.</li>}
                </ul>
              </div>
              <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4 text-sm leading-6 text-[var(--muted)]">
                <strong className="block text-[var(--text)]">Detalhes da correção</strong>
                <p className="mt-2">Parágrafos: {analysis.paragraphCount} · Palavras: {analysis.wordCount} · Conectivos detectados: {analysis.connectorCount}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-4">
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

        <GlassCard className="p-4">
          <SectionHeader eyebrow="Estrutura" title="Checklist ENEM" subtitle="Lembretes rápidos para manter a redação sempre dentro da proposta." />
          <div className="mt-4 grid gap-3">
            {['Introdução com tese clara', 'Dois desenvolvimentos objetivos', 'Repertório sociocultural', 'Conectivos de progressão', 'Proposta de intervenção completa'].map((item) => (
              <div key={item} className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4 text-sm font-semibold text-[var(--text)]">
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}