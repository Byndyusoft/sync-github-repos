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

import React from "react";

import { Button, NavbarGroup } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

import { useWorkspacesContext } from "../../../common";
import { WorkspaceEditorContextProvider } from "../workspaceEditorContextProvider";
import { WorkspaceEditorDialog } from "../workspaceEditorDialog";
import { WorkspacesMenu } from "../workspacesMenu";

export const NavbarToolsGroup: React.FC = () => {
  const workspacesContext = useWorkspacesContext();

  return (
    <WorkspaceEditorContextProvider>
      <WorkspaceEditorDialog />
      <NavbarGroup align="right">
        <Popover2
          content={<WorkspacesMenu />}
          inheritDarkTheme={false}
          interactionKind="hover"
          placement="bottom-start"
        >
          <Button minimal icon="projects" rightIcon="caret-down">
            {workspacesContext.currentWorkspace.name}
          </Button>
        </Popover2>
      </NavbarGroup>
    </WorkspaceEditorContextProvider>
  );
};
