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

import { Button, NonIdealState } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";

import styles from "./fallbackComponent.module.scss";

export interface IFallbackComponentProps {
  error: Error;
}

export const FallbackComponent: React.FC<IFallbackComponentProps> = ({
  error,
}) => {
  const { t } = useTranslation();

  const onReloadButtonClick = (): void => {
    location.reload();
  };

  return (
    <NonIdealState
      className={styles.fallbackComponentContainer}
      icon="error"
      title={t("fallbackComponent.title")}
      description={error.message}
      action={
        <Button icon="refresh" onClick={onReloadButtonClick}>
          {t("fallbackComponent.reloadPage")}
        </Button>
      }
    />
  );
};
