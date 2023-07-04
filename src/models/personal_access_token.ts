import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface PersonalAccessTokenTable {
  id: Generated<number>;
  token: string;
  user_id: number;
  auth_provider_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type PersonalAccessToken = Selectable<PersonalAccessTokenTable>;
export type NewPersonalAccessToken = Insertable<PersonalAccessTokenTable>;
export type PersonalAccessTokenUpdate = Updateable<PersonalAccessTokenTable>;
