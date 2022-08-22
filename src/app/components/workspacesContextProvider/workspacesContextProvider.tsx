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

import React, { PropsWithChildren, useMemo } from "react";

import { useTranslation } from "react-i18next";
import useLocalStorageState from "use-local-storage-state";

import { IWorkspace, WorkspacesContext } from "../../../common";

export const WorkspacesContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { t } = useTranslation();

  const defaultWorkspaceName = t("workspaces.defaultWorkspaceName");

  const [workspaces, setWorkspaces] = useLocalStorageState<
    readonly IWorkspace[]
  >("workspaces", {
    defaultValue: [
      {
        name: defaultWorkspaceName,
        baseRepository: null,
        repositories: [],
      },
    ],
  });

  const [currentWorkspaceName, setCurrentWorkspaceName] = useLocalStorageState(
    "currentWorkspaceName",
    {
      defaultValue: defaultWorkspaceName,
    },
  );

  const currentWorkspace = useMemo<IWorkspace>(() => {
    const result = workspaces.find((x) => x.name === currentWorkspaceName);

    if (!result) {
      return {
        name: currentWorkspaceName,
        baseRepository: null,
        repositories: [],
      };
    }

    return result;
  }, [workspaces, currentWorkspaceName]);

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces,
        setWorkspaces,

        currentWorkspaceName,
        setCurrentWorkspaceName,

        currentWorkspace,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};
