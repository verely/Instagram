import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { ObjectId } from 'mongodb'

export const commentService = {
  addComment,
}

async function addComment(comment, loggedInUser) {
  try {
    console.log('comment.postId', comment.postId)
    const { _id, userName, fullName, imgUrl } = loggedInUser
    const by = {
        id: ObjectId.createFromHexString(_id),
        userName,
        fullName,
        imgUrl
    }
    const commentToSave = {
        postId: ObjectId.createFromHexString(comment.postId),
        txt: comment.txt,
        by: by
    }


    console.log('commentToSave', commentToSave)
    console.log('by', by)
    const collection = await dbService.getCollection('comments')
    const result = await collection.insertOne(commentToSave)
    if (result.acknowledged) {

        const insertedId = result.insertedId

        const insertedComment = {
            ...commentToSave,
            _id: insertedId,
            created_at: insertedId.getTimestamp().getTime()
        }
        console.log(insertedComment)
        return insertedComment
    } else {
        throw new Error('Failed to insert comment')
    }
  } catch (err) {
    logger.error('Cannot insert comment', err)
    throw err
  }
}

