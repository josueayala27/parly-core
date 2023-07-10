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
      (eb) =>
        eb
          .selectFrom('messages')
          .select(['channel_id', eb.fn.max('created_at').as('max_created_at')])
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
      'c.name as channel_name',
      'm.content as message_content',
      'c.is_group',
      (eb) =>
        eb
          .selectFrom('channel_users as cucw')
          .select((cu) =>
            cu
              .case()
              .when('c.is_group', '=', true)
              .then(null)
              .else(
                jsonObjectFrom(
                  cu
                    .selectFrom('users as user')
                    .select(['id', 'full_name', 'username', 'avatar', 'email'])
                    .whereRef('cucw.user_id', '=', 'user.id')
                )
              )
              .end()
              .as('user')
          )
          .whereRef('cucw.channel_id', '=', 'c.id')
          .where('cucw.user_id', 'not in', [userId])
          .limit(1)
          .as('chat_whit'),
      (eb) =>
        jsonObjectFrom(
          eb
            .selectFrom('users as user')
            .select(['id', 'full_name', 'username', 'avatar', 'email'])
            .whereRef('user.id', '=', 'm.user_id')
        ).as('message_author'),
    ])
    .where('cu.user_id', '=', userId)
    .orderBy('c.id', 'asc')
    .execute();

  /**
   * See the compiled query: https://kyse.link/?p=s&i=lKpijUEssTueQn4ij53U
   */
  return lastMessages;
};
