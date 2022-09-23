import httpStatus from "http-status";
import User from "../models/user.model";
import createError from "../utils/createError";

export const registerUser = async (userInformation) => {
  if (await User.findOne({ email: userInformation.email })) {
    throw new createError(httpStatus.BAD_REQUEST, "Email already taken.");
  }

  return User.create({
    full_name: userInformation.name,
    email,
    vatar: userInformation.picture,
    last_sign_in_at: new Date(),
    raw_app_meta_data: userInformation,
  });
};
