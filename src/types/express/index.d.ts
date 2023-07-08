/* eslint-disable @typescript-eslint/no-namespace */

import { PersonalAccessToken } from '../../models/personal_access_token';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: PersonalAccessToken;
    }
  }
}
