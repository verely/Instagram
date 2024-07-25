// import { dbService } from '../../services/db.service.js'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { UnauthorizedError } from '../../api/auth/auth.error.js'

import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const postService = {
    query,
    getById,
    add,
    remove
}

async function query(filterBy = {}) {
    try {
        let criteria = {}
        if (filterBy.txt) {
            criteria.desc = { $regex: filterBy.txt, $options: 'i' }}

        const collection = await dbService.getCollection('post')
        var posts = await collection.find(criteria).toArray()
        posts = posts.map(post => {
            post.created_at = post._id.getTimestamp()
            return post
        })
        return posts
    } catch (err) {
        logger.error('Cannot find posts', err)
        throw err
    }
}

async function getById(postId) {
    try {
        const collection = await dbService.getCollection('post')
        const post = await collection.findOne({ _id: ObjectId.createFromHexString(postId) })
        return post
    } catch (err) {
        logger.error(`Error while finding post ${postId}`, err)
        throw err
    }
}

async function add(post, loggedInUser) {
    try {
        const { _id, userName, fullName, imgUrl, isAdmin } = loggedInUser
        const owner = {
            id: ObjectId.createFromHexString(_id),
            userName,
            fullName,
            imgUrl,
            isAdmin
        }
        const postToSave = {
            desc: post.desc,
            imgUrl: post.imgUrl,
            owner: owner
        }
        console.log('postToSave',postToSave)
        const collection = await dbService.getCollection('post')
        const insertionResult = await collection.insertOne(postToSave)
        if (insertionResult.acknowledged) {

            const insertedId = insertionResult.insertedId

            const insertedPost = {
                ...postToSave,
                _id: insertedId,
                created_at: insertedId.getTimestamp().getTime()
            }
            console.log(insertedPost)
            return insertedPost
        } else {
            throw new Error('Failed to insert post');
        }
    } catch (err) {
        logger.error('Cannot insert post', err)
        throw err
    }
}

async function remove(postId, loggedInUser) {
    try {
        if (!(await hasPermission(postId, loggedInUser))) {
            throw new UnauthorizedError("Only admin or post owner can remove it")
        }

        const collection = await dbService.getCollection('post')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(postId) })
    }
    catch (err) {
        logger.error(`Cannot remove post ${postId}`, err)
        throw err
    }
}

async function hasPermission(postId, loggedInUser) {
    try {
        if (loggedInUser.isAdmin)
        return true

        const post = await getById(postId)
        return post.owner.id === loggedInUser._id
    } catch (err) {
        logger.error(`Error checking permission for post ${postId}`, err)
        throw err
    }
}
