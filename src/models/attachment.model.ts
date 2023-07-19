import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface AttachmentTable {
  id: Generated<number>;
  filename: string;
  raw_meta_data: any;
  size: number;
  message_id: number;
  attachment_type_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Attachment = Selectable<AttachmentTable>;
export type NewAttachment = Insertable<AttachmentTable>;
export type AttachmentUpdate = Updateable<AttachmentTable>;
