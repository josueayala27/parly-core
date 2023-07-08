import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface UserChannelSettingsTable {
  id: Generated<number>;
  channel_id: number;
  user_id: number;
  allow_notifications: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type UserChannelSettings = Selectable<UserChannelSettingsTable>;
export type NewUserChannelSettings = Insertable<UserChannelSettingsTable>;
export type UserChannelSettingsUpdate = Updateable<UserChannelSettingsTable>;
