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

import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useGithubContext, useToaster } from "../../common";
import { ITagProtectionRule } from "../interfaces";

import { useTagsQueryKey } from "./useTagsQueryKey";

export interface IUseAddMissingResult {
  readonly addMissing: UseMutateFunction<number, Error, ITagProtectionRule[]>;

  readonly isAddMissingLoading: boolean;
}

export const useAddMissing = (): IUseAddMissingResult => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const githubContext = useGithubContext();
  const toaster = useToaster();

  const tagsQueryKey = useTagsQueryKey();

  const { mutate, isLoading } = useMutation<
    number,
    Error,
    ITagProtectionRule[]
  >(
    async (tagProtectionRules) => {
      const requests = tagProtectionRules
        .filter((x) => x.type === "missing")
        .map((tagProtectionRule) => ({
          owner: tagProtectionRule.repository.owner,
          repo: tagProtectionRule.repository.repo,
          pattern: tagProtectionRule.pattern,
        }));

      await Promise.all(
        requests.map((request) =>
          githubContext.githubService.rawClient.repos.createTagProtection(
            request,
          ),
        ),
      );

      return requests.length;
    },
    {
      async onSuccess(data) {
        if (data) {
          await queryClient.invalidateQueries(tagsQueryKey);
        } else {
          alert(t("tags.nothingToAdd"));
        }
      },
      onError(error) {
        toaster.showError(error);
      },
    },
  );

  return {
    addMissing: mutate,
    isAddMissingLoading: isLoading,
  };
};
