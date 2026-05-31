import React, { useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, ProgressBar, SectionHeader, StatusBadge } from '../components/Ui';
import { priorityMeta } from '../data/planner';

const statusFilters = [
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

const typeFilters = [
  { id: 'all', label: 'Todos os tipos' },
  { id: 'conteudo', label: 'Conteúdo' },
  { id: 'exercicio', label: 'Exercício' },
  { id: 'simulado', label: 'Simulado' },
  { id: 'redacao', label: 'Redação' }
];

const priorityFilters = [
  { id: 'all', label: 'Todas as prioridades' },
  ...Object.entries(priorityMeta).map(([id, meta]) => ({ id, label: meta.label }))
];

const statusLabels = {
  done: 'Estudado',
  lost: 'Perdido',
  pending: 'Pendente'
};

function getItemType(item) {
  if (item.subject === 'essay') return 'redacao';
  return 'conteudo';
}

function normalizeStatus(value) {
  return value === 'done' || value === 'lost' || value === 'pending' ? value : 'pending';
}

function FilterGroup({ label, value, onChange, options }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{label}</p>
      <div className="relative mt-3">
        <select className="input-shell appearance-none pr-10" value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">⌄</span>
      </div>
    </div>
  );
}

function ContentCard({ item, status, onStatus }) {
  const blocks = Array.isArray(item.blocks) ? item.blocks : [];

  return (
    <GlassCard className={`p-4 sm:p-5 ${status === 'done' ? 'bg-emerald-500/10' : status === 'lost' ? 'bg-rose-500/10' : 'bg-white/5'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Semana {item.weekNumber}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status={item.priority}>{item.priorityLabel}</StatusBadge>
            <StatusBadge status={item.priority}>{item.frequency}</StatusBadge>
            <StatusBadge status={item.priority === 'hot' ? 'done' : item.priority === 'hard' ? 'review' : 'pending'}>{item.difficulty}</StatusBadge>
            <StatusBadge status="pending">Importância {item.importance}/5</StatusBadge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {blocks.map((block) => (
              <StatusBadge key={block} status={block === 'Exercícios' ? 'simulado' : block === 'Revisão' ? 'review' : 'pending'}>{block}</StatusBadge>
            ))}
          </div>
        </div>
        <StatusBadge status={status}>{statusLabels[status] || 'Pendente'}</StatusBadge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" className="app-button-secondary w-full" onClick={() => onStatus(item.id, 'done')}>Estudado</button>
        <button type="button" className="app-button-secondary w-full" onClick={() => onStatus(item.id, 'lost')}>Perdido</button>
        <button type="button" className="app-button-secondary w-full" onClick={() => onStatus(item.id, 'pending')}>Pendente</button>
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
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [query, setQuery] = useState('');
  const safeItems = Array.isArray(contentItems) ? contentItems : [];
  const safeStatuses = state.contentStatuses || {};

  const filtered = useMemo(() => {
    return safeItems.filter((item) => {
      const status = normalizeStatus(safeStatuses[item.id]);
      const matchesStatus = statusFilter === 'all' || statusFilter === status;
      const matchesSubject = subjectFilter === 'all' || subjectFilter === item.subject;
      const matchesType = typeFilter === 'all' || typeFilter === getItemType(item);
      const matchesPriority = priorityFilter === 'all' || priorityFilter === item.priority;
      const matchesQuery = !query || `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesSubject && matchesType && matchesPriority && matchesQuery;
    });
  }, [priorityFilter, query, safeItems, safeStatuses, statusFilter, subjectFilter, typeFilter]);

  const emptyTitle = statusFilter === 'lost' ? 'Nenhum conteúdo perdido encontrado' : 'Nenhum conteúdo encontrado';
  const emptySubtitle = statusFilter === 'lost'
    ? 'Marque conteúdos como perdidos para vê-los aqui. Se já havia itens perdidos, revise os filtros aplicados.'
    : 'Tente outro filtro ou pesquise por parte do tema.';

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Conteúdos" title="Banco completo de estudo" subtitle="Filtros mais claros, organizados por matéria, status e tipo de conteúdo." />
        <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Buscar</p>
            <input className="input-shell mt-3" placeholder="Pesquisar tema, disciplina ou descrição" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <FilterGroup label="Matéria" value={subjectFilter} onChange={setSubjectFilter} options={subjectFilters} />
          <FilterGroup label="Prioridade" value={priorityFilter} onChange={setPriorityFilter} options={priorityFilters} />
          <FilterGroup label="Status" value={statusFilter} onChange={setStatusFilter} options={statusFilters} />
          <FilterGroup label="Tipo" value={typeFilter} onChange={setTypeFilter} options={typeFilters} />
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {subjectStats.map((subject) => (
          <GlassCard key={subject.subject} className="p-4 sm:p-5">
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
          <EmptyState title={emptyTitle} subtitle={emptySubtitle} action={statusFilter !== 'all' ? <button type="button" className="app-button-secondary" onClick={() => setStatusFilter('all')}>Limpar filtro de status</button> : null} />
        ) : (
          filtered.map((item) => <ContentCard key={item.id} item={item} status={normalizeStatus(safeStatuses[item.id])} onStatus={actions.setContentStatus} />)
        )}
      </section>
    </div>
  );
}