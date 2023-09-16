import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { retrieveUserByToken } from '../services/user.service';
import { getChannelIds } from '../services/channel.service';
import messageSocket from './message.socket';

const connection = (io: Server) => {
  io.on('connection', async (socket) => {
    console.log(`User with id '${socket.id}' is connected.`);

    /**
     * Get user information with sent token in the socket connection.
     */
    const user = await retrieveUserByToken(
      String(socket.handshake.query.token)
    );

    /**
     * Get user channel ids;
     */
    const channelIds = await getChannelIds(Number(user.user_id));

    /**
     * The user is joined to the rooms.
     */
    channelIds.forEach((channelId: number) => {
      socket.join(`channel:${channelId}`);
      console.log(`User ${socket.id} joined to channel:${channelId}`);
    });

    /**
     * Handle socket disconnect event.
     */
    socket.on('disconnect', (reason) => {
      console.log(`Disconnected socket (reason: ${reason}): ${socket.id}`);
    });

    /**
     * Load socket controllers
     */
    messageSocket(socket);
  });
};

const init = (httpServer: HttpServer) => {
  const io = new Server(httpServer);
  connection(io);
};

export default init;
