import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { retrieveUserByToken } from '../services/user.service';
import { getChannelIds } from '../services/channel.service';

const connection = (io: Server) => {
  io.on('connection', async (socket) => {
    const user = await retrieveUserByToken(
      String(socket.handshake.query.token)
    );

    const channelIds = await getChannelIds(Number(user.user_id));

    /**
     * The user is joined to the rooms.
     */
    channelIds.forEach((channelId: number) => {
      socket.join(`channel:${channelId}`);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Disconnected socket (reason: ${reason}): ${socket.id}`);
    });
  });
};

const init = (httpServer: HttpServer) => {
  const io = new Server(httpServer);
  connection(io);
};

export default init;
