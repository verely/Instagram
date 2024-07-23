// import { dbService } from '../../services/db.service.js'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

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
            post.created_at = ObjectId.createFromHexString(post._id).getTimestamp()
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
        const postToSave = {
            desc: post.desc,
            imgUrl: post.imgUrl,
            owner: loggedInUser
        }
        const collection = await dbService.getCollection('post')
        const insertionResult = await collection.insertOne(postToSave)
        if (insertionResult.acknowledged) {

            const insertedId = insertionResult.insertedId
            console.log(`createFromHexString: ${ObjectId.createFromHexString(insertedId).getTimestamp().getTime()}`)
            console.log(`new ${ObjectId.createFromHexString(insertedId).getTimestamp().getTime()}`)

            const insertedPost = {
                ...postToSave,
                _id: insertedId,
                created_at: ObjectId.createFromHexString(insertedId).getTimestamp().getTime()
            };
            console.log(insertedPost)
            return insertedPost;
        } else {
            throw new Error('Failed to insert post');
        }
    } catch (err) {
        logger.error('Cannot insert post', err)
        throw err
    }
}


async function remove(postId) {
    try {
        const collection = await dbService.getCollection('post')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(postId) })
    } catch (err) {
        logger.error(`Cannot remove post ${postId}`, err)
        throw err
    }
}
