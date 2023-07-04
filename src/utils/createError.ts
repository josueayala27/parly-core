function createError(status: number, message: any) {
  const error: any = new Error(message);
  error.status = status;
  return error;
}

export default createError;
