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

import React, { ReactElement, useMemo } from "react";

import { AnchorButton, ButtonGroup, Classes, Icon } from "@blueprintjs/core";
import { TreeNodeInfo } from "@blueprintjs/core/lib/esm/components/tree/treeNode";
import { useTranslation } from "react-i18next";

import { ITagProtectionRule } from "../interfaces";

export const useTagsTreeContents = (
  tagProtectionRules: ITagProtectionRule[],
): TreeNodeInfo[] => {
  const { t } = useTranslation();

  return useMemo<TreeNodeInfo[]>(() => {
    const baseTags = new Map<string, TreeNodeInfo[]>(
      tagProtectionRules.filter((x) => x.base).map((x) => [x.pattern, []]),
    );

    const extraneousTags = new Map<string, TreeNodeInfo[]>(
      tagProtectionRules
        .filter((x) => x.type === "extraneous")
        .map((x) => [x.pattern, []]),
    );

    for (const tagProtectionRule of tagProtectionRules) {
      const childNodes = (
        tagProtectionRule.type === "extraneous" ? extraneousTags : baseTags
      ).get(tagProtectionRule.pattern) as TreeNodeInfo[];

      const id = `${
        tagProtectionRule.type === "extraneous" ? "extraneous" : "base"
      }-${tagProtectionRule.pattern}-${tagProtectionRule.repository.fullName}`;

      let icon: ReactElement;

      switch (tagProtectionRule.type) {
        case "synced":
          icon = (
            <Icon
              intent="success"
              icon="updated"
              className={Classes.TREE_NODE_ICON}
            />
          );
          break;
        case "missing":
          icon = (
            <Icon
              intent="warning"
              icon="outdated"
              className={Classes.TREE_NODE_ICON}
            />
          );
          break;
        case "extraneous":
          icon = (
            <Icon
              intent="danger"
              icon="error"
              className={Classes.TREE_NODE_ICON}
            />
          );
          break;
      }

      childNodes.push({
        id,
        icon,
        label: tagProtectionRule.repository.fullName,
        secondaryLabel: (
          <ButtonGroup>
            <AnchorButton
              minimal
              icon="share"
              href={`https://github.com/${tagProtectionRule.repository.fullName}/settings/tag_protection`}
              target="_blank"
              rel="noreferrer"
            />
          </ButtonGroup>
        ),
      });
    }

    const getTagsTreeNodeInfo = (
      id: string,
      label: string,
      tags: Map<string, TreeNodeInfo[]>,
    ): TreeNodeInfo => {
      return {
        id,
        hasCaret: tags.size > 0,
        icon: "folder-close",
        label,
        isExpanded: true,
        childNodes: [...tags.entries()].map(([tag, childNodes]) => ({
          id: `${id}-${tag}`,
          icon: "tag",
          label: tag,
          isExpanded: true,
          childNodes,
        })),
      };
    };

    return [
      getTagsTreeNodeInfo("base", t("tags.base"), baseTags),
      getTagsTreeNodeInfo("extraneous", t("tags.extraneous"), extraneousTags),
    ];
  }, [tagProtectionRules, t]);
};
