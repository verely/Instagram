import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addPost, getPost, getPosts, deletePost } from './post.controller.js'

export const postRoutes = express.Router()

postRoutes.post('/', requireAuth, addPost)
postRoutes.get('/', getPosts)
postRoutes.get('/:id', getPost)
postRoutes.delete('/:id', requireAuth, deletePost)
// postRoutes.put('/:id',  requireAuth, updatePost)
