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

import React, { PropsWithChildren } from "react";

import { Button, IconName } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import styles from "./navbarLink.module.scss";

export interface INavbarLinkProps {
  readonly to: string;
  readonly icon: IconName;
}

// See https://github.com/palantir/blueprint/issues/185#issuecomment-1053955937
export const NavbarLink: React.FC<PropsWithChildren<INavbarLinkProps>> = (
  props,
) => {
  return (
    <Link className={styles.navbarLink} to={props.to}>
      <Button minimal icon={props.icon}>
        {props.children}
      </Button>
    </Link>
  );
};
