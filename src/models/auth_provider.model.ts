import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface AuthProviderTable {
  id: Generated<number>;
  provider: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type AuthProvider = Selectable<AuthProviderTable>;
export type NewAuthProvider = Insertable<AuthProviderTable>;
export type AuthProviderUpdate = Updateable<AuthProviderTable>;
