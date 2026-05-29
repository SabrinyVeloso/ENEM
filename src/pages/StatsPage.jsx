import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, ProgressBar, SectionHeader, StatTile, StatusBadge } from '../components/Ui';

export default function StatsPage() {
  const { dashboard } = usePlanner();
  const sortedSubjects = [...dashboard.subjectStats].sort((a, b) => b.percent - a.percent);
  const strongest = sortedSubjects.slice(0, 2);
  const weakest = [...sortedSubjects].reverse().slice(0, 2);

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Estatísticas" title="Resumo útil do seu desempenho" subtitle="Menos gráfico decorativo, mais leitura rápida para decidir onde estudar agora." />
      </GlassCard>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Conclusão" value={`${dashboard.completion}%`} caption={`${dashboard.completed}/${dashboard.total}`} tone="brand" />
        <StatTile label="Semanal" value={`${dashboard.currentWeekProgress}%`} caption="progresso real da semana" tone="good" />
        <StatTile label="Tempo focado" value={`${dashboard.focusMinutes} min`} caption="pomodoros registrados" tone="warn" />
        <StatTile label="Sequência" value={`${dashboard.streak} dias`} caption="consistência atual" tone="brand" />
        <StatTile label="Revisar hoje" value={`${dashboard.reviewItems.length}`} caption="itens vencidos para voltar" tone="bad" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-4">
          <SectionHeader eyebrow="Matérias" title="Fortes e fracas" subtitle="O que está melhor e o que precisa de revisão agora." />
          <div className="mt-4 grid gap-4">
            {strongest.map((subject) => (
              <div key={subject.subject} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm font-black text-[var(--text)]">{subject.label}</strong>
                  <StatusBadge status={subject.percent >= 50 ? 'done' : 'pending'}>{subject.percent}%</StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Top foco: {subject.topPriority || 'sem destaque'}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.2em]">
                  <StatusBadge status="hot">🔥 {subject.priorityCounts.hot || 0}</StatusBadge>
                  <StatusBadge status="frequent">📈 {subject.priorityCounts.frequent || 0}</StatusBadge>
                  <StatusBadge status="medium">📚 {subject.priorityCounts.medium || 0}</StatusBadge>
                  <StatusBadge status="hard">🧠 {subject.priorityCounts.hard || 0}</StatusBadge>
                </div>
                <div className="mt-3"><ProgressBar value={subject.percent} /></div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{subject.done} concluídos · {subject.lost} perdidos · {subject.pending} pendentes</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Mais fortes: {subject.strongTopics.join(' · ')}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <SectionHeader eyebrow="Revisão" title="Matérias que pedem atenção" subtitle="Escolha por onde recomeçar sem olhar toda a grade completa." />
          <div className="mt-4 grid gap-3">
            {weakest.map((subject) => (
              <div key={subject.subject} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm font-black text-[var(--text)]">{subject.label}</strong>
                  <StatusBadge status={subject.percent >= 50 ? 'done' : 'pending'}>{subject.percent}%</StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Top foco: {subject.topPriority || 'sem destaque'}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.2em]">
                  <StatusBadge status="hot">🔥 {subject.priorityCounts.hot || 0}</StatusBadge>
                  <StatusBadge status="frequent">📈 {subject.priorityCounts.frequent || 0}</StatusBadge>
                  <StatusBadge status="medium">📚 {subject.priorityCounts.medium || 0}</StatusBadge>
                  <StatusBadge status="hard">🧠 {subject.priorityCounts.hard || 0}</StatusBadge>
                </div>
                <div className="mt-3"><ProgressBar value={subject.percent} /></div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{subject.done} concluídos · {subject.lost} perdidos · {subject.pending} pendentes</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Mais fortes: {subject.strongTopics.join(' · ')}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}