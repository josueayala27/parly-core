import { createServer } from 'http';

import socket from './sockets';
import app from './app';

const httpServer = createServer(app);
socket(httpServer);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT || 3000);
