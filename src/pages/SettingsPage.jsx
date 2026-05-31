import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader, StatusBadge } from '../components/Ui';

export default function SettingsPage() {
  const { state, actions } = usePlanner();
  const [profileName, setProfileName] = useState(state.settings.profileName);
  const [weeklyGoal, setWeeklyGoal] = useState(state.settings.weeklyGoal);
  const [studyMinutes, setStudyMinutes] = useState(state.settings.studyMinutes);

  function saveSettings() {
    actions.updateSettings({ profileName, weeklyGoal: Number(weeklyGoal), studyMinutes: Number(studyMinutes) });
  }

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Configurações" title="Tema, metas, perfil e notificações" subtitle="Ajustes rápidos, com tudo salvo localmente no navegador." />
      </GlassCard>
      <section className="grid gap-4 xl:grid-cols-1">
        <GlassCard className="p-4">
          <SectionHeader eyebrow="Perfil" title="Editar perfil" subtitle="Atualize seu nome, metas e escolha o tema." />
          <div className="mt-4 grid gap-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Como você deseja ser chamado</p>
            <input className="input-shell w-full" value={profileName || ''} onChange={(event) => setProfileName(event.target.value)} placeholder="Seu nome" />

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Meta semanal</p>
            <input className="input-shell w-full" type="number" value={weeklyGoal || 0} onChange={(event) => setWeeklyGoal(event.target.value)} min="1" max="30" placeholder="Conteúdos por semana" />

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Horas</p>
            <input className="input-shell w-full" type="number" value={studyMinutes || 0} onChange={(event) => setStudyMinutes(event.target.value)} min="1" max="600" step="1" placeholder="Minutos por dia (ex: 90)" />

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