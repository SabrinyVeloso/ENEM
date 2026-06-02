import React, { useMemo, useState } from 'react';
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

function SubjectSummary({ label, count }) {
  return (
    <div className="rounded-[20px] border border-[var(--border)] bg-white/5 px-3 py-2">
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{label}</p>
      <strong className="mt-1 block text-base font-black text-[var(--text)]">{count}</strong>
    </div>
  );
}

export default function RevisaoPage() {
  const { dashboard, actions } = usePlanner();
  const deck = dashboard.reviewDeck || [];
  const [cardIndex, setCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const currentCard = deck[cardIndex % deck.length] || null;
  const hasCards = deck.length > 0;

  const difficultCards = useMemo(() => deck.filter((card) => (card.incorrect || 0) > (card.correct || 0)).slice(0, 6), [deck]);
  const reappearCards = useMemo(() => deck.filter((card) => card.status === 'due').slice(0, 6), [deck]);
  const subjectEntries = Object.entries(dashboard.flashcardSubjectCounts || {}).sort((a, b) => b[1] - a[1]);

  function nextCard() {
    setShowBack(false);
    setDragOffset(0);
    setIsDragging(false);
    setCardIndex((current) => (deck.length ? (current + 1) % deck.length : 0));
  }

  function registerResult(result) {
    if (!currentCard) return;
    actions.recordFlashcardResult(currentCard, result);
    nextCard();
  }

  function finishDrag() {
    if (!showBack) {
      setDragOffset(0);
      setIsDragging(false);
      setShowBack(true);
      return;
    }

    if (dragOffset > 90) {
      registerResult('correct');
      return;
    }

    if (dragOffset < -90) {
      registerResult('incorrect');
      return;
    }

    setDragOffset(0);
    setIsDragging(false);
  }

  function handlePointerDown(event) {
    if (!currentCard) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    if (!isDragging || !showBack) return;
    setDragOffset((current) => current + event.movementX);
  }

  const accuracy = dashboard.flashcardAnswered > 0 ? (dashboard.flashcardCorrect / dashboard.flashcardAnswered) * 100 : 0;

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          eyebrow="Revisão"
          title="Flashcards inteligentes e revisão espaçada"
          subtitle="Revise apenas o que já foi estudado, arraste para acertar ou errar e deixe o algoritmo trazer os conteúdos difíceis mais vezes."
        />
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-4">
        <StatTile label="Acertos" value={dashboard.flashcardCorrect} caption="respostas corretas" tone="good" />
        <StatTile label="Erros" value={dashboard.flashcardIncorrect} caption="pontos a reforçar" tone="bad" />
        <StatTile label="Aproveitamento" value={formatPercent(accuracy)} caption="taxa de acerto" tone="brand" />
        <StatTile label="Sequência" value={`${dashboard.flashcardStreak} cards`} caption="máxima sequência" tone="warn" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Cartão atual</p>
              <strong className="mt-1 block text-2xl font-black tracking-tight text-[var(--text)]">
                {currentCard ? currentCard.sourceTitle : 'Sem flashcards disponíveis'}
              </strong>
            </div>
            <StatusBadge status={currentCard?.status === 'due' ? 'pending' : 'done'}>{currentCard?.status === 'due' ? 'revisar' : 'agendado'}</StatusBadge>
          </div>

          {hasCards && currentCard ? (
            <div className="mt-5">
              <div
                className="rounded-[32px] border border-[var(--border)] bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerLeave={() => setIsDragging(false)}
                style={{ transform: `translateX(${dragOffset}px) rotate(${dragOffset / 30}deg)`, transition: isDragging ? 'none' : 'transform 180ms ease' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status="review">{currentCard.subjectLabel}</StatusBadge>
                  <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">
                    {cardIndex + 1}/{deck.length}
                  </span>
                </div>

                <div className="mt-5 min-h-[220px] rounded-[28px] border border-[var(--border)] bg-[rgba(5,8,20,0.65)] p-5">
                  {!showBack ? (
                    <>
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Frente</p>
                      <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--text)]">{currentCard.front}</h3>
                      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Toque no cartão para revelar a resposta. Depois, arraste para a direita se acertou ou para a esquerda se errou.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Verso</p>
                      <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--text)]">{currentCard.back}</h3>
                      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">➡️ Direita: acertei. ⬅️ Esquerda: errei.</p>
                    </>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button type="button" className="app-button-secondary w-full" onClick={() => setShowBack((current) => !current)}>
                    {showBack ? 'Voltar' : 'Revelar resposta'}
                  </button>
                  <button type="button" className="app-button-primary w-full" onClick={nextCard}>
                    Próximo cartão
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => registerResult('correct')} className="app-button-primary w-full">
                  Acertei
                </button>
                <button type="button" onClick={() => registerResult('incorrect')} className="app-button-secondary w-full">
                  Errei
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState
                title="Nenhum flashcard disponível"
                subtitle="Conclua conteúdos do cronograma para gerar cartões de revisão automática."
              />
            </div>
          )}

          <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Distribuição semanal</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
                  <span>Cards agendados</span>
                  <span>{dashboard.reviewDueCount}</span>
                </div>
                <div className="mt-2"><ProgressBar value={Math.min(100, (dashboard.reviewDueCount / Math.max(1, deck.length)) * 100)} /></div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
                  <span>Total de cards</span>
                  <span>{deck.length}</span>
                </div>
                <div className="mt-2"><ProgressBar value={Math.min(100, (deck.length / 50) * 100)} /></div>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4">
          <GlassCard className="p-4 sm:p-5">
            <SectionHeader eyebrow="Semana" title="Revisão e reaparecimento" subtitle="O que precisa voltar mais cedo para consolidar a memória." />
            <div className="mt-4 grid gap-3">
              <StatTile label="Histórico da semana" value={dashboard.flashcardWeeklyHistory.length} caption="respostas nos últimos 7 dias" tone="brand" />
              <StatTile label="Histórico do mês" value={dashboard.flashcardMonthlyHistory.length} caption="respostas no mês atual" tone="good" />
              <StatTile label="Conteúdos difíceis" value={difficultCards.length} caption="cards com mais erros" tone="bad" />
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5">
            <SectionHeader eyebrow="Matérias" title="Cobertura por área" subtitle="A revisão é distribuída entre todas as áreas estudadas." />
            <div className="mt-4 grid gap-3">
              {subjectEntries.length === 0 ? (
                <EmptyState title="Ainda sem dados" subtitle="Estude conteúdos para ver a divisão por matérias." />
              ) : (
                subjectEntries.map(([subject, count]) => (
                  <SubjectSummary key={subject} label={subjectLabels[subject] || subject} count={count} />
                ))
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5">
            <SectionHeader eyebrow="Reaparecer" title="Cards que precisam voltar" subtitle="Os itens com mais erros aparecem primeiro nas próximas sessões." />
            <div className="mt-4 grid gap-3">
              {reappearCards.length === 0 ? (
                <EmptyState title="Nenhum card em atraso" subtitle="Os cartões revisados aqui ainda não precisam voltar imediatamente." />
              ) : (
                reappearCards.map((card) => (
                  <div key={card.id} className="rounded-[20px] border border-[var(--border)] bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{card.subjectLabel}</p>
                        <strong className="mt-1 block text-sm font-black text-[var(--text)]">{card.front}</strong>
                      </div>
                      <StatusBadge status={card.status === 'due' ? 'pending' : 'done'}>{card.status}</StatusBadge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Erros: {card.incorrect} · Acertos: {card.correct}</p>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5">
            <SectionHeader eyebrow="Desempenho" title="Histórico de revisão" subtitle="Esses números alimentam o espaçamento adaptativo." />
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status="done">acertos {dashboard.flashcardCorrect}</StatusBadge>
              <StatusBadge status="perdido">erros {dashboard.flashcardIncorrect}</StatusBadge>
              <StatusBadge status="simulado">taxa {formatPercent(accuracy)}</StatusBadge>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
