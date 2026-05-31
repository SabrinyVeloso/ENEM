import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatusBadge, StatTile } from '../components/Ui';

function RecoveryCard({ item, onReschedule, onDone, onPending }) {
  return (
    <GlassCard className={`p-4 sm:p-5 ${item.isDue ? 'bg-rose-500/10' : 'bg-white/5'}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{item.subjectLabel}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status="perdido">Perdido</StatusBadge>
            <StatusBadge status="review">{item.isDue ? 'Pronto para revisar' : `Revisão em ${item.dueDate}`}</StatusBadge>
          </div>
        </div>
        <div className="min-w-40 rounded-[20px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em]">Próxima sessão</p>
          <strong className="mt-1 block text-base font-extrabold text-[var(--text)]">{item.dueDate}</strong>
          <p className="mt-1">{item.queued ? 'Já está na fila de recuperação.' : 'Será adicionado à fila automaticamente.'}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <button type="button" className="app-button-secondary w-full" onClick={() => onReschedule(item.id)}>Reagendar</button>
        <button type="button" className="app-button-secondary w-full" onClick={() => onDone(item.id)}>Revisto</button>
        <button type="button" className="app-button-secondary w-full" onClick={() => onPending(item.id)}>Voltar pendente</button>
      </div>

      <div className="mt-4">
        <ProgressBar value={item.isDue ? 80 : 35} />
      </div>
    </GlassCard>
  );
}

export default function RecoveryPage() {
  const { recoveryItems, dueRecoveryItems, actions } = usePlanner();
  const items = Array.isArray(recoveryItems) ? recoveryItems : [];
  const dueItems = Array.isArray(dueRecoveryItems) ? dueRecoveryItems : [];

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          eyebrow="Recuperação"
          title="Conteúdos perdidos e reagendados"
          subtitle="Os itens marcados como perdido voltam para a próxima sessão de estudo e podem ser reagendados quando necessário."
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <StatTile label="Perdidos" value={items.length} caption="Itens na fila de recuperação" tone="bad" />
          <StatTile label="Prontos agora" value={dueItems.length} caption="Disponíveis para revisar hoje" tone="warn" />
          <StatTile label="Fila ativa" value={items.filter((item) => item.queued).length} caption="Itens agendados" tone="brand" />
        </div>
      </GlassCard>

      <section className="grid gap-4">
        {items.length === 0 ? (
          <EmptyState title="Nenhum conteúdo em recuperação" subtitle="Quando você marcar algo como perdido, ele aparece aqui com a próxima sessão sugerida." />
        ) : (
          items.map((item) => (
            <RecoveryCard
              key={item.id}
              item={item}
              onReschedule={actions.rescheduleLostContent}
              onDone={(id) => actions.setContentStatus(id, 'done')}
              onPending={(id) => actions.setContentStatus(id, 'pending')}
            />
          ))
        )}
      </section>
    </div>
  );
}