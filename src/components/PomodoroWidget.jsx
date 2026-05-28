import React, { useEffect, useMemo, useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, StatusBadge } from './Ui';

const durations = {
  focus: 25 * 60,
  break: 5 * 60
};

function formatTimer(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const rest = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}

function beep() {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 760;
  gain.gain.value = 0.04;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.18);
}

export default function PomodoroWidget() {
  const { state, actions } = usePlanner();
  const [mode, setMode] = useState('focus');
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState(true);
  const [remaining, setRemaining] = useState(durations.focus);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          const completedMinutes = mode === 'focus' ? 25 : 5;
          actions.saveFocusSession({ minutes: completedMinutes, mode });
          if (sound) beep();
          const nextMode = mode === 'focus' ? 'break' : 'focus';
          setMode(nextMode);
          return durations[nextMode];
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [actions, mode, running, sound]);

  const totalMinutes = useMemo(() => state.focusHistory.reduce((acc, entry) => acc + entry.minutes, 0), [state.focusHistory]);

  function resetPomodoro() {
    setRunning(false);
    setMode('focus');
    setRemaining(durations.focus);
  }

  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Pomodoro</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-[var(--text)]">Foco inteligente</h3>
        </div>
        <StatusBadge status={mode === 'focus' ? 'simulado' : 'rest'}>{mode}</StatusBadge>
      </div>

      <div className="mt-4 rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.08)] p-4">
        <strong className="block text-5xl font-black tracking-tight text-[var(--text)]">{formatTimer(remaining)}</strong>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Blocos curtos de foco para manter consistência sem cansar no celular.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setRunning((value) => !value)} className="app-button-primary">
            {running ? 'Pausar' : 'Iniciar'}
          </button>
          <button type="button" onClick={resetPomodoro} className="app-button-secondary">
            Resetar
          </button>
          <button type="button" onClick={() => setSound((value) => !value)} className="app-button-secondary">
            Som {sound ? 'ligado' : 'desligado'}
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Sessões</p>
          <strong className="mt-2 block text-3xl font-black">{state.focusHistory.length}</strong>
        </div>
        <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Minutos</p>
          <strong className="mt-2 block text-3xl font-black">{totalMinutes}</strong>
        </div>
      </div>
    </GlassCard>
  );
}