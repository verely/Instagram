import { Server } from 'socket.io'
import { logger } from './logger.service.js'

export const socketService = {
    setupSocketAPI,
    emitToUser,
    broadcast
}

var gIo = null

export function setupSocketAPI(http) {
    gIo = new Server(http, { cors: { origin: '*' }})

    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)

		socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('set-user-socket', userId => {
            logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
            socket.userId = userId
        })

		socket.on('unset-user-socket', () => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            delete socket.userId
        })
    })
}

async function emitToUser({ type, data, userId }) {
    //logger.info(`emitToUser  type:${type}, savedComment:${JSON.stringify(data)}, ownerId:${userId}}`)
    userId = userId.toString()
    const socket = await _getUserSocket(userId)

    if (socket) {
        logger.info(`Emitting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
        socket.emit(type, data)
    } else {
        logger.info(`No active socket for user: ${userId}`)
    }
}

async function broadcast({ type, data, room = null, userId }) {
    logger.info(`Broadcasting event: ${type}`)

	userId = userId.toString()
    const excludedSocket = await _getUserSocket(userId)

	if (room && excludedSocket) {
        logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
        excludedSocket.broadcast.to(room).emit(type, data)
    } else if (excludedSocket) {
        logger.info(`Broadcast to all excluding user: ${userId}`)
        excludedSocket.broadcast.emit(type, data)
    } else if (room) {
        logger.info(`Emit to room: ${room}`)
        gIo.to(room).emit(type, data)
    } else {
        logger.info(`Emit to all`)
        gIo.emit(type, data)
    }
}


async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    //_printSockets()
    const socket = sockets.find(s => s.userId === userId)
    return socket
}

async function _getAllSockets() {
    const sockets = await gIo.fetchSockets()
    return sockets
}

function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}
