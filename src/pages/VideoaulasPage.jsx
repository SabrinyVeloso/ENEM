import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader } from '../components/Ui';

function TeacherCard({ teacher, buttonLabel = 'Abrir Canal' }) {
  return (
    <GlassCard className="overflow-hidden p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <img
          src={teacher.photo}
          alt={`Imagem de ${teacher.name}`}
          className="h-20 w-20 shrink-0 rounded-[24px] border border-[var(--border)] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
        />
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{teacher.subject}</p>
            <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{teacher.name}</h3>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{teacher.description}</p>
          </div>
          <a href={teacher.url} target="_blank" rel="noreferrer" className="app-button-primary w-full">
            {buttonLabel}
          </a>
        </div>
      </div>
    </GlassCard>
  );
}

export default function VideoaulasPage() {
  const { videoChannels } = usePlanner();

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Treinos" title="Recursos e treinos" />
        <div className="mt-4">
          <h3 className="text-sm font-bold text-[var(--muted)]">Recursos gratuitos para treinar redação</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href="https://www.todamateria.com.br/corretor-de-redacao/" target="_blank" rel="noreferrer" className="app-button-primary">Corretor de Redação (ENEM) — Toda Matéria</a>
            <a href="https://docs.google.com/" target="_blank" rel="noreferrer" className="app-button-secondary">Google Docs</a>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {videoChannels.map((teacher) => (
          <TeacherCard key={teacher.name} teacher={teacher} buttonLabel={teacher.actionLabel || 'Abrir Canal'} />
        ))}
      </section>
    </div>
  );
}