import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addPost, getPost, getPosts, deletePost, updatePost,
    addComment, getComments, getSavedPosts } from './post.controller.js'

export const postRoutes = express.Router()

postRoutes.post('/', requireAuth, addPost)
postRoutes.get('/', getPosts)
postRoutes.get('/:id', getPost)
postRoutes.delete('/:id', requireAuth, deletePost)
postRoutes.put('/:id',  requireAuth, updatePost)

postRoutes.post('/:id/comments', requireAuth, addComment)
postRoutes.get('/:id/comments', requireAuth, getComments)
postRoutes.post('/:userName/saved', requireAuth, getSavedPosts)
