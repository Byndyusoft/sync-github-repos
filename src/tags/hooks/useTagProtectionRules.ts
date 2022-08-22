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

import { useQuery } from "@tanstack/react-query";

import {
  IRepository,
  useGithubContext,
  useWorkspacesContext,
} from "../../common";
import { ITagProtectionRule } from "../interfaces";

import { useTagsQueryKey } from "./useTagsQueryKey";

export interface IUseTagProtectionRulesResult {
  readonly tagProtectionRules: ITagProtectionRule[];
  readonly isTagProtectionRulesFetching: boolean;
  readonly tagProtectionRulesFetchingError: Error | null;
}

export const useTagProtectionRules = (): IUseTagProtectionRulesResult => {
  const githubContext = useGithubContext();
  const workspacesContext = useWorkspacesContext();

  const tagsQueryKey = useTagsQueryKey();

  const {
    data = [],
    isFetching,
    error,
  } = useQuery<ITagProtectionRule[], Error>(tagsQueryKey, async () => {
    const [baseRepository, ...repositories] = await Promise.all(
      [
        workspacesContext.currentWorkspace.baseRepository as IRepository,
        ...workspacesContext.currentWorkspace.repositories,
      ].map(async (repository) => {
        const { data: response } =
          await githubContext.githubService.rawClient.repos.listTagProtection({
            owner: repository.owner,
            repo: repository.repo,
            headers: {
              "If-None-Match": "",
            },
          });

        return {
          repository,
          tagProtectionRulesMap: new Map(
            response.map((x) => [
              x.pattern,
              {
                id: x.id as number,
                pattern: x.pattern,
                base:
                  repository ===
                  workspacesContext.currentWorkspace.baseRepository,
                repository,
              },
            ]),
          ),
        };
      }),
    );

    return [baseRepository, ...repositories].flatMap(
      ({ repository, tagProtectionRulesMap }) => [
        ...[...tagProtectionRulesMap.values()].map<ITagProtectionRule>(
          (repositoryTagProtectionRule) => ({
            ...repositoryTagProtectionRule,
            type: baseRepository.tagProtectionRulesMap.has(
              repositoryTagProtectionRule.pattern,
            )
              ? "synced"
              : "extraneous",
          }),
        ),
        ...[...baseRepository.tagProtectionRulesMap.values()]
          .filter(
            (baseRepositoryTagProtectionRule) =>
              !tagProtectionRulesMap.has(
                baseRepositoryTagProtectionRule.pattern,
              ),
          )
          .map<ITagProtectionRule>((baseRepositoryTagProtectionRule) => ({
            id: 0,
            pattern: baseRepositoryTagProtectionRule.pattern,
            type: "missing",
            base: false,
            repository,
          })),
      ],
    );
  });

  return {
    tagProtectionRules: data,
    isTagProtectionRulesFetching: isFetching,
    tagProtectionRulesFetchingError: error,
  };
};
