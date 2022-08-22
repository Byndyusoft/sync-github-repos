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

import { Classes, Navbar } from "@blueprintjs/core";

import { NavbarPagesGroup, NavbarToolsGroup } from "./components";
import styles from "./layout.module.scss";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Navbar className={Classes.DARK}>
        <NavbarPagesGroup />
        <NavbarToolsGroup />
      </Navbar>
      <main className={styles.mainContainer}>{children}</main>
      <footer className={styles.footerContainer}>
        <span className={Classes.TEXT_SMALL}>
          © {new Date().getFullYear()}{" "}
          <a href="https://byndyusoft.com" target="_blank" rel="noreferrer">
            Byndyusoft
          </a>{" "}
          v{process.env.REACT_APP_VERSION}
        </span>
      </footer>
    </div>
  );
};
