import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000');

export const newMessage = socket.on('ROOM:NEW_MESSAGE', (message) => {
    return message
})

export default socket;