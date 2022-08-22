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

// TODO: use static Toaster usage when https://github.com/palantir/blueprint/issues/5212 was resolved

import React from "react";
import { createRoot } from "react-dom/client";

import { IToaster, Toaster } from "@blueprintjs/core";

import { ToasterService } from "../services";

let toasterService: ToasterService;

const containerElement = document.createElement("div");
containerElement.id = "toaster";

document.body.appendChild(containerElement);

const toasterRoot = createRoot(containerElement);

toasterRoot.render(
  <Toaster
    position="bottom-left"
    ref={(instance) => {
      toasterService = new ToasterService(instance as IToaster);
    }}
  />,
);

export const useToaster = (): ToasterService => {
  return toasterService;
};
