import React, { useState } from 'react';
import { GlassCard, SectionHeader } from './Ui';
import { usePlanner } from '../context/PlannerContext';

export default function Onboarding() {
  const { actions } = usePlanner();
  const [step, setStep] = useState(0);
  const [hoursPerDay, setHoursPerDay] = useState(90);
  const [studyStartDate, setStudyStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [studyDays, setStudyDays] = useState(['mon', 'tue', 'wed', 'thu', 'fri']);
  const [reviewDays, setReviewDays] = useState(['sun']);


  const studyTimeOptions = [
    { label: '30 minutos', value: 30 },
    { label: '45 minutos', value: 45 },
    { label: '1h', value: 60 },
    { label: '1h e 30 mins', value: 90 },
    { label: '2h', value: 120 }
  ];

  function next() {
    setStep((s) => Math.min(2, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submit() {
    const settings = {
      studyDaysCount: Array.isArray(studyDays) ? studyDays.length : 0,
      studyDays: Array.isArray(studyDays) ? studyDays : [],
      reviewDays: Array.isArray(reviewDays) ? reviewDays : [],
      studyHoursPerDay: Number(hoursPerDay),
      studyStartDate,
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
              <p className="text-sm text-[var(--muted)]">Quando você quer começar a estudar?</p>
              <input className="input-shell" type="date" value={studyStartDate} onChange={(event) => setStudyStartDate(event.target.value)} />
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Quais dias da semana você pretende estudar?</p>
              <div className="flex gap-2 flex-wrap">
                {[['dom', 'Dom'], ['mon', 'Seg'], ['tue', 'Ter'], ['wed', 'Qua'], ['thu', 'Qui'], ['fri', 'Sex'], ['sat', 'Sáb']].map(([key, label]) => {
                  const active = studyDays.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStudyDays((prev) => (prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]))}
                      className={`app-button-secondary ${active ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

                <p className="text-sm text-[var(--muted)]">Quais dias serão exclusivos para revisão?</p>
                <div className="flex gap-2 flex-wrap">
                  {[['sun', 'Dom'], ['mon', 'Seg'], ['tue', 'Ter'], ['wed', 'Qua'], ['thu', 'Qui'], ['fri', 'Sex'], ['sat', 'Sáb']].map(([key, label]) => {
                    const active = reviewDays.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setReviewDays((prev) => (prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]))}
                        className={`app-button-secondary ${active ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white' : ''}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

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
                <li>Data de início: {studyStartDate}</li>
                <li>Tempo de estudo: {studyTimeOptions.find((option) => option.value === hoursPerDay)?.label || `${hoursPerDay} minutos`}</li>
                <li>Dias escolhidos: {studyDays.map((d) => (d === 'dom' ? 'Dom' : d === 'mon' ? 'Seg' : d === 'tue' ? 'Ter' : d === 'wed' ? 'Qua' : d === 'thu' ? 'Qui' : d === 'fri' ? 'Sex' : 'Sáb')).join(', ')}</li>
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
