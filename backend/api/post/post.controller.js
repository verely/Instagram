import { postService } from './post.service.js'
import { logger } from '../../services/logger.service.js'

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
            txt: req.query?.txt || ''
        }
        const posts = await postService.query(filterBy)
        res.send(posts)
    } catch (err) {
        logger.error('Failed to get posts', err)
        res.status(500).send({ err: 'Failed to get posts' })
    }
}


