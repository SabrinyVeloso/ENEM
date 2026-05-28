import React, { useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, FilterChip, GlassCard, ProgressBar, SectionHeader, StatusBadge } from '../components/Ui';

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'done', label: 'Estudados' },
  { id: 'lost', label: 'Perdidos' },
  { id: 'pending', label: 'Não estudados' }
];

const subjectFilters = [
  { id: 'all', label: 'Todas' },
  { id: 'math', label: 'Matemática' },
  { id: 'language', label: 'Linguagens' },
  { id: 'humanas', label: 'Humanas' },
  { id: 'nature', label: 'Natureza' },
  { id: 'essay', label: 'Redação' }
];

function ContentCard({ item, status, onStatus }) {
  return (
    <GlassCard className={`p-4 ${status === 'done' ? 'bg-emerald-500/10' : status === 'lost' ? 'bg-rose-500/10' : 'bg-white/5'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Semana {item.weekNumber}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
        </div>
        <StatusBadge status={status}>{status}</StatusBadge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="app-button-secondary" onClick={() => onStatus(item.id, 'done')}>✅</button>
        <button type="button" className="app-button-secondary" onClick={() => onStatus(item.id, 'lost')}>⚠️</button>
        <button type="button" className="app-button-secondary" onClick={() => onStatus(item.id, 'pending')}>⭕</button>
      </div>

      <div className="mt-4">
        <ProgressBar value={status === 'done' ? 100 : status === 'lost' ? 20 : 40} />
      </div>
    </GlassCard>
  );
}

export default function ContentsPage() {
  const { contentItems, subjectStats, state, actions } = usePlanner();
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return contentItems.filter((item) => {
      const status = state.contentStatuses[item.id] || 'pending';
      const matchesStatus = statusFilter === 'all' || statusFilter === status;
      const matchesSubject = subjectFilter === 'all' || subjectFilter === item.subject;
      const matchesQuery = !query || `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesSubject && matchesQuery;
    });
  }, [contentItems, query, state.contentStatuses, statusFilter, subjectFilter]);

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Conteúdos" title="Banco completo de estudo" subtitle="Filtre por status, pesquise e acompanhe o progresso por matéria." />
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
          <input className="input-shell w-full" placeholder="Pesquisar tema, disciplina ou descrição" value={query} onChange={(event) => setQuery(event.target.value)} />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => <FilterChip key={filter.id} active={statusFilter === filter.id} onClick={() => setStatusFilter(filter.id)}>{filter.label}</FilterChip>)}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjectFilters.map((filter) => <FilterChip key={filter.id} active={subjectFilter === filter.id} onClick={() => setSubjectFilter(filter.id)}>{filter.label}</FilterChip>)}
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {subjectStats.map((subject) => (
          <GlassCard key={subject.subject} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{subject.label}</p>
                <strong className="mt-1 block text-2xl font-black">{subject.percent}%</strong>
              </div>
              <StatusBadge status={subject.percent > 50 ? 'done' : 'pending'}>{subject.done}/{subject.total}</StatusBadge>
            </div>
            <div className="mt-4"><ProgressBar value={subject.percent} /></div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{subject.done} estudados · {subject.pending} restantes</p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-4">
        {filtered.length === 0 ? (
          <EmptyState title="Nenhum conteúdo encontrado" subtitle="Tente outro filtro ou pesquise por parte do tema." />
        ) : (
          filtered.map((item) => <ContentCard key={item.id} item={item} status={state.contentStatuses[item.id] || 'pending'} onStatus={actions.setContentStatus} />)
        )}
      </section>
    </div>
  );
}