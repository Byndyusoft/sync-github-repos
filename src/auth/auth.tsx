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
  useId,
  useState,
} from "react";

import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import { useIsFetching } from "@tanstack/react-query";
import { Trans, useTranslation } from "react-i18next";

import { FormButtonGroup, FormContainer, useGithubContext } from "../common";

import styles from "./auth.module.scss";

export const Auth: React.FC = () => {
  const { t } = useTranslation();

  const githubContext = useGithubContext();

  const [authToken, setAuthToken] = useState("");

  const authTokenId = useId();

  const isGitHubUserFetching = useIsFetching([
    githubContext.githubService.queryKey,
    "user",
  ]);

  useEffect(() => {
    setAuthToken(githubContext.authToken ?? "");
  }, [githubContext.authToken]);

  const onAuthTokenInputChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAuthToken(event.target.value);
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    githubContext.setAuthToken(authToken.length ? authToken : null);
  };

  return (
    <FormContainer onSubmit={onFormSubmit}>
      <Callout
        className={styles.calloutContainer}
        intent="warning"
        icon="oil-field"
      >
        {t("auth.applicationIsUnderActiveDevelopment")}
      </Callout>
      <FormGroup
        label={t("auth.gitHubPersonalAccessTokenLabel")}
        labelFor={authTokenId}
        helperText={
          <Trans t={t} i18nKey="auth.gitHubPersonalAccessTokenHelp">
            Generate it{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>{" "}
            with <code>repo</code> scope
          </Trans>
        }
      >
        <InputGroup
          id={authTokenId}
          leftIcon="lock"
          placeholder={t("auth.gitHubPersonalAccessTokenLabelPlaceholder")}
          type="password"
          autoComplete="one-time-code"
          value={authToken}
          onChange={onAuthTokenInputChange}
        />
      </FormGroup>
      <FormButtonGroup>
        <Button disabled={isGitHubUserFetching > 0} type="submit">
          {t("common.save")}
        </Button>
      </FormButtonGroup>
    </FormContainer>
  );
};
