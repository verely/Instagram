import { postService } from './post.service.js'
import { logger } from '../../services/logger.service.js'
import { UnauthorizedError } from '../auth/auth.error.js'
import { commentService } from './comment.service.js'
import { socketService } from '../../services/socket.service.js'

export async function addPost(req, res) {
    const { loggedInUser } = req
    const { post } = req.body

    try {
        const postToSave = await postService.add(post, loggedInUser)
        res.send(postToSave)
    } catch (error) {
        logger.error(`Cannot add a post`, error)
        res.status(400).send(`Cannot add a post`)
    }
}

export async function getPost(req, res) {
    try {
        const post = await postService.getById(req.params.id)
        res.send(post)
    } catch (err) {
        logger.error('Failed to get post', err)
        res.status(500).send({ err: 'Failed to get post' })
    }
}

export async function getPosts(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            postOwnerId: req.query?.postOwnerId || '',
            pageIndex: req.query?.pageIndex || 1
        }
        const posts = await postService.query(filterBy)
        res.send(posts)
    } catch (err) {
        logger.error('Failed to get posts', err)
        res.status(500).send({ err: 'Failed to get posts' })
    }
}

export async function deletePost(req, res) {
    const { loggedInUser } = req
    const postId = req.params.id
    try {
        await postService.remove(postId, loggedInUser)
        res.send('post deleted')
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            logger.error(`Failed remove post ${postId}: ${err.message}`)
            res.status(err.statusCode).send(`Failed remove post: ${err.message}`)
        } else {
            logger.error(`Failed remove post ${postId}`, err);
            res.status(500).send(`Failed remove post: ${err.message}`)
        }
    }
}

export async function updatePost(req, res) {
    const { loggedInUser } = req
    const { post } = req.body
    //console.log(post)
    try {
        await postService.update(post, loggedInUser)
        res.send('updated')
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            logger.error(`Failed update post ${post._id}: ${err.message}`)
            res.status(403).send(`Failed update post: ${err.message}`)
        } else {
            logger.error(`Failed update post ${post._id}`, err)
            res.status(500).send(`Failed update post: ${err.message}`)
        }
    }
}

export const addComment = async (req, res) => {
    const { loggedInUser } = req
    const {comment} = req.body
    //console.log('add comment',comment)
    try {
        const post = await postService.getById(comment.postId)
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        const savedComment = await commentService.addComment(comment, loggedInUser)

        // Notify all users except initiator of the post comment adding
		socketService.broadcast({ type: 'post-comment-added', data: savedComment, userId: loggedInUser._id })

        res.status(201).send(savedComment)
    } catch (err) {
        logger.error('Failed to add comment', err)
        res.status(500).send({ error: 'Failed to add comment' })
    }
  }

export async function getComments(req, res) {
    const postId = req.params.id
    try {
        const comments = await commentService.getCommentsByPostId(postId)
        res.json(comments)
    } catch (error) {
        logger.error(`Failed to get comments for post ${postId}`, error)
        res.status(500).send({ error: 'Failed to get comments' })
    }
}
