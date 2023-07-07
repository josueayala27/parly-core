import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface ChannelUserTable {
  id: Generated<number>;
  user_id: number;
  channel_id: number;
  is_admin: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type ChannelUser = Selectable<ChannelUserTable>;
export type NewChannelUser = Insertable<ChannelUserTable>;
export type ChannelUserUpdate = Updateable<ChannelUserTable>;
