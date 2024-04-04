import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts, addPost, removePost, addCommentToPost, likePost, sharePost, getActionRemovePost } from '../store/actions/post.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { postService } from '../services/post.service.local.js'

export function PostIndex() {

    const posts = useSelector(storeState => storeState.postModule.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        loadPosts()
    }, [])

    async function onRemovePost(postId) {
        try {
            await removePost(postId)
            showSuccessMsg('Post removed')
        } catch (err) {
            showErrorMsg('Cannot remove post')
        }
    }

    async function onAddPost() {
        const post = postService.getEmptyPost()
        try {
            const savedPost = await addPost(post)
            showSuccessMsg(`Post added (id: ${savedPost._id})`)
        } catch (err) {
            showErrorMsg('Cannot add post')
        }
    }

    function onAddCommentToPost(text) {
        console.log(`TODO Adding comment to post`)
    }

    return (
        <div>
            <h3>Posts App</h3>
            <main>
                <button onClick={onAddPost}>Add Post </button>
            </main>
        </div>
    )
}
