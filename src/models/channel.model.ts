import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface ChannelTable {
  id: Generated<number>;
  name: string;
  description: string;
  image: string;
  invite_hash: string;
  users_can_edit: boolean;
  users_can_send_messages: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Channel = Selectable<ChannelTable>;
export type NewChannel = Insertable<ChannelTable>;
export type ChannelUpdate = Updateable<ChannelTable>;
