import httpStatus from 'http-status';
import { validateToken } from '../services/token.service';
import createError from '../utils/createError';

const tokenValidator = async (req, _, next) => {
  const AUTH_HEADER = 'authorization';

  if (!req.headers[AUTH_HEADER]) {
    next(createError(httpStatus.FORBIDDEN, 'Authentication header not found.'));
    return;
  }

  const authToken = req.headers[AUTH_HEADER].split(' ')[1];
  const { user, token } = await validateToken(authToken);

  if (!token) {
    next(createError(httpStatus.UNAUTHORIZED, 'Token authorization expired.'));
  }

  req.user = user;

  next();
};

export default tokenValidator;
