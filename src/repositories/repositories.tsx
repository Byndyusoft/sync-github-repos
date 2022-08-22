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

import React, { FormEventHandler, useEffect, useId, useState } from "react";

import { Button, FormGroup } from "@blueprintjs/core";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";

import {
  FormButtonGroup,
  FormContainer,
  IRepository,
  isRepositoryValid,
  RepositoryInputGroup,
  useWorkspacesContext,
} from "../common";

export const Repositories: React.FC = () => {
  const { t } = useTranslation();

  const workspacesContext = useWorkspacesContext();

  const [baseRepository, setBaseRepository] = useState<IRepository | null>(
    null,
  );

  const [repositories, setRepositories] = useState<
    ReadonlyArray<{
      readonly key: string;
      readonly repository: IRepository | null;
    }>
  >([]);

  const baseRepositoryId = useId();

  useEffect(() => {
    setBaseRepository(workspacesContext.currentWorkspace.baseRepository);

    setRepositories([
      ...workspacesContext.currentWorkspace.repositories.map((repository) => ({
        key: nanoid(),
        repository,
      })),
      {
        key: nanoid(),
        repository: null,
      },
    ]);
  }, [workspacesContext.currentWorkspace]);

  const onRepositoryInputChange = (
    index: number,
    value: IRepository | null,
  ): void => {
    setRepositories(
      produce((draft) => {
        draft[index].repository = value;

        if (index === draft.length - 1) {
          draft.push({
            key: nanoid(),
            repository: null,
          });
        }
      }),
    );
  };

  const onRepositoryInputDeleteButtonClick = (index: number): void => {
    if (index === repositories.length - 1) {
      return;
    }

    if (!confirm(t("repositories.confirmDeleteRepository"))) {
      return;
    }

    setRepositories(
      produce((draft) => {
        draft.splice(index, 1);
      }),
    );
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const sanitizedRepositories = [
      ...new Map(
        repositories
          .map((x) => x.repository)
          .filter(isRepositoryValid)
          .map((x) => [x.fullName, x]),
      ).values(),
    ];

    workspacesContext.setWorkspaces(
      produce((draft) => {
        const currentWorkspaceIndex = draft.findIndex(
          (x) => x.name === workspacesContext.currentWorkspaceName,
        );

        if (currentWorkspaceIndex !== -1) {
          draft[currentWorkspaceIndex].baseRepository = baseRepository;
          draft[currentWorkspaceIndex].repositories = sanitizedRepositories;
        }
      }),
    );
  };

  return (
    <FormContainer onSubmit={onFormSubmit}>
      <FormGroup
        label={t("repositories.baseRepositoryLabel")}
        labelFor={baseRepositoryId}
      >
        <RepositoryInputGroup
          id={baseRepositoryId}
          value={baseRepository}
          onChange={setBaseRepository}
        />
      </FormGroup>
      <FormGroup label={t("repositories.repositoriesLabel")}>
        {repositories.map(({ key, repository }, index) => (
          <RepositoryInputGroup
            key={key}
            value={repository}
            onChange={(value) => onRepositoryInputChange(index, value)}
            isDeleteButtonShown
            onDeleteButtonClick={() =>
              onRepositoryInputDeleteButtonClick(index)
            }
          />
        ))}
      </FormGroup>
      <FormButtonGroup>
        <Button type="submit">{t("common.save")}</Button>
      </FormButtonGroup>
    </FormContainer>
  );
};
