import React, { useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatusBadge } from '../components/Ui';
import { formatLongDate } from '../data/planner';
import PomodoroWidget from '../components/PomodoroWidget';

function CompactDay({ day, status, onStatus }) {
  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{day.weekday}</p>
          <strong className="mt-1 block text-base font-black tracking-tight text-[var(--text)]">{day.title}</strong>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{day.description}</p>
          {day.blocks ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {day.blocks.map((block) => (
                <StatusBadge key={block} status={block === 'Exercícios' ? 'simulado' : block === 'Revisão' ? 'review' : 'pending'}>{block}</StatusBadge>
              ))}
              {day.focus ? <StatusBadge status={day.focus === 'Muito alta' ? 'hot' : day.focus === 'Alta' ? 'frequent' : 'medium'}>{day.focus}</StatusBadge> : null}
            </div>
          ) : null}
        </div>
        <StatusBadge status={status}>{status === 'rest' ? 'descanso' : status}</StatusBadge>
      </div>

      {day.type === 'study' ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button type="button" onClick={() => onStatus(day.contentId, 'done')} className="app-button-secondary w-full text-xs">Estudado</button>
          <button type="button" onClick={() => onStatus(day.contentId, 'lost')} className="app-button-secondary w-full text-xs">Perdido</button>
          <button type="button" onClick={() => onStatus(day.contentId, 'pending')} className="app-button-secondary w-full text-xs">Pendente</button>
        </div>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const { dashboard, actions, state } = usePlanner();
  const [showMore, setShowMore] = useState(false);
  const displayName = state.settings.profileName?.trim() || 'Seu nome';

  const currentDay = dashboard.currentDay;
  const currentStatus = currentDay.type === 'study' ? state.contentStatuses[currentDay.contentId] || 'pending' : currentDay.type;
  const reviewItems = dashboard.reviewItems.slice(0, 3);

  const upcomingTask = useMemo(() => {
    const nextStudy = dashboard.currentWeek.days.find((day) => day.type === 'study' && day.date > currentDay.date);
    return nextStudy || dashboard.currentWeek.days.find((day) => day.type === 'study') || currentDay;
  }, [currentDay.date, dashboard.currentWeek.days]);

  const summaryLabel = currentDay.type === 'study' ? currentDay.title : 'Recuperação e revisão leve';

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">Bom dia, {displayName}</p>
            <h1 className="max-w-xl text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">Hoje você vai estudar com foco e menos ruído.</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">{summaryLabel}</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="simulado">🔥 {dashboard.streak} dias seguidos</StatusBadge>
              <StatusBadge status="done">{dashboard.currentWeekProgress}% da semana</StatusBadge>
              <StatusBadge status={dashboard.daysUntilEnem > 30 ? 'pending' : 'simulado'}>{dashboard.daysUntilEnem} dias ENEM</StatusBadge>
            </div>
          </div>

          <div className="min-w-[110px] rounded-[26px] border border-[var(--border)] bg-white/5 p-4 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">ENEM</p>
            <strong className="mt-2 block text-4xl font-black tracking-tight text-[var(--text)]">{dashboard.daysUntilEnem}</strong>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">dias restantes</p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Hoje</p>
            <strong className="mt-2 block text-xl font-black tracking-tight text-[var(--text)]">{currentDay.title}</strong>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{formatLongDate(currentDay.date)}</p>
            <div className="mt-3">
              <ProgressBar value={currentDay.type === 'study' ? (currentStatus === 'done' ? 100 : currentStatus === 'lost' ? 20 : 45) : 60} />
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Próxima tarefa</p>
            <strong className="mt-2 block text-lg font-black tracking-tight text-[var(--text)]">{upcomingTask.title}</strong>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{upcomingTask.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="app-button-primary" onClick={() => actions.toggleFocusMode()}>
            {state.focusMode ? 'Sair do modo foco' : 'Entrar em modo foco'}
          </button>
          <button type="button" className="app-button-secondary" onClick={() => setShowMore((current) => !current)}>
            {showMore ? 'Ocultar' : 'Ver mais'}
          </button>
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Hoje" title="Conteúdo atual" subtitle="Um toque para marcar o status e seguir sem distração." />
          <div className="mt-4">
            <CompactDay day={currentDay} status={currentStatus} onStatus={actions.setContentStatus} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Revisão" title="Revisar hoje" subtitle="Itens perdidos entram automaticamente quando vence o prazo de revisão." />
          <div className="mt-4 grid gap-3">
            {reviewItems.length === 0 ? (
              <EmptyState title="Nenhum item para revisar" subtitle="Marque um conteúdo como perdido para ele retornar automaticamente depois." />
            ) : (
              reviewItems.map((item) => (
                <div key={item.id} className="rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={item.priority}>{item.priorityLabel}</StatusBadge>
                    <StatusBadge status="review">Revisar</StatusBadge>
                  </div>
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{item.subjectLabel}</p>
                  <strong className="mt-1 block text-base font-black tracking-tight text-[var(--text)]">{item.title}</strong>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Revisar amanhã</p>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </section>

      {showMore || state.focusMode ? (
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Semana" title={`Semana ${dashboard.currentWeek.weekNumber}`} subtitle="Visão compacta da semana, escondida por padrão para manter a tela limpa." />
          <div className="mt-4 grid gap-3">
            {dashboard.currentWeek.days.map((day) => {
              const status = day.type === 'study' ? state.contentStatuses[day.contentId] || 'pending' : day.type;
              return <CompactDay key={day.date} day={day} status={status} onStatus={actions.setContentStatus} />;
            })}
          </div>
        </GlassCard>
      ) : null}

      <PomodoroWidget />
    </div>
  );
}
