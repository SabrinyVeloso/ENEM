
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatTile, StatusBadge } from '../components/Ui';

const subjectLabels = {
  math: 'Matemática',
  language: 'Linguagens',
  humanas: 'Humanas',
  nature: 'Natureza',
  essay: 'Redação'
};

function formatPercent(value) {
  return `${Math.max(0, Math.min(100, Math.round(value || 0)))}%`;
}

function SubjectSummary({ label, count, total }) {
  const progress = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="rounded-[20px] border border-[var(--border)] bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{label}</p>
        <strong className="text-base font-black text-[var(--text)]">{count}</strong>
      </div>
      <div className="mt-3">
        <ProgressBar value={progress} />
      </div>
    </div>
  );
}

export default function RevisaoPage() {
  const { dashboard } = usePlanner();
  const deck = dashboard.reviewDeck || [];
  const totalCards = deck.length;
  const dueCards = dashboard.reviewDueCount || 0;
  const answered = dashboard.flashcardAnswered || 0;
  const accuracy = answered > 0 ? (dashboard.flashcardCorrect / answered) * 100 : 0;
  const subjectEntries = Object.entries(dashboard.flashcardSubjectCounts || {}).sort((a, b) => b[1] - a[1]);

  const difficultCards = useMemo(
    () => deck.filter((card) => (card.incorrect || 0) > (card.correct || 0)).slice(0, 5),
    [deck]
  );

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="overflow-hidden p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeader
            eyebrow="Revisão"
            title="Prepare sua sessão de flashcards"
            subtitle="Aqui ficam apenas o resumo, o progresso e os dados da revisão. A experiência de estudo abre em uma tela exclusiva, sem menus ou distrações."
          />

          <div className="rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.08)] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Fila atual</p>
                <strong className="mt-1 block text-4xl font-black tracking-tight text-[var(--text)]">{totalCards}</strong>
              </div>
              <StatusBadge status={dueCards > 0 ? 'review' : 'done'}>{dueCards > 0 ? `${dueCards} para hoje` : 'em dia'}</StatusBadge>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
                <span>Cards pendentes</span>
                <span>{dueCards}/{Math.max(1, totalCards)}</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={(dueCards / Math.max(1, totalCards)) * 100} />
              </div>
            </div>

            <Link
              to="/revisao/estudar"
              className={`mt-5 w-full ${totalCards > 0 ? 'app-button-primary' : 'app-button-secondary pointer-events-none opacity-60'}`}
              aria-disabled={totalCards === 0}
            >
              Iniciar Revisão
            </Link>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-4">
        <StatTile label="Flashcards" value={totalCards} caption="disponíveis para estudo" tone="brand" />
        <StatTile label="Acertos" value={dashboard.flashcardCorrect} caption="respostas corretas" tone="good" />
        <StatTile label="Erros" value={dashboard.flashcardIncorrect} caption="pontos a reforçar" tone="bad" />
        <StatTile label="Aproveitamento" value={formatPercent(accuracy)} caption="taxa geral" tone="warn" />
      </section>
<section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">

  <GlassCard className="p-4 sm:p-5">
    <SectionHeader
      eyebrow="Progresso"
      title="Estatísticas da revisão"
      subtitle="Esses números são atualizados conforme você responde os cards."
    />

    <div className="mt-4 grid gap-3">
      <div className="rounded-[20px] border border-[var(--border)] bg-white/5 p-4">
        <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
          <span>Histórico respondido</span>
          <span>{answered}</span>
        </div>

        <div className="mt-2">
          <ProgressBar value={accuracy} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] border border-[var(--border)] bg-white/5 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">
            Últimos 7 dias
          </p>
          <strong className="mt-1 block text-2xl font-black text-[var(--text)]">
            {dashboard.flashcardWeeklyHistory.length}
          </strong>
        </div>

        <div className="rounded-[20px] border border-[var(--border)] bg-white/5 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">
            Este mês
          </p>
          <strong className="mt-1 block text-2xl font-black text-[var(--text)]">
            {dashboard.flashcardMonthlyHistory.length}
          </strong>
        </div>
      </div>
    </div>
  </GlassCard>


</section>

<GlassCard className="p-4 sm:p-5">
  <SectionHeader
    eyebrow="Matérias"
    title="Cobertura dos flashcards"
    subtitle="Veja a distribuição da fila antes de iniciar a sessão."
  />

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    {subjectEntries.length === 0 ? (
      <EmptyState
        title="Ainda sem dados"
        subtitle="Conclua conteúdos do cronograma para gerar cartões de revisão."
      />
    ) : (
      subjectEntries.map(([subject, count]) => (
        <SubjectSummary
          key={subject}
          label={subjectLabels[subject] || subject}
          count={count}
          total={totalCards}
        />
      ))
    )}
  </div>
</GlassCard>
    </div>
  );
}