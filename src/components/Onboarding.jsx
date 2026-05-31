import React, { useState } from 'react';
import { GlassCard, SectionHeader } from './Ui';
import { usePlanner } from '../context/PlannerContext';

export default function Onboarding() {
  const { state, actions } = usePlanner();
  const [step, setStep] = useState(0);
  const [daysCount, setDaysCount] = useState(5);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(1.5);
  const [targetScore, setTargetScore] = useState('700+');
  const [level, setLevel] = useState('Intermediário');

  const weekdays = [
    { id: 'mon', label: 'Seg' },
    { id: 'tue', label: 'Ter' },
    { id: 'wed', label: 'Qua' },
    { id: 'thu', label: 'Qui' },
    { id: 'fri', label: 'Sex' },
    { id: 'sat', label: 'Sáb' },
    { id: 'sun', label: 'Dom' }
  ];

  function toggleDay(d) {
    setDaysOfWeek((current) => (current.includes(d) ? current.filter((x) => x !== d) : [...current, d]));
  }

  function next() {
    setStep((s) => Math.min(3, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submit() {
    // Normalize values and save to settings
    const settings = {
      studyDaysCount: Number(daysCount),
      studyDays: daysOfWeek,
      studyHoursPerDay: Number(hoursPerDay),
      targetScore,
      level,
      onboardCompleted: true
    };
    actions.updateSettings(settings);
    if (actions.generateSchedule) actions.generateSchedule(settings);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => {}} />
      <GlassCard className="relative max-w-xl p-6">
        <SectionHeader eyebrow="Boas-vindas" title="Vamos personalizar seu plano de estudos" subtitle="Responda rápido para que o app crie um cronograma inteligente para você." />

        <div className="mt-4">
          {step === 0 && (
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Quantos dias por semana você pretende estudar?</p>
              <div className="flex gap-2 flex-wrap">
                {[1,2,3,4,5,6,7].map((n) => (
                  <button key={n} type="button" onClick={() => setDaysCount(n)} className={`app-button-secondary ${daysCount===n? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white':''}`}>{n} dias</button>
                ))}
              </div>

              <p className="text-sm text-[var(--muted)]">Quais dias da semana você vai estudar? (toque para selecionar)</p>
              <div className="flex gap-2 flex-wrap">
                {weekdays.map((d) => (
                  <button key={d.id} type="button" onClick={() => toggleDay(d.id)} className={`app-button-secondary ${daysOfWeek.includes(d.id) ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}>{d.label}</button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Quantas horas por dia você pretende estudar?</p>
              <input className="input-shell" type="number" min="0.25" step="0.25" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} />

              <p className="text-sm text-[var(--muted)]">Qual sua meta de nota no ENEM?</p>
              <div className="flex gap-2 flex-wrap">
                {['600+','700+','800+','900+'].map((opt) => (
                  <button key={opt} type="button" onClick={() => setTargetScore(opt)} className={`app-button-secondary ${targetScore===opt? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white':''}`}>{opt}</button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Qual seu nível atual?</p>
              <div className="flex gap-2 flex-wrap">
                {['Iniciante','Intermediário','Avançado'].map((opt) => (
                  <button key={opt} type="button" onClick={() => setLevel(opt)} className={`app-button-secondary ${level===opt? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white':''}`}>{opt}</button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Resumo</p>
              <ul className="text-sm">
                <li>Dias por semana: {daysCount}</li>
                <li>Dias escolhidos: {daysOfWeek.join(', ') || 'Nenhum'}</li>
                <li>Horas por dia: {hoursPerDay}</li>
                <li>Meta no ENEM: {targetScore}</li>
                <li>Nível: {level}</li>
              </ul>

              <p className="text-sm text-[var(--muted)]">Ao confirmar, seu cronograma será gerado automaticamente e você será levado ao painel.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <div>
            {step > 0 ? <button type="button" onClick={prev} className="app-button-secondary">Voltar</button> : null}
          </div>
          <div className="flex gap-2">
            {step < 3 ? <button type="button" onClick={next} className="app-button-primary">Próximo</button> : <button type="button" onClick={submit} className="app-button-primary">Confirmar e continuar</button>}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
