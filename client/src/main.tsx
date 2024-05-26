import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FallBackPage from "./components/FallBackPage";
import ErrorHandlerPage from "./components/ErrorHandlerPage";

import store from "./store";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy-loaded components
const App = React.lazy(() => import("./App"));
const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index={true}
        path="/"
        element={<HomeScreen />}
        errorElement={<ErrorHandlerPage />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={FallBackPage} onError={ErrorHandlerPage}>
      <Suspense fallback={<LoadingSpinner />}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </Suspense>
    </ErrorBoundary>
  </Provider>
);
