import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { logger } from './services/logger.service.js'

const app = express()

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
app.use(cors(corsOptions))
app.use(express.json())

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { postRoutes } from './api/post/post.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)


// const port = 3030
const port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Hello there'))
app.listen(port, () =>
    logger.info(`Server listening on port ${port}`)
)
