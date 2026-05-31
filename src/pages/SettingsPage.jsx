import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader, StatusBadge } from '../components/Ui';

export default function SettingsPage() {
  const { state, actions } = usePlanner();
  const [profileName, setProfileName] = useState(state.settings.profileName);
  const [studyDaysCount, setStudyDaysCount] = useState(state.settings.studyDaysCount || (state.settings.studyDays || []).length || 5);
  const [studyDays, setStudyDays] = useState(Array.isArray(state.settings.studyDays) ? state.settings.studyDays : ['mon', 'tue', 'wed', 'thu', 'fri']);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(state.settings.studyHoursPerDay || 90);
  const [studyStartDate, setStudyStartDate] = useState(state.settings.studyStartDate || new Date().toISOString().slice(0, 10));
  const [targetScore, setTargetScore] = useState(state.settings.targetScore || '700+');
  const [level, setLevel] = useState(state.settings.level || 'Intermediário');

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
      targetScore,
      level,
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

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Quantos dias por semana você vai estudar?</p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStudyDaysCount(value)}
                  className={`app-button-secondary ${studyDaysCount === value ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                >
                  {value}
                </button>
              ))}
            </div>

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

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Qual sua meta de nota no ENEM?</p>
            <div className="flex flex-wrap gap-2">
              {['600+', '700+', '800+', '900+'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTargetScore(option)}
                  className={`app-button-secondary ${targetScore === option ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Qual seu nível atual?</p>
            <div className="flex flex-wrap gap-2">
              {['Iniciante', 'Intermediário', 'Avançado'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLevel(option)}
                  className={`app-button-secondary ${level === option ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Quando você quer começar a estudar?</p>
            <input className="input-shell w-full" type="date" value={studyStartDate} onChange={(event) => setStudyStartDate(event.target.value)} />

            <div className="flex items-center gap-3">
              <button type="button" onClick={() => actions.setTheme('light')} className="app-button-secondary">Tema claro</button>
              <button type="button" onClick={() => actions.setTheme('dark')} className="app-button-secondary">Tema escuro</button>
              <StatusBadge status={state.theme === 'dark' ? 'simulado' : 'done'}>{state.theme}</StatusBadge>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={saveSettings} className="app-button-primary">Salvar</button>
              <button type="button" onClick={actions.resetAll} className="app-button-secondary">Resetar dados</button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}