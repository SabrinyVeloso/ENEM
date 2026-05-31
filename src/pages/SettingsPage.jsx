import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader, StatusBadge } from '../components/Ui';

export default function SettingsPage() {
  const { state, actions } = usePlanner();
  const [profileName, setProfileName] = useState(state.settings.profileName);
  const [studyDays, setStudyDays] = useState(Array.isArray(state.settings.studyDays) ? state.settings.studyDays : ['mon', 'tue', 'wed', 'thu', 'fri']);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(state.settings.studyHoursPerDay || 90);
  const [studyStartDate, setStudyStartDate] = useState(state.settings.studyStartDate || new Date().toISOString().slice(0, 10));
  const studyDaysCount = state.settings.studyDaysCount || (state.settings.studyDays || []).length || 5;

  const weekdays = [
    { id: 'mon', label: 'Seg' },
    { id: 'tue', label: 'Ter' },
    { id: 'wed', label: 'Qua' },
    { id: 'thu', label: 'Qui' },
    { id: 'fri', label: 'Sex' },
    { id: 'sat', label: 'Sáb' },
    { id: 'sun', label: 'Dom' }
  ];

  const studyTimeOptions = [
    { label: '30 minutos', value: 30 },
    { label: '45 minutos', value: 45 },
    { label: '1h', value: 60 },
    { label: '1h e 30 mins', value: 90 },
    { label: '2h', value: 120 }
  ];

  function toggleStudyDay(dayId) {
    setStudyDays((current) => {
      if (current.includes(dayId)) return current.filter((value) => value !== dayId);
      return [...current, dayId];
    });
  }

  function saveSettings() {
    const nextSettings = {
      profileName,
      studyDaysCount,
      studyDays,
      studyHoursPerDay,
      studyStartDate,
      onboardCompleted: true
    };
    actions.updateSettings(nextSettings);
    if (actions.generateSchedule) actions.generateSchedule(nextSettings);
  }

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Configurações" title="Tema, metas, perfil e notificações" subtitle="Ajustes rápidos, com tudo salvo localmente no navegador." />
      </GlassCard>
      <section className="grid gap-4 xl:grid-cols-1">
        <GlassCard className="p-4">
          <SectionHeader eyebrow="Perfil" title="Editar perfil e rotina" subtitle="Atualize nome, agenda, duração de estudo, meta, nível e tema." />
          <div className="mt-4 grid gap-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Como você deseja ser chamado</p>
            <input className="input-shell w-full" value={profileName || ''} onChange={(event) => setProfileName(event.target.value)} placeholder="Seu nome" />

            {/* removed: Quantos dias por semana (kept weekly day selectors separately) */}

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Quais dias da semana você vai estudar?</p>
            <div className="flex flex-wrap gap-2">
              {weekdays.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleStudyDay(day.id)}
                  className={`app-button-secondary ${studyDays.includes(day.id) ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                >
                  {day.label}
                </button>
              ))}
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Por quanto tempo você deseja estudar?</p>
            <div className="flex flex-wrap gap-2">
              {studyTimeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStudyHoursPerDay(option.value)}
                  className={`app-button-secondary ${studyHoursPerDay === option.value ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* removed: target score and level selectors per user request */}

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Quando você quer começar a estudar?</p>
            <input className="input-shell w-full" type="date" value={studyStartDate} onChange={(event) => setStudyStartDate(event.target.value)} />

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">🎨 Aparência</p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => actions.setMode('light')} className={`app-button-secondary ${state.settings.themeMode === 'light' ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}>☀️ Claro</button>
              <button type="button" onClick={() => actions.setMode('dark')} className={`app-button-secondary ${state.settings.themeMode === 'dark' ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}>🌙 Escuro</button>
              <StatusBadge status={state.settings.themeMode === 'dark' ? 'simulado' : 'done'}>{state.settings.themeMode}</StatusBadge>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <div className="text-[12px] font-medium text-[var(--muted)]">Cor de destaque</div>
              <div className="flex gap-2">
                <button type="button" onClick={() => actions.setAccent('blue')} className={`w-8 h-8 rounded-full ring-2 ${state.settings.accentColor === 'blue' ? 'ring-offset-2 ring-white ring-primary' : ''}`} style={{ background: 'linear-gradient(135deg,#2F8DFF,#79C6FF)' }} />
                <button type="button" onClick={() => actions.setAccent('purple')} className={`w-8 h-8 rounded-full ring-2 ${state.settings.accentColor === 'purple' ? 'ring-offset-2 ring-white ring-primary' : ''}`} style={{ background: 'linear-gradient(135deg,#9B5CF6,#C9A6FF)' }} />
                <button type="button" onClick={() => actions.setAccent('pink')} className={`w-8 h-8 rounded-full ring-2 ${state.settings.accentColor === 'pink' ? 'ring-offset-2 ring-white ring-primary' : ''}`} style={{ background: 'linear-gradient(135deg,#FF66B2,#FF9CCF)' }} />
                <button type="button" onClick={() => actions.setAccent('green')} className={`w-8 h-8 rounded-full ring-2 ${state.settings.accentColor === 'green' ? 'ring-offset-2 ring-white ring-primary' : ''}`} style={{ background: 'linear-gradient(135deg,#34D399,#86EFAC)' }} />
                <button type="button" onClick={() => actions.setAccent('gray')} className={`w-8 h-8 rounded-full ring-2 ${state.settings.accentColor === 'gray' ? 'ring-offset-2 ring-white ring-primary' : ''}`} style={{ background: 'linear-gradient(135deg,#94A3B8,#CBD5E1)' }} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button type="button" onClick={saveSettings} className="app-button-primary">Salvar</button>
              <button type="button" onClick={actions.resetAll} className="app-button-secondary">Resetar dados</button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}