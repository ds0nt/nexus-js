import { WebSocket, Server } from 'mock-socket';


const wsURL = "ws://whatever/ws"

global.WebSocket = WebSocket;
const mockServer = new Server(wsUrl);

mockServer.on('connection', socket => {
    socket.on('message', data => {
        socket.send('test message from mock server');
    });
});



describe('socket', () => {
})