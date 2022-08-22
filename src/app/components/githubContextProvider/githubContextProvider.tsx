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

import React, { PropsWithChildren, useMemo } from "react";

import useLocalStorageState from "use-local-storage-state";

import { GithubContext, GithubService } from "../../../common";
import { useGithubUser } from "../../hooks";

export const GithubContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useLocalStorageState<string | null>(
    "authToken",
    {
      defaultValue: null,
    },
  );

  const githubService = useMemo(
    () => new GithubService(authToken),
    [authToken],
  );

  const user = useGithubUser(githubService);

  return (
    <GithubContext.Provider
      value={{
        authToken,
        setAuthToken,

        githubService,

        user,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
