import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'posts'

export const postService = {
    query,
    getById,
    save,
    remove,
    // addCommentToPost, //disabled until user logic enabled
    // likePost,
    // sharePost,
    // getEmptyPost
}
window.cs = postService


async function query(filterBy = { txt: '' }) {
    try {
        var posts = await storageService.query(STORAGE_KEY)
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            posts = posts.filter(post => regex.test(post.desc))
        }
        return posts
    } catch (error) {
        console.error('Error occurred while querying posts:', error.message);
        throw new Error('Failed to query posts. Please try again later.');
    }
}

function getById(postId) {
    try {
        return storageService.get(STORAGE_KEY, postId)
    } catch (error) {
        console.error(`Error occurred while getting the post ${postId}:`, error.message);
        throw new Error('Failed to remove the post. Please try again later.');
    }
}

async function remove(postId) {
    try {
        await storageService.remove(STORAGE_KEY, postId)
    } catch (error) {
        console.error(`Error occurred while removing the post ${postId}:`, error.message);
        throw new Error('Failed to remove the post. Please try again later.');
    }
}

async function save(post) {
    try {
      const isNewPost = !post._id
      const storageFunction = isNewPost? storageService.post :storageService.put

      if (isNewPost){
        post.owner = userService.getLoggedinUser()
      }

      const savedPost = storageFunction(STORAGE_KEY, post)
      return savedPost

    } catch (error) {
        console.error('Error occurred while saving the post:', error.message);
        throw new Error('Failed to save the post. Please try again later.');
    }
}

async function addCommentToPost(postId, text){
    try {
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) {
            throw new Error('No user is logged in')
        }

        const post = await getById(postId)

        const user = {
            _id: loggedInUser._id,
            userName: loggedInUser.userName,
            imgUrl: loggedInUser.imgUrl
        }

        const comment = {
            id: utilService.makeId(),
            by: user,
            txt: text
        }
        const updatedPost = {
            ...post, comments: [...(post.comments || []), comment]
        }

        await storageService.put(STORAGE_KEY, updatedPost)
        return comment

    } catch (error) {
        console.error('Error occurred while adding comment the post:', error.message);
        throw new Error('Failed to add comment to the post. Please try again later.');
    }
}

async function likePost(postId){
    try {
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) {
            throw new Error('No user is logged in')
        }

        const post = await getById(postId)

        const user = {_id: loggedInUser._id, userName: loggedInUser.userName, imgUrl: loggedInUser.imgUrl}

        const updatedPost = {
            ...post, likedBy: [...(post.likedBy || []), user]
        }
        await storageService.put(STORAGE_KEY, updatedPost)
        return user

    } catch (error) {
        console.error('Error occurred while liking the post:', error.message);
        throw new Error('Failed to like the post. Please try again later.');
    }
}

function sharePost(postId, senderId, recipientId){
    //to do
    try {
        console.log(`Share Post ${postId} with user ${recipientId} by user ${senderId}`)
    } catch (error) {
        console.error('Error occurred while sharing the post:', error.message);
        throw new Error('Failed to share the post. Please try again later.');
    }
}

function getEmptyPost() {
    try {
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) {
            throw new Error('No user is logged in')
        }
        const user = {_id: loggedInUser._id, userName: loggedInUser.userName, imgUrl: loggedInUser.imgUrl}

        const post = {
            _id: utilService.makeId(),
            desc: '',
            imgUrl: '',
            owner: user
        }
        return post
    } catch (error) {
        console.error('Error occurred while creating post:', error.message);
        throw new Error('Failed to create the post. Please try again later.');
    }
}
