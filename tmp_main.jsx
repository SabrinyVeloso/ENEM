import.meta.env = {"BASE_URL": "/ENEM/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false};import __vite__cjsImport0_react_jsxDevRuntime from "/ENEM/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=750bfeb7"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ENEM/node_modules/.vite/deps/react.js?v=750bfeb7"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/ENEM/node_modules/.vite/deps/react-dom_client.js?v=750bfeb7"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import { HashRouter } from "/ENEM/node_modules/.vite/deps/react-router-dom.js?v=750bfeb7";
import App from "/ENEM/src/App.jsx";
import { PlannerProvider } from "/ENEM/src/context/PlannerContext.jsx";
import "/ENEM/src/styles/index.css";
import ErrorBoundary from "/ENEM/src/components/ErrorBoundary.jsx";
if (import.meta.env.PROD) {
  const manifestLink = document.createElement("link");
  manifestLink.rel = "manifest";
  manifestLink.href = `${import.meta.env.BASE_URL}manifest.webmanifest`;
  document.head.appendChild(manifestLink);
}
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(PlannerProvider, { children: /* @__PURE__ */ jsxDEV(ErrorBoundary, { children: /* @__PURE__ */ jsxDEV(HashRouter, { children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/main.jsx",
    lineNumber: 27,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/main.jsx",
    lineNumber: 26,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/main.jsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/main.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/giuli/OneDrive/Ãrea de Trabalho/ENEM/src/main.jsx",
    lineNumber: 23,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMEJVO0FBMUJWLE9BQU9BLFdBQVc7QUFDbEIsT0FBT0MsY0FBYztBQUNyQixTQUFTQyxrQkFBa0I7QUFDM0IsT0FBT0MsU0FBUztBQUNoQixTQUFTQyx1QkFBdUI7QUFDaEMsT0FBTztBQUNQLE9BQU9DLG1CQUFtQjtBQUUxQixJQUFJQyxZQUFZQyxJQUFJQyxNQUFNO0FBQ3hCLFFBQU1DLGVBQWVDLFNBQVNDLGNBQWMsTUFBTTtBQUNsREYsZUFBYUcsTUFBTTtBQUNuQkgsZUFBYUksT0FBTyxHQUFHUCxZQUFZQyxJQUFJTyxRQUFRO0FBQy9DSixXQUFTSyxLQUFLQyxZQUFZUCxZQUFZO0FBQ3hDO0FBRUEsSUFBSSxtQkFBbUJRLGFBQWFYLFlBQVlDLElBQUlDLE1BQU07QUFDeERVLFNBQU9DLGlCQUFpQixRQUFRLE1BQU07QUFDcENGLGNBQVVHLGNBQWNDLFNBQVMsR0FBR2YsWUFBWUMsSUFBSU8sUUFBUSxPQUFPO0FBQUEsRUFDckUsQ0FBQztBQUNIO0FBRUFiLFNBQVNxQixXQUFXWixTQUFTYSxlQUFlLE1BQU0sQ0FBQyxFQUFFQztBQUFBQSxFQUNuRCx1QkFBQyxNQUFNLFlBQU4sRUFDQyxpQ0FBQyxtQkFDQyxpQ0FBQyxpQkFDQyxpQ0FBQyxjQUNDLGlDQUFDLFNBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFJLEtBRE47QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUlBLEtBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU1BLEtBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVFBO0FBQ0YiLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0RE9NIiwiSGFzaFJvdXRlciIsIkFwcCIsIlBsYW5uZXJQcm92aWRlciIsIkVycm9yQm91bmRhcnkiLCJpbXBvcnQiLCJlbnYiLCJQUk9EIiwibWFuaWZlc3RMaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwiaHJlZiIsIkJBU0VfVVJMIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibmF2aWdhdG9yIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsImNyZWF0ZVJvb3QiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJtYWluLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XHJcbmltcG9ydCB7IEhhc2hSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCB7IFBsYW5uZXJQcm92aWRlciB9IGZyb20gJy4vY29udGV4dC9QbGFubmVyQ29udGV4dCc7XHJcbmltcG9ydCAnLi9zdHlsZXMvaW5kZXguY3NzJztcclxuaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSAnLi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnknO1xyXG5cclxuaWYgKGltcG9ydC5tZXRhLmVudi5QUk9EKSB7XHJcbiAgY29uc3QgbWFuaWZlc3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gIG1hbmlmZXN0TGluay5yZWwgPSAnbWFuaWZlc3QnO1xyXG4gIG1hbmlmZXN0TGluay5ocmVmID0gYCR7aW1wb3J0Lm1ldGEuZW52LkJBU0VfVVJMfW1hbmlmZXN0LndlYm1hbmlmZXN0YDtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1hbmlmZXN0TGluayk7XHJcbn1cclxuXHJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yICYmIGltcG9ydC5tZXRhLmVudi5QUk9EKSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcihgJHtpbXBvcnQubWV0YS5lbnYuQkFTRV9VUkx9c3cuanNgKTtcclxuICB9KTtcclxufVxyXG5cclxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKS5yZW5kZXIoXHJcbiAgPFJlYWN0LlN0cmljdE1vZGU+XHJcbiAgICA8UGxhbm5lclByb3ZpZGVyPlxyXG4gICAgICA8RXJyb3JCb3VuZGFyeT5cclxuICAgICAgICA8SGFzaFJvdXRlcj5cclxuICAgICAgICAgIDxBcHAgLz5cclxuICAgICAgICA8L0hhc2hSb3V0ZXI+XHJcbiAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgIDwvUGxhbm5lclByb3ZpZGVyPlxyXG4gIDwvUmVhY3QuU3RyaWN0TW9kZT5cclxuKTsiXSwiZmlsZSI6IkM6L1VzZXJzL2dpdWxpL09uZURyaXZlL8OBcmVhIGRlIFRyYWJhbGhvL0VORU0vc3JjL21haW4uanN4In0=
