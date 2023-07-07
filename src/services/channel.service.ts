import crypto from 'crypto';
import db from '../config/database';
import { NewUserChannelSettings } from '../models/user_channel_settings';

export const storeChannel = async (userId: number, users: number[]) => {
  await db.transaction().execute(async (transaction) => {
    const channel = await transaction
      .insertInto('channels')
      .values({
        invite_hash: crypto
          .createHash('sha256')
          .update(crypto.randomBytes(32))
          .digest('hex'),
        name: '',
        description: '',
        image: '',
        users_can_edit: true,
        users_can_send_messages: true,
      })
      .returning(['id'])
      .executeTakeFirstOrThrow();

    await transaction
      .insertInto('channel_users')
      .values([
        { user_id: userId, channel_id: channel.id, is_admin: true },
        ...users.map((user: number) => ({
          is_admin: false,
          user_id: user,
          channel_id: channel.id,
        })),
      ])
      .returningAll()
      .execute();

    await transaction
      .insertInto('user_channel_settings')
      .values([
        ...users.map(
          (user: number) =>
            ({
              channel_id: channel.id,
              user_id: user,
              allow_notifications: true,
            } as NewUserChannelSettings)
        ),
      ])
      .returningAll()
      .execute();

    return channel;
  });

  return 'Channel was created successfully.';
};

export const retrieveChannelUsersById = async (channelId: string) => {
  const users = await db
    .selectFrom('channel_users')
    .selectAll()
    .where('channel_id', '=', channelId as any)
    .execute();

  return users;
};