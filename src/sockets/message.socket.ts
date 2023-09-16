const messageSocket = (socket: any) => {
  socket.on('message:send', (channel: number, payload: any) => {
    socket.to([`channel:${channel}`]).emit('message:get', payload);
  });
};

export default messageSocket;
