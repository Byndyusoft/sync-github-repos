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

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import { GithubService, IGithubUser, useToaster } from "../../common";

export const useGithubUser = (
  githubService: GithubService,
): IGithubUser | null => {
  const navigate = useNavigate();

  const toaster = useToaster();

  const [user, setUser] = useLocalStorageState<IGithubUser | null>("user", {
    defaultValue: null,
  });

  useQuery<IGithubUser | null, Error>(
    [githubService.queryKey, "user"],
    async () => {
      if (await githubService.isUnauthenticated()) {
        return null;
      }

      return githubService.getAuthenticatedUser();
    },
    {
      onSuccess(data) {
        setUser(data);
      },
      onError(error) {
        setUser(null);

        toaster.showError(error);
      },
    },
  );

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return user;
};
