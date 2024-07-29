import { io } from 'socket.io-client';
import { CASINO_SOCKET_SERVER } from './variables/url';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(CASINO_SOCKET_SERVER);