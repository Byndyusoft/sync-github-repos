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

import { NavbarDivider, NavbarGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";

import { useGithubContext } from "../../../common";
import { NavbarLink } from "../navbarLink";

export const NavbarPagesGroup: React.FC = () => {
  const { t } = useTranslation();

  const githubContext = useGithubContext();

  return (
    <NavbarGroup align="left">
      <NavbarLink to="/auth" icon={githubContext.user ? "user" : "log-in"}>
        {githubContext.user?.login ?? t("layout.auth")}
      </NavbarLink>

      <NavbarLink to="/repositories" icon="git-repo">
        {t("layout.repositories")}
      </NavbarLink>

      <NavbarDivider />

      <NavbarLink to="/tags" icon="tag">
        {t("layout.tags")}
      </NavbarLink>
    </NavbarGroup>
  );
};
