import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
//import path from 'path'

import { logger } from './services/logger.service.js'

const app = express()
const server = http.createServer(app)

const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://localhost:3000',
    ],
    credentials: true
}

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { postRoutes } from './api/post/post.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

import { setupSocketAPI } from './services/socket.service.js'
setupSocketAPI(server)

// const port = 3030
const port = process.env.PORT || 3000
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

server.listen(port, () =>
    logger.info(`Server listening on port ${port}`)
)
