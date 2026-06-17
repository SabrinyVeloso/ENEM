import React, { useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, SectionHeader, StatusBadge } from '../components/Ui';

const subjectFilters = [
  { id: 'all', label: 'Todas' },
  { id: 'math', label: 'Matemática' },
  { id: 'language', label: 'Linguagens' },
  { id: 'humanas', label: 'Humanas' },
  { id: 'nature', label: 'Natureza' },
  { id: 'essay', label: 'Redação' }
];

const subjectLabels = {
  math: 'Matemática',
  language: 'Linguagens',
  humanas: 'Humanas',
  nature: 'Natureza',
  essay: 'Redação'
};

const subjectSearchMap = {
  math: 'matemática enem',
  language: 'linguagens enem',
  humanas: 'humanas enem',
  nature: 'natureza enem',
  essay: 'redação enem'
};

function VideoCard({ item, watched, onToggleWatched }) {
  return (
    <GlassCard className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{item.subjectLabel}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.suggestion}</p>
        </div>
        <StatusBadge status={watched ? 'done' : 'pending'}>{watched ? 'assistido' : 'pendente'}</StatusBadge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={item.url} target="_blank" rel="noreferrer" className="app-button-primary">
          Abrir vídeo
        </a>
        <button type="button" onClick={() => onToggleWatched(item.videoId)} className="app-button-secondary">
          {watched ? 'Marcar como não assistido' : 'Marcar como assistido'}
        </button>
      </div>
    </GlassCard>
  );
}

function buildVideoSearchQuery(item) {
  const base = subjectSearchMap[item.subject] || item.subjectLabel;
  return `${base} ${item.title} aula enem`.trim();
}

export default function VideoaulasPage() {
  const { videoChannels, contentItems, dashboard, state, actions } = usePlanner();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [query, setQuery] = useState('');
  const watchedVideos = state.watchedVideos || {};
  const todayStudyItems = Array.isArray(dashboard.todayStudyItems) ? dashboard.todayStudyItems : [];

  const contentVideoSuggestions = useMemo(() => {
    const sourceItems = Array.isArray(contentItems) ? contentItems : [];
    return sourceItems.map((item) => {
      const searchQuery = buildVideoSearchQuery(item);
      const suggestionUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
      return {
        videoId: item.id,
        subject: item.subject,
        subjectLabel: subjectLabels[item.subject] || item.subjectLabel,
        title: item.title,
        suggestion: `Procure uma videoaula curta sobre ${item.title} para revisar com rapidez.`,
        url: suggestionUrl
      };
    });
  }, [contentItems]);

  const todayVideoSuggestions = useMemo(() => {
    return todayStudyItems.map((item) => {
      const searchQuery = buildVideoSearchQuery(item);
      return {
        videoId: `today-${item.id}`,
        subject: item.subject,
        subjectLabel: item.subjectLabel,
        title: item.title,
        suggestion: `Hoje você estudou ${item.title}. Assista a esse vídeo para reforçar o conteúdo.`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`
      };
    }).filter(item => !watchedVideos[item.videoId]);
  }, [todayStudyItems, watchedVideos]);

  const filteredSuggestions = useMemo(() => {
    return contentVideoSuggestions.filter((item) => {
      const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
      const matchesQuery = !query || `${item.title} ${item.subjectLabel} ${item.suggestion}`.toLowerCase().includes(query.toLowerCase());
      return matchesSubject && matchesQuery;
    }).filter(item => !watchedVideos[item.videoId]);
  }, [contentVideoSuggestions, query, subjectFilter, watchedVideos]);

  const watchedCount = Object.values(watchedVideos).filter(Boolean).length;

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Vídeos" title="Videoaulas por matéria e por conteúdo" subtitle="Pesquise, filtre por área e marque o que já foi assistido para acompanhar sua revisão." />
        <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Buscar</p>
            <input className="input-shell mt-3" placeholder="Pesquisar conteúdo ou matéria" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Matéria</p>
            <div className="mt-3 relative">
              <select className="input-shell appearance-none pr-10" value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)}>
                {subjectFilters.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">⌄</span>
            </div>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Assistidos</p>
            <strong className="mt-2 block text-3xl font-black text-[var(--text)]">{watchedCount}</strong>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Total sugerido</p>
            <strong className="mt-2 block text-3xl font-black text-[var(--text)]">{contentVideoSuggestions.length}</strong>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Hoje" title="Assista ao que você estudou no dia" subtitle={todayStudyItems.length > 0 ? 'As sugestões abaixo seguem o conteúdo programado para hoje.' : 'Sem conteúdo de hoje no cronograma. Veja as sugestões gerais abaixo.'} />
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {todayVideoSuggestions.length === 0 ? (
            <EmptyState title="Nenhum conteúdo de hoje" subtitle="Quando houver estudo programado, a sugestão de vídeo aparecerá aqui." />
          ) : (
            todayVideoSuggestions.map((item) => (
              <VideoCard key={item.videoId} item={item} watched={Boolean(watchedVideos[item.videoId])} onToggleWatched={actions.toggleVideoWatched} />
            ))
          )}
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {videoChannels.slice(0, 6).map((channel) => (
          <GlassCard key={channel.name} className="overflow-hidden p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <img
                src={channel.photo}
                alt={`Imagem de ${channel.name}`}
                className="h-20 w-20 shrink-0 rounded-[24px] border border-[var(--border)] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
              />
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{channel.subject}</p>
                  <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{channel.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{channel.note}</p>
                </div>
                <a href={channel.url} target="_blank" rel="noreferrer" className="app-button-primary w-full">
                  Abrir canal
                </a>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Sugestões" title="Vídeos por conteúdo do cronograma" subtitle="Cada conteúdo recebe uma busca automática para videoaulas correspondentes." />
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {filteredSuggestions.length === 0 ? (
            <EmptyState title="Nenhum vídeo encontrado" subtitle="Ajuste os filtros para ver outras sugestões." />
          ) : (
            filteredSuggestions.slice(0, 20).map((item) => (
              <VideoCard key={item.videoId} item={item} watched={Boolean(watchedVideos[item.videoId])} onToggleWatched={actions.toggleVideoWatched} />
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}