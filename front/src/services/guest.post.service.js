import { storageService } from './async-storage.service'
import { guestServiceLocal } from './guest.service.local'

export const guestPostService = {
    query,
    get,
    save,
    getPostsByOwnerId,
    remove
}
window.cs = guestPostService

const STORAGE_KEY = 'guest_posts'

async function query(filterBy = {txt: ''}) {
    try {
        var posts = await storageService.query(STORAGE_KEY, 'session')
        console.log(JSON.stringify(posts))
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            posts = posts.filter(post => regex.test(post.desc))
        }
        const userPosts = posts
            .map(post => ({
                _id: post._id,
                imgUrl: post.imgUrl,
                created_at: post.created_at,
                likeCount: post.likedBy ? post.likedBy.length : 0,
                commentCount: post.comments ? post.comments.length : 0,
                owner: post.owner
            }))
        console.log(JSON.stringify(userPosts))
        return userPosts
    } catch (err) {
        console.error('Error occurred while querying posts', err.message)
        throw new Error('Failed to query posts. Please try again later.')
    }
}

function get(postId) {
    try {
        return storageService.get(STORAGE_KEY, postId, 'session')
    } catch (error) {
        console.error(`Error occurred while getting the post ${postId}:`, error.message)
        throw new Error('Failed to remove the post. Please try again later.')
    }
}

function save(post) {
    try {
        const isNewPost = !post._id
        const storageFunction = isNewPost? storageService.post : storageService.put

        if (isNewPost){
          post.owner = guestServiceLocal.getGuestUser()
          post.created_at = new Date()
        }

        const savedPost = storageFunction(STORAGE_KEY, post, 'session')
        return savedPost

      } catch (err) {
          console.error('Error occurred while saving the post:', err.message)
          throw new Error('Failed to save the post. Please try again later.')
      }
}

async function getPostsByOwnerId(ownerId) {
    try {
        const posts = await storageService.query(STORAGE_KEY, 'session')

        const userPosts = posts
            .filter(post => post.owner._id === ownerId)
            .map(post => ({
                _id: post._id,
                imgUrl: post.imgUrl,
                created_at: post.created_at,
                likeCount: post.likedBy ? post.likedBy.length : 0,
                commentCount: post.comments ? post.comments.length : 0
            }))
        return userPosts
    } catch (err) {
        console.error('Error occurred while querying posts by ownerId:', err.message)
        throw new Error('Failed to query posts by ownerId. Please try again later.')
    }
}

async function remove(postId) {
    try {
        await storageService.remove(STORAGE_KEY, postId, 'session')
    } catch (error) {
        console.error(`Error occurred while removing the post ${postId}:`, error.message)
        throw new Error('Failed to remove the post. Please try again later.')
    }
}
