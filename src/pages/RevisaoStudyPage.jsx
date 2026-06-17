import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader, EmptyState } from '../components/Ui';

export default function RevisaoStudyPage() {
  const { dashboard } = usePlanner();
  const contents = dashboard.revisionContents || [];
  const studyDays = dashboard.studyDays || [];

  if (!dashboard.todayReviewDay) {
    return (
      <div className="max-w-4xl mx-auto py-6">
        <GlassCard className="p-5 mb-4">
          <SectionHeader eyebrow="Revisão" title="Hoje não é dia de revisão" subtitle={`Próxima revisão: ${dashboard.nextReview?.label || '—'}`} />
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <GlassCard className="p-5 mb-4">
        <SectionHeader eyebrow="Revisão" title="Atividades recomendadas" subtitle="Abra os links em novas abas para praticar sem perder o progresso." />
      </GlassCard>

      {contents.length === 0 ? (
        <EmptyState title="Nenhum conteúdo para revisar" subtitle="Conclua conteúdos esta semana para gerar atividades recomendadas." />
      ) : (
        <div className="grid gap-4">
          {contents.map((c) => (
            <GlassCard key={c.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase text-[var(--muted)]">{c.subjectLabel}</p>
                  <strong className="text-lg font-black">{c.title}</strong>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {(c.resources || []).map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="app-button-secondary w-full text-left">{r.title}</a>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
