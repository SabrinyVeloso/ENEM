import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatTile, StatusBadge } from '../components/Ui';

function ChartBars({ title, series }) {
  const maxValue = Math.max(1, ...series.map((item) => item.value));

  return (
    <GlassCard className="p-4 sm:p-5">
      <SectionHeader eyebrow="Gráfico" title={title} subtitle="Leitura rápida da evolução por período." />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
        {series.map((item) => (
          <div key={item.label} className="rounded-[20px] border border-[var(--border)] bg-white/5 p-3">
            <div className="flex items-end justify-between gap-2">
              <strong className="text-sm font-black text-[var(--text)]">{item.value}</strong>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">{item.label}</span>
            </div>
            <div className="mt-3 h-24 rounded-[16px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-2">
              <div className="flex h-full items-end rounded-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.06))] p-1">
                <div className="w-full rounded-[10px] bg-[linear-gradient(180deg,var(--primary),var(--accent))]" style={{ height: `${Math.max(8, (item.value / maxValue) * 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default function StatsPage() {
  const { dashboard, schedule, state } = usePlanner();
  const subjectStats = [...dashboard.subjectStats].sort((a, b) => b.percent - a.percent);
  const strongest = subjectStats.slice(0, 3);
  const weakest = [...subjectStats].sort((a, b) => a.percent - b.percent).slice(0, 3);

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Estatísticas" title="Painel moderno de desempenho" subtitle="Veja progresso, sequência e matérias com pior retenção em um só lugar." />
      </GlassCard>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Progresso geral" value={`${dashboard.completion}%`} caption={`${dashboard.completed}/${dashboard.total} conteúdos`} tone="brand" />
        <StatTile label="Pendentes" value={dashboard.pending} caption="ainda no cronograma" tone="warn" />
        <StatTile label="Perdidos" value={dashboard.lost} caption="precisam reaparecer" tone="bad" />
        <StatTile label="Horas estudadas" value={`${dashboard.hoursAccumulated}h`} caption="tempo registrado" tone="good" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Desempenho" title="Cronograma e consistência" subtitle="O progresso fica mais útil quando a leitura é simples." />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <StatTile label="Sequência de dias" value={`${dashboard.streak} dias`} caption="consistência atual" tone="brand" />
            <StatTile label="Conclusão do cronograma" value={`${dashboard.completion}%`} caption="entrega geral dos conteúdos" tone="good" />
          </div>
          <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Barra geral</p>
            <div className="mt-3"><ProgressBar value={dashboard.completion} /></div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{dashboard.currentWeekProgress}% concluído na semana atual.</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Revisões" title="Atividades e recursos" subtitle="Resumo dos conteúdos revisados e links encontrados." />
          <div className="mt-4 grid gap-3">
            <StatTile label="Conteúdos (semana)" value={dashboard.revisionTotalContents} caption="conteúdos estudados" tone="good" />
            <StatTile label="Recursos" value={dashboard.revisionResourcesTotal} caption="links encontrados" tone="brand" />
            <StatTile label="Cards/Atividades" value={dashboard.reviewDueCount} caption="itens para revisão" tone="warn" />
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Áreas" title="Desempenho por matéria" subtitle="As matérias com pior retenção ficam em destaque." />
          <div className="mt-4 grid gap-3">
            {strongest.map((subject) => (
              <div key={subject.subject} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm font-black text-[var(--text)]">{subject.label}</strong>
                  <StatusBadge status={subject.percent >= 70 ? 'done' : subject.percent >= 40 ? 'pending' : 'perdido'}>{subject.percent}%</StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Top foco: {subject.topPriority || 'sem destaque'}</p>
                <div className="mt-3"><ProgressBar value={subject.percent} /></div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionHeader eyebrow="Atenção" title="Conteúdos mais difíceis" subtitle="O que merece mais repetição na próxima revisão." />
          <div className="mt-4 grid gap-3">
            {weakest.map((subject) => (
              <div key={subject.subject} className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm font-black text-[var(--text)]">{subject.label}</strong>
                  <StatusBadge status={subject.percent >= 70 ? 'done' : subject.percent >= 40 ? 'pending' : 'perdido'}>{subject.percent}%</StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Mais difíceis: {subject.strongTopics.slice(-2).join(' · ') || 'sem dados suficientes'}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Resumo rápido" title="O que mais importa agora" subtitle="Leitura imediata para a próxima sessão de estudos." />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Concluídos</p>
            <strong className="mt-2 block text-3xl font-black text-[var(--text)]">{dashboard.completed}</strong>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Pendentes</p>
            <strong className="mt-2 block text-3xl font-black text-[var(--text)]">{dashboard.pending}</strong>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Perdidos</p>
            <strong className="mt-2 block text-3xl font-black text-[var(--text)]">{dashboard.lost}</strong>
          </div>
        </div>
        {dashboard.revisionTotalContents === 0 ? (
          <div className="mt-4">
            <EmptyState title="Tudo em dia" subtitle="Nenhum conteúdo revisado recentemente." />
          </div>
        ) : null}
      </GlassCard>
    </div>
  );
}