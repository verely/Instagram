import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getUser, getUsers, deleteUser, updateUser, addUser } from './user.controller.js'

export const userRoutes = express.Router()

// userRoutes.use(requireAuth)

userRoutes.post('/', addUser)
userRoutes.get('/', getUsers)
userRoutes.get('/:id', getUser)
userRoutes.put('/:id',  updateUser)
userRoutes.delete('/:id', deleteUser)
//userRoutes.put('/:id',  requireAuth, updateUser)
// userRoutes.delete('/:id',  requireAuth, requireAdmin, deleteUser)
