import React, { useState } from 'react';
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

function OverdueCard({ item, onStatus }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{item.subjectLabel}</p>
          <strong className="mt-1 block text-base font-black tracking-tight text-[var(--text)]">{item.title}</strong>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status="perdido">Atrasado</StatusBadge>
            {item.isRescheduled ? <StatusBadge status="review">Reagendado</StatusBadge> : null}
            <StatusBadge status={item.priority}>{item.priorityLabel}</StatusBadge>
          </div>
        </div>
        <StatusBadge status="perdido">{item.dueDate}</StatusBadge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" onClick={() => onStatus(item.id, 'done')} className="app-button-secondary w-full text-xs">Revisto</button>
        <button type="button" onClick={() => onStatus(item.id, 'pending')} className="app-button-secondary w-full text-xs">Pendente</button>
        <button type="button" onClick={() => onStatus(item.id, 'perdido')} className="app-button-secondary w-full text-xs">Manter</button>
      </div>
    </div>
  );
}

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
  const { dashboard, actions, state } = usePlanner();
  const [showMore, setShowMore] = useState(false);
  const displayName = state.settings.profileName?.trim() || 'Seu nome';

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  const reminders = dashboard.reminders.slice(0, 3);
  const todayItems = dashboard.todayStudyItems.slice(0, 4);
  const motivation = dashboard.motivations[0];
  const hasMoreToday = dashboard.todayStudyItems.length > todayItems.length;

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">{getGreeting()}, {displayName}</p>
            <h1 className="max-w-xl text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">Seu assistente de estudos do ENEM, sem distração.</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">Avisos inteligentes, estudos de hoje, revisão e progresso em um painel mobile-first.</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="simulado">🔥 {dashboard.streak} dias seguidos</StatusBadge>
              <StatusBadge status="done">{dashboard.completion}% concluído</StatusBadge>
              <StatusBadge status={dashboard.daysUntilEnem > 30 ? 'pending' : 'simulado'}>{dashboard.daysUntilEnem} dias ENEM</StatusBadge>
            </div>
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
          <SectionHeader eyebrow="Avisos importantes" title="Painel de lembretes" subtitle="Só aparece o que realmente importa para o dia." />
          <div className="mt-4 grid gap-3">
            {reminders.length === 0 ? (
              <EmptyState title="Tudo sob controle" subtitle="Hoje não há alertas urgentes. Continue seguindo o plano." />
            ) : reminders.map((item) => <ReminderCard key={`${item.emoji}-${item.title}`} item={item} />)}
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Estudos de hoje" title="Conteúdos programados" subtitle="O que está no cronograma de hoje, com status e prioridade." />
          <div className="mt-4 grid gap-3">
            {todayItems.length === 0 ? (
              <EmptyState title="Sem estudos para hoje" subtitle="Seu cronograma não tem novos itens programados para hoje." />
            ) : todayItems.map((item) => <StudyItemCard key={item.id} item={item} onStatus={actions.setContentStatus} />)}
          </div>
          {hasMoreToday ? <p className="mt-3 text-sm font-semibold text-[var(--muted)]">+ {dashboard.todayStudyItems.length - todayItems.length} itens também estão programados para hoje.</p> : null}
        </GlassCard>
      </section>

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Progresso" title="Painel de evolução" subtitle="Leitura rápida da sua rotina, com indicadores simples e visuais." />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <StatTile label="Concluído" value={`${dashboard.completion}%`} caption={`${dashboard.completed}/${dashboard.total}`} tone="brand" />
          <StatTile label="Estudados" value={dashboard.completed} caption="conteúdos finalizados" tone="good" />
          <StatTile label="Pendentes" value={dashboard.pending} caption="aguardando estudo" tone="warn" />
          <StatTile label="Perdidos" value={dashboard.lost} caption="na recuperação" tone="bad" />
          <StatTile label="Sequência" value={`${dashboard.streak} dias`} caption="dias seguidos" tone="brand" />
          <StatTile label="Horas" value={`${dashboard.hoursAccumulated}h`} caption="acumuladas no foco" tone="good" />
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
