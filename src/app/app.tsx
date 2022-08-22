/*
 * Copyright 2022 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "./app.scss";
import "./i18n";

import React from "react";

import { FocusStyleManager } from "@blueprintjs/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter } from "react-router-dom";

import { FallbackComponent } from "../common";
import { Layout } from "../layout";

import {
  GithubContextProvider,
  PagesRoutes,
  WorkspacesContextProvider,
} from "./components";

FocusStyleManager.onlyShowFocusOnTabs();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <GithubContextProvider>
            <WorkspacesContextProvider>
              <Layout>
                <PagesRoutes />
              </Layout>
            </WorkspacesContextProvider>
          </GithubContextProvider>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};
