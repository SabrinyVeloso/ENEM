
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, SectionHeader, StatTile } from '../components/Ui';
import { subjectMeta } from '../data/planner';

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
  const contents = dashboard.revisionContents || [];
  const totalContents = dashboard.revisionTotalContents || 0;
  const totalResources = dashboard.revisionResourcesTotal || 0;
  const studyDays = dashboard.studyDays || [];

  const subjectEntries = useMemo(() => {
    const map = {};
    contents.forEach((c) => {
      map[c.subject] = (map[c.subject] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [contents]);

  const groupedBySubject = useMemo(() => {
    const order = studyDays.map((d) => d.contentId);
    const groups = {};
    contents.forEach((c) => {
      groups[c.subject] = groups[c.subject] || [];
      groups[c.subject].push(c);
    });
    // sort each group's contents by order of studyDays (oldest first)
    Object.keys(groups).forEach((subject) => {
      groups[subject].sort((a, b) => {
        const ia = order.indexOf(a.id);
        const ib = order.indexOf(b.id);
        return ia - ib;
      });
    });
    return groups;
  }, [contents, studyDays]);

  if (!dashboard.todayReviewDay) {
    return (
      <div className="grid gap-4 pb-6">
        <GlassCard className="p-5">
          <SectionHeader eyebrow="Revisão" title="Hoje não é um dia de revisão" subtitle={`Próxima revisão: ${dashboard.nextReview?.label || '—'}`} />
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="grid gap-4 pb-6 max-w-6xl mx-auto w-full px-4">
      <GlassCard className="overflow-hidden p-4 sm:p-5">
        <div className="max-w-6xl mx-auto w-full text-center">
          <SectionHeader
            eyebrow="Revisão"
            title="Atividades e recursos para praticar"
            subtitle="Central de exercícios e materiais baseados nos conteúdos que você estudou esta semana."
          />
        </div>
      </GlassCard>

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto w-full">
        <StatTile label="Conteúdos" value={totalContents} caption="estudados nesta semana" tone="brand" />
        <StatTile label="Recursos" value={totalResources} caption="links encontrados" tone="good" />
        <StatTile label="Matérias" value={subjectEntries.length} caption="matérias cobertas" tone="warn" />
        <StatTile label="Prioridade" value={contents.length ? contents[0].title : '—'} caption="maior prioridade" tone="brand" />
      </section>

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Conteúdos" title="Recursos recomendados" subtitle="Selecione um conteúdo para ver atividades e links práticos." />
        <div className="max-w-6xl mx-auto w-full">
            <div className="mt-4 grid gap-6">
          {contents.length === 0 ? (
            <EmptyState title="Ainda sem registros" subtitle="Finalize conteúdos no cronograma para que apareçam sugestões aqui." />
          ) : (
            Object.entries(groupedBySubject).map(([subject, items]) => (
              <div key={subject} className="w-full">
                <h3 className="text-sm font-extrabold uppercase text-[var(--muted)] mb-3 text-left">{subjectMeta[subject]?.label || subject}</h3>
                <div className="grid gap-6 grid-cols-1 items-stretch w-full">
                  {items.map((c) => (
                    <div key={c.id} className="rounded-[18px] border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4 shadow-sm w-full flex flex-col justify-between min-h-[100px] md:min-h-[140px]">
                      <div className="flex items-start gap-3">
                        <div className="w-full">
                          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">{c.subjectLabel}</p>
                          <strong className="block mt-1 text-xl font-extrabold text-[var(--text)] leading-tight">{c.title}</strong>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {((c.resources || []).filter(r => !/videoaula|vídeo|video/i.test(r.title))).map((r, idx) => (
                          <a
                            key={idx}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-3 py-2 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.03)] text-sm font-semibold text-[var(--text)] hover:bg-[rgba(255,255,255,0.06)] transition max-w-full"
                          >
                            <span className="truncate max-w-[calc(100vw-200px)]">{r.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
            </div>
        </div>
      </GlassCard>
    </div>
  );
}