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

import { Octokit } from "@octokit/rest";

import { IGithubUser } from "../interfaces";

export class GithubService {
  public readonly queryKey: unknown;

  private readonly octokit: Octokit;

  public constructor(authToken: string | null) {
    this.octokit = new Octokit({
      auth: authToken,
    });

    this.queryKey = {
      authToken,
    };
  }

  public get rawClient(): Octokit {
    return this.octokit;
  }

  public async isUnauthenticated(): Promise<boolean> {
    const auth = (await this.octokit.auth()) as {
      type: "unauthenticated" | string;
    };

    return auth.type === "unauthenticated";
  }

  public async getAuthenticatedUser(): Promise<IGithubUser> {
    const { data: response } = await this.octokit.rest.users.getAuthenticated();

    return {
      login: response.login,
    };
  }
}
