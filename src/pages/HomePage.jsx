import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatTile, StatusBadge } from '../components/Ui';
import { formatFriendlyDate, formatLongDate, subjectMeta } from '../data/planner';
import PomodoroWidget from '../components/PomodoroWidget';

function StudyCard({ day, status, onStatus }) {
  const toneMap = {
    done: 'border-emerald-500/20 bg-emerald-500/10',
    lost: 'border-rose-500/20 bg-rose-500/10',
    pending: 'border-[var(--border)] bg-white/5',
    simulado: 'border-violet-500/20 bg-violet-500/10',
    rest: 'border-slate-500/20 bg-white/5'
  };

  return (
    <GlassCard className={`p-4 ${toneMap[status] || toneMap.pending}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">
            <span>{day.weekday}</span>
            <span className="opacity-60">•</span>
            <span>{formatFriendlyDate(day.date)}</span>
          </p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{day.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{day.description}</p>
        </div>
        <StatusBadge status={status}>{status === 'rest' ? 'descanso' : status}</StatusBadge>
      </div>

      {day.type === 'study' ? (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => onStatus(day.contentId, 'done')} className="app-button-secondary">
              ✅ Estudado
            </button>
            <button type="button" onClick={() => onStatus(day.contentId, 'lost')} className="app-button-secondary">
              ⚠️ Perdido
            </button>
            <button type="button" onClick={() => onStatus(day.contentId, 'pending')} className="app-button-secondary">
              ⭕ Não estudado
            </button>
          </div>
          <div className="mt-4">
            <ProgressBar value={status === 'done' ? 100 : status === 'lost' ? 20 : 40} />
          </div>
        </>
      ) : null}
    </GlassCard>
  );
}

function CalendarHeatmap({ heatmap }) {
  return (
    <GlassCard className="p-4">
      <SectionHeader eyebrow="Calendário" title="Sequência de estudos" subtitle="Mapa visual estilo contribuição, com dias estudados, perdidos e descanso." />
      <div className="mt-4 grid grid-cols-7 gap-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((label) => (
          <div key={label} className="text-center text-[10px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">
            {label}
          </div>
        ))}
        {heatmap.map((day) => {
          const colorMap = {
            done: 'bg-emerald-400',
            lost: 'bg-rose-400',
            pending: 'bg-white/10',
            rest: 'bg-slate-500/30',
            simulado: 'bg-violet-400'
          };
          return <div key={day.date} title={`${formatLongDate(day.date)} - ${day.title}`} className={`aspect-square rounded-2xl border border-[var(--border)] ${colorMap[day.status] || colorMap.pending}`} />;
        })}
      </div>
    </GlassCard>
  );
}

export default function HomePage() {
  const { dashboard, actions, state } = usePlanner();
  const todayPlan = dashboard.currentDay;
  const todayStatus = todayPlan.type === 'study' ? state.contentStatuses[todayPlan.contentId] || 'pending' : todayPlan.type;

  return (
    <div className="grid gap-4 pb-6">
      <section className="glass-panel grid gap-4 p-4 lg:grid-cols-[1.4fr_0.9fr] lg:p-6">
        <div className="space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--accent)]">Home / cronograma principal</p>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">Uma plataforma premium de estudos para o ENEM, pensada primeiro no celular.</h1>
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">Acompanhe sua rotina, marque conteúdos como estudados, monitore progresso e use o calendário e o Pomodoro para manter consistência.</p>
          <div className="flex flex-wrap gap-2">
            <a href="#/conteudos" className="app-button-primary">Ver conteúdos</a>
            <a href="#/estatisticas" className="app-button-secondary">Abrir estatísticas</a>
          </div>
        </div>

        <GlassCard className="p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--accent)]">ENEM</p>
          <strong className="mt-2 block text-5xl font-black tracking-tight text-[var(--text)]">{dashboard.daysUntilEnem}</strong>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Faltam dias para a prova.</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-[22px] border border-[var(--border)] bg-white/10 p-4">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-[var(--muted)]">Meta semanal</span>
              <strong className="mt-2 block text-2xl font-black">{state.settings.weeklyGoal} conteúdos</strong>
            </div>
            <div className="rounded-[22px] border border-[var(--border)] bg-white/10 p-4">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-[var(--muted)]">Sequência</span>
              <strong className="mt-2 block text-2xl font-black">{dashboard.streak} dias</strong>
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Conclusão" value={`${dashboard.completion}%`} caption={`${dashboard.completed} concluídos`} tone="brand" />
        <StatTile label="Semana" value={`${dashboard.currentWeekProgress}%`} caption="progresso da semana" tone="good" />
        <StatTile label="Mês" value={`${dashboard.monthProgress}%`} caption="ritmo mensal" tone="warn" />
        <StatTile label="Foco" value={`${dashboard.focusMinutes} min`} caption="Pomodoro registrado" tone="brand" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_1.3fr]">
        <GlassCard className="p-4">
          <SectionHeader eyebrow="Hoje" title={formatLongDate(todayPlan.date)} subtitle="Sua prioridade do dia é esta. Marque o status com um toque." />
          <div className="mt-4 grid gap-3">
            <StudyCard day={todayPlan} status={todayStatus} onStatus={actions.setContentStatus} />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <SectionHeader eyebrow="Semana" title={`Semana ${dashboard.currentWeek.weekNumber}`} subtitle="Cada semana mantém matemática, linguagens, humanas, natureza e redação, com revisão leve e simulado alternado." />
          <div className="mt-4 grid gap-3">
            {dashboard.currentWeek.days.map((day) => {
              const status = day.type === 'study' ? state.contentStatuses[day.contentId] || 'pending' : day.type;
              return <StudyCard key={day.date} day={day} status={status} onStatus={actions.setContentStatus} />;
            })}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <CalendarHeatmap heatmap={dashboard.heatmap} />
        <GlassCard className="p-4">
          <SectionHeader eyebrow="Conquistas" title="Badges da rotina" subtitle="Marcos automáticos conforme a consistência aumenta." />
          <div className="mt-4 grid gap-3">
            {dashboard.achievements.map((item) => (
              <div key={item.id} className={`rounded-[24px] border p-4 ${item.done ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-[var(--border)] bg-white/5'}`}>
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm font-black text-[var(--text)]">{item.label}</strong>
                  <StatusBadge status={item.done ? 'done' : 'pending'}>{item.done ? 'ativa' : 'bloqueada'}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <PomodoroWidget />
    </div>
  );
}