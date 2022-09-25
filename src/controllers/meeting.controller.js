import { createMeeting } from '../services/meeting.service';

export const init = async (req, res) => {
  res.send({
    message: 'Hello from meeting controller.',
  });
};

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
