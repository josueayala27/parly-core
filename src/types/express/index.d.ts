/* eslint-disable @typescript-eslint/no-namespace */

import { UserTable } from '../../models/user.model';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserTable;
    }
  }
}
