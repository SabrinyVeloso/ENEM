import React, { useState } from 'react';
import { GlassCard, SectionHeader } from './Ui';
import { usePlanner } from '../context/PlannerContext';

export default function Onboarding() {
  const { actions } = usePlanner();
  const [step, setStep] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(90);

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
    const settings = {
      studyDaysCount: daysOfWeek.length || 5,
      studyDays: daysOfWeek,
      studyHoursPerDay: Number(hoursPerDay),
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
              <p className="text-sm text-[var(--muted)]">Por quanto tempo você deseja estudar?</p>
              <div className="flex gap-2 flex-wrap">
                {studyTimeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setHoursPerDay(opt.value)}
                    className={`app-button-secondary ${hoursPerDay === opt.value ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Resumo</p>
              <ul className="text-sm">
                <li>Dias escolhidos: {daysOfWeek.join(', ') || 'Nenhum'}</li>
                <li>Tempo de estudo: {studyTimeOptions.find((option) => option.value === hoursPerDay)?.label || `${hoursPerDay} minutos`}</li>
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
            {step < 2 ? <button type="button" onClick={next} className="app-button-primary">Próximo</button> : <button type="button" onClick={submit} className="app-button-primary">Confirmar e continuar</button>}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
