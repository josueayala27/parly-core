import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
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
      (eb) =>
        eb
          .selectFrom('likes')
          .select(sql`COUNT(*)`.as('count'))
          .whereRef('likes.message_id', '=', 'messages.id')
          // Same thing: .select((a) => a.fn.countAll().as('count'))
          .as('count_likes'),
      (eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('attachments')
            .select(['id', 'filename', 'raw_meta_data', 'size'])
            .whereRef('attachments.message_id', '=', 'message_id')
        ).as('attachments'),
      (eb) =>
        jsonObjectFrom(
          eb
            .selectFrom('users as user')
            .select(['id', 'full_name', 'username', 'avatar', 'email'])
            .whereRef('user.id', '=', 'messages.user_id')
        ).as('user'),
      'created_at',
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

export const storeMessageLikes = async (userId: number, messageId: number) => {
  return db
    .insertInto('likes')
    .values({ user_id: userId, message_id: messageId })
    .execute();
};

export const destroyLikeFromMessage = async (likeId: number) => {
  return db.deleteFrom('likes').where('id', '=', likeId).execute();
};

export const retrieveLikesFromMessage = async (messageId: number | string) => {
  const likes = await db
    .selectFrom('likes as l')
    .innerJoin('messages as m', 'l.message_id', 'm.id')
    .where('m.id', '=', messageId as number)
    .select([
      'l.id',
      (eb) =>
        jsonObjectFrom(
          eb
            .selectFrom('users as u')
            .whereRef('u.id', '=', 'l.user_id')
            .select(['u.id', 'u.full_name', 'u.username', 'u.avatar'])
        ).as('user'),
    ])
    .execute();

  return likes;
};
