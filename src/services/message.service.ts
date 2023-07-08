import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { sql } from 'kysely';
import db from '../config/database';

export const storeMessage = async (
  userId: number,
  channelId: string,
  content: string
) => {
  const message = await db
    .insertInto('messages')
    .values({
      content,
      channel_id: channelId as any,
      user_id: userId,
    })
    .returningAll()
    .executeTakeFirst();

  return message;
};

export const retrieveMessagesByChannel = async (channelId: string) => {
  const messages = await db
    .selectFrom('messages')
    .select([
      'id',
      'content',
      'created_at',
      (eb) =>
        jsonObjectFrom(
          eb
            .selectFrom('users as user')
            .select(['id', 'full_name', 'username', 'avatar', 'email'])
            .whereRef('user.id', '=', 'messages.user_id')
        ).as('user'),
    ])
    .where('channel_id', '=', channelId as any)
    .execute();

  return messages;
};

export const retrieveLastMessages = async (userId: number) => {
  const lastMessages = await db
    .selectFrom('channels as c')
    .innerJoin('channel_users as cu', 'c.id', 'cu.channel_id')
    .innerJoin(
      (a) =>
        a
          .selectFrom('messages')
          .select([
            'channel_id',
            sql<string>`MAX(created_at)`.as('max_created_at'),
          ])
          .groupBy('channel_id')
          .as('subquery'),
      (join) => join.onRef('c.id', '=', 'subquery.channel_id')
    )
    .innerJoin('messages as m', (join) =>
      join
        .onRef('subquery.channel_id', '=', 'm.channel_id')
        .onRef('subquery.max_created_at', '=', 'm.created_at')
    )
    .select([
      'c.id',
      'c.name',
      'c.description',
      'm.content as last_message',
      (eb) =>
        jsonObjectFrom(
          eb
            .selectFrom('users as user')
            .select(['id', 'full_name', 'username', 'avatar', 'email'])
            .whereRef('user.id', '=', 'm.user_id')
        ).as('user'),
    ])
    .where('cu.user_id', '=', userId)
    .orderBy('c.id', 'asc')
    .execute();

  return lastMessages;
};
