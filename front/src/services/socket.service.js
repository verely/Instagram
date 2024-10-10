import io from 'socket.io-client'
import { authService } from './auth.service'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3000'

let socketServiceInstance = null

export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

function createSocketService() {
    if (socketServiceInstance) return socketServiceInstance

    var socket = null

    const socketService = {
        setup() {
            socket = io(baseUrl)
            const user = authService.getLoggedInUser()
            if (user) {
                this.login(user._id)
            }
            console.log('socketService setup completed')
        },
        on(eventName, cb) {
            //console.log(eventName)
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
            console.log(` ${eventName} ${data} emitted`)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
            console.log('socketService terminated')
        },
    }

    socketServiceInstance = socketService
    return socketService
}
