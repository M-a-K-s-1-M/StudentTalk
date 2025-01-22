require('dotenv').config();
const express = require('express');
const sequelize = require('./db')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const models = require('./models/models')
const router = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});


app.use(cors({
    origin: '*', // Разрешает запросы со всех доменов
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP методы
    allowedHeaders: ['Content-Type', 'Authorization'] // Разрешенные заголовки
}))

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);



io.on('connection', (socket) => {
    console.log(`${socket.id} user connected`)

    socket.on('ROOM:JOIN', ({ ticketId }) => {
        socket.join(ticketId);
        console.log('userId: ', socket.id, ' connect, ticketId: ', ticketId);
        // Отпарвить всем в этой комнате кроме отправителя
        // socket.to(ticketId).broadcast.emit('название запроса', data)
    })

    socket.on('ROOM:MESSAGE_TUTOR', ({ message, ticketId }) => {
        socket.broadcast.to(ticketId).emit('ROOM:NEW_MESSAGE_STUDENT', { message });
    })

    socket.on('ROOM:MESSAGE_STUDENT', ({ message, ticketId }) => {
        socket.broadcast.to(ticketId).emit('ROOM:NEW_MESSAGE_TUTOR', { message });
    })


    socket.on('ROOM:LEAVE', ({ ticketId }) => {
        socket.leave(ticketId);
        console.log(`user ${socket.id} leave ticketId: ${ticketId}`)
    })


    socket.on('disconnect', () => {
        console.log(`${socket.id} user disconnect`)
    })
})



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();
