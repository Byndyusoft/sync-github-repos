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

import { Menu, MenuDivider } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { produce } from "immer";
import { useTranslation } from "react-i18next";

import { IWorkspace, useWorkspacesContext } from "../../../common";
import { useWorkspaceEditorContext } from "../../hooks";

export const WorkspacesMenu: React.FC = () => {
  const { t } = useTranslation();

  const workspacesContext = useWorkspacesContext();

  const workspaceEditorContext = useWorkspaceEditorContext();

  const onSelectMenuItemClick = (workspace: IWorkspace): void => {
    workspacesContext.setCurrentWorkspaceName(workspace.name);
  };

  const onEditMenuItemClick = (workspace: IWorkspace): void => {
    workspaceEditorContext.setWorkspace(workspace);
    workspaceEditorContext.setIsDialogOpen(true);
  };

  const onDeleteMenuItemClick = (
    workspace: IWorkspace,
    index: number,
  ): void => {
    if (
      !confirm(
        t("workspaces.confirmDeleteWorkspace", {
          workspace,
        }),
      )
    ) {
      return;
    }

    workspacesContext.setWorkspaces(
      produce((draft) => {
        draft.splice(index, 1);
      }),
    );
  };

  const onAddNewMenuItemClick = (): void => {
    workspaceEditorContext.setWorkspace(null);
    workspaceEditorContext.setIsDialogOpen(true);
  };

  return (
    <Menu>
      <MenuDivider title={t("workspaces.title")} />
      {workspacesContext.workspaces.map((workspace, index) => (
        <React.Fragment key={workspace.name}>
          <MenuItem2
            icon={
              workspace.name === workspacesContext.currentWorkspaceName
                ? "tick"
                : undefined
            }
            text={workspace.name}
          >
            <MenuItem2
              icon="tick"
              text={t("workspaces.select")}
              onClick={() => onSelectMenuItemClick(workspace)}
            />
            <MenuItem2
              icon="edit"
              text={t("workspaces.edit")}
              onClick={() => onEditMenuItemClick(workspace)}
            />
            <MenuDivider />
            <MenuItem2
              intent="danger"
              icon="delete"
              text={t("workspaces.delete")}
              disabled={
                workspace.name === workspacesContext.currentWorkspaceName
              }
              onClick={() => onDeleteMenuItemClick(workspace, index)}
            />
          </MenuItem2>
        </React.Fragment>
      ))}
      <MenuDivider />
      <MenuItem2
        icon="plus"
        text={t("workspaces.addNew")}
        onClick={onAddNewMenuItemClick}
      />
    </Menu>
  );
};
