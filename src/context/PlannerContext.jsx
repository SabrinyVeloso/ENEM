import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  baseQuestions,
  connectors,
  curriculum,
  enemDate,
  essayTopics,
  getDaysUntilEnem,
  repertoires,
  schedule,
  scheduleStart,
  settingsDefaults,
  subjectMeta,
  themePalettes,
  toISODate,
  videoChannels
} from '../data/planner';

const STORAGE_KEY = 'enem-planner-state-v2';
const THEME_KEY = 'enem-planner-theme-v2';

const PlannerContext = createContext(null);

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function createDefaultState() {
  return {
    theme: readJSON(THEME_KEY, 'dark'),
    settings: { ...settingsDefaults },
    contentStatuses: {},
    essayDraft: { topic: essayTopics[0], text: '' },
    essays: [],
    exerciseHistory: [],
    simuladoHistory: [],
    focusHistory: []
  };
}

function mergeState(base, incoming) {
  const next = structuredClone(base);
  if (!incoming || typeof incoming !== 'object') return next;
  next.theme = incoming.theme || next.theme;
  next.settings = { ...next.settings, ...(incoming.settings || {}) };
  next.contentStatuses = { ...(incoming.contentStatuses || {}) };
  next.essayDraft = { ...next.essayDraft, ...(incoming.essayDraft || {}) };
  next.essays = Array.isArray(incoming.essays) ? incoming.essays : [];
  next.exerciseHistory = Array.isArray(incoming.exerciseHistory) ? incoming.exerciseHistory : [];
  next.simuladoHistory = Array.isArray(incoming.simuladoHistory) ? incoming.simuladoHistory : [];
  next.focusHistory = Array.isArray(incoming.focusHistory) ? incoming.focusHistory : [];
  return next;
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStatusOrder() {
  return ['pending', 'done', 'lost'];
}

function getStudyDays() {
  return schedule.weeks.flatMap((week) => week.days.filter((day) => day.type === 'study'));
}

function getCurrentWeek() {
  const today = toISODate(new Date());
  return schedule.weeks.find((week) => week.days.some((day) => day.date === today)) || schedule.weeks[0];
}

function getCurrentDay() {
  const today = toISODate(new Date());
  const current = schedule.weeks.flatMap((week) => week.days).find((day) => day.date === today);
  return current || schedule.weeks[0].days[0];
}

function getContentItems() {
  return schedule.items;
}

function getContentBySubject(subject) {
  return getContentItems().filter((item) => item.subject === subject);
}

function getContentStatusMap(state) {
  return state.contentStatuses || {};
}

function getContentStatus(state, contentId) {
  return getContentStatusMap(state)[contentId] || 'pending';
}

function buildSubjectStats(state) {
  return Object.entries(curriculum).map(([subject, topics]) => {
    const items = getContentBySubject(subject);
    const done = items.filter((item) => getContentStatus(state, item.id) === 'done').length;
    const lost = items.filter((item) => getContentStatus(state, item.id) === 'lost').length;
    const pending = items.length - done - lost;
    return {
      subject,
      label: subjectMeta[subject].label,
      total: topics.length,
      done,
      lost,
      pending,
      percent: Math.round((done / items.length) * 100) || 0
    };
  });
}

function buildHeatmap(state) {
  return schedule.weeks.flatMap((week) =>
    week.days.map((day) => {
      const status = day.type === 'study' ? getContentStatus(state, day.contentId) : day.type;
      return {
        ...day,
        status,
        weekNumber: week.weekNumber
      };
    })
  );
}

function buildCurrentStreak(state) {
  const days = getStudyDays();
  let streak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    const day = days[index];
    if (getContentStatus(state, day.contentId) === 'done') {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

function buildDashboard(state) {
  const allItems = getContentItems();
  const completed = allItems.filter((item) => getContentStatus(state, item.id) === 'done').length;
  const lost = allItems.filter((item) => getContentStatus(state, item.id) === 'lost').length;
  const pending = allItems.length - completed - lost;
  const currentWeek = getCurrentWeek();
  const currentDay = getCurrentDay();
  const currentWeekStudyDays = currentWeek.days.filter((day) => day.type === 'study');
  const currentWeekDone = currentWeekStudyDays.filter((day) => getContentStatus(state, day.contentId) === 'done').length;
  const currentWeekProgress = Math.round((currentWeekDone / currentWeekStudyDays.length) * 100) || 0;
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const monthStudyDays = buildHeatmap(state).filter((day) => day.date.startsWith(currentMonthKey) && day.type === 'study');
  const monthDone = monthStudyDays.filter((day) => getContentStatus(state, day.contentId) === 'done').length;
  const monthProgress = Math.round((monthDone / monthStudyDays.length) * 100) || 0;
  const streak = buildCurrentStreak(state);

  return {
    completion: Math.round((completed / allItems.length) * 100) || 0,
    completed,
    lost,
    pending,
    streak,
    currentWeek,
    currentDay,
    currentWeekProgress,
    monthProgress,
    weekGoal: state.settings.weeklyGoal,
    daysUntilEnem: getDaysUntilEnem(),
    total: allItems.length,
    subjectStats: buildSubjectStats(state),
    heatmap: buildHeatmap(state),
    achievements: buildAchievements(state),
    focusMinutes: state.focusHistory.reduce((acc, item) => acc + item.minutes, 0),
    essayCount: state.essays.length,
    questionCount: state.exerciseHistory.length,
    simuladoCount: state.simuladoHistory.length
  };
}

function buildAchievements(state) {
  const dashboard = buildDashboardSummary(state);
  return [
    { id: 'streak', label: '🔥 7 dias estudando', done: dashboard.streak >= 7 },
    { id: 'contents', label: '📚 30 conteúdos concluídos', done: dashboard.completed >= 30 },
    { id: 'essays', label: '✍️ 10 redações feitas', done: state.essays.length >= 10 },
    { id: 'questions', label: '🧠 100 questões respondidas', done: state.exerciseHistory.length >= 100 },
    { id: 'simulado', label: '📊 primeiro simulado', done: state.simuladoHistory.length >= 1 }
  ];
}

function buildDashboardSummary(state) {
  const allItems = getContentItems();
  const completed = allItems.filter((item) => getContentStatus(state, item.id) === 'done').length;
  const streak = buildCurrentStreak(state);
  return { completed, streak };
}

function persistState(nextState) {
  saveJSON(STORAGE_KEY, nextState);
  saveJSON(THEME_KEY, nextState.theme);
}

export function PlannerProvider({ children }) {
  const [state, setState] = useState(() => mergeState(createDefaultState(), readJSON(STORAGE_KEY, null)));

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    persistState(state);
  }, [state]);

  const actions = useMemo(() => {
    return {
      setTheme(theme) {
        setState((current) => ({ ...current, theme }));
      },
      toggleTheme() {
        setState((current) => ({ ...current, theme: current.theme === 'dark' ? 'light' : 'dark' }));
      },
      setContentStatus(contentId, status) {
        setState((current) => ({
          ...current,
          contentStatuses: {
            ...current.contentStatuses,
            [contentId]: status
          }
        }));
      },
      cycleContentStatus(contentId) {
        setState((current) => {
          const currentStatus = current.contentStatuses[contentId] || 'pending';
          const nextIndex = (getStatusOrder().indexOf(currentStatus) + 1) % getStatusOrder().length;
          return {
            ...current,
            contentStatuses: {
              ...current.contentStatuses,
              [contentId]: getStatusOrder()[nextIndex]
            }
          };
        });
      },
      saveEssay(draft) {
        setState((current) => ({
          ...current,
          essays: [
            {
              id: `essay-${Date.now()}`,
              createdAt: new Date().toISOString(),
              ...draft
            },
            ...current.essays
          ]
        }));
      },
      updateEssayDraft(essayDraft) {
        setState((current) => ({ ...current, essayDraft }));
      },
      saveExerciseAttempt(entry) {
        setState((current) => ({
          ...current,
          exerciseHistory: [
            { id: `exercise-${Date.now()}`, createdAt: new Date().toISOString(), ...entry },
            ...current.exerciseHistory
          ]
        }));
      },
      saveSimuladoAttempt(entry) {
        setState((current) => ({
          ...current,
          simuladoHistory: [
            { id: `simulado-${Date.now()}`, createdAt: new Date().toISOString(), ...entry },
            ...current.simuladoHistory
          ]
        }));
      },
      saveFocusSession(entry) {
        setState((current) => ({
          ...current,
          focusHistory: [
            { id: `focus-${Date.now()}`, createdAt: new Date().toISOString(), ...entry },
            ...current.focusHistory
          ]
        }));
      },
      updateSettings(settings) {
        setState((current) => ({
          ...current,
          settings: {
            ...current.settings,
            ...settings
          }
        }));
      },
      resetAll() {
        setState(createDefaultState());
      }
    };
  }, []);

  const derived = useMemo(() => {
    return {
      dashboard: buildDashboard(state),
      currentWeek: getCurrentWeek(),
      currentDay: getCurrentDay(),
      subjectStats: buildSubjectStats(state),
      heatmap: buildHeatmap(state),
      contentItems: getContentItems(),
      contentBySubject: {
        math: getContentBySubject('math'),
        language: getContentBySubject('language'),
        humanas: getContentBySubject('humanas'),
        nature: getContentBySubject('nature'),
        essay: getContentBySubject('essay')
      },
      videoChannels,
      baseQuestions,
      essayTopics,
      repertoires,
      connectors,
      themePalette: themePalettes[state.theme],
      subjectMeta,
      schedule,
      scheduleStart,
      enemDate
    };
  }, [state]);

  const value = useMemo(
    () => ({ state, actions, ...derived }),
    [state, actions, derived]
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within PlannerProvider');
  }
  return context;
}