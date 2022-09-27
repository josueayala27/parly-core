import { createMeeting, searchMeeting } from '../services/meeting.service';

export const storeMeeting = async ({ user, body }, res, next) => {
  try {
    const meeting = await createMeeting({
      title: body.title,
      user_id: user.id,
    });

    res.send({ data: meeting });
  } catch (error) {
    next(error);
  }
};

export const showMeeting = async ({ params }, res, next) => {
  try {
    const meeting = await searchMeeting(params.id);

    res.send({ data: meeting });
  } catch (error) {
    next(error);
  }
};
