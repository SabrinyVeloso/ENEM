import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  baseQuestions,
  connectors,
  curriculum,
  enemDate,
  essayTopics,
  getDaysUntilEnem,
  repertoires,
  buildAdaptiveSchedule,
  scheduleStart,
  priorityMeta,
  settingsDefaults,
  subjectMeta,
  themePalettes,
  accentColors,
  addDays,
  fromISODate,
  toISODate,
  videoChannels,
} from "../data/planner";
import { contentResources, subjectResources, generateSearchLinks } from "../data/contentResources";

const STORAGE_KEY = "enem-planner-state-v2";
const THEME_KEY = "enem-planner-theme-v2";

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
    theme: readJSON(THEME_KEY, "dark"),
    // Mark onboarding completed so the main UI is immediately visible by default
    settings: { ...settingsDefaults, studyStartDate: toISODate(new Date()), onboardCompleted: true },
    contentStatuses: {},
    reviewQueue: [],
    reviewSchedule: {},
    watchedVideos: {},
    focusMode: false,
    essayDraft: { topic: "", text: "" },
    essays: [],
    exerciseHistory: [],
    simuladoHistory: [],
    focusHistory: [],
  };
}

function mergeState(base, incoming) {
  const next = structuredClone(base);
  if (!incoming || typeof incoming !== "object") return next;
  next.theme = incoming.theme || next.theme;
  next.settings = { ...next.settings, ...(incoming.settings || {}) };
  next.contentStatuses = Object.fromEntries(
    Object.entries(incoming.contentStatuses || {}).map(([contentId, status]) => [contentId, normalizeContentStatus(status)]),
  );
  next.reviewQueue = Array.isArray(incoming.reviewQueue) ? incoming.reviewQueue : [];
  next.reviewSchedule = { ...(incoming.reviewSchedule || {}) };
  // legacy flashcard fields removed
  next.watchedVideos = { ...(incoming.watchedVideos || {}) };
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
  return ["pending", "done", "perdido"];
}

function normalizeContentStatus(status) {
  if (status === "perdido" || status === "lost" || status === "missed") return "perdido";
  if (status === "done" || status === "pending") return status;
  return "pending";
}

function getTodayISO() {
  return toISODate(new Date());
}

function getStudyStartTiming(settings) {
  try {
    const startISO = settings?.studyStartDate || scheduleStart;
    const start = fromISODate(startISO);
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((start - today) / 86400000);
    return {
      startISO: toISODate(start),
      isBeforeStart: diff > 0,
      daysUntilStart: Math.max(0, diff),
    };
  } catch (e) {
    return { startISO: scheduleStart, isBeforeStart: false, daysUntilStart: 0 };
  }
}

function getNextStudyDate(settings, fromDate = new Date()) {
  const scheduleData = buildAdaptiveSchedule(settings);
  const today = toISODate(fromDate);
  const nextStudyDay = scheduleData.weeks
    .flatMap((week) => week.days.filter((day) => day.type === "study"))
    .find((day) => day.date > today);

  return nextStudyDay?.date || toISODate(addDays(fromDate, 2));
}

function getStudyDays(scheduleData) {
  return scheduleData.weeks.flatMap((week) => week.days.filter((day) => day.type === "study"));
}

function getCurrentWeek(scheduleData) {
  const today = toISODate(new Date());
  return (
    scheduleData.weeks.find((week) => week.days.some((day) => day.date === today)) || scheduleData.weeks[0]
  );
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
    const done = items.filter((item) => getContentStatus(state, item.id) === "done").length;
    const lost = items.filter((item) => getContentStatus(state, item.id) === "perdido").length;
    const pending = items.length - done - lost;
    const priorityCounts = Object.fromEntries(Object.keys(priorityMeta).map((key) => [key, 0]));
    items.forEach((item) => {
      const key = item.priority || "medium";
      priorityCounts[key] = (priorityCounts[key] || 0) + 1;
    });
    const strongTopics = [...items].sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0)).slice(0, 3).map((item) => item.title);
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
      topPriority: strongTopics[0] || topics[0]?.title || "",
    };
  });
}

function buildHeatmap(state, scheduleData) {
  return scheduleData.weeks.flatMap((week) =>
    week.days.map((day) => {
      const status = day.type === "study" ? getContentStatus(state, day.contentId) : day.type;
      return { ...day, status, weekNumber: week.weekNumber };
    }),
  );
}

function buildCurrentStreak(state, scheduleData) {
  const days = getStudyDays(scheduleData);
  let streak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    const day = days[index];
    if (getContentStatus(state, day.contentId) === "done") {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

function getWeeklyStudiedContents(state, scheduleData) {
  // determine current week window (Sunday..Saturday)
  const todayDate = new Date();
  const startOfWeek = toISODate(addDays(todayDate, -todayDate.getDay()));
  const endOfWeek = toISODate(addDays(fromISODate(startOfWeek), 6));

  // collect items explicitly marked done this calendar week
  const itemsThisWeek = getContentItems(scheduleData).filter((item) => {
    const status = getContentStatus(state, item.id);
    return status === "done" && item.scheduledFor >= startOfWeek && item.scheduledFor <= endOfWeek;
  });

  // fallback: if none found in this week, include all done items
  const items = itemsThisWeek.length ? itemsThisWeek : getContentItems(scheduleData).filter((item) => getContentStatus(state, item.id) === "done");

  const contents = items.map((item) => {
    const specific = contentResources[item.title] || [];
    const fallback = subjectResources[item.subject] || [];
    const usedSpecific = specific.length > 0;
    const generated = generateSearchLinks(item.title);
    const resources = [...(usedSpecific ? specific : fallback), ...generated];
    return {
      id: item.id,
      title: item.title,
      subject: item.subject,
      subjectLabel: item.subjectLabel,
      priorityRank: item.priorityRank || 0,
      resources,
      usingSubjectFallback: !usedSpecific,
      scheduledFor: item.scheduledFor,
    };
  });

  // deduplicate by title
  const dedup = [];
  const seen = new Set();
  contents.forEach((c) => {
    if (!seen.has(c.title)) {
      seen.add(c.title);
      dedup.push(c);
    }
  });

  dedup.sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));
  const resourcesFound = dedup.reduce((acc, c) => acc + (c.resources?.length || 0), 0);

  // provide studyDays as the schedule days for the current week when available
  const currentWeek = getCurrentWeek(scheduleData);
  const studyDays = (currentWeek?.days || []).filter((d) => d.type === "study" && d.contentId && d.date >= startOfWeek && d.date <= endOfWeek);

  return {
    contents: dedup,
    totalContents: dedup.length,
    totalResources: resourcesFound,
    studyDays,
  };
}

function getItemDueDate(state, item) {
  return state.reviewSchedule?.[item.id] || item.scheduledFor || item.date;
}

function buildTodayStudyItems(state, scheduleData) {
  const today = getTodayISO();
  const currentDay = getCurrentDay(scheduleData);
  if (!currentDay || currentDay.type !== "study") return [];

  return getContentItems(scheduleData)
    .filter((item) => item.scheduledFor === today)
    .map((item) => ({
      ...item,
      status: getContentStatus(state, item.id),
      dueDate: getItemDueDate(state, item),
      isRescheduled: Boolean(state.reviewSchedule?.[item.id] && state.reviewSchedule[item.id] !== item.scheduledFor),
    }))
    .sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));
}

function buildOverdueItems(state, scheduleData) {
  const today = getTodayISO();
  return getContentItems(scheduleData)
    .filter((item) => {
      const status = getContentStatus(state, item.id);
      const dueDate = getItemDueDate(state, item);
      return status === "perdido" || (status === "pending" && dueDate < today);
    })
    .map((item) => ({
      ...item,
      status: getContentStatus(state, item.id),
      dueDate: getItemDueDate(state, item),
      isRescheduled: Boolean(state.reviewSchedule?.[item.id] && state.reviewSchedule[item.id] !== item.scheduledFor),
    }))
    .sort((a, b) => {
      if (a.dueDate === b.dueDate) return (b.priorityRank || 0) - (a.priorityRank || 0);
      return a.dueDate.localeCompare(b.dueDate);
    });
}

function formatNextReviewLabel(dateISO) {
  if (!dateISO) return "Sem revisão agendada";
  const today = getTodayISO();
  const tomorrow = toISODate(addDays(new Date(), 1));
  if (dateISO === today) return "Hoje às 19h";
  if (dateISO === tomorrow) return "Amanhã às 19h";
  return `${fromISODate(dateISO).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })} às 19h`;
}

function buildMotivations(state, dashboard, todayStudyItems, overdueItems) {
  const messages = [];
  if (todayStudyItems.length > 0 && overdueItems.length === 0) messages.push("🔥 Você já tem o caminho de hoje pronto para avançar sem atrasos.");
  if (dashboard.completed > 0 && dashboard.progressDelta >= 0) messages.push("📈 Seu progresso está crescendo com consistência.");
  if (dashboard.streak >= 7) messages.push(`🏆 Você está há ${dashboard.streak} dias estudando consecutivamente.`);
  if (dashboard.completion >= 100) messages.push("🔥 Você concluiu todos os conteúdos cadastrados.");
  if (messages.length === 0) messages.push("✨ Um passo de cada vez já mantém sua rotina viva.");
  return messages;
}

function buildDashboard(state, scheduleData) {
  const allItems = getContentItems(scheduleData);
  const completed = allItems.filter((item) => getContentStatus(state, item.id) === "done").length;
  const lost = allItems.filter((item) => getContentStatus(state, item.id) === "perdido").length;
  const pending = allItems.length - completed - lost;
  const currentWeek = getCurrentWeek(scheduleData);
  const currentDay = getCurrentDay(scheduleData);
  const weeklyStudied = getWeeklyStudiedContents(state, scheduleData);
  const currentWeekStudyDays = currentWeek.days.filter((day) => day.type === "study");
  const currentWeekDone = currentWeekStudyDays.filter((day) => getContentStatus(state, day.contentId) === "done").length;
  const currentWeekProgress = Math.round((currentWeekDone / currentWeekStudyDays.length) * 100) || 0;
  const previousWeek = scheduleData.weeks.find((week) => week.weekNumber === currentWeek.weekNumber - 1);
  const previousWeekStudyDays = previousWeek?.days.filter((day) => day.type === "study") || [];
  const previousWeekDone = previousWeekStudyDays.filter((day) => getContentStatus(state, day.contentId) === "done").length;
  const previousWeekProgress = Math.round((previousWeekDone / previousWeekStudyDays.length) * 100) || 0;
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const monthStudyDays = buildHeatmap(state, scheduleData).filter((day) => day.date.startsWith(currentMonthKey) && day.type === "study");
  const monthDone = monthStudyDays.filter((day) => getContentStatus(state, day.contentId) === "done").length;
  const monthProgress = Math.round((monthDone / monthStudyDays.length) * 100) || 0;
  const streak = buildCurrentStreak(state, scheduleData);
  const today = toISODate(new Date());
  const todayStudyItems = buildTodayStudyItems(state, scheduleData);

  // determine review day from user settings (avoid depending on schedule dates)
  const weekdayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayKey = weekdayKeys[new Date().getDay()];
  const userStudyDays = Array.isArray(state.settings?.studyDays) ? state.settings.studyDays.filter((d) => weekdayKeys.includes(d)) : settingsDefaults.studyDays;
  const userReviewDays = Array.isArray(state.settings?.reviewDays) ? state.settings.reviewDays.filter((d) => weekdayKeys.includes(d)) : settingsDefaults.reviewDays;
  const todayReviewDay = userReviewDays.includes(todayKey) || currentDay?.type === "review";
  const todayReviewItems = [];
  const overdueItems = buildOverdueItems(state, scheduleData);
  const reviewItems = allItems
    .filter((item) => getContentStatus(state, item.id) === "perdido")
    .filter((item) => !state.reviewSchedule?.[item.id] || state.reviewSchedule[item.id] <= today)
    .sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));

  const nextReviewItem = [...overdueItems].sort((a, b) => {
    if (a.dueDate === b.dueDate) return (b.priorityRank || 0) - (a.priorityRank || 0);
    return a.dueDate.localeCompare(b.dueDate);
  })[0] || null;
  const nextReviewDate = nextReviewItem?.dueDate || null;

  // If there is no queued review item, compute next review date from user settings
  function getNextDateFromReviewDays(reviewDays, fromDate = new Date()) {
    const weekdayMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    const allowed = (Array.isArray(reviewDays) && reviewDays.length > 0) ? reviewDays.map((d) => weekdayMap[d]).filter((n) => typeof n === 'number') : [];
    if (!allowed.length) return null;
    const start = new Date(fromDate);
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 14; i += 1) {
      const candidate = new Date(start);
      candidate.setDate(start.getDate() + i);
      if (allowed.includes(candidate.getDay())) return toISODate(candidate);
    }
    return null;
  }

  const hoursAccumulated = Math.round((state.focusHistory.reduce((acc, item) => acc + item.minutes, 0) / 60) * 10) / 10;
  const progressDelta = currentWeekProgress - previousWeekProgress;
  const reminders = [];

  if (todayStudyItems.length > 0) {
    reminders.push({ tone: "hot", emoji: "🔥", title: `Você tem ${todayStudyItems.length} conteúdos para estudar hoje.`, description: "Abra a seção de estudos de hoje para seguir o plano." });
  }

  if (overdueItems.length > 0) {
    reminders.push({ tone: "bad", emoji: "📌", title: `Você possui ${overdueItems.length} conteúdos atrasados.`, description: "Eles já estão prontos para revisão e reagendamento." });
  }

  if (todayStudyItems.some((item) => item.subject === "essay") || allItems.some((item) => item.subject === "essay" && getContentStatus(state, item.id) !== "done" && item.scheduledFor <= today)) {
    reminders.push({ tone: "review", emoji: "✍️", title: "Está na hora de fazer uma redação.", description: "A redação entrou na sua rotina e precisa de constância." });
  }

  if (progressDelta > 0) {
    reminders.push({ tone: "good", emoji: "📈", title: "Seu progresso aumentou esta semana.", description: "A consistência está aparecendo nos seus resultados." });
  }

  if (streak >= 7) {
    reminders.push({ tone: "simulado", emoji: "🏆", title: `Você está há ${streak} dias estudando consecutivamente.`, description: "Essa sequência é uma vantagem real na preparação." });
  }

  // prefer explicit next review item, otherwise derive next review date from user's reviewDays
  const derivedNextReviewDate = nextReviewDate || getNextDateFromReviewDays(userReviewDays, new Date());
  const nextReview = derivedNextReviewDate
    ? {
        date: derivedNextReviewDate,
        label: formatNextReviewLabel(derivedNextReviewDate),
        title: nextReviewItem?.title || 'Próxima revisão',
        subjectLabel: nextReviewItem?.subjectLabel || 'Revisão',
        tone: nextReviewItem?.status === 'perdido' ? 'bad' : 'review',
      }
    : { date: null, label: 'Sem revisão agendada', title: 'Nenhuma revisão pendente', subjectLabel: 'Tudo em dia', tone: 'done' };

  const motivations = buildMotivations(state, { completed, progressDelta, streak, completion: Math.round((completed / allItems.length) * 100) || 0 }, todayStudyItems, overdueItems);

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
    previousWeekProgress,
    progressDelta,
    weekGoal: state.settings.weeklyGoal,
    daysUntilEnem: getDaysUntilEnem(),
    total: allItems.length,
    hoursAccumulated,
    subjectStats: buildSubjectStats(state, scheduleData),
    heatmap: buildHeatmap(state, scheduleData),
    achievements: buildAchievements(state, scheduleData),
    focusMinutes: state.focusHistory.reduce((acc, item) => acc + item.minutes, 0),
    reviewItems,
    todayStudyItems,
    todayReviewDay,
    todayReviewItems,
    overdueItems,
    reminders,
    nextReview,
    motivations,
    revisionContents: weeklyStudied.contents,
    revisionTotalContents: weeklyStudied.totalContents,
    revisionResourcesTotal: weeklyStudied.totalResources,
    studyDays: weeklyStudied.studyDays || [],
    essayCount: state.essays.length,
    questionCount: state.exerciseHistory.length,
    simuladoCount: state.simuladoHistory.length,
  };
}

function buildAchievements(state, scheduleData) {
  const dashboard = buildDashboardSummary(state, scheduleData);
  return [
    { id: "streak", label: "🔥 7 dias estudando", done: dashboard.streak >= 7 },
    { id: "contents", label: "📚 30 conteúdos concluídos", done: dashboard.completed >= 30 },
    { id: "essays", label: "✍️ 10 redações feitas", done: state.essays.length >= 10 },
    { id: "questions", label: "🧠 100 questões respondidas", done: state.exerciseHistory.length >= 100 },
    { id: "simulado", label: "📊 primeiro simulado", done: state.simuladoHistory.length >= 1 },
  ];
}

function buildDashboardSummary(state, scheduleData) {
  const allItems = getContentItems(scheduleData);
  const completed = allItems.filter((item) => getContentStatus(state, item.id) === "done").length;
  const streak = buildCurrentStreak(state, scheduleData);
  return { completed, streak };
}

function persistState(nextState) {
  saveJSON(STORAGE_KEY, nextState);
  saveJSON(THEME_KEY, nextState.settings?.themeMode || nextState.theme);
}

export function PlannerProvider({ children }) {
  const [state, setState] = useState(() => mergeState(createDefaultState(), readJSON(STORAGE_KEY, null)));

  useEffect(() => {
    // Apply appearance from settings (mode + accent)
    const mode = state.settings?.themeMode || state.theme || "dark";
    const accent = state.settings?.accentColor || "blue";
    document.documentElement.dataset.theme = mode;

    const base = themePalettes[mode] || themePalettes.dark;
    const accentDef = accentColors[accent] || accentColors.blue;
    const merged = { ...base, ...accentDef };

    // Apply CSS variables globally
    try {
      const root = document.documentElement;
      root.style.setProperty("--bg", merged.bg);
      root.style.setProperty("--surface", merged.surface);
      root.style.setProperty("--surface-alt", merged.surfaceAlt);
      root.style.setProperty("--text", merged.text);
      root.style.setProperty("--primary", merged.primary);
      root.style.setProperty("--primary-50", merged[50] || merged.primary);
      root.style.setProperty("--primary-100", merged[100] || merged.primary);
      root.style.setProperty("--primary-200", merged[200] || merged.primary);
      root.style.setProperty("--primary-300", merged[300] || merged.primary);
      root.style.setProperty("--primary-400", merged[400] || merged.primary);
      root.style.setProperty("--primary-600", merged[600] || merged.primary);
      root.style.setProperty("--primary-700", merged[700] || merged.primaryStrong || merged.primary);
      root.style.setProperty("--primary-800", merged[800] || merged.primaryStrong || merged.primary);
      root.style.setProperty("--primary-900", merged[900] || merged.primaryStrong || merged.primary);
      root.style.setProperty("--primary-strong", merged.primaryStrong || merged.primary);
      root.style.setProperty("--accent", merged.accent || merged.primary);
      root.style.setProperty("--accent-light", merged.accentLight || merged.accent || merged.primary);
      root.style.setProperty("--accent-hover", merged.hover || merged.primary);
      root.style.setProperty("--on-primary", merged.onPrimary || (mode === "dark" ? "#FFFFFF" : "#0A0A0A"));
      root.style.setProperty("--muted", merged.muted || base.muted || "#7b8794");
      root.style.setProperty("--border", merged.border || base.border || "rgba(0,0,0,0.08)");
      root.style.setProperty("--glow", merged.glow || base.glow || "transparent");
      root.style.setProperty("--shadow-color", merged.shadow || "0 10px 30px rgba(0,0,0,0.08)");
    } catch (e) {
      // ignore in non-DOM environments
    }

    persistState(state);
  }, [state]);

  const actions = useMemo(() => {
    return {
      setTheme(theme) {
        setState((current) => ({ ...current, theme, settings: { ...current.settings, themeMode: theme } }));
      },
      toggleTheme() {
        setState((current) => {
          const next = current.theme === "dark" ? "light" : "dark";
          return { ...current, theme: next, settings: { ...current.settings, themeMode: next } };
        });
      },
      setMode(mode) {
        setState((current) => ({ ...current, settings: { ...current.settings, themeMode: mode } }));
      },
      setAccent(accent) {
        setState((current) => ({ ...current, settings: { ...current.settings, accentColor: accent } }));
      },
      setContentStatus(contentId, status) {
        const nextStatus = normalizeContentStatus(status);
        setState((current) => ({
          ...current,
          contentStatuses: { ...current.contentStatuses, [contentId]: nextStatus },
          reviewSchedule: nextStatus === "perdido"
            ? { ...current.reviewSchedule, [contentId]: getNextStudyDate(current.settings) }
            : Object.fromEntries(Object.entries(current.reviewSchedule || {}).filter(([key]) => key !== contentId)),
          reviewQueue: nextStatus === "perdido"
            ? Array.from(new Set([...(current.reviewQueue || []), contentId]))
            : (current.reviewQueue || []).filter((item) => item !== contentId),
        }));
      },
      rescheduleLostContent(contentId) {
        setState((current) => ({
          ...current,
          reviewSchedule: { ...current.reviewSchedule, [contentId]: getNextStudyDate(current.settings, current.reviewSchedule?.[contentId] ? new Date(`${current.reviewSchedule[contentId]}T00:00:00`) : new Date()) },
          reviewQueue: Array.from(new Set([...(current.reviewQueue || []), contentId])),
        }));
      },
      toggleFocusMode() { setState((current) => ({ ...current, focusMode: !current.focusMode })); },
      cycleContentStatus(contentId) {
        setState((current) => {
          const currentStatus = normalizeContentStatus(current.contentStatuses[contentId]);
          const nextIndex = (getStatusOrder().indexOf(currentStatus) + 1) % getStatusOrder().length;
          return {
            ...current,
            contentStatuses: { ...current.contentStatuses, [contentId]: getStatusOrder()[nextIndex] },
            reviewSchedule: getStatusOrder()[nextIndex] === "perdido"
              ? { ...current.reviewSchedule, [contentId]: getNextStudyDate(current.settings) }
              : Object.fromEntries(Object.entries(current.reviewSchedule || {}).filter(([key]) => key !== contentId)),
            reviewQueue: getStatusOrder()[nextIndex] === "perdido"
              ? Array.from(new Set([...(current.reviewQueue || []), contentId]))
              : (current.reviewQueue || []).filter((item) => item !== contentId),
          };
        });
      },
      saveEssay(draft) {
        setState((current) => ({ ...current, essays: [{ id: `essay-${Date.now()}`, createdAt: new Date().toISOString(), ...draft }, ...current.essays] }));
      },
      updateEssayDraft(essayDraft) { setState((current) => ({ ...current, essayDraft })); },
      saveExerciseAttempt(entry) { setState((current) => ({ ...current, exerciseHistory: [{ id: `exercise-${Date.now()}`, createdAt: new Date().toISOString(), ...entry }, ...current.exerciseHistory] })); },
      saveSimuladoAttempt(entry) { setState((current) => ({ ...current, simuladoHistory: [{ id: `simulado-${Date.now()}`, createdAt: new Date().toISOString(), ...entry }, ...current.simuladoHistory] })); },
      saveFocusSession(entry) { setState((current) => ({ ...current, focusHistory: [{ id: `focus-${Date.now()}`, createdAt: new Date().toISOString(), ...entry }, ...current.focusHistory] })); },
      toggleVideoWatched(videoId) { if (!videoId) return; setState((current) => ({ ...current, watchedVideos: { ...(current.watchedVideos || {}), [videoId]: !current.watchedVideos?.[videoId] } })); },
      updateSettings(settings) {
        setState((current) => {
          const merged = { ...current.settings, ...settings };
          try {
            const provided = merged.studyStartDate;
            if (!provided) merged.studyStartDate = toISODate(new Date());
            else merged.studyStartDate = toISODate(fromISODate(provided));
          } catch { merged.studyStartDate = toISODate(new Date()); }
          const scheduleData = buildAdaptiveSchedule(merged);
          return { ...current, settings: merged, generatedSchedule: scheduleData };
        });
      },
      generateSchedule(settings) {
        setState((current) => {
          const merged = { ...current.settings, ...settings };
          try {
            const provided = merged.studyStartDate;
            if (!provided) merged.studyStartDate = toISODate(new Date());
            else merged.studyStartDate = toISODate(fromISODate(provided));
          } catch { merged.studyStartDate = toISODate(new Date()); }
          const scheduleData = buildAdaptiveSchedule(merged);
          return { ...current, settings: merged, generatedSchedule: scheduleData };
        });
      },
      resetAll() { setState(createDefaultState()); },
    };
  }, []);

  const derived = useMemo(() => {
    const adaptiveSchedule = state.generatedSchedule || buildAdaptiveSchedule(state.settings);
    const timing = getStudyStartTiming(state.settings);

    // If study start is in the future we still derive the dashboard normally
    // but mark the dashboard with `isBeforeStudyStart` and expose start metadata.

    const dashboard = buildDashboard(state, adaptiveSchedule);
    if (timing.isBeforeStart) {
      const startLabel = fromISODate(timing.startISO).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
      dashboard.isBeforeStudyStart = true;
      dashboard.studyStartISO = timing.startISO;
      dashboard.studyStartLabel = startLabel;
      dashboard.daysUntilStudyStart = timing.daysUntilStart;
      const dashboardBefore = {
        isBeforeStudyStart: true,
        studyStartISO: timing.startISO,
        studyStartLabel: startLabel,
        daysUntilStudyStart: timing.daysUntilStart,
        completion: 0,
        completed: 0,
        lost: 0,
        pending: 0,
        streak: 0,
        currentWeek: null,
        currentDay: null,
        currentWeekProgress: 0,
        monthProgress: 0,
        previousWeekProgress: 0,
        progressDelta: 0,
        weekGoal: state.settings.weeklyGoal,
        daysUntilEnem: getDaysUntilEnem(),
        total: adaptiveSchedule.items.length,
        hoursAccumulated: 0,
        subjectStats: [],
        heatmap: [],
        achievements: [],
        focusMinutes: 0,
        reviewItems: [],
        todayStudyItems: [],
        todayReviewDay: false,
        todayReviewItems: [],
        overdueItems: [],
        reminders: [],
        nextReview: { date: null, label: "Sem revisão agendada", title: "Sem revisão" },
        motivations: [],
        revisionContents: [],
        revisionTotalContents: 0,
        revisionResourcesTotal: 0,
        studyDays: [],
        essayCount: state.essays.length,
        questionCount: state.exerciseHistory.length,
        simuladoCount: state.simuladoHistory.length,
      };

      return {
        dashboard: dashboardBefore,
        currentWeek: null,
        currentDay: null,
        subjectStats: [],
        heatmap: [],
        contentItems: adaptiveSchedule.items,
        contentBySubject: {
          math: getContentBySubject(adaptiveSchedule, "math"),
          language: getContentBySubject(adaptiveSchedule, "language"),
          humanas: getContentBySubject(adaptiveSchedule, "humanas"),
          nature: getContentBySubject(adaptiveSchedule, "nature"),
          essay: getContentBySubject(adaptiveSchedule, "essay"),
        },
        videoChannels,
        baseQuestions,
        essayTopics,
        repertoires,
        connectors,
        themePalette: (() => {
          const mode = state.settings?.themeMode || state.theme || "dark";
          const accent = state.settings?.accentColor || "blue";
          const base = themePalettes[mode] || themePalettes.dark;
          const accentDef = accentColors[accent] || accentColors.blue;
          return { ...base, ...accentDef };
        })(),
        subjectMeta,
        schedule: adaptiveSchedule,
        scheduleStart,
        enemDate,
      };
    }

    return {
      dashboard,
      currentWeek: getCurrentWeek(adaptiveSchedule),
      currentDay: getCurrentDay(adaptiveSchedule),
      subjectStats: buildSubjectStats(state, adaptiveSchedule),
      heatmap: buildHeatmap(state, adaptiveSchedule),
      contentItems: getContentItems(adaptiveSchedule),
      contentBySubject: {
        math: getContentBySubject(adaptiveSchedule, "math"),
        language: getContentBySubject(adaptiveSchedule, "language"),
        humanas: getContentBySubject(adaptiveSchedule, "humanas"),
        nature: getContentBySubject(adaptiveSchedule, "nature"),
        essay: getContentBySubject(adaptiveSchedule, "essay"),
      },
      videoChannels,
      baseQuestions,
      essayTopics,
      repertoires,
      connectors,
      themePalette: (() => {
        const mode = state.settings?.themeMode || state.theme || "dark";
        const accent = state.settings?.accentColor || "blue";
        const base = themePalettes[mode] || themePalettes.dark;
        const accentDef = accentColors[accent] || accentColors.blue;
        return { ...base, ...accentDef };
      })(),
      themePalettes,
      accentColors,
      subjectMeta,
      schedule: adaptiveSchedule,
      scheduleStart,
      enemDate,
    };
  }, [state]);

  const value = useMemo(() => ({ state, actions, ...derived }), [state, actions, derived]);

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) throw new Error("usePlanner must be used within PlannerProvider");
  return context;
}
