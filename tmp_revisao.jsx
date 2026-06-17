import { createHotContext as __vite__createHotContext } from "/ENEM/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/RevisaoPage.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/ENEM/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=750bfeb7"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/ENEM/node_modules/.vite/deps/react.js?v=750bfeb7"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useMemo = __vite__cjsImport3_react["useMemo"];
import { Link } from "/ENEM/node_modules/.vite/deps/react-router-dom.js?v=750bfeb7";
import { usePlanner } from "/ENEM/src/context/PlannerContext.jsx?t=1781653269003";
import { EmptyState, GlassCard, SectionHeader, StatTile } from "/ENEM/src/components/Ui.jsx";
import { subjectMeta } from "/ENEM/src/data/planner.js";
const subjectLabels = {
  math: "MatemÃ¡tica",
  language: "Linguagens",
  humanas: "Humanas",
  nature: "Natureza",
  essay: "RedaÃ§Ã£o"
};
function formatPercent(value) {
  return `${Math.max(0, Math.min(100, Math.round(value || 0)))}%`;
}
function SubjectSummary({ label, count, total }) {
  const progress = total > 0 ? count / total * 100 : 0;
  return /* @__PURE__ */ jsxDEV("div", { className: "rounded-[20px] border border-[var(--border)] bg-white/5 p-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]", children: label }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("strong", { className: "text-base font-black text-[var(--text)]", children: count }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-3", children: /* @__PURE__ */ jsxDEV(ProgressBar, { value: progress }, void 0, false, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 49,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}
_c = SubjectSummary;
export default function RevisaoPage() {
  _s();
  const { dashboard } = usePlanner();
  const contents = dashboard.revisionContents || [];
  const totalContents = dashboard.revisionTotalContents || 0;
  const totalResources = dashboard.revisionResourcesTotal || 0;
  const studyDays = dashboard.studyDays || [];
  const subjectEntries = useMemo(() => {
    const map = {};
    contents.forEach((c) => {
      map[c.subject] = (map[c.subject] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [contents]);
  const groupedBySubject = useMemo(() => {
    const order = studyDays.map((d) => d.contentId);
    const groups = {};
    contents.forEach((c) => {
      groups[c.subject] = groups[c.subject] || [];
      groups[c.subject].push(c);
    });
    Object.keys(groups).forEach((subject) => {
      groups[subject].sort((a, b) => {
        const ia = order.indexOf(a.id);
        const ib = order.indexOf(b.id);
        return ia - ib;
      });
    });
    return groups;
  }, [contents, studyDays]);
  if (!dashboard.todayReviewDay) {
    return /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 pb-6", children: /* @__PURE__ */ jsxDEV(GlassCard, { className: "p-5", children: /* @__PURE__ */ jsxDEV(SectionHeader, { eyebrow: "RevisÃ£o", title: "Hoje nÃ£o Ã© um dia de revisÃ£o", subtitle: `PrÃ³xima revisÃ£o: ${dashboard.nextReview?.label || "â"}` }, void 0, false, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 92,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 91,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 90,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 pb-6", children: [
    /* @__PURE__ */ jsxDEV(GlassCard, { className: "overflow-hidden p-4 sm:p-5", children: /* @__PURE__ */ jsxDEV("div", { className: "grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center", children: [
      /* @__PURE__ */ jsxDEV(
        SectionHeader,
        {
          eyebrow: "RevisÃ£o",
          title: "Atividades e recursos para praticar",
          subtitle: "Central de exercÃ­cios e videoaulas baseada nos conteÃºdos que vocÃª estudou esta semana."
        },
        void 0,
        false,
        {
          fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
          lineNumber: 102,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]", children: "ConteÃºdos estudados" }, void 0, false, {
            fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
            lineNumber: 111,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("strong", { className: "mt-1 block text-4xl font-black tracking-tight text-[var(--text)]", children: totalContents }, void 0, false, {
            fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
            lineNumber: 112,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-sm text-[var(--muted)]", children: [
            "Recursos encontrados: ",
            totalResources
          ] }, void 0, true, {
            fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
            lineNumber: 113,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
          lineNumber: 110,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(Link, { to: "/revisao/estudar", className: `mt-1 app-button-primary`, children: "Abrir atividades" }, void 0, false, {
          fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
          lineNumber: 116,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 109,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 101,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "grid gap-4 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxDEV(StatTile, { label: "ConteÃºdos", value: totalContents, caption: "estudados nesta semana", tone: "brand" }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatTile, { label: "Recursos", value: totalResources, caption: "links encontrados", tone: "good" }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 124,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatTile, { label: "MatÃ©rias", value: subjectEntries.length, caption: "matÃ©rias cobertas", tone: "warn" }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatTile, { label: "Prioridade", value: contents.length ? contents[0].title : "â", caption: "maior prioridade", tone: "brand" }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 126,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(GlassCard, { className: "p-4 sm:p-5", children: [
      /* @__PURE__ */ jsxDEV(SectionHeader, { eyebrow: "ConteÃºdos", title: "Recursos recomendados", subtitle: "Selecione um conteÃºdo para ver atividades e links prÃ¡ticos." }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 130,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 grid gap-4", children: contents.length === 0 ? /* @__PURE__ */ jsxDEV(EmptyState, { title: "Ainda sem registros", subtitle: "Finalize conteÃºdos no cronograma para que apareÃ§am sugestÃµes aqui." }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 133,
        columnNumber: 11
      }, this) : Object.entries(groupedBySubject).map(
        ([subject, items]) => /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-[13px] font-black uppercase text-[var(--muted)] mb-2", children: subjectMeta[subject]?.label || subject }, void 0, false, {
            fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
            lineNumber: 137,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: items.map(
            (c) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-[16px] border border-[var(--border)] bg-white/5 p-4", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] font-black uppercase tracking-[0.12em] text-[var(--muted)]", children: c.subjectLabel }, void 0, false, {
                  fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
                  lineNumber: 142,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("strong", { className: "block mt-1 text-lg font-black text-[var(--text)]", children: c.title }, void 0, false, {
                  fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
                  lineNumber: 143,
                  columnNumber: 25
                }, this),
                c.usingSubjectFallback ? /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-[var(--muted)]", children: "Nenhum recurso especÃ­fico encontrado â usando recursos gerais da disciplina." }, void 0, false, {
                  fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
                  lineNumber: 145,
                  columnNumber: 19
                }, this) : null
              ] }, void 0, true, {
                fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
                lineNumber: 141,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-4 space-y-2", children: (c.resources || []).map(
                (r, idx) => /* @__PURE__ */ jsxDEV("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", className: "app-button-secondary w-full inline-block text-left", children: r.title }, idx, false, {
                  fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
                  lineNumber: 151,
                  columnNumber: 19
                }, this)
              ) }, void 0, false, {
                fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
                lineNumber: 149,
                columnNumber: 23
              }, this)
            ] }, c.id, true, {
              fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
              lineNumber: 140,
              columnNumber: 15
            }, this)
          ) }, void 0, false, {
            fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
            lineNumber: 138,
            columnNumber: 17
          }, this)
        ] }, subject, true, {
          fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
          lineNumber: 136,
          columnNumber: 11
        }, this)
      ) }, void 0, false, {
        fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
      lineNumber: 129,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx",
    lineNumber: 99,
    columnNumber: 5
  }, this);
}
_s(RevisaoPage, "o3LoMQu5mRHWBVhfYk8TIArhDM8=", false, function() {
  return [usePlanner];
});
_c2 = RevisaoPage;
var _c, _c2;
$RefreshReg$(_c, "SubjectSummary");
$RefreshReg$(_c2, "RevisaoPage");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/pages/RevisaoPage.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFBO0FBQUE7QUFBQSxhQTZCQTtBQUFBLFNBL0JGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FnQ0E7QUFBQSxPQTlERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBK0RBO0FBRUo7QUFBQ2IsR0E3R3VCRCxhQUFXO0FBQUEsVUFDWHhCLFVBQVU7QUFBQTtBQUFBLE1BRFZ3QjtBQUFXLElBQUFELElBQUEyQztBQUFBLGFBQUEzQyxJQUFBO0FBQUEsYUFBQTJDLEtBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZU1lbW8iLCJMaW5rIiwidXNlUGxhbm5lciIsIkVtcHR5U3RhdGUiLCJHbGFzc0NhcmQiLCJTZWN0aW9uSGVhZGVyIiwiU3RhdFRpbGUiLCJzdWJqZWN0TWV0YSIsInN1YmplY3RMYWJlbHMiLCJtYXRoIiwibGFuZ3VhZ2UiLCJodW1hbmFzIiwibmF0dXJlIiwiZXNzYXkiLCJmb3JtYXRQZXJjZW50IiwidmFsdWUiLCJNYXRoIiwibWF4IiwibWluIiwicm91bmQiLCJTdWJqZWN0U3VtbWFyeSIsImxhYmVsIiwiY291bnQiLCJ0b3RhbCIsInByb2dyZXNzIiwiX2MiLCJSZXZpc2FvUGFnZSIsIl9zIiwiZGFzaGJvYXJkIiwiY29udGVudHMiLCJyZXZpc2lvbkNvbnRlbnRzIiwidG90YWxDb250ZW50cyIsInJldmlzaW9uVG90YWxDb250ZW50cyIsInRvdGFsUmVzb3VyY2VzIiwicmV2aXNpb25SZXNvdXJjZXNUb3RhbCIsInN0dWR5RGF5cyIsInN1YmplY3RFbnRyaWVzIiwibWFwIiwiZm9yRWFjaCIsImMiLCJzdWJqZWN0IiwiT2JqZWN0IiwiZW50cmllcyIsInNvcnQiLCJhIiwiYiIsImdyb3VwZWRCeVN1YmplY3QiLCJvcmRlciIsImQiLCJjb250ZW50SWQiLCJncm91cHMiLCJwdXNoIiwia2V5cyIsImlhIiwiaW5kZXhPZiIsImlkIiwiaWIiLCJ0b2RheVJldmlld0RheSIsIm5leHRSZXZpZXciLCJsZW5ndGgiLCJ0aXRsZSIsIml0ZW1zIiwic3ViamVjdExhYmVsIiwidXNpbmdTdWJqZWN0RmFsbGJhY2siLCJyZXNvdXJjZXMiLCJyIiwiaWR4IiwidXJsIiwiX2MyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlJldmlzYW9QYWdlLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgdXNlUGxhbm5lciB9IGZyb20gJy4uL2NvbnRleHQvUGxhbm5lckNvbnRleHQnO1xyXG5pbXBvcnQgeyBFbXB0eVN0YXRlLCBHbGFzc0NhcmQsIFNlY3Rpb25IZWFkZXIsIFN0YXRUaWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9VaSc7XHJcbmltcG9ydCB7IHN1YmplY3RNZXRhIH0gZnJvbSAnLi4vZGF0YS9wbGFubmVyJztcclxuXHJcbmNvbnN0IHN1YmplY3RMYWJlbHMgPSB7XHJcbiAgbWF0aDogJ01hdGVtw6F0aWNhJyxcclxuICBsYW5ndWFnZTogJ0xpbmd1YWdlbnMnLFxyXG4gIGh1bWFuYXM6ICdIdW1hbmFzJyxcclxuICBuYXR1cmU6ICdOYXR1cmV6YScsXHJcbiAgZXNzYXk6ICdSZWRhw6fDo28nXHJcbn07XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRQZXJjZW50KHZhbHVlKSB7XHJcbiAgcmV0dXJuIGAke01hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgTWF0aC5yb3VuZCh2YWx1ZSB8fCAwKSkpfSVgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTdWJqZWN0U3VtbWFyeSh7IGxhYmVsLCBjb3VudCwgdG90YWwgfSkge1xyXG4gIGNvbnN0IHByb2dyZXNzID0gdG90YWwgPiAwID8gKGNvdW50IC8gdG90YWwpICogMTAwIDogMDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC1bMjBweF0gYm9yZGVyIGJvcmRlci1bdmFyKC0tYm9yZGVyKV0gYmctd2hpdGUvNSBwLTRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yNGVtXSB0ZXh0LVt2YXIoLS1tdXRlZCldXCI+e2xhYmVsfTwvcD5cclxuICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtW3ZhcigtLXRleHQpXVwiPntjb3VudH08L3N0cm9uZz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtM1wiPlxyXG4gICAgICAgIDxQcm9ncmVzc0JhciB2YWx1ZT17cHJvZ3Jlc3N9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmV2aXNhb1BhZ2UoKSB7XHJcbiAgY29uc3QgeyBkYXNoYm9hcmQgfSA9IHVzZVBsYW5uZXIoKTtcclxuICBjb25zdCBjb250ZW50cyA9IGRhc2hib2FyZC5yZXZpc2lvbkNvbnRlbnRzIHx8IFtdO1xyXG4gIGNvbnN0IHRvdGFsQ29udGVudHMgPSBkYXNoYm9hcmQucmV2aXNpb25Ub3RhbENvbnRlbnRzIHx8IDA7XHJcbiAgY29uc3QgdG90YWxSZXNvdXJjZXMgPSBkYXNoYm9hcmQucmV2aXNpb25SZXNvdXJjZXNUb3RhbCB8fCAwO1xyXG4gIGNvbnN0IHN0dWR5RGF5cyA9IGRhc2hib2FyZC5zdHVkeURheXMgfHwgW107XHJcblxyXG4gIGNvbnN0IHN1YmplY3RFbnRyaWVzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSB7fTtcclxuICAgIGNvbnRlbnRzLmZvckVhY2goKGMpID0+IHtcclxuICAgICAgbWFwW2Muc3ViamVjdF0gPSAobWFwW2Muc3ViamVjdF0gfHwgMCkgKyAxO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobWFwKS5zb3J0KChhLCBiKSA9PiBiWzFdIC0gYVsxXSk7XHJcbiAgfSwgW2NvbnRlbnRzXSk7XHJcblxyXG4gIGNvbnN0IGdyb3VwZWRCeVN1YmplY3QgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG9yZGVyID0gc3R1ZHlEYXlzLm1hcCgoZCkgPT4gZC5jb250ZW50SWQpO1xyXG4gICAgY29uc3QgZ3JvdXBzID0ge307XHJcbiAgICBjb250ZW50cy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgIGdyb3Vwc1tjLnN1YmplY3RdID0gZ3JvdXBzW2Muc3ViamVjdF0gfHwgW107XHJcbiAgICAgIGdyb3Vwc1tjLnN1YmplY3RdLnB1c2goYyk7XHJcbiAgICB9KTtcclxuICAgIC8vIHNvcnQgZWFjaCBncm91cCdzIGNvbnRlbnRzIGJ5IG9yZGVyIG9mIHN0dWR5RGF5cyAob2xkZXN0IGZpcnN0KVxyXG4gICAgT2JqZWN0LmtleXMoZ3JvdXBzKS5mb3JFYWNoKChzdWJqZWN0KSA9PiB7XHJcbiAgICAgIGdyb3Vwc1tzdWJqZWN0XS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWEgPSBvcmRlci5pbmRleE9mKGEuaWQpO1xyXG4gICAgICAgIGNvbnN0IGliID0gb3JkZXIuaW5kZXhPZihiLmlkKTtcclxuICAgICAgICByZXR1cm4gaWEgLSBpYjtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBncm91cHM7XHJcbiAgfSwgW2NvbnRlbnRzLCBzdHVkeURheXNdKTtcclxuXHJcbiAgaWYgKCFkYXNoYm9hcmQudG9kYXlSZXZpZXdEYXkpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtNCBwYi02XCI+XHJcbiAgICAgICAgPEdsYXNzQ2FyZCBjbGFzc05hbWU9XCJwLTVcIj5cclxuICAgICAgICAgIDxTZWN0aW9uSGVhZGVyIGV5ZWJyb3c9XCJSZXZpc8Ojb1wiIHRpdGxlPVwiSG9qZSBuw6NvIMOpIHVtIGRpYSBkZSByZXZpc8Ojb1wiIHN1YnRpdGxlPXtgUHLDs3hpbWEgcmV2aXPDo286ICR7ZGFzaGJvYXJkLm5leHRSZXZpZXc/LmxhYmVsIHx8ICfigJQnfWB9IC8+XHJcbiAgICAgICAgPC9HbGFzc0NhcmQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ2FwLTQgcGItNlwiPlxyXG4gICAgICA8R2xhc3NDYXJkIGNsYXNzTmFtZT1cIm92ZXJmbG93LWhpZGRlbiBwLTQgc206cC01XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdhcC01IGxnOmdyaWQtY29scy1bMS4xZnJfMC45ZnJdIGxnOml0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgPFNlY3Rpb25IZWFkZXJcclxuICAgICAgICAgICAgZXllYnJvdz1cIlJldmlzw6NvXCJcclxuICAgICAgICAgICAgdGl0bGU9XCJBdGl2aWRhZGVzIGUgcmVjdXJzb3MgcGFyYSBwcmF0aWNhclwiXHJcbiAgICAgICAgICAgIHN1YnRpdGxlPVwiQ2VudHJhbCBkZSBleGVyY8OtY2lvcyBlIHZpZGVvYXVsYXMgYmFzZWFkYSBub3MgY29udGXDumRvcyBxdWUgdm9jw6ogZXN0dWRvdSBlc3RhIHNlbWFuYS5cIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtWzI4cHhdIGJvcmRlciBib3JkZXItW3ZhcigtLWJvcmRlcildIGJnLVtyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpXSBwLTRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMjRlbV0gdGV4dC1bdmFyKC0tbXV0ZWQpXVwiPkNvbnRlw7pkb3MgZXN0dWRhZG9zPC9wPlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJtdC0xIGJsb2NrIHRleHQtNHhsIGZvbnQtYmxhY2sgdHJhY2tpbmctdGlnaHQgdGV4dC1bdmFyKC0tdGV4dCldXCI+e3RvdGFsQ29udGVudHN9PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1bdmFyKC0tbXV0ZWQpXVwiPlJlY3Vyc29zIGVuY29udHJhZG9zOiB7dG90YWxSZXNvdXJjZXN9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9yZXZpc2FvL2VzdHVkYXJcIiBjbGFzc05hbWU9e2BtdC0xIGFwcC1idXR0b24tcHJpbWFyeWB9PkFicmlyIGF0aXZpZGFkZXM8L0xpbms+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvR2xhc3NDYXJkPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZ3JpZCBnYXAtNCB4bDpncmlkLWNvbHMtNFwiPlxyXG4gICAgICAgIDxTdGF0VGlsZSBsYWJlbD1cIkNvbnRlw7pkb3NcIiB2YWx1ZT17dG90YWxDb250ZW50c30gY2FwdGlvbj1cImVzdHVkYWRvcyBuZXN0YSBzZW1hbmFcIiB0b25lPVwiYnJhbmRcIiAvPlxyXG4gICAgICAgIDxTdGF0VGlsZSBsYWJlbD1cIlJlY3Vyc29zXCIgdmFsdWU9e3RvdGFsUmVzb3VyY2VzfSBjYXB0aW9uPVwibGlua3MgZW5jb250cmFkb3NcIiB0b25lPVwiZ29vZFwiIC8+XHJcbiAgICAgICAgPFN0YXRUaWxlIGxhYmVsPVwiTWF0w6lyaWFzXCIgdmFsdWU9e3N1YmplY3RFbnRyaWVzLmxlbmd0aH0gY2FwdGlvbj1cIm1hdMOpcmlhcyBjb2JlcnRhc1wiIHRvbmU9XCJ3YXJuXCIgLz5cclxuICAgICAgICA8U3RhdFRpbGUgbGFiZWw9XCJQcmlvcmlkYWRlXCIgdmFsdWU9e2NvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzWzBdLnRpdGxlIDogJ+KAlCd9IGNhcHRpb249XCJtYWlvciBwcmlvcmlkYWRlXCIgdG9uZT1cImJyYW5kXCIgLz5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPEdsYXNzQ2FyZCBjbGFzc05hbWU9XCJwLTQgc206cC01XCI+XHJcbiAgICAgICAgPFNlY3Rpb25IZWFkZXIgZXllYnJvdz1cIkNvbnRlw7pkb3NcIiB0aXRsZT1cIlJlY3Vyc29zIHJlY29tZW5kYWRvc1wiIHN1YnRpdGxlPVwiU2VsZWNpb25lIHVtIGNvbnRlw7pkbyBwYXJhIHZlciBhdGl2aWRhZGVzIGUgbGlua3MgcHLDoXRpY29zLlwiIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ2FwLTRcIj5cclxuICAgICAgICAgIHtjb250ZW50cy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICAgIDxFbXB0eVN0YXRlIHRpdGxlPVwiQWluZGEgc2VtIHJlZ2lzdHJvc1wiIHN1YnRpdGxlPVwiRmluYWxpemUgY29udGXDumRvcyBubyBjcm9ub2dyYW1hIHBhcmEgcXVlIGFwYXJlw6dhbSBzdWdlc3TDtWVzIGFxdWkuXCIgLz5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGdyb3VwZWRCeVN1YmplY3QpLm1hcCgoW3N1YmplY3QsIGl0ZW1zXSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtzdWJqZWN0fT5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxM3B4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LVt2YXIoLS1tdXRlZCldIG1iLTJcIj57c3ViamVjdE1ldGFbc3ViamVjdF0/LmxhYmVsIHx8IHN1YmplY3R9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtMyBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtM1wiPlxyXG4gICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKChjKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2MuaWR9IGNsYXNzTmFtZT1cInJvdW5kZWQtWzE2cHhdIGJvcmRlciBib3JkZXItW3ZhcigtLWJvcmRlcildIGJnLXdoaXRlLzUgcC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy1bMC4xMmVtXSB0ZXh0LVt2YXIoLS1tdXRlZCldXCI+e2Muc3ViamVjdExhYmVsfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJibG9jayBtdC0xIHRleHQtbGcgZm9udC1ibGFjayB0ZXh0LVt2YXIoLS10ZXh0KV1cIj57Yy50aXRsZX08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2MudXNpbmdTdWJqZWN0RmFsbGJhY2sgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LXNtIHRleHQtW3ZhcigtLW11dGVkKV1cIj5OZW5odW0gcmVjdXJzbyBlc3BlY8OtZmljbyBlbmNvbnRyYWRvIOKAlCB1c2FuZG8gcmVjdXJzb3MgZ2VyYWlzIGRhIGRpc2NpcGxpbmEuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhjLnJlc291cmNlcyB8fCBbXSkubWFwKChyLCBpZHgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBrZXk9e2lkeH0gaHJlZj17ci51cmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBjbGFzc05hbWU9XCJhcHAtYnV0dG9uLXNlY29uZGFyeSB3LWZ1bGwgaW5saW5lLWJsb2NrIHRleHQtbGVmdFwiPntyLnRpdGxlfTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvR2xhc3NDYXJkPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufSJdLCJmaWxlIjoiQzovVXNlcnMvZ2l1bGkvT25lRHJpdmUvw4FyZWEgZGUgVHJhYmFsaG8vRU5FTS9zcmMvcGFnZXMvUmV2aXNhb1BhZ2UuanN4In0=
