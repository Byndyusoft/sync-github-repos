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

import React, { ChangeEventHandler } from "react";

import {
  AnchorButton,
  Button,
  ButtonGroup,
  InputGroup,
} from "@blueprintjs/core";
import { useTranslation } from "react-i18next";

import { IRepository } from "../../interfaces";
import { isRepositoryValid } from "../../services";

import styles from "./repositoryInputGroup.module.scss";

export interface IRepositoryInputProps {
  readonly id?: string;
  readonly value: IRepository | null;
  readonly onChange: (value: IRepository | null) => void;
  readonly isDeleteButtonShown?: boolean;
  readonly onDeleteButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const RepositoryInputGroup: React.FC<IRepositoryInputProps> = (
  props,
) => {
  const { t } = useTranslation();

  const onFullNameInputChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const fullName = event.target.value;

    const [owner, repo] = fullName.split("/") as Array<string | undefined>;

    props.onChange({
      owner: owner ?? "",
      repo: repo ?? "",
      fullName,
    });
  };

  return (
    <InputGroup
      className={styles.repositoryInputGroup}
      id={props.id}
      placeholder={t("repositories.repositoryPlaceholder")}
      rightElement={
        <ButtonGroup>
          {isRepositoryValid(props.value) ? (
            <AnchorButton
              minimal
              icon="share"
              href={`https://github.com/${props.value.fullName}`}
              target="_blank"
              rel="noreferrer"
            />
          ) : null}
          {props.isDeleteButtonShown ? (
            <Button
              intent="danger"
              minimal
              icon="cross"
              onClick={props.onDeleteButtonClick}
            />
          ) : null}
        </ButtonGroup>
      }
      value={props.value?.fullName ?? ""}
      onChange={onFullNameInputChange}
    />
  );
};
