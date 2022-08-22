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

import React, { ReactNode } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Auth } from "../../../auth";
import { useGithubContext, useWorkspacesContext } from "../../../common";
import { Repositories } from "../../../repositories";
import { Tags } from "../../../tags";
import { NotFound } from "../notFound";

export const PagesRoutes: React.FC = () => {
  const githubContext = useGithubContext();
  const workspacesContext = useWorkspacesContext();

  const authGuard = (element: ReactNode): ReactNode => {
    return githubContext.user ? element : <Navigate to="/auth" />;
  };

  const baseRepositoryGuard = (element: ReactNode): ReactNode => {
    return authGuard(
      workspacesContext.currentWorkspace.baseRepository ? (
        element
      ) : (
        <Navigate to="/repositories" />
      ),
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />

      <Route path="/auth" element={<Auth />} />

      <Route path="/repositories" element={authGuard(<Repositories />)} />

      <Route path="/tags" element={baseRepositoryGuard(<Tags />)} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
