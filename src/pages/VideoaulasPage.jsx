import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader, StatusBadge } from '../components/Ui';

export default function VideoaulasPage() {
  const { videoChannels } = usePlanner();

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Videoaulas" title="Curadoria de canais e professores" subtitle="Cards organizados por área para revisão rápida e estudo objetivo no celular." />
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {videoChannels.map((channel) => (
          <GlassCard key={channel.name} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{channel.area}</p>
                <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{channel.name}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{channel.note}</p>
              </div>
              <StatusBadge status="pending">canal</StatusBadge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={channel.url} target="_blank" rel="noreferrer" className="app-button-primary">
                Abrir canal
              </a>
              <a href={channel.url} target="_blank" rel="noreferrer" className="app-button-secondary">
                Assistir
              </a>
            </div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}