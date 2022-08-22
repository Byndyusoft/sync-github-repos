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

import React, { PropsWithChildren, useState } from "react";

import { IWorkspace } from "../../../common";
import { WorkspaceEditorContext } from "../../contexts";

export const WorkspaceEditorContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [workspace, setWorkspace] = useState<IWorkspace | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <WorkspaceEditorContext.Provider
      value={{
        workspace,
        setWorkspace,

        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </WorkspaceEditorContext.Provider>
  );
};
