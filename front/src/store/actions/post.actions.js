import { postService } from '../../services/post.service.js'
import { store } from '../../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_POST, REMOVE_POST, LIKE_POST, UNLIKE_POST, COMMENT_POST,
    SHARE_POST, SAVE_POST, SET_POSTS, UNDO_REMOVE_POST} from '../reducers/post.reducer.js'

// Action Creators:
export function getActionAddPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function getActionRemovePost(postId) {
    return {
        type: REMOVE_POST,
        postId
    }
}

export function getActionLikePost(postId, user) {
    return {
        type: LIKE_POST,
        postId,
        user
    }
}

export function getActionUnLikePost(postId, user) {
    return {
        type: UNLIKE_POST,
        postId,
        user
    }
}

export function getActionCommentPost(postId, comment) {
    return {
        type: COMMENT_POST,
        postId,
        comment
    }
}

export function getActionSharePost(post) {
    return {
        type: SHARE_POST,
        post
    }
}

export function getActionSavePost(post) {
    return {
        type: SAVE_POST,
        post
    }
}

export function getActionLoadPosts(posts) {
    return {
        type: SET_POSTS,
        posts
    }
}

export async function loadPosts(page) {
    try {
        const filterBy = {pageIndex: page}
        const {posts, totalCount} = await postService.query(filterBy)

        console.log(`Posts loaded successfully from DB`)

        store.dispatch(getActionLoadPosts(posts))

        const loadedPostsCount = store.getState().postModule.posts.length
        const hasMorePosts = loadedPostsCount < totalCount
        //console.log(`page: ${page}, totalCount: ${totalCount}, loadedPostsCount: ${loadedPostsCount}, hasMorePosts: ${hasMorePosts}`)

        return hasMorePosts
    } catch (err) {
        console.error('Cannot load posts', err)
        throw err
    }
}

export async function addPost(post) {
    try {
        const savedPost = await postService.save(post)
        console.log(`Post ${savedPost} added successfully`)
        store.dispatch(getActionAddPost(savedPost))
        return savedPost
    } catch (err) {
        console.error('Failed to add post:', err)
        throw err
    }
}

export async function removePost(postId) {
    try {
        await postService.remove(postId)
        store.dispatch(getActionRemovePost(postId))
    } catch (err) {
        console.error(`Failed to delete post ${postId}:`, err)
        throw err
    }
}

export async function onRemovePostOptimistic(postId) {
    store.dispatch(getActionRemovePost(postId))
    showSuccessMsg('Post removed')

    try {
        await postService.remove(postId)
        console.log(`Post ${postId} deleted successfully`)
    } catch (err) {
        showErrorMsg('Cannot remove post');
        console.error(`Failed to delete post ${postId}:`, err)
        store.dispatch({
            type: UNDO_REMOVE_POST,
        });
    }
}

export async function addCommentToPost(postId, text, user) {
    try {
        const savedComment = await postService.addCommentToPost(postId, text, user)
        console.log(`Comment ${savedComment} added successfully to Post ${postId}`)
        store.dispatch(getActionCommentPost(postId, savedComment))
        return savedComment
    } catch (err) {
        console.error(`Failed to add comment to post ${postId}:`, err)
        throw err
    }
}

export async function updateLikeStatus(actionType, postId, user) {
    try {
        const likeByUser = await postService.updateLikeStatus(actionType, postId, user)
        console.log(`${actionType} post ${postId} completed`)
        if (actionType === "like")
         store.dispatch(getActionLikePost(postId, user))
        else
         store.dispatch(getActionUnLikePost(postId, user))
        return likeByUser
    } catch (err) {
        console.error(`Failed to ${actionType} post ${postId}:`, err)
        throw err
    }
}

export async function sharePost(postId, senderId, recipientId) {
    try {
        console.log(`Post ${postId} shared with ${recipientId} successfully by user ${senderId}`)
        store.dispatch(getActionSharePost(postId, senderId, recipientId))
    } catch (err) {
        console.error(`Failed to share post ${postId}:`, err)
        throw err
    }
}

export async function savePost(post) {
    addPost(post)
}
