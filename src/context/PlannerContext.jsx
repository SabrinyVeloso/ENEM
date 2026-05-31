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
  buildAdaptiveSchedule,
  scheduleStart,
  priorityMeta,
  settingsDefaults,
  subjectMeta,
  themePalettes,
  addDays,
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
    reviewQueue: [],
    reviewSchedule: {},
    focusMode: false,
    essayDraft: { topic: '', text: '' },
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
  next.contentStatuses = Object.fromEntries(
    Object.entries(incoming.contentStatuses || {}).map(([contentId, status]) => [contentId, normalizeContentStatus(status)])
  );
  next.reviewQueue = Array.isArray(incoming.reviewQueue) ? incoming.reviewQueue : [];
  next.reviewSchedule = { ...(incoming.reviewSchedule || {}) };
  next.focusMode = Boolean(incoming.focusMode);
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
  return ['pending', 'done', 'perdido'];
}

function normalizeContentStatus(status) {
  if (status === 'perdido' || status === 'lost' || status === 'missed') return 'perdido';
  if (status === 'done' || status === 'pending') return status;
  return 'pending';
}

function getReviewDueDate(days = 2) {
  return toISODate(addDays(new Date(), days));
}

function getStudyDays(scheduleData) {
  return scheduleData.weeks.flatMap((week) => week.days.filter((day) => day.type === 'study'));
}

function getCurrentWeek(scheduleData) {
  const today = toISODate(new Date());
  return scheduleData.weeks.find((week) => week.days.some((day) => day.date === today)) || scheduleData.weeks[0];
}

function getCurrentDay(scheduleData) {
  const today = toISODate(new Date());
  const current = scheduleData.weeks.flatMap((week) => week.days).find((day) => day.date === today);
  return current || scheduleData.weeks[0].days[0];
}

function getContentItems(scheduleData) {
  return scheduleData.items;
}

function getContentBySubject(scheduleData, subject) {
  return getContentItems(scheduleData).filter((item) => item.subject === subject);
}

function getContentStatusMap(state) {
  return state.contentStatuses || {};
}

function getContentStatus(state, contentId) {
  return normalizeContentStatus(getContentStatusMap(state)[contentId]);
}

function buildSubjectStats(state, scheduleData) {
  return Object.entries(curriculum).map(([subject, topics]) => {
    const items = getContentBySubject(scheduleData, subject);
    const done = items.filter((item) => getContentStatus(state, item.id) === 'done').length;
    const lost = items.filter((item) => getContentStatus(state, item.id) === 'perdido').length;
    const pending = items.length - done - lost;
    const priorityCounts = Object.fromEntries(Object.keys(priorityMeta).map((key) => [key, 0]));
    items.forEach((item) => {
      const key = item.priority || 'medium';
      priorityCounts[key] = (priorityCounts[key] || 0) + 1;
    });
    const strongTopics = [...items]
      .sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0))
      .slice(0, 3)
      .map((item) => item.title);
    return {
      subject,
      label: subjectMeta[subject].label,
      total: topics.length,
      done,
      lost,
      pending,
      percent: Math.round((done / items.length) * 100) || 0,
      priorityCounts,
      strongTopics,
      topPriority: strongTopics[0] || topics[0]?.title || ''
    };
  });
}

function buildHeatmap(state, scheduleData) {
  return scheduleData.weeks.flatMap((week) =>
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

function buildCurrentStreak(state, scheduleData) {
  const days = getStudyDays(scheduleData);
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

function buildDashboard(state, scheduleData) {
  const allItems = getContentItems(scheduleData);
  const completed = allItems.filter((item) => getContentStatus(state, item.id) === 'done').length;
  const lost = allItems.filter((item) => getContentStatus(state, item.id) === 'perdido').length;
  const pending = allItems.length - completed - lost;
  const currentWeek = getCurrentWeek(scheduleData);
  const currentDay = getCurrentDay(scheduleData);
  const currentWeekStudyDays = currentWeek.days.filter((day) => day.type === 'study');
  const currentWeekDone = currentWeekStudyDays.filter((day) => getContentStatus(state, day.contentId) === 'done').length;
  const currentWeekProgress = Math.round((currentWeekDone / currentWeekStudyDays.length) * 100) || 0;
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const monthStudyDays = buildHeatmap(state, scheduleData).filter((day) => day.date.startsWith(currentMonthKey) && day.type === 'study');
  const monthDone = monthStudyDays.filter((day) => getContentStatus(state, day.contentId) === 'done').length;
  const monthProgress = Math.round((monthDone / monthStudyDays.length) * 100) || 0;
  const streak = buildCurrentStreak(state, scheduleData);
  const today = toISODate(new Date());
  const reviewItems = allItems
    .filter((item) => getContentStatus(state, item.id) === 'perdido')
    .filter((item) => !state.reviewSchedule?.[item.id] || state.reviewSchedule[item.id] <= today)
    .sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));

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
    subjectStats: buildSubjectStats(state, scheduleData),
    heatmap: buildHeatmap(state, scheduleData),
    achievements: buildAchievements(state, scheduleData),
    focusMinutes: state.focusHistory.reduce((acc, item) => acc + item.minutes, 0),
    reviewItems,
    essayCount: state.essays.length,
    questionCount: state.exerciseHistory.length,
    simuladoCount: state.simuladoHistory.length
  };
}

function buildAchievements(state, scheduleData) {
  const dashboard = buildDashboardSummary(state, scheduleData);
  return [
    { id: 'streak', label: '🔥 7 dias estudando', done: dashboard.streak >= 7 },
    { id: 'contents', label: '📚 30 conteúdos concluídos', done: dashboard.completed >= 30 },
    { id: 'essays', label: '✍️ 10 redações feitas', done: state.essays.length >= 10 },
    { id: 'questions', label: '🧠 100 questões respondidas', done: state.exerciseHistory.length >= 100 },
    { id: 'simulado', label: '📊 primeiro simulado', done: state.simuladoHistory.length >= 1 }
  ];
}

function buildDashboardSummary(state, scheduleData) {
  const allItems = getContentItems(scheduleData);
  const completed = allItems.filter((item) => getContentStatus(state, item.id) === 'done').length;
  const streak = buildCurrentStreak(state, scheduleData);
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
        const nextStatus = normalizeContentStatus(status);
        setState((current) => ({
          ...current,
          contentStatuses: {
            ...current.contentStatuses,
            [contentId]: nextStatus
          },
          reviewSchedule: nextStatus === 'perdido'
            ? {
                ...current.reviewSchedule,
                [contentId]: getReviewDueDate(2)
              }
            : Object.fromEntries(Object.entries(current.reviewSchedule || {}).filter(([key]) => key !== contentId)),
          reviewQueue: nextStatus === 'perdido'
            ? Array.from(new Set([...(current.reviewQueue || []), contentId]))
            : (current.reviewQueue || []).filter((item) => item !== contentId)
        }));
      },
      toggleFocusMode() {
        setState((current) => ({
          ...current,
          focusMode: !current.focusMode
        }));
      },
      cycleContentStatus(contentId) {
        setState((current) => {
          const currentStatus = normalizeContentStatus(current.contentStatuses[contentId]);
          const nextIndex = (getStatusOrder().indexOf(currentStatus) + 1) % getStatusOrder().length;
          return {
            ...current,
            contentStatuses: {
              ...current.contentStatuses,
              [contentId]: getStatusOrder()[nextIndex]
            },
            reviewSchedule: getStatusOrder()[nextIndex] === 'perdido'
              ? {
                  ...current.reviewSchedule,
                  [contentId]: getReviewDueDate(2)
                }
              : Object.fromEntries(Object.entries(current.reviewSchedule || {}).filter(([key]) => key !== contentId)),
            reviewQueue: getStatusOrder()[nextIndex] === 'perdido'
              ? Array.from(new Set([...(current.reviewQueue || []), contentId]))
              : (current.reviewQueue || []).filter((item) => item !== contentId)
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
      generateSchedule(settings) {
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
    const adaptiveSchedule = buildAdaptiveSchedule(state.settings);
    return {
      dashboard: buildDashboard(state, adaptiveSchedule),
      currentWeek: getCurrentWeek(adaptiveSchedule),
      currentDay: getCurrentDay(adaptiveSchedule),
      subjectStats: buildSubjectStats(state, adaptiveSchedule),
      heatmap: buildHeatmap(state, adaptiveSchedule),
      contentItems: getContentItems(adaptiveSchedule),
      contentBySubject: {
        math: getContentBySubject(adaptiveSchedule, 'math'),
        language: getContentBySubject(adaptiveSchedule, 'language'),
        humanas: getContentBySubject(adaptiveSchedule, 'humanas'),
        nature: getContentBySubject(adaptiveSchedule, 'nature'),
        essay: getContentBySubject(adaptiveSchedule, 'essay')
      },
      videoChannels,
      baseQuestions,
      essayTopics,
      repertoires,
      connectors,
      themePalette: themePalettes[state.theme],
      subjectMeta,
      schedule: adaptiveSchedule,
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