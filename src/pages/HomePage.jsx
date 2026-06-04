import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatTile, StatusBadge } from '../components/Ui';
import PomodoroWidget from '../components/PomodoroWidget';

function statusLabel(status) {
  if (status === 'done') return 'Estudado';
  if (status === 'perdido') return 'Perdido';
  if (status === 'rest') return 'Descanso';
  if (status === 'simulado') return 'Simulado';
  return 'Pendente';
}

function StudyItemCard({ item, onStatus }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{item.subjectLabel}</p>
          <strong className="mt-1 block text-base font-black tracking-tight text-[var(--text)]">{item.title}</strong>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status={item.priority}>{item.priorityLabel}</StatusBadge>
            <StatusBadge status={item.status}>{statusLabel(item.status)}</StatusBadge>
            {item.isRescheduled ? <StatusBadge status="review">Reagendado</StatusBadge> : null}
          </div>
        </div>
        <StatusBadge status={item.status}>{statusLabel(item.status)}</StatusBadge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" onClick={() => onStatus(item.id, 'done')} className="app-button-secondary w-full text-xs">Estudado</button>
        <button type="button" onClick={() => onStatus(item.id, 'perdido')} className="app-button-secondary w-full text-xs">Perdido</button>
        <button type="button" onClick={() => onStatus(item.id, 'pending')} className="app-button-secondary w-full text-xs">Pendente</button>
      </div>
    </div>
  );
}

// OverdueCard removed (unused)

function ReminderCard({ item }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-white/10 text-xl">{item.emoji}</div>
        <div>
          <strong className="block text-base font-black tracking-tight text-[var(--text)]">{item.title}</strong>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { dashboard, actions, state, schedule } = usePlanner();
  const [showMore] = useState(false);
  const displayName = state.settings.profileName?.trim() || 'Seu nome';
  const today = new Date().toISOString().slice(0, 10);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  function getContentStatus(contentId) {
    return state?.contentStatuses?.[contentId] || 'pending';
  }

  function getContentItems() {
    return schedule?.weeks?.flatMap((week) =>
      week.days.map((day) => ({
        id: day.contentId,
        title: day.subject || 'N/A',
        subjectLabel: day.subject || 'N/A',
        description: day.title || ''
      }))
    ) || [];
  }

  const reminders = dashboard.reminders.slice(0, 3);
  const todayItems = dashboard.todayReviewDay ? dashboard.todayReviewItems.slice(0, 4) : dashboard.todayStudyItems.slice(0, 4);
  const motivation = dashboard.motivations[0];
  const hasMoreToday = dashboard.todayReviewDay ? dashboard.todayReviewItems.length > todayItems.length : dashboard.todayStudyItems.length > todayItems.length;
  const nextActiveDay = schedule.weeks.flatMap((week) => week.days).find((day) => day.date > today && (day.type === 'study' || day.type === 'review'));
  
  // Auto-classificar conteúdos atrasados como perdidos
  const overduePendingItems = schedule.weeks
    .flatMap((week) => week.days)
    .filter((day) => day.type === 'study' && day.date < today && day.contentId && getContentStatus(day.contentId) === 'pending')
    .map((day) => day.contentId);
  
  // Aplicar auto-classificação
  if (overduePendingItems.length > 0) {
    overduePendingItems.forEach((contentId) => {
      actions.setContentStatus(contentId, 'perdido');
    });
  }

  // Conteúdos atrasados (com status de loss)
  const overdueItems = schedule.weeks
    .flatMap((week) => week.days)
    .filter((day) => day.type === 'study' && day.date < today && day.contentId && getContentStatus(day.contentId) === 'perdido')
    .map((day) => day)
    .filter(Boolean)
    .slice(0, 10);

  const nextStudyMessage = dashboard.todayReviewDay
    ? 'Hoje é dia de revisar.'
    : dashboard.todayStudyItems.length > 0
      ? 'Hoje é dia de estudar.'
    : nextActiveDay
      ? `Faltam ${Math.max(1, Math.round((new Date(`${nextActiveDay.date}T00:00:00`) - new Date(`${today}T00:00:00`)) / 86400000))} dias para seu próximo estudo.`
      : 'Seu próximo estudo já está perto.';

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">{getGreeting()}, {displayName}</p>
            <h1 className="max-w-xl text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">Seu assistente de estudos do ENEM</h1>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="done">{dashboard.completion}% concluído</StatusBadge>
              <StatusBadge status={dashboard.daysUntilEnem > 30 ? 'pending' : 'simulado'}>{dashboard.daysUntilEnem} dias ENEM</StatusBadge>
            </div>
            <p className="max-w-2xl text-base font-semibold text-[var(--muted)]">{nextStudyMessage}</p>
          </div>

          <div className="min-w-[110px] rounded-[26px] border border-[var(--border)] bg-white/5 p-4 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">ENEM</p>
            <strong className="mt-2 block text-4xl font-black tracking-tight text-[var(--text)]">{dashboard.daysUntilEnem}</strong>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">dias restantes</p>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Avisos importantes" title="Painel de lembretes" />
          <div className="mt-4 grid gap-3">
            {reminders.length === 0 ? (
              <EmptyState title="Tudo sob controle" subtitle="Hoje não há alertas urgentes. Continue seguindo o plano." />
            ) : reminders.map((item) => <ReminderCard key={`${item.emoji}-${item.title}`} item={item} />)}
          </div>
        </GlassCard>

        {overdueItems.length > 0 && (
          <GlassCard className="p-4 sm:p-5 border-red-500/30 bg-red-500/5">
            <SectionHeader eyebrow="⚠️ Atenção" title="Conteúdos atrasados" />
            <div className="mt-4 grid gap-3">
              <div className="rounded-[24px] border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-sm font-bold text-red-500 mb-3">
                  Você possui {overdueItems.length} conteúdo{overdueItems.length !== 1 ? 's' : ''} atrasado{overdueItems.length !== 1 ? 's' : ''}.
                </p>
                <p className="text-xs opacity-70 mb-4">Eles já estão prontos para revisão e reagendamento.</p>
                <div className="space-y-2">
                  {overdueItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="text-xs p-2 rounded bg-white/5 border border-red-500/20">
                      <p className="font-semibold">{item.title}</p>
                      <p className="opacity-70">{item.subjectLabel}</p>
                    </div>
                  ))}
                  {overdueItems.length > 3 && (
                    <p className="text-xs opacity-70 text-center pt-2">+ {overdueItems.length - 3} mais conteúdo{overdueItems.length - 3 !== 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow={dashboard.todayReviewDay ? 'Revisão de hoje' : 'Estudos de hoje'} title={dashboard.todayReviewDay ? 'Flashcards e revisão espaçada' : 'Conteúdos programados'} />
          <div className="mt-4 grid gap-3">
            {todayItems.length === 0 ? (
              <EmptyState title={dashboard.todayReviewDay ? 'Sem flashcards para hoje' : 'Sem estudos para hoje'} subtitle={dashboard.todayReviewDay ? 'Ainda não há cartões liberados para a revisão de hoje.' : 'Seu cronograma não tem novos itens programados para hoje.'} />
            ) : dashboard.todayReviewDay ? (
              <div className="rounded-[24px] border border-[var(--border)] bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4">
                <p className="text-sm font-semibold">Você tem <span className="font-black">{dashboard.todayReviewItems.length} flashcards</span> para revisar hoje.</p>
                <button
                  onClick={() => navigate('/flashcards')}
                  className="app-button-primary mt-3 w-full"
                >
                  Começar revisão →
                </button>
              </div>
            ) : (
              todayItems.map((item) => <StudyItemCard key={item.id} item={item} onStatus={actions.setContentStatus} />)
            )}
          </div>
          {!dashboard.todayReviewDay && hasMoreToday ? <p className="mt-3 text-sm font-semibold text-[var(--muted)]">+ {dashboard.todayStudyItems.length - todayItems.length} itens também estão programados para hoje.</p> : null}
        </GlassCard>
      </section>

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Progresso" title="Painel de evolução" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile label="Concluído" value={`${dashboard.completion}%`} caption={`${dashboard.completed}/${dashboard.total}`} tone="brand" />
          <StatTile label="Estudados" value={dashboard.completed} caption="conteúdos finalizados" tone="good" />
          <StatTile label="Pendentes" value={dashboard.pending} caption="aguardando estudo" tone="warn" />
          <StatTile label="Perdidos" value={dashboard.lost} caption="a revisar" tone="bad" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Barra de progresso</p>
            <div className="mt-3"><ProgressBar value={Math.max(0, Math.min(100, dashboard.completion))} /></div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{dashboard.progressDelta >= 0 ? 'Seu progresso subiu' : 'Seu progresso caiu'} {Math.abs(dashboard.progressDelta)} pontos em relação à semana anterior.</p>
          </div>

          <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Motivação</p>
            <p className="mt-2 text-base font-black tracking-tight text-[var(--text)]">{motivation}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Próximo dia de estudo: {nextActiveDay ? nextActiveDay.weekday : 'sem data'}.</p>
          </div>
        </div>
      </GlassCard>

      {showMore || state.focusMode ? (
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Atividades pendentes" title={`Semana ${dashboard.currentWeek.weekNumber}`} subtitle="Visão compacta da semana e dos blocos atuais." />
          <div className="mt-4 grid gap-3">
            {dashboard.currentWeek.days.map((day) => {
              const status = day.type === 'study' ? state.contentStatuses[day.contentId] || 'pending' : day.type;
              return (
                <div key={day.date} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{day.weekday}</p>
                      <strong className="mt-1 block text-base font-black tracking-tight text-[var(--text)]">{day.title}</strong>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{day.description}</p>
                    </div>
                    <StatusBadge status={status}>{statusLabel(status)}</StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      ) : null}

      <PomodoroWidget />
    </div>
  );
}
