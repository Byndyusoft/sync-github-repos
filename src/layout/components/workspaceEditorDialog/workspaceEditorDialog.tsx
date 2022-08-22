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

import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button, Classes, Dialog, InputGroup } from "@blueprintjs/core";
import { produce } from "immer";
import { useTranslation } from "react-i18next";

import { useWorkspacesContext } from "../../../common";
import { useWorkspaceEditorContext } from "../../hooks";

export const WorkspaceEditorDialog: React.FC = () => {
  const { t } = useTranslation();

  const workspacesContext = useWorkspacesContext();

  const workspaceEditorContext = useWorkspaceEditorContext();

  const [workspaceName, setWorkspaceName] = useState("");

  const workspaceNamesCache = useMemo(
    () => new Set(workspacesContext.workspaces.map((x) => x.name)),
    [workspacesContext.workspaces],
  );

  const isSubmitButtonDisabled = useMemo(
    () => !workspaceName.length || workspaceNamesCache.has(workspaceName),
    [workspaceName, workspaceNamesCache],
  );

  useEffect(() => {
    setWorkspaceName(workspaceEditorContext.workspace?.name ?? "");
  }, [workspaceEditorContext.workspace]);

  const onWorkspaceNameInputChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setWorkspaceName(event.target.value);
  };

  const onDialogClose = (): void => {
    workspaceEditorContext.setIsDialogOpen(false);
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (workspaceEditorContext.workspace) {
      workspacesContext.setWorkspaces(
        produce((draft) => {
          const index = draft.findIndex(
            (x) => x.name === workspaceEditorContext.workspace?.name,
          );

          if (index !== -1) {
            draft[index].name = workspaceName;
          }
        }),
      );

      if (
        workspaceEditorContext.workspace.name ===
        workspacesContext.currentWorkspaceName
      ) {
        workspacesContext.setCurrentWorkspaceName(workspaceName);
      }
    } else {
      workspacesContext.setWorkspaces(
        produce((draft) => {
          draft.push({
            name: workspaceName,
            baseRepository: null,
            repositories: [],
          });
        }),
      );

      workspacesContext.setCurrentWorkspaceName(workspaceName);

      setWorkspaceName("");
    }

    workspaceEditorContext.setIsDialogOpen(false);
  };

  return (
    <Dialog
      icon={workspaceEditorContext.workspace ? "edit" : "plus"}
      title={
        workspaceEditorContext.workspace
          ? t("workspaces.editWorkspace", {
              workspace: workspaceEditorContext.workspace,
            })
          : t("workspaces.addNewWorkspace")
      }
      isOpen={workspaceEditorContext.isDialogOpen}
      onClose={onDialogClose}
    >
      <form onSubmit={onFormSubmit}>
        <div className={Classes.DIALOG_BODY}>
          <InputGroup
            leftIcon="projects"
            placeholder={t("workspaces.workspaceNamePlaceholder")}
            value={workspaceName}
            onChange={onWorkspaceNameInputChange}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button type="submit" disabled={isSubmitButtonDisabled}>
            {t("common.save")}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
