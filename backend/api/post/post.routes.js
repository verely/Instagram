import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addPost, getPost, getPosts } from './post.controller.js'

export const postRoutes = express.Router()

postRoutes.post('/', requireAuth, addPost)
postRoutes.get('/', getPosts)
postRoutes.get('/:id', getPost)
// postRoutes.put('/:id',  updatePost)

// postRoutes.delete('/:id', deletePost)
// postRoutes.put('/:id',  requireAuth, updatePost)
