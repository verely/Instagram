import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
    query,
    getById,
    getByUserName,
    remove,
    update,
    add,
    updateSavedPosts
}

const BACKEND_PUBLIC_IMAGES_URL = process.env.NODE_ENV === 'true'
  ? '//localhost:3000/images/'
  : '/images/'


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).sort({userName: 1}).toArray()
        users = users.map(user => {
            delete user.password
            user.created_at = (user._id).getTimestamp()
            return user
        })
        return users
    } catch (err) {
        logger.error('Cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId.createFromHexString(userId) })

        return user
    } catch (err) {
        logger.error(`Error while finding user ${userId}`, err)
        throw err
    }
}

async function getByUserName(userName) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ userName })

        return user
    } catch (err) {
        logger.error(`Error while finding user ${userName}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(userId) })
    } catch (err) {
        logger.error(`Cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(userId, userData) {
    try {
        const fieldsToUpdate = {
            userName: userData.userName,
            fullName: userData.fullName,
            password: userData.password,
            imgUrl: userData.imgUrl,
            bio: userData.bio,
            followingCount: userData.followingCount,
            followersCount: userData.followersCount,
            savedPostIds: userData.savedPostIds,
        }
        const collection = await dbService.getCollection('user')
        const updateResult = await collection.updateOne({ _id: ObjectId.createFromHexString(userId) }, { $set: fieldsToUpdate })
        if (updateResult.acknowledged) {
            const updatedUser = {
              ...fieldsToUpdate,
              _id: userId
            }
            return updatedUser
        }
        else {
            throw new Error('Failed to update user');
        }
    } catch (err) {
        logger.error(`Cannot update user ${userId}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const existUser = await getByUserName(user.userName)
        if (existUser) throw new Error('UserName taken')

        const userToSave = {
            userName: user.userName,
            password: user.password,
            fullName: user.fullName || 'New User',
            imgUrl: user.imgUrl || `${BACKEND_PUBLIC_IMAGES_URL}guest-icon.png`,
            bio: user.bio || '',
            followingCount: user.followingCount || 0,
            followersCount: user.followersCount || 0,
            savedPostIds: user.savedPostIds || [],
            isAdmin: user.isAdmin || false
        }

        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToSave)
        return userToSave
    } catch (err) {
        logger.error('Cannot add a user', err)
        throw err
    }
}

async function updateSavedPosts(userId, postId) {
    try {
        const collection = await dbService.getCollection('user')
        const updateResult = await collection.updateOne(
            { _id: ObjectId.createFromHexString(userId) },
            { $addToSet: { savedPostIds: postId } })

            if (updateResult.acknowledged) {
                return true 
            }
            else {
                throw new Error('Failed to update user');
            }
    } catch (err) {
        logger.error(`Cannot update user ${userId} saved posts`, err);
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                userName: txtCriteria
            },
            {
                fullName: txtCriteria
            }
        ]
    }
    if (filterBy.followingCount) {
        criteria.followingCount = { $gte: filterBy.followingCount }
    }
    if (filterBy.followersCount) {
        criteria.followersCount = { $gte: filterBy.followersCount }
    }
    return criteria
}
