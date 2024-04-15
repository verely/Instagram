import { postService } from "../../services/post.service.local.js";
import { userService } from "../../services/user.service.js";
import { store } from '../../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_POST, REMOVE_POST, LIKE_POST, COMMENT_POST,
    SHARE_POST, SAVE_POST, SET_POSTS, UNDO_REMOVE_POST} from "../reducers/post.reducer.js";

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

export function getActionLikePost(post) {
    return {
        type: LIKE_POST,
        post
    }
}

export function getActionCommentPost(post) {
    return {
        type: COMMENT_POST,
        post
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

export async function loadPosts() {
    try {
        const posts = await postService.query()
        console.log(`Posts loaded successfully from DB`)
        store.dispatch(getActionLoadPosts(posts))
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

export async function addCommentToPost(postId, comment) {
    try {
        const savedComment = await postService.save(postId, comment);
        console.log(`Comment ${savedComment} added successfully to Post ${postId}`)
        store.dispatch(getActionCommentPost(postId, savedComment));
        return savedComment;
    } catch (err) {
        console.error(`Failed to add comment to post ${postId}:`, err)
        throw err;
    }
}

export async function likePost(postId, userId) {
    try {
        const userDetails = await userService.getUser(userId)
        const user = { _id: userDetails._id, userName: userDetails.userName, imgUrl: userDetails.imgUrl }
        const likeByUser = await postService.save(postId, user)
        console.log(`Post ${postId} liked successfully by user ${userId}`)
        store.dispatch(getActionLikePost(postId, likeByUser))
        return likeByUser
    } catch (err) {
        console.error(`Failed to like post ${postId}:`, err)
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
