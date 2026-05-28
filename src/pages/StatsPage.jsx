import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, ProgressBar, SectionHeader, StatTile, StatusBadge } from '../components/Ui';

export default function StatsPage() {
  const { dashboard } = usePlanner();

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Estatísticas" title="Evolução geral e matérias fortes" subtitle="Resumo visual do seu progresso, tempo focado e desempenho por disciplina." />
      </GlassCard>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Conclusão" value={`${dashboard.completion}%`} caption={`${dashboard.completed}/${dashboard.total}`} tone="brand" />
        <StatTile label="Tempo focado" value={`${dashboard.focusMinutes} min`} caption="sessões de pomodoro" tone="good" />
        <StatTile label="Redações" value={`${dashboard.essayCount}`} caption="textos salvos" tone="warn" />
        <StatTile label="Questões" value={`${dashboard.questionCount}`} caption="tentativas registradas" tone="brand" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-4">
          <SectionHeader eyebrow="Matérias" title="Progresso por disciplina" subtitle="Barrinhas e contagem de concluídos, perdidos e pendentes." />
          <div className="mt-4 grid gap-4">
            {dashboard.subjectStats.map((subject) => (
              <div key={subject.subject} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm font-black text-[var(--text)]">{subject.label}</strong>
                  <StatusBadge status={subject.percent >= 50 ? 'done' : 'pending'}>{subject.percent}%</StatusBadge>
                </div>
                <div className="mt-3"><ProgressBar value={subject.percent} /></div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{subject.done} concluídos · {subject.lost} perdidos · {subject.pending} pendentes</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <SectionHeader eyebrow="Linha do tempo" title="Últimos sinais do app" subtitle="Indicadores rápidos de acompanhamento da rotina diária." />
          <div className="mt-4 grid gap-3">
            <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Sequência</p>
              <strong className="mt-2 block text-4xl font-black">{dashboard.streak}</strong>
            </div>
            <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Semana</p>
              <strong className="mt-2 block text-4xl font-black">{dashboard.currentWeekProgress}%</strong>
            </div>
            <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Mês</p>
              <strong className="mt-2 block text-4xl font-black">{dashboard.monthProgress}%</strong>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}