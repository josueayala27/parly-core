export const init = async (req, res) => {
  res.send({
    message: 'Hello from user controller.',
  });
};

export const getUser = async (req, res) => {
  res.send({ data: req.user });
};
