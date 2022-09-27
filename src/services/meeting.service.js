import httpStatus from 'http-status';
import createError from '../utils/createError';
import Meeting from '../models/meeting.model';

export const createMeeting = async ({ title, user_id }) => {
  const service = await Meeting.create({
    title,
    allow_comments: true,
    allow_screen_sharing: true,
    allow_microphone: true,
    allow_video: true,
    user_id,
  });

  const user = await service.getUser();

  return {
    ...service.toJSON(),
    user,
  };
};

export const searchMeeting = async (key) => {
  const meeting = await Meeting.findByPk(key);

  if (!meeting) {
    throw createError(httpStatus.NOT_FOUND, "Meeting key doesn't valid.");
  }

  return meeting;
};

export const getMeetings = async (user) =>
  Meeting.findAll({ where: { user_id: user } });
