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

  const userRelation = await service.getUser();

  return {
    ...service.toJSON(),
    user: userRelation,
  };
};

export const getAllMeetings = () => 'Get all meetings';