import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface UserTable {
  id: Generated<number>;
  full_name: string;
  username: string;
  avatar: string;
  email: string;
  bio: string | undefined;
  email_confirmed_at: ColumnType<Date, string | undefined, never> | any;
  raw_meta_data: any;
  gender_id: number | undefined;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
