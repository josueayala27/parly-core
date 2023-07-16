import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface LikeTable {
  id: Generated<number>;
  user_id: number;
  message_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Like = Selectable<LikeTable>;
export type NewLike = Insertable<LikeTable>;
export type LikeUpdate = Updateable<LikeTable>;
