import { createHotContext as __vite__createHotContext } from "/ENEM/@vite/client";import.meta.hot = __vite__createHotContext("/src/context/PlannerContext.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/ENEM/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=750bfeb7"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/ENEM/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/context/PlannerContext.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/ENEM/node_modules/.vite/deps/react.js?v=750bfeb7"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const createContext = __vite__cjsImport3_react["createContext"]; const useContext = __vite__cjsImport3_react["useContext"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useMemo = __vite__cjsImport3_react["useMemo"]; const useState = __vite__cjsImport3_react["useState"];
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
  videoChannels
} from "/ENEM/src/data/planner.js";
import { contentResources, subjectResources, generateSearchLinks } from "/ENEM/src/data/contentResources.js";
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
    settings: { ...settingsDefaults, studyStartDate: toISODate(/* @__PURE__ */ new Date()) },
    contentStatuses: {},
    reviewQueue: [],
    reviewSchedule: {},
    watchedVideos: {},
    focusMode: false,
    essayDraft: { topic: "", text: "" },
    essays: [],
    exerciseHistory: [],
    simuladoHistory: [],
    focusHistory: []
  };
}
function mergeState(base, incoming) {
  const next = structuredClone(base);
  if (!incoming || typeof incoming !== "object") return next;
  next.theme = incoming.theme || next.theme;
  next.settings = { ...next.settings, ...incoming.settings || {} };
  next.contentStatuses = Object.fromEntries(
    Object.entries(incoming.contentStatuses || {}).map(([contentId, status]) => [contentId, normalizeContentStatus(status)])
  );
  next.reviewQueue = Array.isArray(incoming.reviewQueue) ? incoming.reviewQueue : [];
  next.reviewSchedule = { ...incoming.reviewSchedule || {} };
  next.watchedVideos = { ...incoming.watchedVideos || {} };
  next.focusMode = Boolean(incoming.focusMode);
  next.essayDraft = { ...next.essayDraft, ...incoming.essayDraft || {} };
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
  return toISODate(/* @__PURE__ */ new Date());
}
function getStudyStartTiming(settings) {
  try {
    const startISO = settings?.studyStartDate || scheduleStart;
    const start = fromISODate(startISO);
    start.setHours(0, 0, 0, 0);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((start - today) / 864e5);
    return {
      startISO: toISODate(start),
      isBeforeStart: diff > 0,
      daysUntilStart: Math.max(0, diff)
    };
  } catch (e) {
    return { startISO: scheduleStart, isBeforeStart: false, daysUntilStart: 0 };
  }
}
function getNextStudyDate(settings, fromDate = /* @__PURE__ */ new Date()) {
  const scheduleData = buildAdaptiveSchedule(settings);
  const today = toISODate(fromDate);
  const nextStudyDay = scheduleData.weeks.flatMap((week) => week.days.filter((day) => day.type === "study")).find((day) => day.date > today);
  return nextStudyDay?.date || toISODate(addDays(fromDate, 2));
}
function getStudyDays(scheduleData) {
  return scheduleData.weeks.flatMap((week) => week.days.filter((day) => day.type === "study"));
}
function getCurrentWeek(scheduleData) {
  const today = toISODate(/* @__PURE__ */ new Date());
  return scheduleData.weeks.find((week) => week.days.some((day) => day.date === today)) || scheduleData.weeks[0];
}
function getCurrentDay(scheduleData) {
  const today = toISODate(/* @__PURE__ */ new Date());
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
      percent: Math.round(done / items.length * 100) || 0,
      priorityCounts,
      strongTopics,
      topPriority: strongTopics[0] || topics[0]?.title || ""
    };
  });
}
function buildHeatmap(state, scheduleData) {
  return scheduleData.weeks.flatMap(
    (week) => week.days.map((day) => {
      const status = day.type === "study" ? getContentStatus(state, day.contentId) : day.type;
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
    if (getContentStatus(state, day.contentId) === "done") {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}
function getWeeklyStudiedContents(state, scheduleData) {
  const todayDate = /* @__PURE__ */ new Date();
  const startOfWeek = toISODate(addDays(todayDate, -todayDate.getDay()));
  const endOfWeek = toISODate(addDays(fromISODate(startOfWeek), 6));
  const itemsThisWeek = getContentItems(scheduleData).filter((item) => {
    const status = getContentStatus(state, item.id);
    return status === "done" && item.scheduledFor >= startOfWeek && item.scheduledFor <= endOfWeek;
  });
  const items = itemsThisWeek.length ? itemsThisWeek : getContentItems(scheduleData).filter((item) => getContentStatus(state, item.id) === "done");
  const contents = items.map((item) => {
    const specific = contentResources[item.title] || [];
    const fallback = subjectResources[item.subject] || [];
    const usedSpecific = specific.length > 0;
    const generated = generateSearchLinks(item.title);
    const resources = [...usedSpecific ? specific : fallback, ...generated];
    return {
      id: item.id,
      title: item.title,
      subject: item.subject,
      subjectLabel: item.subjectLabel,
      priorityRank: item.priorityRank || 0,
      resources,
      usingSubjectFallback: !usedSpecific,
      scheduledFor: item.scheduledFor
    };
  });
  const dedup = [];
  const seen = /* @__PURE__ */ new Set();
  contents.forEach((c) => {
    if (!seen.has(c.title)) {
      seen.add(c.title);
      dedup.push(c);
    }
  });
  dedup.sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));
  const resourcesFound = dedup.reduce((acc, c) => acc + (c.resources?.length || 0), 0);
  const currentWeek = getCurrentWeek(scheduleData);
  const studyDays = (currentWeek?.days || []).filter((d) => d.type === "study" && d.contentId && d.date >= startOfWeek && d.date <= endOfWeek);
  return {
    contents: dedup,
    totalContents: dedup.length,
    totalResources: resourcesFound,
    studyDays
  };
}
function getItemDueDate(state, item) {
  return state.reviewSchedule?.[item.id] || item.scheduledFor || item.date;
}
function buildTodayStudyItems(state, scheduleData) {
  const today = getTodayISO();
  return getContentItems(scheduleData).filter((item) => item.scheduledFor === today).map((item) => ({
    ...item,
    status: getContentStatus(state, item.id),
    dueDate: getItemDueDate(state, item),
    isRescheduled: Boolean(state.reviewSchedule?.[item.id] && state.reviewSchedule[item.id] !== item.scheduledFor)
  })).sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));
}
function buildOverdueItems(state, scheduleData) {
  const today = getTodayISO();
  return getContentItems(scheduleData).filter((item) => {
    const status = getContentStatus(state, item.id);
    const dueDate = getItemDueDate(state, item);
    return status === "perdido" || status === "pending" && dueDate < today;
  }).map((item) => ({
    ...item,
    status: getContentStatus(state, item.id),
    dueDate: getItemDueDate(state, item),
    isRescheduled: Boolean(state.reviewSchedule?.[item.id] && state.reviewSchedule[item.id] !== item.scheduledFor)
  })).sort((a, b) => {
    if (a.dueDate === b.dueDate) return (b.priorityRank || 0) - (a.priorityRank || 0);
    return a.dueDate.localeCompare(b.dueDate);
  });
}
function formatNextReviewLabel(dateISO) {
  if (!dateISO) return "Sem revisÃ£o agendada";
  const today = getTodayISO();
  const tomorrow = toISODate(addDays(/* @__PURE__ */ new Date(), 1));
  if (dateISO === today) return "Hoje Ã s 19h";
  if (dateISO === tomorrow) return "AmanhÃ£ Ã s 19h";
  return `${fromISODate(dateISO).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })} Ã s 19h`;
}
function buildMotivations(state, dashboard, todayStudyItems, overdueItems) {
  const messages = [];
  if (todayStudyItems.length > 0 && overdueItems.length === 0) {
    messages.push("ð¥ VocÃª jÃ¡ tem o caminho de hoje pronto para avanÃ§ar sem atrasos.");
  }
  if (dashboard.completed > 0 && dashboard.progressDelta >= 0) {
    messages.push("ð Seu progresso estÃ¡ crescendo com consistÃªncia.");
  }
  if (dashboard.streak >= 7) {
    messages.push(`ð VocÃª estÃ¡ hÃ¡ ${dashboard.streak} dias estudando consecutivamente.`);
  }
  if (dashboard.completion >= 100) {
    messages.push("ð¥ VocÃª concluiu todos os conteÃºdos cadastrados.");
  }
  if (messages.length === 0) {
    messages.push("â¨ Um passo de cada vez jÃ¡ mantÃ©m sua rotina viva.");
  }
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
  const currentWeekProgress = Math.round(currentWeekDone / currentWeekStudyDays.length * 100) || 0;
  const previousWeek = scheduleData.weeks.find((week) => week.weekNumber === currentWeek.weekNumber - 1);
  const previousWeekStudyDays = previousWeek?.days.filter((day) => day.type === "study") || [];
  const previousWeekDone = previousWeekStudyDays.filter((day) => getContentStatus(state, day.contentId) === "done").length;
  const previousWeekProgress = Math.round(previousWeekDone / previousWeekStudyDays.length * 100) || 0;
  const currentMonthKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const monthStudyDays = buildHeatmap(state, scheduleData).filter((day) => day.date.startsWith(currentMonthKey) && day.type === "study");
  const monthDone = monthStudyDays.filter((day) => getContentStatus(state, day.contentId) === "done").length;
  const monthProgress = Math.round(monthDone / monthStudyDays.length * 100) || 0;
  const streak = buildCurrentStreak(state, scheduleData);
  const today = toISODate(/* @__PURE__ */ new Date());
  const todayStudyItems = buildTodayStudyItems(state, scheduleData);
  const weekdayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayKey = weekdayKeys[(/* @__PURE__ */ new Date()).getDay()];
  const userStudyDays = Array.isArray(state.settings?.studyDays) ? state.settings.studyDays.filter((d) => weekdayKeys.includes(d)) : settingsDefaults.studyDays;
  const userReviewDays = Array.isArray(state.settings?.reviewDays) ? state.settings.reviewDays.filter((d) => weekdayKeys.includes(d) && !userStudyDays.includes(d)) : settingsDefaults.reviewDays;
  const todayReviewDay = userReviewDays.includes(todayKey) || currentDay?.type === "review";
  const todayReviewItems = [];
  const overdueItems = buildOverdueItems(state, scheduleData);
  const reviewItems = allItems.filter((item) => getContentStatus(state, item.id) === "perdido").filter((item) => !state.reviewSchedule?.[item.id] || state.reviewSchedule[item.id] <= today).sort((a, b) => (b.priorityRank || 0) - (a.priorityRank || 0));
  const nextReviewItem = [...overdueItems].sort((a, b) => {
    if (a.dueDate === b.dueDate) return (b.priorityRank || 0) - (a.priorityRank || 0);
    return a.dueDate.localeCompare(b.dueDate);
  })[0] || null;
  const nextReviewDate = nextReviewItem?.dueDate || null;
  const hoursAccumulated = Math.round(state.focusHistory.reduce((acc, item) => acc + item.minutes, 0) / 60 * 10) / 10;
  const progressDelta = currentWeekProgress - previousWeekProgress;
  const reminders = [];
  if (todayStudyItems.length > 0) {
    reminders.push({ tone: "hot", emoji: "ð¥", title: `VocÃª tem ${todayStudyItems.length} conteÃºdos para estudar hoje.`, description: "Abra a seÃ§Ã£o de estudos de hoje para seguir o plano." });
  }
  if (overdueItems.length > 0) {
    reminders.push({ tone: "bad", emoji: "ð", title: `VocÃª possui ${overdueItems.length} conteÃºdos atrasados.`, description: "Eles jÃ¡ estÃ£o prontos para revisÃ£o e reagendamento." });
  }
  if (todayStudyItems.some((item) => item.subject === "essay") || allItems.some((item) => item.subject === "essay" && getContentStatus(state, item.id) !== "done" && item.scheduledFor <= today)) {
    reminders.push({ tone: "review", emoji: "âï¸", title: "EstÃ¡ na hora de fazer uma redaÃ§Ã£o.", description: "A redaÃ§Ã£o entrou na sua rotina e precisa de constÃ¢ncia." });
  }
  if (progressDelta > 0) {
    reminders.push({ tone: "good", emoji: "ð", title: "Seu progresso aumentou esta semana.", description: "A consistÃªncia estÃ¡ aparecendo nos seus resultados." });
  }
  if (streak >= 7) {
    reminders.push({ tone: "simulado", emoji: "ð", title: `VocÃª estÃ¡ hÃ¡ ${streak} dias estudando consecutivamente.`, description: "Essa sequÃªncia Ã© uma vantagem real na preparaÃ§Ã£o." });
  }
  const nextReview = nextReviewDate ? {
    date: nextReviewDate,
    label: formatNextReviewLabel(nextReviewDate),
    title: nextReviewItem?.title || "PrÃ³xima revisÃ£o",
    subjectLabel: nextReviewItem?.subjectLabel || "RevisÃ£o",
    tone: nextReviewItem?.status === "perdido" ? "bad" : "review"
  } : {
    date: null,
    label: "Sem revisÃ£o agendada",
    title: "Nenhuma revisÃ£o pendente",
    subjectLabel: "Tudo em dia",
    tone: "done"
  };
  const motivations = buildMotivations(state, { completed, progressDelta, streak, completion: Math.round(completed / allItems.length * 100) || 0 }, todayStudyItems, overdueItems);
  return {
    completion: Math.round(completed / allItems.length * 100) || 0,
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
    simuladoCount: state.simuladoHistory.length
  };
}
function buildAchievements(state, scheduleData) {
  const dashboard = buildDashboardSummary(state, scheduleData);
  return [
    { id: "streak", label: "ð¥ 7 dias estudando", done: dashboard.streak >= 7 },
    { id: "contents", label: "ð 30 conteÃºdos concluÃ­dos", done: dashboard.completed >= 30 },
    { id: "essays", label: "âï¸ 10 redaÃ§Ãµes feitas", done: state.essays.length >= 10 },
    { id: "questions", label: "ð§  100 questÃµes respondidas", done: state.exerciseHistory.length >= 100 },
    { id: "simulado", label: "ð primeiro simulado", done: state.simuladoHistory.length >= 1 }
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
  _s();
  const [state, setState] = useState(() => mergeState(createDefaultState(), readJSON(STORAGE_KEY, null)));
  useEffect(() => {
    const mode = state.settings?.themeMode || state.theme || "dark";
    const accent = state.settings?.accentColor || "blue";
    document.documentElement.dataset.theme = mode;
    const base = themePalettes[mode] || themePalettes.dark;
    const accentDef = accentColors[accent] || accentColors.blue;
    const merged = { ...base, ...accentDef };
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
          contentStatuses: {
            ...current.contentStatuses,
            [contentId]: nextStatus
          },
          reviewSchedule: nextStatus === "perdido" ? {
            ...current.reviewSchedule,
            [contentId]: getNextStudyDate(current.settings)
          } : Object.fromEntries(Object.entries(current.reviewSchedule || {}).filter(([key]) => key !== contentId)),
          reviewQueue: nextStatus === "perdido" ? Array.from(/* @__PURE__ */ new Set([...current.reviewQueue || [], contentId])) : (current.reviewQueue || []).filter((item) => item !== contentId)
        }));
      },
      rescheduleLostContent(contentId) {
        setState((current) => ({
          ...current,
          reviewSchedule: {
            ...current.reviewSchedule,
            [contentId]: getNextStudyDate(
              current.settings,
              current.reviewSchedule?.[contentId] ? /* @__PURE__ */ new Date(`${current.reviewSchedule[contentId]}T00:00:00`) : /* @__PURE__ */ new Date()
            )
          },
          reviewQueue: Array.from(/* @__PURE__ */ new Set([...current.reviewQueue || [], contentId]))
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
            reviewSchedule: getStatusOrder()[nextIndex] === "perdido" ? {
              ...current.reviewSchedule,
              [contentId]: getNextStudyDate(current.settings)
            } : Object.fromEntries(Object.entries(current.reviewSchedule || {}).filter(([key]) => key !== contentId)),
            reviewQueue: getStatusOrder()[nextIndex] === "perdido" ? Array.from(/* @__PURE__ */ new Set([...current.reviewQueue || [], contentId])) : (current.reviewQueue || []).filter((item) => item !== contentId)
          };
        });
      },
      saveEssay(draft) {
        setState((current) => ({
          ...current,
          essays: [
            {
              id: `essay-${Date.now()}`,
              createdAt: (/* @__PURE__ */ new Date()).toISOString(),
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
            { id: `exercise-${Date.now()}`, createdAt: (/* @__PURE__ */ new Date()).toISOString(), ...entry },
            ...current.exerciseHistory
          ]
        }));
      },
      saveSimuladoAttempt(entry) {
        setState((current) => ({
          ...current,
          simuladoHistory: [
            { id: `simulado-${Date.now()}`, createdAt: (/* @__PURE__ */ new Date()).toISOString(), ...entry },
            ...current.simuladoHistory
          ]
        }));
      },
      saveFocusSession(entry) {
        setState((current) => ({
          ...current,
          focusHistory: [
            { id: `focus-${Date.now()}`, createdAt: (/* @__PURE__ */ new Date()).toISOString(), ...entry },
            ...current.focusHistory
          ]
        }));
      },
      toggleVideoWatched(videoId) {
        if (!videoId) return;
        setState((current) => ({
          ...current,
          watchedVideos: {
            ...current.watchedVideos || {},
            [videoId]: !current.watchedVideos?.[videoId]
          }
        }));
      },
      updateSettings(settings) {
        setState((current) => {
          const merged = { ...current.settings, ...settings };
          try {
            const provided = merged.studyStartDate;
            if (!provided) {
              merged.studyStartDate = toISODate(/* @__PURE__ */ new Date());
            } else {
              merged.studyStartDate = toISODate(fromISODate(provided));
            }
          } catch {
            merged.studyStartDate = toISODate(/* @__PURE__ */ new Date());
          }
          const scheduleData = buildAdaptiveSchedule(merged);
          return {
            ...current,
            settings: merged,
            generatedSchedule: scheduleData
          };
        });
      },
      generateSchedule(settings) {
        setState((current) => {
          const merged = { ...current.settings, ...settings };
          try {
            const provided = merged.studyStartDate;
            if (!provided) {
              merged.studyStartDate = toISODate(/* @__PURE__ */ new Date());
            } else {
              merged.studyStartDate = toISODate(fromISODate(provided));
            }
          } catch {
            merged.studyStartDate = toISODate(/* @__PURE__ */ new Date());
          }
          const scheduleData = buildAdaptiveSchedule(merged);
          return {
            ...current,
            settings: merged,
            generatedSchedule: scheduleData
          };
        });
      },
      resetAll() {
        setState(createDefaultState());
      }
    };
  }, []);
  const derived = useMemo(() => {
    const adaptiveSchedule = state.generatedSchedule || buildAdaptiveSchedule(state.settings);
    const timing = getStudyStartTiming(state.settings);
    const dashboard = buildDashboard(state, adaptiveSchedule);
    if (timing.isBeforeStart) {
      const startLabel = fromISODate(timing.startISO).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
      dashboard.isBeforeStudyStart = true;
      dashboard.studyStartISO = timing.startISO;
      dashboard.studyStartLabel = startLabel;
      dashboard.daysUntilStudyStart = timing.daysUntilStart;
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
        essay: getContentBySubject(adaptiveSchedule, "essay")
      },
      videoChannels,
      baseQuestions,
      essayTopics,
      repertoires,
      connectors,
      // derive theme palette combining mode and accent
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
      enemDate
    };
  }, [state]);
  const value = useMemo(
    () => ({ state, actions, ...derived }),
    [state, actions, derived]
  );
  return /* @__PURE__ */ jsxDEV(PlannerContext.Provider, { value, children }, void 0, false, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/context/PlannerContext.jsx",
    lineNumber: 782,
    columnNumber: 10
  }, this);
}
_s(PlannerProvider, "6wVR7d6dKleYa8AQHLZbDwLuG/c=");
_c = PlannerProvider;
export function usePlanner() {
  _s2();
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used within PlannerProvider");
  }
  return context;
}
_s2(usePlanner, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "PlannerProvider");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/context/PlannerContext.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/context/PlannerContext.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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RUFDRixHQUFHLENBQUN1RyxLQUFLLENBQUM7QUFFVixRQUFNekMsUUFBUW5FO0FBQUFBLElBQ1osT0FBTyxFQUFFNEcsT0FBT2tLLFNBQVMsR0FBRzhCLFFBQVE7QUFBQSxJQUNwQyxDQUFDaE0sT0FBT2tLLFNBQVM4QixPQUFPO0FBQUEsRUFDMUI7QUFFQSxTQUFPLHVCQUFDLGVBQWUsVUFBZixFQUF3QixPQUFlMUQsWUFBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFpRDtBQUMxRDtBQUFDQyxHQTdSZUYsaUJBQWU7QUFBQSxLQUFmQTtBQStSVCxnQkFBUzRFLGFBQWE7QUFBQUMsTUFBQTtBQUMzQixRQUFNQyxVQUFValUsV0FBVzJCLGNBQWM7QUFDekMsTUFBSSxDQUFDc1MsU0FBUztBQUNaLFVBQU0sSUFBSUMsTUFBTSxnREFBZ0Q7QUFBQSxFQUNsRTtBQUNBLFNBQU9EO0FBQ1Q7QUFBQ0QsSUFOZUQsWUFBVTtBQUFBLElBQUFJO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlU3RhdGUiLCJiYXNlUXVlc3Rpb25zIiwiY29ubmVjdG9ycyIsImN1cnJpY3VsdW0iLCJlbmVtRGF0ZSIsImVzc2F5VG9waWNzIiwiZ2V0RGF5c1VudGlsRW5lbSIsInJlcGVydG9pcmVzIiwiYnVpbGRBZGFwdGl2ZVNjaGVkdWxlIiwic2NoZWR1bGVTdGFydCIsInByaW9yaXR5TWV0YSIsInNldHRpbmdzRGVmYXVsdHMiLCJzdWJqZWN0TWV0YSIsInRoZW1lUGFsZXR0ZXMiLCJhY2NlbnRDb2xvcnMiLCJhZGREYXlzIiwiZnJvbUlTT0RhdGUiLCJ0b0lTT0RhdGUiLCJ2aWRlb0NoYW5uZWxzIiwiY29udGVudFJlc291cmNlcyIsInN1YmplY3RSZXNvdXJjZXMiLCJnZW5lcmF0ZVNlYXJjaExpbmtzIiwiU1RPUkFHRV9LRVkiLCJUSEVNRV9LRVkiLCJQbGFubmVyQ29udGV4dCIsInJlYWRKU09OIiwia2V5IiwiZmFsbGJhY2siLCJyYXciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiY3JlYXRlRGVmYXVsdFN0YXRlIiwidGhlbWUiLCJzZXR0aW5ncyIsInN0dWR5U3RhcnREYXRlIiwiRGF0ZSIsImNvbnRlbnRTdGF0dXNlcyIsInJldmlld1F1ZXVlIiwicmV2aWV3U2NoZWR1bGUiLCJ3YXRjaGVkVmlkZW9zIiwiZm9jdXNNb2RlIiwiZXNzYXlEcmFmdCIsInRvcGljIiwidGV4dCIsImVzc2F5cyIsImV4ZXJjaXNlSGlzdG9yeSIsInNpbXVsYWRvSGlzdG9yeSIsImZvY3VzSGlzdG9yeSIsIm1lcmdlU3RhdGUiLCJiYXNlIiwiaW5jb21pbmciLCJuZXh0Iiwic3RydWN0dXJlZENsb25lIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwibWFwIiwiY29udGVudElkIiwic3RhdHVzIiwibm9ybWFsaXplQ29udGVudFN0YXR1cyIsIkFycmF5IiwiaXNBcnJheSIsIkJvb2xlYW4iLCJzYXZlSlNPTiIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImdldFN0YXR1c09yZGVyIiwiZ2V0VG9kYXlJU08iLCJnZXRTdHVkeVN0YXJ0VGltaW5nIiwic3RhcnRJU08iLCJzdGFydCIsInNldEhvdXJzIiwidG9kYXkiLCJkaWZmIiwiTWF0aCIsImNlaWwiLCJpc0JlZm9yZVN0YXJ0IiwiZGF5c1VudGlsU3RhcnQiLCJtYXgiLCJlIiwiZ2V0TmV4dFN0dWR5RGF0ZSIsImZyb21EYXRlIiwic2NoZWR1bGVEYXRhIiwibmV4dFN0dWR5RGF5Iiwid2Vla3MiLCJmbGF0TWFwIiwid2VlayIsImRheXMiLCJmaWx0ZXIiLCJkYXkiLCJ0eXBlIiwiZmluZCIsImRhdGUiLCJnZXRTdHVkeURheXMiLCJnZXRDdXJyZW50V2VlayIsInNvbWUiLCJnZXRDdXJyZW50RGF5IiwiY3VycmVudCIsImdldENvbnRlbnRJdGVtcyIsIml0ZW1zIiwiZ2V0Q29udGVudEJ5U3ViamVjdCIsInN1YmplY3QiLCJpdGVtIiwiZ2V0Q29udGVudFN0YXR1c01hcCIsInN0YXRlIiwiZ2V0Q29udGVudFN0YXR1cyIsImJ1aWxkU3ViamVjdFN0YXRzIiwidG9waWNzIiwiZG9uZSIsImlkIiwibGVuZ3RoIiwibG9zdCIsInBlbmRpbmciLCJwcmlvcml0eUNvdW50cyIsImtleXMiLCJmb3JFYWNoIiwicHJpb3JpdHkiLCJzdHJvbmdUb3BpY3MiLCJzb3J0IiwiYSIsImIiLCJwcmlvcml0eVJhbmsiLCJzbGljZSIsInRpdGxlIiwibGFiZWwiLCJ0b3RhbCIsInBlcmNlbnQiLCJyb3VuZCIsInRvcFByaW9yaXR5IiwiYnVpbGRIZWF0bWFwIiwid2Vla051bWJlciIsImJ1aWxkQ3VycmVudFN0cmVhayIsInN0cmVhayIsImluZGV4IiwiZ2V0V2Vla2x5U3R1ZGllZENvbnRlbnRzIiwidG9kYXlEYXRlIiwic3RhcnRPZldlZWsiLCJnZXREYXkiLCJlbmRPZldlZWsiLCJpdGVtc1RoaXNXZWVrIiwic2NoZWR1bGVkRm9yIiwiY29udGVudHMiLCJzcGVjaWZpYyIsInVzZWRTcGVjaWZpYyIsImdlbmVyYXRlZCIsInJlc291cmNlcyIsInN1YmplY3RMYWJlbCIsInVzaW5nU3ViamVjdEZhbGxiYWNrIiwiZGVkdXAiLCJzZWVuIiwiU2V0IiwiYyIsImhhcyIsImFkZCIsInB1c2giLCJyZXNvdXJjZXNGb3VuZCIsInJlZHVjZSIsImFjYyIsImN1cnJlbnRXZWVrIiwic3R1ZHlEYXlzIiwiZCIsInRvdGFsQ29udGVudHMiLCJ0b3RhbFJlc291cmNlcyIsImdldEl0ZW1EdWVEYXRlIiwiYnVpbGRUb2RheVN0dWR5SXRlbXMiLCJkdWVEYXRlIiwiaXNSZXNjaGVkdWxlZCIsImJ1aWxkT3ZlcmR1ZUl0ZW1zIiwibG9jYWxlQ29tcGFyZSIsImZvcm1hdE5leHRSZXZpZXdMYWJlbCIsImRhdGVJU08iLCJ0b21vcnJvdyIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJtb250aCIsImJ1aWxkTW90aXZhdGlvbnMiLCJkYXNoYm9hcmQiLCJ0b2RheVN0dWR5SXRlbXMiLCJvdmVyZHVlSXRlbXMiLCJtZXNzYWdlcyIsImNvbXBsZXRlZCIsInByb2dyZXNzRGVsdGEiLCJjb21wbGV0aW9uIiwiYnVpbGREYXNoYm9hcmQiLCJhbGxJdGVtcyIsImN1cnJlbnREYXkiLCJ3ZWVrbHlTdHVkaWVkIiwiY3VycmVudFdlZWtTdHVkeURheXMiLCJjdXJyZW50V2Vla0RvbmUiLCJjdXJyZW50V2Vla1Byb2dyZXNzIiwicHJldmlvdXNXZWVrIiwicHJldmlvdXNXZWVrU3R1ZHlEYXlzIiwicHJldmlvdXNXZWVrRG9uZSIsInByZXZpb3VzV2Vla1Byb2dyZXNzIiwiY3VycmVudE1vbnRoS2V5IiwidG9JU09TdHJpbmciLCJtb250aFN0dWR5RGF5cyIsInN0YXJ0c1dpdGgiLCJtb250aERvbmUiLCJtb250aFByb2dyZXNzIiwid2Vla2RheUtleXMiLCJ0b2RheUtleSIsInVzZXJTdHVkeURheXMiLCJpbmNsdWRlcyIsInVzZXJSZXZpZXdEYXlzIiwicmV2aWV3RGF5cyIsInRvZGF5UmV2aWV3RGF5IiwidG9kYXlSZXZpZXdJdGVtcyIsInJldmlld0l0ZW1zIiwibmV4dFJldmlld0l0ZW0iLCJuZXh0UmV2aWV3RGF0ZSIsImhvdXJzQWNjdW11bGF0ZWQiLCJtaW51dGVzIiwicmVtaW5kZXJzIiwidG9uZSIsImVtb2ppIiwiZGVzY3JpcHRpb24iLCJuZXh0UmV2aWV3IiwibW90aXZhdGlvbnMiLCJ3ZWVrR29hbCIsIndlZWtseUdvYWwiLCJkYXlzVW50aWxFbmVtIiwic3ViamVjdFN0YXRzIiwiaGVhdG1hcCIsImFjaGlldmVtZW50cyIsImJ1aWxkQWNoaWV2ZW1lbnRzIiwiZm9jdXNNaW51dGVzIiwicmV2aXNpb25Db250ZW50cyIsInJldmlzaW9uVG90YWxDb250ZW50cyIsInJldmlzaW9uUmVzb3VyY2VzVG90YWwiLCJlc3NheUNvdW50IiwicXVlc3Rpb25Db3VudCIsInNpbXVsYWRvQ291bnQiLCJidWlsZERhc2hib2FyZFN1bW1hcnkiLCJwZXJzaXN0U3RhdGUiLCJuZXh0U3RhdGUiLCJ0aGVtZU1vZGUiLCJQbGFubmVyUHJvdmlkZXIiLCJjaGlsZHJlbiIsIl9zIiwic2V0U3RhdGUiLCJtb2RlIiwiYWNjZW50IiwiYWNjZW50Q29sb3IiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImRhdGFzZXQiLCJkYXJrIiwiYWNjZW50RGVmIiwiYmx1ZSIsIm1lcmdlZCIsInJvb3QiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiYmciLCJzdXJmYWNlIiwic3VyZmFjZUFsdCIsInByaW1hcnkiLCJwcmltYXJ5U3Ryb25nIiwiYWNjZW50TGlnaHQiLCJob3ZlciIsIm9uUHJpbWFyeSIsIm11dGVkIiwiYm9yZGVyIiwiZ2xvdyIsInNoYWRvdyIsImFjdGlvbnMiLCJzZXRUaGVtZSIsInRvZ2dsZVRoZW1lIiwic2V0TW9kZSIsInNldEFjY2VudCIsInNldENvbnRlbnRTdGF0dXMiLCJuZXh0U3RhdHVzIiwiZnJvbSIsInJlc2NoZWR1bGVMb3N0Q29udGVudCIsInRvZ2dsZUZvY3VzTW9kZSIsImN5Y2xlQ29udGVudFN0YXR1cyIsImN1cnJlbnRTdGF0dXMiLCJuZXh0SW5kZXgiLCJpbmRleE9mIiwic2F2ZUVzc2F5IiwiZHJhZnQiLCJub3ciLCJjcmVhdGVkQXQiLCJ1cGRhdGVFc3NheURyYWZ0Iiwic2F2ZUV4ZXJjaXNlQXR0ZW1wdCIsImVudHJ5Iiwic2F2ZVNpbXVsYWRvQXR0ZW1wdCIsInNhdmVGb2N1c1Nlc3Npb24iLCJ0b2dnbGVWaWRlb1dhdGNoZWQiLCJ2aWRlb0lkIiwidXBkYXRlU2V0dGluZ3MiLCJwcm92aWRlZCIsImdlbmVyYXRlZFNjaGVkdWxlIiwiZ2VuZXJhdGVTY2hlZHVsZSIsInJlc2V0QWxsIiwiZGVyaXZlZCIsImFkYXB0aXZlU2NoZWR1bGUiLCJ0aW1pbmciLCJzdGFydExhYmVsIiwiaXNCZWZvcmVTdHVkeVN0YXJ0Iiwic3R1ZHlTdGFydElTTyIsInN0dWR5U3RhcnRMYWJlbCIsImRheXNVbnRpbFN0dWR5U3RhcnQiLCJjb250ZW50SXRlbXMiLCJjb250ZW50QnlTdWJqZWN0IiwibWF0aCIsImxhbmd1YWdlIiwiaHVtYW5hcyIsIm5hdHVyZSIsImVzc2F5IiwidGhlbWVQYWxldHRlIiwic2NoZWR1bGUiLCJ1c2VQbGFubmVyIiwiX3MyIiwiY29udGV4dCIsIkVycm9yIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiUGxhbm5lckNvbnRleHQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIGJhc2VRdWVzdGlvbnMsXHJcbiAgY29ubmVjdG9ycyxcclxuICBjdXJyaWN1bHVtLFxyXG4gIGVuZW1EYXRlLFxyXG4gIGVzc2F5VG9waWNzLFxyXG4gIGdldERheXNVbnRpbEVuZW0sXHJcbiAgcmVwZXJ0b2lyZXMsXHJcbiAgYnVpbGRBZGFwdGl2ZVNjaGVkdWxlLFxyXG4gIFxyXG4gIHNjaGVkdWxlU3RhcnQsXHJcbiAgcHJpb3JpdHlNZXRhLFxyXG4gIHNldHRpbmdzRGVmYXVsdHMsXHJcbiAgc3ViamVjdE1ldGEsXHJcbiAgdGhlbWVQYWxldHRlcyxcclxuICBhY2NlbnRDb2xvcnMsXHJcbiAgYWRkRGF5cyxcclxuICBmcm9tSVNPRGF0ZSxcclxuICB0b0lTT0RhdGUsXHJcbiAgdmlkZW9DaGFubmVsc1xyXG59IGZyb20gJy4uL2RhdGEvcGxhbm5lcic7XHJcbmltcG9ydCB7IGNvbnRlbnRSZXNvdXJjZXMsIHN1YmplY3RSZXNvdXJjZXMsIGdlbmVyYXRlU2VhcmNoTGlua3MgfSBmcm9tICcuLi9kYXRhL2NvbnRlbnRSZXNvdXJjZXMnO1xyXG5cclxuY29uc3QgU1RPUkFHRV9LRVkgPSAnZW5lbS1wbGFubmVyLXN0YXRlLXYyJztcclxuY29uc3QgVEhFTUVfS0VZID0gJ2VuZW0tcGxhbm5lci10aGVtZS12Mic7XHJcblxyXG5jb25zdCBQbGFubmVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XHJcblxyXG5mdW5jdGlvbiByZWFkSlNPTihrZXksIGZhbGxiYWNrKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDogZmFsbGJhY2s7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0U3RhdGUoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHRoZW1lOiByZWFkSlNPTihUSEVNRV9LRVksICdkYXJrJyksXHJcbiAgICBzZXR0aW5nczogeyAuLi5zZXR0aW5nc0RlZmF1bHRzLCBzdHVkeVN0YXJ0RGF0ZTogdG9JU09EYXRlKG5ldyBEYXRlKCkpIH0sXHJcbiAgICBjb250ZW50U3RhdHVzZXM6IHt9LFxyXG4gICAgcmV2aWV3UXVldWU6IFtdLFxyXG4gICAgcmV2aWV3U2NoZWR1bGU6IHt9LFxyXG4gICAgd2F0Y2hlZFZpZGVvczoge30sXHJcbiAgICBmb2N1c01vZGU6IGZhbHNlLFxyXG4gICAgZXNzYXlEcmFmdDogeyB0b3BpYzogJycsIHRleHQ6ICcnIH0sXHJcbiAgICBlc3NheXM6IFtdLFxyXG4gICAgZXhlcmNpc2VIaXN0b3J5OiBbXSxcclxuICAgIHNpbXVsYWRvSGlzdG9yeTogW10sXHJcbiAgICBmb2N1c0hpc3Rvcnk6IFtdXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWVyZ2VTdGF0ZShiYXNlLCBpbmNvbWluZykge1xyXG4gIGNvbnN0IG5leHQgPSBzdHJ1Y3R1cmVkQ2xvbmUoYmFzZSk7XHJcbiAgaWYgKCFpbmNvbWluZyB8fCB0eXBlb2YgaW5jb21pbmcgIT09ICdvYmplY3QnKSByZXR1cm4gbmV4dDtcclxuICBuZXh0LnRoZW1lID0gaW5jb21pbmcudGhlbWUgfHwgbmV4dC50aGVtZTtcclxuICBuZXh0LnNldHRpbmdzID0geyAuLi5uZXh0LnNldHRpbmdzLCAuLi4oaW5jb21pbmcuc2V0dGluZ3MgfHwge30pIH07XHJcbiAgbmV4dC5jb250ZW50U3RhdHVzZXMgPSBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICBPYmplY3QuZW50cmllcyhpbmNvbWluZy5jb250ZW50U3RhdHVzZXMgfHwge30pLm1hcCgoW2NvbnRlbnRJZCwgc3RhdHVzXSkgPT4gW2NvbnRlbnRJZCwgbm9ybWFsaXplQ29udGVudFN0YXR1cyhzdGF0dXMpXSlcclxuICApO1xyXG4gIG5leHQucmV2aWV3UXVldWUgPSBBcnJheS5pc0FycmF5KGluY29taW5nLnJldmlld1F1ZXVlKSA/IGluY29taW5nLnJldmlld1F1ZXVlIDogW107XHJcbiAgbmV4dC5yZXZpZXdTY2hlZHVsZSA9IHsgLi4uKGluY29taW5nLnJldmlld1NjaGVkdWxlIHx8IHt9KSB9O1xyXG4gIG5leHQud2F0Y2hlZFZpZGVvcyA9IHsgLi4uKGluY29taW5nLndhdGNoZWRWaWRlb3MgfHwge30pIH07XHJcbiAgbmV4dC5mb2N1c01vZGUgPSBCb29sZWFuKGluY29taW5nLmZvY3VzTW9kZSk7XHJcbiAgbmV4dC5lc3NheURyYWZ0ID0geyAuLi5uZXh0LmVzc2F5RHJhZnQsIC4uLihpbmNvbWluZy5lc3NheURyYWZ0IHx8IHt9KSB9O1xyXG4gIG5leHQuZXNzYXlzID0gQXJyYXkuaXNBcnJheShpbmNvbWluZy5lc3NheXMpID8gaW5jb21pbmcuZXNzYXlzIDogW107XHJcbiAgbmV4dC5leGVyY2lzZUhpc3RvcnkgPSBBcnJheS5pc0FycmF5KGluY29taW5nLmV4ZXJjaXNlSGlzdG9yeSkgPyBpbmNvbWluZy5leGVyY2lzZUhpc3RvcnkgOiBbXTtcclxuICBuZXh0LnNpbXVsYWRvSGlzdG9yeSA9IEFycmF5LmlzQXJyYXkoaW5jb21pbmcuc2ltdWxhZG9IaXN0b3J5KSA/IGluY29taW5nLnNpbXVsYWRvSGlzdG9yeSA6IFtdO1xyXG4gIG5leHQuZm9jdXNIaXN0b3J5ID0gQXJyYXkuaXNBcnJheShpbmNvbWluZy5mb2N1c0hpc3RvcnkpID8gaW5jb21pbmcuZm9jdXNIaXN0b3J5IDogW107XHJcbiAgcmV0dXJuIG5leHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVKU09OKGtleSwgdmFsdWUpIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXR1c09yZGVyKCkge1xyXG4gIHJldHVybiBbJ3BlbmRpbmcnLCAnZG9uZScsICdwZXJkaWRvJ107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbnRlbnRTdGF0dXMoc3RhdHVzKSB7XHJcbiAgaWYgKHN0YXR1cyA9PT0gJ3BlcmRpZG8nIHx8IHN0YXR1cyA9PT0gJ2xvc3QnIHx8IHN0YXR1cyA9PT0gJ21pc3NlZCcpIHJldHVybiAncGVyZGlkbyc7XHJcbiAgaWYgKHN0YXR1cyA9PT0gJ2RvbmUnIHx8IHN0YXR1cyA9PT0gJ3BlbmRpbmcnKSByZXR1cm4gc3RhdHVzO1xyXG4gIHJldHVybiAncGVuZGluZyc7XHJcbn1cclxuXHJcbi8vIHJlbW92ZWQgdW51c2VkIGBnZXRSZXZpZXdEdWVEYXRlYCBoZWxwZXJcclxuXHJcbmZ1bmN0aW9uIGdldFRvZGF5SVNPKCkge1xyXG4gIHJldHVybiB0b0lTT0RhdGUobmV3IERhdGUoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0dWR5U3RhcnRUaW1pbmcoc2V0dGluZ3MpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc3RhcnRJU08gPSBzZXR0aW5ncz8uc3R1ZHlTdGFydERhdGUgfHwgc2NoZWR1bGVTdGFydDtcclxuICAgIGNvbnN0IHN0YXJ0ID0gZnJvbUlTT0RhdGUoc3RhcnRJU08pO1xyXG4gICAgc3RhcnQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICAgIGNvbnN0IGRpZmYgPSBNYXRoLmNlaWwoKHN0YXJ0IC0gdG9kYXkpIC8gODY0MDAwMDApO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhcnRJU086IHRvSVNPRGF0ZShzdGFydCksXHJcbiAgICAgIGlzQmVmb3JlU3RhcnQ6IGRpZmYgPiAwLFxyXG4gICAgICBkYXlzVW50aWxTdGFydDogTWF0aC5tYXgoMCwgZGlmZilcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIHsgc3RhcnRJU086IHNjaGVkdWxlU3RhcnQsIGlzQmVmb3JlU3RhcnQ6IGZhbHNlLCBkYXlzVW50aWxTdGFydDogMCB9O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmV4dFN0dWR5RGF0ZShzZXR0aW5ncywgZnJvbURhdGUgPSBuZXcgRGF0ZSgpKSB7XHJcbiAgY29uc3Qgc2NoZWR1bGVEYXRhID0gYnVpbGRBZGFwdGl2ZVNjaGVkdWxlKHNldHRpbmdzKTtcclxuICBjb25zdCB0b2RheSA9IHRvSVNPRGF0ZShmcm9tRGF0ZSk7XHJcbiAgY29uc3QgbmV4dFN0dWR5RGF5ID0gc2NoZWR1bGVEYXRhLndlZWtzXHJcbiAgICAuZmxhdE1hcCgod2VlaykgPT4gd2Vlay5kYXlzLmZpbHRlcigoZGF5KSA9PiBkYXkudHlwZSA9PT0gJ3N0dWR5JykpXHJcbiAgICAuZmluZCgoZGF5KSA9PiBkYXkuZGF0ZSA+IHRvZGF5KTtcclxuXHJcbiAgcmV0dXJuIG5leHRTdHVkeURheT8uZGF0ZSB8fCB0b0lTT0RhdGUoYWRkRGF5cyhmcm9tRGF0ZSwgMikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdHVkeURheXMoc2NoZWR1bGVEYXRhKSB7XHJcbiAgcmV0dXJuIHNjaGVkdWxlRGF0YS53ZWVrcy5mbGF0TWFwKCh3ZWVrKSA9PiB3ZWVrLmRheXMuZmlsdGVyKChkYXkpID0+IGRheS50eXBlID09PSAnc3R1ZHknKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRXZWVrKHNjaGVkdWxlRGF0YSkge1xyXG4gIGNvbnN0IHRvZGF5ID0gdG9JU09EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIHJldHVybiBzY2hlZHVsZURhdGEud2Vla3MuZmluZCgod2VlaykgPT4gd2Vlay5kYXlzLnNvbWUoKGRheSkgPT4gZGF5LmRhdGUgPT09IHRvZGF5KSkgfHwgc2NoZWR1bGVEYXRhLndlZWtzWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF5KHNjaGVkdWxlRGF0YSkge1xyXG4gIGNvbnN0IHRvZGF5ID0gdG9JU09EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIGNvbnN0IGN1cnJlbnQgPSBzY2hlZHVsZURhdGEud2Vla3MuZmxhdE1hcCgod2VlaykgPT4gd2Vlay5kYXlzKS5maW5kKChkYXkpID0+IGRheS5kYXRlID09PSB0b2RheSk7XHJcbiAgcmV0dXJuIGN1cnJlbnQgfHwgc2NoZWR1bGVEYXRhLndlZWtzWzBdLmRheXNbMF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRJdGVtcyhzY2hlZHVsZURhdGEpIHtcclxuICByZXR1cm4gc2NoZWR1bGVEYXRhLml0ZW1zO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb250ZW50QnlTdWJqZWN0KHNjaGVkdWxlRGF0YSwgc3ViamVjdCkge1xyXG4gIHJldHVybiBnZXRDb250ZW50SXRlbXMoc2NoZWR1bGVEYXRhKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uc3ViamVjdCA9PT0gc3ViamVjdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRTdGF0dXNNYXAoc3RhdGUpIHtcclxuICByZXR1cm4gc3RhdGUuY29udGVudFN0YXR1c2VzIHx8IHt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb250ZW50U3RhdHVzKHN0YXRlLCBjb250ZW50SWQpIHtcclxuICByZXR1cm4gbm9ybWFsaXplQ29udGVudFN0YXR1cyhnZXRDb250ZW50U3RhdHVzTWFwKHN0YXRlKVtjb250ZW50SWRdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRTdWJqZWN0U3RhdHMoc3RhdGUsIHNjaGVkdWxlRGF0YSkge1xyXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhjdXJyaWN1bHVtKS5tYXAoKFtzdWJqZWN0LCB0b3BpY3NdKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtcyA9IGdldENvbnRlbnRCeVN1YmplY3Qoc2NoZWR1bGVEYXRhLCBzdWJqZWN0KTtcclxuICAgIGNvbnN0IGRvbmUgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGl0ZW0uaWQpID09PSAnZG9uZScpLmxlbmd0aDtcclxuICAgIGNvbnN0IGxvc3QgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGl0ZW0uaWQpID09PSAncGVyZGlkbycpLmxlbmd0aDtcclxuICAgIGNvbnN0IHBlbmRpbmcgPSBpdGVtcy5sZW5ndGggLSBkb25lIC0gbG9zdDtcclxuICAgIGNvbnN0IHByaW9yaXR5Q291bnRzID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5rZXlzKHByaW9yaXR5TWV0YSkubWFwKChrZXkpID0+IFtrZXksIDBdKSk7XHJcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0ucHJpb3JpdHkgfHwgJ21lZGl1bSc7XHJcbiAgICAgIHByaW9yaXR5Q291bnRzW2tleV0gPSAocHJpb3JpdHlDb3VudHNba2V5XSB8fCAwKSArIDE7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHN0cm9uZ1RvcGljcyA9IFsuLi5pdGVtc11cclxuICAgICAgLnNvcnQoKGEsIGIpID0+IChiLnByaW9yaXR5UmFuayB8fCAwKSAtIChhLnByaW9yaXR5UmFuayB8fCAwKSlcclxuICAgICAgLnNsaWNlKDAsIDMpXHJcbiAgICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0udGl0bGUpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ViamVjdCxcclxuICAgICAgbGFiZWw6IHN1YmplY3RNZXRhW3N1YmplY3RdLmxhYmVsLFxyXG4gICAgICB0b3RhbDogdG9waWNzLmxlbmd0aCxcclxuICAgICAgZG9uZSxcclxuICAgICAgbG9zdCxcclxuICAgICAgcGVuZGluZyxcclxuICAgICAgcGVyY2VudDogTWF0aC5yb3VuZCgoZG9uZSAvIGl0ZW1zLmxlbmd0aCkgKiAxMDApIHx8IDAsXHJcbiAgICAgIHByaW9yaXR5Q291bnRzLFxyXG4gICAgICBzdHJvbmdUb3BpY3MsXHJcbiAgICAgIHRvcFByaW9yaXR5OiBzdHJvbmdUb3BpY3NbMF0gfHwgdG9waWNzWzBdPy50aXRsZSB8fCAnJ1xyXG4gICAgfTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRIZWF0bWFwKHN0YXRlLCBzY2hlZHVsZURhdGEpIHtcclxuICByZXR1cm4gc2NoZWR1bGVEYXRhLndlZWtzLmZsYXRNYXAoKHdlZWspID0+XHJcbiAgICB3ZWVrLmRheXMubWFwKChkYXkpID0+IHtcclxuICAgICAgY29uc3Qgc3RhdHVzID0gZGF5LnR5cGUgPT09ICdzdHVkeScgPyBnZXRDb250ZW50U3RhdHVzKHN0YXRlLCBkYXkuY29udGVudElkKSA6IGRheS50eXBlO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLmRheSxcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgd2Vla051bWJlcjogd2Vlay53ZWVrTnVtYmVyXHJcbiAgICAgIH07XHJcbiAgICB9KVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkQ3VycmVudFN0cmVhayhzdGF0ZSwgc2NoZWR1bGVEYXRhKSB7XHJcbiAgY29uc3QgZGF5cyA9IGdldFN0dWR5RGF5cyhzY2hlZHVsZURhdGEpO1xyXG4gIGxldCBzdHJlYWsgPSAwO1xyXG4gIGZvciAobGV0IGluZGV4ID0gZGF5cy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleCAtPSAxKSB7XHJcbiAgICBjb25zdCBkYXkgPSBkYXlzW2luZGV4XTtcclxuICAgIGlmIChnZXRDb250ZW50U3RhdHVzKHN0YXRlLCBkYXkuY29udGVudElkKSA9PT0gJ2RvbmUnKSB7XHJcbiAgICAgIHN0cmVhayArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzdHJlYWs7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdlZWtseVN0dWRpZWRDb250ZW50cyhzdGF0ZSwgc2NoZWR1bGVEYXRhKSB7XHJcbiAgLy8gZGV0ZXJtaW5lIGN1cnJlbnQgd2VlayB3aW5kb3cgKFN1bmRheS4uU2F0dXJkYXkpXHJcbiAgY29uc3QgdG9kYXlEYXRlID0gbmV3IERhdGUoKTtcclxuICBjb25zdCBzdGFydE9mV2VlayA9IHRvSVNPRGF0ZShhZGREYXlzKHRvZGF5RGF0ZSwgLXRvZGF5RGF0ZS5nZXREYXkoKSkpO1xyXG4gIGNvbnN0IGVuZE9mV2VlayA9IHRvSVNPRGF0ZShhZGREYXlzKGZyb21JU09EYXRlKHN0YXJ0T2ZXZWVrKSwgNikpO1xyXG5cclxuICAvLyBjb2xsZWN0IGl0ZW1zIGV4cGxpY2l0bHkgbWFya2VkIGRvbmUgdGhpcyBjYWxlbmRhciB3ZWVrXHJcbiAgY29uc3QgaXRlbXNUaGlzV2VlayA9IGdldENvbnRlbnRJdGVtcyhzY2hlZHVsZURhdGEpLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgY29uc3Qgc3RhdHVzID0gZ2V0Q29udGVudFN0YXR1cyhzdGF0ZSwgaXRlbS5pZCk7XHJcbiAgICByZXR1cm4gc3RhdHVzID09PSAnZG9uZScgJiYgaXRlbS5zY2hlZHVsZWRGb3IgPj0gc3RhcnRPZldlZWsgJiYgaXRlbS5zY2hlZHVsZWRGb3IgPD0gZW5kT2ZXZWVrO1xyXG4gIH0pO1xyXG5cclxuICAvLyBmYWxsYmFjazogaWYgbm9uZSBmb3VuZCBpbiB0aGlzIHdlZWssIGluY2x1ZGUgYWxsIGRvbmUgaXRlbXNcclxuICBjb25zdCBpdGVtcyA9IGl0ZW1zVGhpc1dlZWsubGVuZ3RoXHJcbiAgICA/IGl0ZW1zVGhpc1dlZWtcclxuICAgIDogZ2V0Q29udGVudEl0ZW1zKHNjaGVkdWxlRGF0YSkuZmlsdGVyKChpdGVtKSA9PiBnZXRDb250ZW50U3RhdHVzKHN0YXRlLCBpdGVtLmlkKSA9PT0gJ2RvbmUnKTtcclxuXHJcbiAgY29uc3QgY29udGVudHMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgIGNvbnN0IHNwZWNpZmljID0gY29udGVudFJlc291cmNlc1tpdGVtLnRpdGxlXSB8fCBbXTtcclxuICAgIGNvbnN0IGZhbGxiYWNrID0gc3ViamVjdFJlc291cmNlc1tpdGVtLnN1YmplY3RdIHx8IFtdO1xyXG4gICAgY29uc3QgdXNlZFNwZWNpZmljID0gc3BlY2lmaWMubGVuZ3RoID4gMDtcclxuICAgIGNvbnN0IGdlbmVyYXRlZCA9IGdlbmVyYXRlU2VhcmNoTGlua3MoaXRlbS50aXRsZSk7XHJcbiAgICBjb25zdCByZXNvdXJjZXMgPSBbLi4uKHVzZWRTcGVjaWZpYyA/IHNwZWNpZmljIDogZmFsbGJhY2spLCAuLi5nZW5lcmF0ZWRdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IGl0ZW0uaWQsXHJcbiAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICBzdWJqZWN0OiBpdGVtLnN1YmplY3QsXHJcbiAgICAgIHN1YmplY3RMYWJlbDogaXRlbS5zdWJqZWN0TGFiZWwsXHJcbiAgICAgIHByaW9yaXR5UmFuazogaXRlbS5wcmlvcml0eVJhbmsgfHwgMCxcclxuICAgICAgcmVzb3VyY2VzLFxyXG4gICAgICB1c2luZ1N1YmplY3RGYWxsYmFjazogIXVzZWRTcGVjaWZpYyxcclxuICAgICAgc2NoZWR1bGVkRm9yOiBpdGVtLnNjaGVkdWxlZEZvclxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgLy8gZGVkdXBsaWNhdGUgYnkgdGl0bGVcclxuICBjb25zdCBkZWR1cCA9IFtdO1xyXG4gIGNvbnN0IHNlZW4gPSBuZXcgU2V0KCk7XHJcbiAgY29udGVudHMuZm9yRWFjaCgoYykgPT4ge1xyXG4gICAgaWYgKCFzZWVuLmhhcyhjLnRpdGxlKSkge1xyXG4gICAgICBzZWVuLmFkZChjLnRpdGxlKTtcclxuICAgICAgZGVkdXAucHVzaChjKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgZGVkdXAuc29ydCgoYSwgYikgPT4gKGIucHJpb3JpdHlSYW5rIHx8IDApIC0gKGEucHJpb3JpdHlSYW5rIHx8IDApKTtcclxuICBjb25zdCByZXNvdXJjZXNGb3VuZCA9IGRlZHVwLnJlZHVjZSgoYWNjLCBjKSA9PiBhY2MgKyAoYy5yZXNvdXJjZXM/Lmxlbmd0aCB8fCAwKSwgMCk7XHJcblxyXG4gIC8vIHByb3ZpZGUgc3R1ZHlEYXlzIGFzIHRoZSBzY2hlZHVsZSBkYXlzIGZvciB0aGUgY3VycmVudCB3ZWVrIHdoZW4gYXZhaWxhYmxlXHJcbiAgY29uc3QgY3VycmVudFdlZWsgPSBnZXRDdXJyZW50V2VlayhzY2hlZHVsZURhdGEpO1xyXG4gIGNvbnN0IHN0dWR5RGF5cyA9IChjdXJyZW50V2Vlaz8uZGF5cyB8fCBbXSkuZmlsdGVyKChkKSA9PiBkLnR5cGUgPT09ICdzdHVkeScgJiYgZC5jb250ZW50SWQgJiYgZC5kYXRlID49IHN0YXJ0T2ZXZWVrICYmIGQuZGF0ZSA8PSBlbmRPZldlZWspO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29udGVudHM6IGRlZHVwLFxyXG4gICAgdG90YWxDb250ZW50czogZGVkdXAubGVuZ3RoLFxyXG4gICAgdG90YWxSZXNvdXJjZXM6IHJlc291cmNlc0ZvdW5kLFxyXG4gICAgc3R1ZHlEYXlzXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SXRlbUR1ZURhdGUoc3RhdGUsIGl0ZW0pIHtcclxuICByZXR1cm4gc3RhdGUucmV2aWV3U2NoZWR1bGU/LltpdGVtLmlkXSB8fCBpdGVtLnNjaGVkdWxlZEZvciB8fCBpdGVtLmRhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkVG9kYXlTdHVkeUl0ZW1zKHN0YXRlLCBzY2hlZHVsZURhdGEpIHtcclxuICBjb25zdCB0b2RheSA9IGdldFRvZGF5SVNPKCk7XHJcbiAgcmV0dXJuIGdldENvbnRlbnRJdGVtcyhzY2hlZHVsZURhdGEpXHJcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnNjaGVkdWxlZEZvciA9PT0gdG9kYXkpXHJcbiAgICAubWFwKChpdGVtKSA9PiAoe1xyXG4gICAgICAuLi5pdGVtLFxyXG4gICAgICBzdGF0dXM6IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGl0ZW0uaWQpLFxyXG4gICAgICBkdWVEYXRlOiBnZXRJdGVtRHVlRGF0ZShzdGF0ZSwgaXRlbSksXHJcbiAgICAgIGlzUmVzY2hlZHVsZWQ6IEJvb2xlYW4oc3RhdGUucmV2aWV3U2NoZWR1bGU/LltpdGVtLmlkXSAmJiBzdGF0ZS5yZXZpZXdTY2hlZHVsZVtpdGVtLmlkXSAhPT0gaXRlbS5zY2hlZHVsZWRGb3IpXHJcbiAgICB9KSlcclxuICAgIC5zb3J0KChhLCBiKSA9PiAoYi5wcmlvcml0eVJhbmsgfHwgMCkgLSAoYS5wcmlvcml0eVJhbmsgfHwgMCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZE92ZXJkdWVJdGVtcyhzdGF0ZSwgc2NoZWR1bGVEYXRhKSB7XHJcbiAgY29uc3QgdG9kYXkgPSBnZXRUb2RheUlTTygpO1xyXG4gIHJldHVybiBnZXRDb250ZW50SXRlbXMoc2NoZWR1bGVEYXRhKVxyXG4gICAgLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSBnZXRDb250ZW50U3RhdHVzKHN0YXRlLCBpdGVtLmlkKTtcclxuICAgICAgY29uc3QgZHVlRGF0ZSA9IGdldEl0ZW1EdWVEYXRlKHN0YXRlLCBpdGVtKTtcclxuICAgICAgcmV0dXJuIHN0YXR1cyA9PT0gJ3BlcmRpZG8nIHx8IChzdGF0dXMgPT09ICdwZW5kaW5nJyAmJiBkdWVEYXRlIDwgdG9kYXkpO1xyXG4gICAgfSlcclxuICAgIC5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAgIC4uLml0ZW0sXHJcbiAgICAgIHN0YXR1czogZ2V0Q29udGVudFN0YXR1cyhzdGF0ZSwgaXRlbS5pZCksXHJcbiAgICAgIGR1ZURhdGU6IGdldEl0ZW1EdWVEYXRlKHN0YXRlLCBpdGVtKSxcclxuICAgICAgaXNSZXNjaGVkdWxlZDogQm9vbGVhbihzdGF0ZS5yZXZpZXdTY2hlZHVsZT8uW2l0ZW0uaWRdICYmIHN0YXRlLnJldmlld1NjaGVkdWxlW2l0ZW0uaWRdICE9PSBpdGVtLnNjaGVkdWxlZEZvcilcclxuICAgIH0pKVxyXG4gICAgLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgaWYgKGEuZHVlRGF0ZSA9PT0gYi5kdWVEYXRlKSByZXR1cm4gKGIucHJpb3JpdHlSYW5rIHx8IDApIC0gKGEucHJpb3JpdHlSYW5rIHx8IDApO1xyXG4gICAgICByZXR1cm4gYS5kdWVEYXRlLmxvY2FsZUNvbXBhcmUoYi5kdWVEYXRlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXROZXh0UmV2aWV3TGFiZWwoZGF0ZUlTTykge1xyXG4gIGlmICghZGF0ZUlTTykgcmV0dXJuICdTZW0gcmV2aXPDo28gYWdlbmRhZGEnO1xyXG4gIGNvbnN0IHRvZGF5ID0gZ2V0VG9kYXlJU08oKTtcclxuICBjb25zdCB0b21vcnJvdyA9IHRvSVNPRGF0ZShhZGREYXlzKG5ldyBEYXRlKCksIDEpKTtcclxuICBpZiAoZGF0ZUlTTyA9PT0gdG9kYXkpIHJldHVybiAnSG9qZSDDoHMgMTloJztcclxuICBpZiAoZGF0ZUlTTyA9PT0gdG9tb3Jyb3cpIHJldHVybiAnQW1hbmjDoyDDoHMgMTloJztcclxuICByZXR1cm4gYCR7ZnJvbUlTT0RhdGUoZGF0ZUlTTykudG9Mb2NhbGVEYXRlU3RyaW5nKCdwdC1CUicsIHsgd2Vla2RheTogJ3Nob3J0JywgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnIH0pfSDDoHMgMTloYDtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRNb3RpdmF0aW9ucyhzdGF0ZSwgZGFzaGJvYXJkLCB0b2RheVN0dWR5SXRlbXMsIG92ZXJkdWVJdGVtcykge1xyXG4gIGNvbnN0IG1lc3NhZ2VzID0gW107XHJcbiAgaWYgKHRvZGF5U3R1ZHlJdGVtcy5sZW5ndGggPiAwICYmIG92ZXJkdWVJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgIG1lc3NhZ2VzLnB1c2goJ/CflKUgVm9jw6ogasOhIHRlbSBvIGNhbWluaG8gZGUgaG9qZSBwcm9udG8gcGFyYSBhdmFuw6dhciBzZW0gYXRyYXNvcy4nKTtcclxuICB9XHJcbiAgaWYgKGRhc2hib2FyZC5jb21wbGV0ZWQgPiAwICYmIGRhc2hib2FyZC5wcm9ncmVzc0RlbHRhID49IDApIHtcclxuICAgIG1lc3NhZ2VzLnB1c2goJ/Cfk4ggU2V1IHByb2dyZXNzbyBlc3TDoSBjcmVzY2VuZG8gY29tIGNvbnNpc3TDqm5jaWEuJyk7XHJcbiAgfVxyXG4gIGlmIChkYXNoYm9hcmQuc3RyZWFrID49IDcpIHtcclxuICAgIG1lc3NhZ2VzLnB1c2goYPCfj4YgVm9jw6ogZXN0w6EgaMOhICR7ZGFzaGJvYXJkLnN0cmVha30gZGlhcyBlc3R1ZGFuZG8gY29uc2VjdXRpdmFtZW50ZS5gKTtcclxuICB9XHJcbiAgaWYgKGRhc2hib2FyZC5jb21wbGV0aW9uID49IDEwMCkge1xyXG4gICAgbWVzc2FnZXMucHVzaCgn8J+UpSBWb2PDqiBjb25jbHVpdSB0b2RvcyBvcyBjb250ZcO6ZG9zIGNhZGFzdHJhZG9zLicpO1xyXG4gIH1cclxuICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBtZXNzYWdlcy5wdXNoKCfinKggVW0gcGFzc28gZGUgY2FkYSB2ZXogasOhIG1hbnTDqW0gc3VhIHJvdGluYSB2aXZhLicpO1xyXG4gIH1cclxuICByZXR1cm4gbWVzc2FnZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkRGFzaGJvYXJkKHN0YXRlLCBzY2hlZHVsZURhdGEpIHtcclxuICBjb25zdCBhbGxJdGVtcyA9IGdldENvbnRlbnRJdGVtcyhzY2hlZHVsZURhdGEpO1xyXG4gIGNvbnN0IGNvbXBsZXRlZCA9IGFsbEl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gZ2V0Q29udGVudFN0YXR1cyhzdGF0ZSwgaXRlbS5pZCkgPT09ICdkb25lJykubGVuZ3RoO1xyXG4gIGNvbnN0IGxvc3QgPSBhbGxJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGl0ZW0uaWQpID09PSAncGVyZGlkbycpLmxlbmd0aDtcclxuICBjb25zdCBwZW5kaW5nID0gYWxsSXRlbXMubGVuZ3RoIC0gY29tcGxldGVkIC0gbG9zdDtcclxuICBjb25zdCBjdXJyZW50V2VlayA9IGdldEN1cnJlbnRXZWVrKHNjaGVkdWxlRGF0YSk7XHJcbiAgY29uc3QgY3VycmVudERheSA9IGdldEN1cnJlbnREYXkoc2NoZWR1bGVEYXRhKTtcclxuICBjb25zdCB3ZWVrbHlTdHVkaWVkID0gZ2V0V2Vla2x5U3R1ZGllZENvbnRlbnRzKHN0YXRlLCBzY2hlZHVsZURhdGEpO1xyXG4gIGNvbnN0IGN1cnJlbnRXZWVrU3R1ZHlEYXlzID0gY3VycmVudFdlZWsuZGF5cy5maWx0ZXIoKGRheSkgPT4gZGF5LnR5cGUgPT09ICdzdHVkeScpO1xyXG4gIGNvbnN0IGN1cnJlbnRXZWVrRG9uZSA9IGN1cnJlbnRXZWVrU3R1ZHlEYXlzLmZpbHRlcigoZGF5KSA9PiBnZXRDb250ZW50U3RhdHVzKHN0YXRlLCBkYXkuY29udGVudElkKSA9PT0gJ2RvbmUnKS5sZW5ndGg7XHJcbiAgY29uc3QgY3VycmVudFdlZWtQcm9ncmVzcyA9IE1hdGgucm91bmQoKGN1cnJlbnRXZWVrRG9uZSAvIGN1cnJlbnRXZWVrU3R1ZHlEYXlzLmxlbmd0aCkgKiAxMDApIHx8IDA7XHJcbiAgY29uc3QgcHJldmlvdXNXZWVrID0gc2NoZWR1bGVEYXRhLndlZWtzLmZpbmQoKHdlZWspID0+IHdlZWsud2Vla051bWJlciA9PT0gY3VycmVudFdlZWsud2Vla051bWJlciAtIDEpO1xyXG4gIGNvbnN0IHByZXZpb3VzV2Vla1N0dWR5RGF5cyA9IHByZXZpb3VzV2Vlaz8uZGF5cy5maWx0ZXIoKGRheSkgPT4gZGF5LnR5cGUgPT09ICdzdHVkeScpIHx8IFtdO1xyXG4gIGNvbnN0IHByZXZpb3VzV2Vla0RvbmUgPSBwcmV2aW91c1dlZWtTdHVkeURheXMuZmlsdGVyKChkYXkpID0+IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGRheS5jb250ZW50SWQpID09PSAnZG9uZScpLmxlbmd0aDtcclxuICBjb25zdCBwcmV2aW91c1dlZWtQcm9ncmVzcyA9IE1hdGgucm91bmQoKHByZXZpb3VzV2Vla0RvbmUgLyBwcmV2aW91c1dlZWtTdHVkeURheXMubGVuZ3RoKSAqIDEwMCkgfHwgMDtcclxuICBjb25zdCBjdXJyZW50TW9udGhLZXkgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgNyk7XHJcbiAgY29uc3QgbW9udGhTdHVkeURheXMgPSBidWlsZEhlYXRtYXAoc3RhdGUsIHNjaGVkdWxlRGF0YSkuZmlsdGVyKChkYXkpID0+IGRheS5kYXRlLnN0YXJ0c1dpdGgoY3VycmVudE1vbnRoS2V5KSAmJiBkYXkudHlwZSA9PT0gJ3N0dWR5Jyk7XHJcbiAgY29uc3QgbW9udGhEb25lID0gbW9udGhTdHVkeURheXMuZmlsdGVyKChkYXkpID0+IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGRheS5jb250ZW50SWQpID09PSAnZG9uZScpLmxlbmd0aDtcclxuICBjb25zdCBtb250aFByb2dyZXNzID0gTWF0aC5yb3VuZCgobW9udGhEb25lIC8gbW9udGhTdHVkeURheXMubGVuZ3RoKSAqIDEwMCkgfHwgMDtcclxuICBjb25zdCBzdHJlYWsgPSBidWlsZEN1cnJlbnRTdHJlYWsoc3RhdGUsIHNjaGVkdWxlRGF0YSk7XHJcbiAgY29uc3QgdG9kYXkgPSB0b0lTT0RhdGUobmV3IERhdGUoKSk7XHJcbiAgY29uc3QgdG9kYXlTdHVkeUl0ZW1zID0gYnVpbGRUb2RheVN0dWR5SXRlbXMoc3RhdGUsIHNjaGVkdWxlRGF0YSk7XHJcbiAgLy8gZGV0ZXJtaW5lIHJldmlldyBkYXkgZnJvbSB1c2VyIHNldHRpbmdzIChhdm9pZCBkZXBlbmRpbmcgb24gc2NoZWR1bGUgZGF0ZXMpXHJcbiAgY29uc3Qgd2Vla2RheUtleXMgPSBbJ3N1bicsICdtb24nLCAndHVlJywgJ3dlZCcsICd0aHUnLCAnZnJpJywgJ3NhdCddO1xyXG4gIGNvbnN0IHRvZGF5S2V5ID0gd2Vla2RheUtleXNbbmV3IERhdGUoKS5nZXREYXkoKV07XHJcbiAgY29uc3QgdXNlclN0dWR5RGF5cyA9IEFycmF5LmlzQXJyYXkoc3RhdGUuc2V0dGluZ3M/LnN0dWR5RGF5cykgPyBzdGF0ZS5zZXR0aW5ncy5zdHVkeURheXMuZmlsdGVyKChkKSA9PiB3ZWVrZGF5S2V5cy5pbmNsdWRlcyhkKSkgOiBzZXR0aW5nc0RlZmF1bHRzLnN0dWR5RGF5cztcclxuICBjb25zdCB1c2VyUmV2aWV3RGF5cyA9IEFycmF5LmlzQXJyYXkoc3RhdGUuc2V0dGluZ3M/LnJldmlld0RheXMpID8gc3RhdGUuc2V0dGluZ3MucmV2aWV3RGF5cy5maWx0ZXIoKGQpID0+IHdlZWtkYXlLZXlzLmluY2x1ZGVzKGQpICYmICF1c2VyU3R1ZHlEYXlzLmluY2x1ZGVzKGQpKSA6IHNldHRpbmdzRGVmYXVsdHMucmV2aWV3RGF5cztcclxuICBjb25zdCB0b2RheVJldmlld0RheSA9IHVzZXJSZXZpZXdEYXlzLmluY2x1ZGVzKHRvZGF5S2V5KSB8fCBjdXJyZW50RGF5Py50eXBlID09PSAncmV2aWV3JztcclxuICBjb25zdCB0b2RheVJldmlld0l0ZW1zID0gW107XHJcbiAgY29uc3Qgb3ZlcmR1ZUl0ZW1zID0gYnVpbGRPdmVyZHVlSXRlbXMoc3RhdGUsIHNjaGVkdWxlRGF0YSk7XHJcbiAgY29uc3QgcmV2aWV3SXRlbXMgPSBhbGxJdGVtc1xyXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gZ2V0Q29udGVudFN0YXR1cyhzdGF0ZSwgaXRlbS5pZCkgPT09ICdwZXJkaWRvJylcclxuICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFzdGF0ZS5yZXZpZXdTY2hlZHVsZT8uW2l0ZW0uaWRdIHx8IHN0YXRlLnJldmlld1NjaGVkdWxlW2l0ZW0uaWRdIDw9IHRvZGF5KVxyXG4gICAgLnNvcnQoKGEsIGIpID0+IChiLnByaW9yaXR5UmFuayB8fCAwKSAtIChhLnByaW9yaXR5UmFuayB8fCAwKSk7XHJcbiAgY29uc3QgbmV4dFJldmlld0l0ZW0gPSBbLi4ub3ZlcmR1ZUl0ZW1zXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICBpZiAoYS5kdWVEYXRlID09PSBiLmR1ZURhdGUpIHJldHVybiAoYi5wcmlvcml0eVJhbmsgfHwgMCkgLSAoYS5wcmlvcml0eVJhbmsgfHwgMCk7XHJcbiAgICByZXR1cm4gYS5kdWVEYXRlLmxvY2FsZUNvbXBhcmUoYi5kdWVEYXRlKTtcclxuICB9KVswXSB8fCBudWxsO1xyXG4gIGNvbnN0IG5leHRSZXZpZXdEYXRlID0gbmV4dFJldmlld0l0ZW0/LmR1ZURhdGUgfHwgbnVsbDtcclxuICBjb25zdCBob3Vyc0FjY3VtdWxhdGVkID0gTWF0aC5yb3VuZCgoc3RhdGUuZm9jdXNIaXN0b3J5LnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLm1pbnV0ZXMsIDApIC8gNjApICogMTApIC8gMTA7XHJcbiAgY29uc3QgcHJvZ3Jlc3NEZWx0YSA9IGN1cnJlbnRXZWVrUHJvZ3Jlc3MgLSBwcmV2aW91c1dlZWtQcm9ncmVzcztcclxuICBjb25zdCByZW1pbmRlcnMgPSBbXTtcclxuXHJcbiAgaWYgKHRvZGF5U3R1ZHlJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICByZW1pbmRlcnMucHVzaCh7IHRvbmU6ICdob3QnLCBlbW9qaTogJ/CflKUnLCB0aXRsZTogYFZvY8OqIHRlbSAke3RvZGF5U3R1ZHlJdGVtcy5sZW5ndGh9IGNvbnRlw7pkb3MgcGFyYSBlc3R1ZGFyIGhvamUuYCwgZGVzY3JpcHRpb246ICdBYnJhIGEgc2XDp8OjbyBkZSBlc3R1ZG9zIGRlIGhvamUgcGFyYSBzZWd1aXIgbyBwbGFuby4nIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKG92ZXJkdWVJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICByZW1pbmRlcnMucHVzaCh7IHRvbmU6ICdiYWQnLCBlbW9qaTogJ/Cfk4wnLCB0aXRsZTogYFZvY8OqIHBvc3N1aSAke292ZXJkdWVJdGVtcy5sZW5ndGh9IGNvbnRlw7pkb3MgYXRyYXNhZG9zLmAsIGRlc2NyaXB0aW9uOiAnRWxlcyBqw6EgZXN0w6NvIHByb250b3MgcGFyYSByZXZpc8OjbyBlIHJlYWdlbmRhbWVudG8uJyB9KTtcclxuICB9XHJcblxyXG4gIGlmICh0b2RheVN0dWR5SXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5zdWJqZWN0ID09PSAnZXNzYXknKSB8fCBhbGxJdGVtcy5zb21lKChpdGVtKSA9PiBpdGVtLnN1YmplY3QgPT09ICdlc3NheScgJiYgZ2V0Q29udGVudFN0YXR1cyhzdGF0ZSwgaXRlbS5pZCkgIT09ICdkb25lJyAmJiBpdGVtLnNjaGVkdWxlZEZvciA8PSB0b2RheSkpIHtcclxuICAgIHJlbWluZGVycy5wdXNoKHsgdG9uZTogJ3JldmlldycsIGVtb2ppOiAn4pyN77iPJywgdGl0bGU6ICdFc3TDoSBuYSBob3JhIGRlIGZhemVyIHVtYSByZWRhw6fDo28uJywgZGVzY3JpcHRpb246ICdBIHJlZGHDp8OjbyBlbnRyb3UgbmEgc3VhIHJvdGluYSBlIHByZWNpc2EgZGUgY29uc3TDom5jaWEuJyB9KTtcclxuICB9XHJcblxyXG4gIGlmIChwcm9ncmVzc0RlbHRhID4gMCkge1xyXG4gICAgcmVtaW5kZXJzLnB1c2goeyB0b25lOiAnZ29vZCcsIGVtb2ppOiAn8J+TiCcsIHRpdGxlOiAnU2V1IHByb2dyZXNzbyBhdW1lbnRvdSBlc3RhIHNlbWFuYS4nLCBkZXNjcmlwdGlvbjogJ0EgY29uc2lzdMOqbmNpYSBlc3TDoSBhcGFyZWNlbmRvIG5vcyBzZXVzIHJlc3VsdGFkb3MuJyB9KTtcclxuICB9XHJcblxyXG4gIGlmIChzdHJlYWsgPj0gNykge1xyXG4gICAgcmVtaW5kZXJzLnB1c2goeyB0b25lOiAnc2ltdWxhZG8nLCBlbW9qaTogJ/Cfj4YnLCB0aXRsZTogYFZvY8OqIGVzdMOhIGjDoSAke3N0cmVha30gZGlhcyBlc3R1ZGFuZG8gY29uc2VjdXRpdmFtZW50ZS5gLCBkZXNjcmlwdGlvbjogJ0Vzc2Egc2VxdcOqbmNpYSDDqSB1bWEgdmFudGFnZW0gcmVhbCBuYSBwcmVwYXJhw6fDo28uJyB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5leHRSZXZpZXcgPSBuZXh0UmV2aWV3RGF0ZVxyXG4gICAgPyB7XHJcbiAgICAgICAgZGF0ZTogbmV4dFJldmlld0RhdGUsXHJcbiAgICAgICAgbGFiZWw6IGZvcm1hdE5leHRSZXZpZXdMYWJlbChuZXh0UmV2aWV3RGF0ZSksXHJcbiAgICAgICAgdGl0bGU6IG5leHRSZXZpZXdJdGVtPy50aXRsZSB8fCAnUHLDs3hpbWEgcmV2aXPDo28nLFxyXG4gICAgICAgIHN1YmplY3RMYWJlbDogbmV4dFJldmlld0l0ZW0/LnN1YmplY3RMYWJlbCB8fCAnUmV2aXPDo28nLFxyXG4gICAgICAgIHRvbmU6IG5leHRSZXZpZXdJdGVtPy5zdGF0dXMgPT09ICdwZXJkaWRvJyA/ICdiYWQnIDogJ3JldmlldydcclxuICAgICAgfVxyXG4gICAgOiB7XHJcbiAgICAgICAgZGF0ZTogbnVsbCxcclxuICAgICAgICBsYWJlbDogJ1NlbSByZXZpc8OjbyBhZ2VuZGFkYScsXHJcbiAgICAgICAgdGl0bGU6ICdOZW5odW1hIHJldmlzw6NvIHBlbmRlbnRlJyxcclxuICAgICAgICBzdWJqZWN0TGFiZWw6ICdUdWRvIGVtIGRpYScsXHJcbiAgICAgICAgdG9uZTogJ2RvbmUnXHJcbiAgICAgIH07XHJcbiAgY29uc3QgbW90aXZhdGlvbnMgPSBidWlsZE1vdGl2YXRpb25zKHN0YXRlLCB7IGNvbXBsZXRlZCwgcHJvZ3Jlc3NEZWx0YSwgc3RyZWFrLCBjb21wbGV0aW9uOiBNYXRoLnJvdW5kKChjb21wbGV0ZWQgLyBhbGxJdGVtcy5sZW5ndGgpICogMTAwKSB8fCAwIH0sIHRvZGF5U3R1ZHlJdGVtcywgb3ZlcmR1ZUl0ZW1zKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbXBsZXRpb246IE1hdGgucm91bmQoKGNvbXBsZXRlZCAvIGFsbEl0ZW1zLmxlbmd0aCkgKiAxMDApIHx8IDAsXHJcbiAgICBjb21wbGV0ZWQsXHJcbiAgICBsb3N0LFxyXG4gICAgcGVuZGluZyxcclxuICAgIHN0cmVhayxcclxuICAgIGN1cnJlbnRXZWVrLFxyXG4gICAgY3VycmVudERheSxcclxuICAgIGN1cnJlbnRXZWVrUHJvZ3Jlc3MsXHJcbiAgICBtb250aFByb2dyZXNzLFxyXG4gICAgcHJldmlvdXNXZWVrUHJvZ3Jlc3MsXHJcbiAgICBwcm9ncmVzc0RlbHRhLFxyXG4gICAgd2Vla0dvYWw6IHN0YXRlLnNldHRpbmdzLndlZWtseUdvYWwsXHJcbiAgICBkYXlzVW50aWxFbmVtOiBnZXREYXlzVW50aWxFbmVtKCksXHJcbiAgICB0b3RhbDogYWxsSXRlbXMubGVuZ3RoLFxyXG4gICAgaG91cnNBY2N1bXVsYXRlZCxcclxuICAgIHN1YmplY3RTdGF0czogYnVpbGRTdWJqZWN0U3RhdHMoc3RhdGUsIHNjaGVkdWxlRGF0YSksXHJcbiAgICBoZWF0bWFwOiBidWlsZEhlYXRtYXAoc3RhdGUsIHNjaGVkdWxlRGF0YSksXHJcbiAgICBhY2hpZXZlbWVudHM6IGJ1aWxkQWNoaWV2ZW1lbnRzKHN0YXRlLCBzY2hlZHVsZURhdGEpLFxyXG4gICAgZm9jdXNNaW51dGVzOiBzdGF0ZS5mb2N1c0hpc3RvcnkucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ubWludXRlcywgMCksXHJcbiAgICByZXZpZXdJdGVtcyxcclxuICAgIHRvZGF5U3R1ZHlJdGVtcyxcclxuICAgIHRvZGF5UmV2aWV3RGF5LFxyXG4gICAgdG9kYXlSZXZpZXdJdGVtcyxcclxuICAgIG92ZXJkdWVJdGVtcyxcclxuICAgIHJlbWluZGVycyxcclxuICAgIG5leHRSZXZpZXcsXHJcbiAgICBtb3RpdmF0aW9ucyxcclxuICAgIHJldmlzaW9uQ29udGVudHM6IHdlZWtseVN0dWRpZWQuY29udGVudHMsXHJcbiAgICByZXZpc2lvblRvdGFsQ29udGVudHM6IHdlZWtseVN0dWRpZWQudG90YWxDb250ZW50cyxcclxuICAgIHJldmlzaW9uUmVzb3VyY2VzVG90YWw6IHdlZWtseVN0dWRpZWQudG90YWxSZXNvdXJjZXMsXHJcbiAgICBzdHVkeURheXM6IHdlZWtseVN0dWRpZWQuc3R1ZHlEYXlzIHx8IFtdLFxyXG4gICAgZXNzYXlDb3VudDogc3RhdGUuZXNzYXlzLmxlbmd0aCxcclxuICAgIHF1ZXN0aW9uQ291bnQ6IHN0YXRlLmV4ZXJjaXNlSGlzdG9yeS5sZW5ndGgsXHJcbiAgICBzaW11bGFkb0NvdW50OiBzdGF0ZS5zaW11bGFkb0hpc3RvcnkubGVuZ3RoXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRBY2hpZXZlbWVudHMoc3RhdGUsIHNjaGVkdWxlRGF0YSkge1xyXG4gIGNvbnN0IGRhc2hib2FyZCA9IGJ1aWxkRGFzaGJvYXJkU3VtbWFyeShzdGF0ZSwgc2NoZWR1bGVEYXRhKTtcclxuICByZXR1cm4gW1xyXG4gICAgeyBpZDogJ3N0cmVhaycsIGxhYmVsOiAn8J+UpSA3IGRpYXMgZXN0dWRhbmRvJywgZG9uZTogZGFzaGJvYXJkLnN0cmVhayA+PSA3IH0sXHJcbiAgICB7IGlkOiAnY29udGVudHMnLCBsYWJlbDogJ/Cfk5ogMzAgY29udGXDumRvcyBjb25jbHXDrWRvcycsIGRvbmU6IGRhc2hib2FyZC5jb21wbGV0ZWQgPj0gMzAgfSxcclxuICAgIHsgaWQ6ICdlc3NheXMnLCBsYWJlbDogJ+Kcje+4jyAxMCByZWRhw6fDtWVzIGZlaXRhcycsIGRvbmU6IHN0YXRlLmVzc2F5cy5sZW5ndGggPj0gMTAgfSxcclxuICAgIHsgaWQ6ICdxdWVzdGlvbnMnLCBsYWJlbDogJ/Cfp6AgMTAwIHF1ZXN0w7VlcyByZXNwb25kaWRhcycsIGRvbmU6IHN0YXRlLmV4ZXJjaXNlSGlzdG9yeS5sZW5ndGggPj0gMTAwIH0sXHJcbiAgICB7IGlkOiAnc2ltdWxhZG8nLCBsYWJlbDogJ/Cfk4ogcHJpbWVpcm8gc2ltdWxhZG8nLCBkb25lOiBzdGF0ZS5zaW11bGFkb0hpc3RvcnkubGVuZ3RoID49IDEgfVxyXG4gIF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkRGFzaGJvYXJkU3VtbWFyeShzdGF0ZSwgc2NoZWR1bGVEYXRhKSB7XHJcbiAgY29uc3QgYWxsSXRlbXMgPSBnZXRDb250ZW50SXRlbXMoc2NoZWR1bGVEYXRhKTtcclxuICBjb25zdCBjb21wbGV0ZWQgPSBhbGxJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGdldENvbnRlbnRTdGF0dXMoc3RhdGUsIGl0ZW0uaWQpID09PSAnZG9uZScpLmxlbmd0aDtcclxuICBjb25zdCBzdHJlYWsgPSBidWlsZEN1cnJlbnRTdHJlYWsoc3RhdGUsIHNjaGVkdWxlRGF0YSk7XHJcbiAgcmV0dXJuIHsgY29tcGxldGVkLCBzdHJlYWsgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyc2lzdFN0YXRlKG5leHRTdGF0ZSkge1xyXG4gIHNhdmVKU09OKFNUT1JBR0VfS0VZLCBuZXh0U3RhdGUpO1xyXG4gIHNhdmVKU09OKFRIRU1FX0tFWSwgbmV4dFN0YXRlLnNldHRpbmdzPy50aGVtZU1vZGUgfHwgbmV4dFN0YXRlLnRoZW1lKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBsYW5uZXJQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcclxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IG1lcmdlU3RhdGUoY3JlYXRlRGVmYXVsdFN0YXRlKCksIHJlYWRKU09OKFNUT1JBR0VfS0VZLCBudWxsKSkpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gQXBwbHkgYXBwZWFyYW5jZSBmcm9tIHNldHRpbmdzIChtb2RlICsgYWNjZW50KVxyXG4gICAgY29uc3QgbW9kZSA9IHN0YXRlLnNldHRpbmdzPy50aGVtZU1vZGUgfHwgc3RhdGUudGhlbWUgfHwgJ2RhcmsnO1xyXG4gICAgY29uc3QgYWNjZW50ID0gc3RhdGUuc2V0dGluZ3M/LmFjY2VudENvbG9yIHx8ICdibHVlJztcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0LnRoZW1lID0gbW9kZTtcclxuXHJcbiAgICBjb25zdCBiYXNlID0gdGhlbWVQYWxldHRlc1ttb2RlXSB8fCB0aGVtZVBhbGV0dGVzLmRhcms7XHJcbiAgICBjb25zdCBhY2NlbnREZWYgPSBhY2NlbnRDb2xvcnNbYWNjZW50XSB8fCBhY2NlbnRDb2xvcnMuYmx1ZTtcclxuICAgIGNvbnN0IG1lcmdlZCA9IHsgLi4uYmFzZSwgLi4uYWNjZW50RGVmIH07XHJcblxyXG4gICAgLy8gQXBwbHkgQ1NTIHZhcmlhYmxlcyBnbG9iYWxseVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1iZycsIG1lcmdlZC5iZyk7XHJcbiAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tc3VyZmFjZScsIG1lcmdlZC5zdXJmYWNlKTtcclxuICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zdXJmYWNlLWFsdCcsIG1lcmdlZC5zdXJmYWNlQWx0KTtcclxuICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10ZXh0JywgbWVyZ2VkLnRleHQpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnknLCBtZXJnZWQucHJpbWFyeSk7XHJcbiAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tcHJpbWFyeS01MCcsIG1lcmdlZFs1MF0gfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktMTAwJywgbWVyZ2VkWzEwMF0gfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktMjAwJywgbWVyZ2VkWzIwMF0gfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktMzAwJywgbWVyZ2VkWzMwMF0gfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktNDAwJywgbWVyZ2VkWzQwMF0gfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktNjAwJywgbWVyZ2VkWzYwMF0gfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktNzAwJywgbWVyZ2VkWzcwMF0gfHwgbWVyZ2VkLnByaW1hcnlTdHJvbmcgfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktODAwJywgbWVyZ2VkWzgwMF0gfHwgbWVyZ2VkLnByaW1hcnlTdHJvbmcgfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktOTAwJywgbWVyZ2VkWzkwMF0gfHwgbWVyZ2VkLnByaW1hcnlTdHJvbmcgfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktc3Ryb25nJywgbWVyZ2VkLnByaW1hcnlTdHJvbmcgfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWFjY2VudCcsIG1lcmdlZC5hY2NlbnQgfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWFjY2VudC1saWdodCcsIG1lcmdlZC5hY2NlbnRMaWdodCB8fCBtZXJnZWQuYWNjZW50IHx8IG1lcmdlZC5wcmltYXJ5KTtcclxuICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1hY2NlbnQtaG92ZXInLCBtZXJnZWQuaG92ZXIgfHwgbWVyZ2VkLnByaW1hcnkpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLW9uLXByaW1hcnknLCBtZXJnZWQub25QcmltYXJ5IHx8IChtb2RlID09PSAnZGFyaycgPyAnI0ZGRkZGRicgOiAnIzBBMEEwQScpKTtcclxuICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tdXRlZCcsIG1lcmdlZC5tdXRlZCB8fCBiYXNlLm11dGVkIHx8ICcjN2I4Nzk0Jyk7XHJcbiAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tYm9yZGVyJywgbWVyZ2VkLmJvcmRlciB8fCBiYXNlLmJvcmRlciB8fCAncmdiYSgwLDAsMCwwLjA4KScpO1xyXG4gICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWdsb3cnLCBtZXJnZWQuZ2xvdyB8fCBiYXNlLmdsb3cgfHwgJ3RyYW5zcGFyZW50Jyk7XHJcbiAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tc2hhZG93LWNvbG9yJywgbWVyZ2VkLnNoYWRvdyB8fCAnMCAxMHB4IDMwcHggcmdiYSgwLDAsMCwwLjA4KScpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBpZ25vcmUgaW4gbm9uLURPTSBlbnZpcm9ubWVudHNcclxuICAgIH1cclxuXHJcbiAgICBwZXJzaXN0U3RhdGUoc3RhdGUpO1xyXG4gIH0sIFtzdGF0ZV0pO1xyXG5cclxuICBjb25zdCBhY3Rpb25zID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZXRUaGVtZSh0aGVtZSkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiAoeyAuLi5jdXJyZW50LCB0aGVtZSwgc2V0dGluZ3M6IHsgLi4uY3VycmVudC5zZXR0aW5ncywgdGhlbWVNb2RlOiB0aGVtZSB9IH0pKTtcclxuICAgICAgfSxcclxuICAgICAgdG9nZ2xlVGhlbWUoKSB7XHJcbiAgICAgICAgc2V0U3RhdGUoKGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHQgPSBjdXJyZW50LnRoZW1lID09PSAnZGFyaycgPyAnbGlnaHQnIDogJ2RhcmsnO1xyXG4gICAgICAgICAgcmV0dXJuIHsgLi4uY3VycmVudCwgdGhlbWU6IG5leHQsIHNldHRpbmdzOiB7IC4uLmN1cnJlbnQuc2V0dGluZ3MsIHRoZW1lTW9kZTogbmV4dCB9IH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldE1vZGUobW9kZSkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiAoeyAuLi5jdXJyZW50LCBzZXR0aW5nczogeyAuLi5jdXJyZW50LnNldHRpbmdzLCB0aGVtZU1vZGU6IG1vZGUgfSB9KSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldEFjY2VudChhY2NlbnQpIHtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4gKHsgLi4uY3VycmVudCwgc2V0dGluZ3M6IHsgLi4uY3VycmVudC5zZXR0aW5ncywgYWNjZW50Q29sb3I6IGFjY2VudCB9IH0pKTtcclxuICAgICAgfSxcclxuICAgICAgc2V0Q29udGVudFN0YXR1cyhjb250ZW50SWQsIHN0YXR1cykge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0dXMgPSBub3JtYWxpemVDb250ZW50U3RhdHVzKHN0YXR1cyk7XHJcbiAgICAgICAgc2V0U3RhdGUoKGN1cnJlbnQpID0+ICh7XHJcbiAgICAgICAgICAuLi5jdXJyZW50LFxyXG4gICAgICAgICAgY29udGVudFN0YXR1c2VzOiB7XHJcbiAgICAgICAgICAgIC4uLmN1cnJlbnQuY29udGVudFN0YXR1c2VzLFxyXG4gICAgICAgICAgICBbY29udGVudElkXTogbmV4dFN0YXR1c1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJldmlld1NjaGVkdWxlOiBuZXh0U3RhdHVzID09PSAncGVyZGlkbydcclxuICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICAuLi5jdXJyZW50LnJldmlld1NjaGVkdWxlLFxyXG4gICAgICAgICAgICAgICAgW2NvbnRlbnRJZF06IGdldE5leHRTdHVkeURhdGUoY3VycmVudC5zZXR0aW5ncylcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDogT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKGN1cnJlbnQucmV2aWV3U2NoZWR1bGUgfHwge30pLmZpbHRlcigoW2tleV0pID0+IGtleSAhPT0gY29udGVudElkKSksXHJcbiAgICAgICAgICByZXZpZXdRdWV1ZTogbmV4dFN0YXR1cyA9PT0gJ3BlcmRpZG8nXHJcbiAgICAgICAgICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi4oY3VycmVudC5yZXZpZXdRdWV1ZSB8fCBbXSksIGNvbnRlbnRJZF0pKVxyXG4gICAgICAgICAgICA6IChjdXJyZW50LnJldmlld1F1ZXVlIHx8IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGNvbnRlbnRJZClcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc2NoZWR1bGVMb3N0Q29udGVudChjb250ZW50SWQpIHtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4gKHtcclxuICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICByZXZpZXdTY2hlZHVsZToge1xyXG4gICAgICAgICAgICAuLi5jdXJyZW50LnJldmlld1NjaGVkdWxlLFxyXG4gICAgICAgICAgICBbY29udGVudElkXTogZ2V0TmV4dFN0dWR5RGF0ZShcclxuICAgICAgICAgICAgICBjdXJyZW50LnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnQucmV2aWV3U2NoZWR1bGU/Lltjb250ZW50SWRdID8gbmV3IERhdGUoYCR7Y3VycmVudC5yZXZpZXdTY2hlZHVsZVtjb250ZW50SWRdfVQwMDowMDowMGApIDogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmV2aWV3UXVldWU6IEFycmF5LmZyb20obmV3IFNldChbLi4uKGN1cnJlbnQucmV2aWV3UXVldWUgfHwgW10pLCBjb250ZW50SWRdKSlcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRvZ2dsZUZvY3VzTW9kZSgpIHtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4gKHtcclxuICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICBmb2N1c01vZGU6ICFjdXJyZW50LmZvY3VzTW9kZVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSxcclxuICAgICAgY3ljbGVDb250ZW50U3RhdHVzKGNvbnRlbnRJZCkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdHVzID0gbm9ybWFsaXplQ29udGVudFN0YXR1cyhjdXJyZW50LmNvbnRlbnRTdGF0dXNlc1tjb250ZW50SWRdKTtcclxuICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IChnZXRTdGF0dXNPcmRlcigpLmluZGV4T2YoY3VycmVudFN0YXR1cykgKyAxKSAlIGdldFN0YXR1c09yZGVyKCkubGVuZ3RoO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uY3VycmVudCxcclxuICAgICAgICAgICAgY29udGVudFN0YXR1c2VzOiB7XHJcbiAgICAgICAgICAgICAgLi4uY3VycmVudC5jb250ZW50U3RhdHVzZXMsXHJcbiAgICAgICAgICAgICAgW2NvbnRlbnRJZF06IGdldFN0YXR1c09yZGVyKClbbmV4dEluZGV4XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZpZXdTY2hlZHVsZTogZ2V0U3RhdHVzT3JkZXIoKVtuZXh0SW5kZXhdID09PSAncGVyZGlkbydcclxuICAgICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgICAgLi4uY3VycmVudC5yZXZpZXdTY2hlZHVsZSxcclxuICAgICAgICAgICAgICAgICAgW2NvbnRlbnRJZF06IGdldE5leHRTdHVkeURhdGUoY3VycmVudC5zZXR0aW5ncylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA6IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhjdXJyZW50LnJldmlld1NjaGVkdWxlIHx8IHt9KS5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IGNvbnRlbnRJZCkpLFxyXG4gICAgICAgICAgICByZXZpZXdRdWV1ZTogZ2V0U3RhdHVzT3JkZXIoKVtuZXh0SW5kZXhdID09PSAncGVyZGlkbydcclxuICAgICAgICAgICAgICA/IEFycmF5LmZyb20obmV3IFNldChbLi4uKGN1cnJlbnQucmV2aWV3UXVldWUgfHwgW10pLCBjb250ZW50SWRdKSlcclxuICAgICAgICAgICAgICA6IChjdXJyZW50LnJldmlld1F1ZXVlIHx8IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGNvbnRlbnRJZClcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgICBzYXZlRXNzYXkoZHJhZnQpIHtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4gKHtcclxuICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICBlc3NheXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBgZXNzYXktJHtEYXRlLm5vdygpfWAsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgLi4uZHJhZnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLi4uY3VycmVudC5lc3NheXNcclxuICAgICAgICAgIF1cclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZUVzc2F5RHJhZnQoZXNzYXlEcmFmdCkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiAoeyAuLi5jdXJyZW50LCBlc3NheURyYWZ0IH0pKTtcclxuICAgICAgfSxcclxuICAgICAgc2F2ZUV4ZXJjaXNlQXR0ZW1wdChlbnRyeSkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiAoe1xyXG4gICAgICAgICAgLi4uY3VycmVudCxcclxuICAgICAgICAgIGV4ZXJjaXNlSGlzdG9yeTogW1xyXG4gICAgICAgICAgICB7IGlkOiBgZXhlcmNpc2UtJHtEYXRlLm5vdygpfWAsIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCAuLi5lbnRyeSB9LFxyXG4gICAgICAgICAgICAuLi5jdXJyZW50LmV4ZXJjaXNlSGlzdG9yeVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSxcclxuICAgICAgc2F2ZVNpbXVsYWRvQXR0ZW1wdChlbnRyeSkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiAoe1xyXG4gICAgICAgICAgLi4uY3VycmVudCxcclxuICAgICAgICAgIHNpbXVsYWRvSGlzdG9yeTogW1xyXG4gICAgICAgICAgICB7IGlkOiBgc2ltdWxhZG8tJHtEYXRlLm5vdygpfWAsIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCAuLi5lbnRyeSB9LFxyXG4gICAgICAgICAgICAuLi5jdXJyZW50LnNpbXVsYWRvSGlzdG9yeVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSxcclxuICAgICAgc2F2ZUZvY3VzU2Vzc2lvbihlbnRyeSkge1xyXG4gICAgICAgIHNldFN0YXRlKChjdXJyZW50KSA9PiAoe1xyXG4gICAgICAgICAgLi4uY3VycmVudCxcclxuICAgICAgICAgIGZvY3VzSGlzdG9yeTogW1xyXG4gICAgICAgICAgICB7IGlkOiBgZm9jdXMtJHtEYXRlLm5vdygpfWAsIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCAuLi5lbnRyeSB9LFxyXG4gICAgICAgICAgICAuLi5jdXJyZW50LmZvY3VzSGlzdG9yeVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSxcclxuICAgICAgdG9nZ2xlVmlkZW9XYXRjaGVkKHZpZGVvSWQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvSWQpIHJldHVybjtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4gKHtcclxuICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICB3YXRjaGVkVmlkZW9zOiB7XHJcbiAgICAgICAgICAgIC4uLihjdXJyZW50LndhdGNoZWRWaWRlb3MgfHwge30pLFxyXG4gICAgICAgICAgICBbdmlkZW9JZF06ICFjdXJyZW50LndhdGNoZWRWaWRlb3M/Llt2aWRlb0lkXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpIHtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWVyZ2VkID0geyAuLi5jdXJyZW50LnNldHRpbmdzLCAuLi5zZXR0aW5ncyB9O1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZWQgPSBtZXJnZWQuc3R1ZHlTdGFydERhdGU7XHJcbiAgICAgICAgICAgIGlmICghcHJvdmlkZWQpIHtcclxuICAgICAgICAgICAgICBtZXJnZWQuc3R1ZHlTdGFydERhdGUgPSB0b0lTT0RhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gbm9ybWFsaXplIHRvIElTTyAocHJlc2VydmUgZnV0dXJlIGRhdGVzKVxyXG4gICAgICAgICAgICAgIG1lcmdlZC5zdHVkeVN0YXJ0RGF0ZSA9IHRvSVNPRGF0ZShmcm9tSVNPRGF0ZShwcm92aWRlZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgbWVyZ2VkLnN0dWR5U3RhcnREYXRlID0gdG9JU09EYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gUmVjYWxjdWxhdGUgc2NoZWR1bGUgYW5kIHBlcnNpc3QgZ2VuZXJhdGVkIHNjaGVkdWxlXHJcbiAgICAgICAgICBjb25zdCBzY2hlZHVsZURhdGEgPSBidWlsZEFkYXB0aXZlU2NoZWR1bGUobWVyZ2VkKTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBtZXJnZWQsXHJcbiAgICAgICAgICAgIGdlbmVyYXRlZFNjaGVkdWxlOiBzY2hlZHVsZURhdGFcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdlbmVyYXRlU2NoZWR1bGUoc2V0dGluZ3MpIHtcclxuICAgICAgICBzZXRTdGF0ZSgoY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWVyZ2VkID0geyAuLi5jdXJyZW50LnNldHRpbmdzLCAuLi5zZXR0aW5ncyB9O1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZWQgPSBtZXJnZWQuc3R1ZHlTdGFydERhdGU7XHJcbiAgICAgICAgICAgIGlmICghcHJvdmlkZWQpIHtcclxuICAgICAgICAgICAgICBtZXJnZWQuc3R1ZHlTdGFydERhdGUgPSB0b0lTT0RhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWVyZ2VkLnN0dWR5U3RhcnREYXRlID0gdG9JU09EYXRlKGZyb21JU09EYXRlKHByb3ZpZGVkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICBtZXJnZWQuc3R1ZHlTdGFydERhdGUgPSB0b0lTT0RhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBzY2hlZHVsZURhdGEgPSBidWlsZEFkYXB0aXZlU2NoZWR1bGUobWVyZ2VkKTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBtZXJnZWQsXHJcbiAgICAgICAgICAgIGdlbmVyYXRlZFNjaGVkdWxlOiBzY2hlZHVsZURhdGFcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc2V0QWxsKCkge1xyXG4gICAgICAgIHNldFN0YXRlKGNyZWF0ZURlZmF1bHRTdGF0ZSgpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGRlcml2ZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGFkYXB0aXZlU2NoZWR1bGUgPSBzdGF0ZS5nZW5lcmF0ZWRTY2hlZHVsZSB8fCBidWlsZEFkYXB0aXZlU2NoZWR1bGUoc3RhdGUuc2V0dGluZ3MpO1xyXG4gICAgY29uc3QgdGltaW5nID0gZ2V0U3R1ZHlTdGFydFRpbWluZyhzdGF0ZS5zZXR0aW5ncyk7XHJcblxyXG4gICAgLy8gSWYgc3R1ZHkgc3RhcnQgaXMgaW4gdGhlIGZ1dHVyZSB3ZSBzdGlsbCBkZXJpdmUgdGhlIGRhc2hib2FyZCBub3JtYWxseVxyXG4gICAgLy8gYnV0IG1hcmsgdGhlIGRhc2hib2FyZCB3aXRoIGBpc0JlZm9yZVN0dWR5U3RhcnRgIGFuZCBleHBvc2Ugc3RhcnQgbWV0YWRhdGEuXHJcblxyXG4gICAgY29uc3QgZGFzaGJvYXJkID0gYnVpbGREYXNoYm9hcmQoc3RhdGUsIGFkYXB0aXZlU2NoZWR1bGUpO1xyXG4gICAgaWYgKHRpbWluZy5pc0JlZm9yZVN0YXJ0KSB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0TGFiZWwgPSBmcm9tSVNPRGF0ZSh0aW1pbmcuc3RhcnRJU08pLnRvTG9jYWxlRGF0ZVN0cmluZygncHQtQlInLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJzItZGlnaXQnIH0pO1xyXG4gICAgICBkYXNoYm9hcmQuaXNCZWZvcmVTdHVkeVN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgZGFzaGJvYXJkLnN0dWR5U3RhcnRJU08gPSB0aW1pbmcuc3RhcnRJU087XHJcbiAgICAgIGRhc2hib2FyZC5zdHVkeVN0YXJ0TGFiZWwgPSBzdGFydExhYmVsO1xyXG4gICAgICBkYXNoYm9hcmQuZGF5c1VudGlsU3R1ZHlTdGFydCA9IHRpbWluZy5kYXlzVW50aWxTdGFydDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkYXNoYm9hcmQsXHJcbiAgICAgIGN1cnJlbnRXZWVrOiBnZXRDdXJyZW50V2VlayhhZGFwdGl2ZVNjaGVkdWxlKSxcclxuICAgICAgY3VycmVudERheTogZ2V0Q3VycmVudERheShhZGFwdGl2ZVNjaGVkdWxlKSxcclxuICAgICAgc3ViamVjdFN0YXRzOiBidWlsZFN1YmplY3RTdGF0cyhzdGF0ZSwgYWRhcHRpdmVTY2hlZHVsZSksXHJcbiAgICAgIGhlYXRtYXA6IGJ1aWxkSGVhdG1hcChzdGF0ZSwgYWRhcHRpdmVTY2hlZHVsZSksXHJcbiAgICAgIGNvbnRlbnRJdGVtczogZ2V0Q29udGVudEl0ZW1zKGFkYXB0aXZlU2NoZWR1bGUpLFxyXG4gICAgICBjb250ZW50QnlTdWJqZWN0OiB7XHJcbiAgICAgICAgbWF0aDogZ2V0Q29udGVudEJ5U3ViamVjdChhZGFwdGl2ZVNjaGVkdWxlLCAnbWF0aCcpLFxyXG4gICAgICAgIGxhbmd1YWdlOiBnZXRDb250ZW50QnlTdWJqZWN0KGFkYXB0aXZlU2NoZWR1bGUsICdsYW5ndWFnZScpLFxyXG4gICAgICAgIGh1bWFuYXM6IGdldENvbnRlbnRCeVN1YmplY3QoYWRhcHRpdmVTY2hlZHVsZSwgJ2h1bWFuYXMnKSxcclxuICAgICAgICBuYXR1cmU6IGdldENvbnRlbnRCeVN1YmplY3QoYWRhcHRpdmVTY2hlZHVsZSwgJ25hdHVyZScpLFxyXG4gICAgICAgIGVzc2F5OiBnZXRDb250ZW50QnlTdWJqZWN0KGFkYXB0aXZlU2NoZWR1bGUsICdlc3NheScpXHJcbiAgICAgIH0sXHJcbiAgICAgIHZpZGVvQ2hhbm5lbHMsXHJcbiAgICAgIGJhc2VRdWVzdGlvbnMsXHJcbiAgICAgIGVzc2F5VG9waWNzLFxyXG4gICAgICByZXBlcnRvaXJlcyxcclxuICAgICAgY29ubmVjdG9ycyxcclxuICAgICAgLy8gZGVyaXZlIHRoZW1lIHBhbGV0dGUgY29tYmluaW5nIG1vZGUgYW5kIGFjY2VudFxyXG4gICAgICB0aGVtZVBhbGV0dGU6ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW9kZSA9IHN0YXRlLnNldHRpbmdzPy50aGVtZU1vZGUgfHwgc3RhdGUudGhlbWUgfHwgJ2RhcmsnO1xyXG4gICAgICAgIGNvbnN0IGFjY2VudCA9IHN0YXRlLnNldHRpbmdzPy5hY2NlbnRDb2xvciB8fCAnYmx1ZSc7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IHRoZW1lUGFsZXR0ZXNbbW9kZV0gfHwgdGhlbWVQYWxldHRlcy5kYXJrO1xyXG4gICAgICAgIGNvbnN0IGFjY2VudERlZiA9IGFjY2VudENvbG9yc1thY2NlbnRdIHx8IGFjY2VudENvbG9ycy5ibHVlO1xyXG4gICAgICAgIHJldHVybiB7IC4uLmJhc2UsIC4uLmFjY2VudERlZiB9O1xyXG4gICAgICB9KSgpLFxyXG4gICAgICB0aGVtZVBhbGV0dGVzLFxyXG4gICAgICBhY2NlbnRDb2xvcnMsXHJcbiAgICAgIHN1YmplY3RNZXRhLFxyXG4gICAgICBzY2hlZHVsZTogYWRhcHRpdmVTY2hlZHVsZSxcclxuICAgICAgc2NoZWR1bGVTdGFydCxcclxuICAgICAgZW5lbURhdGVcclxuICAgIH07XHJcbiAgfSwgW3N0YXRlXSk7XHJcblxyXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7IHN0YXRlLCBhY3Rpb25zLCAuLi5kZXJpdmVkIH0pLFxyXG4gICAgW3N0YXRlLCBhY3Rpb25zLCBkZXJpdmVkXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiA8UGxhbm5lckNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9QbGFubmVyQ29udGV4dC5Qcm92aWRlcj47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VQbGFubmVyKCkge1xyXG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KFBsYW5uZXJDb250ZXh0KTtcclxuICBpZiAoIWNvbnRleHQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigndXNlUGxhbm5lciBtdXN0IGJlIHVzZWQgd2l0aGluIFBsYW5uZXJQcm92aWRlcicpO1xyXG4gIH1cclxuICByZXR1cm4gY29udGV4dDtcclxufSJdLCJmaWxlIjoiQzovVXNlcnMvZ2l1bGkvT25lRHJpdmUvw4FyZWEgZGUgVHJhYmFsaG8vRU5FTS9zcmMvY29udGV4dC9QbGFubmVyQ29udGV4dC5qc3gifQ==
