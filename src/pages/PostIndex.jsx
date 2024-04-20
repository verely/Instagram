import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts, addPost, removePost,
    addCommentToPost, likePost, sharePost, getActionRemovePost } from '../store/actions/post.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { postService } from '../services/post.service.local.js'
import { PostList } from '../cmps/PostList.jsx'
import { CreatePost } from '../cmps/CreatePost.jsx'



export function PostIndex() {

    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const posts = useSelector(storeState => storeState.postModule.posts)
    const dispatch = useDispatch()

    const handleOpenCreatePost = () => {
       setIsCreatePostOpen(true);
    };

    const handleCloseCreatePost = () => {
       setIsCreatePostOpen(false);
    };

    useEffect(() => {
        loadPosts()
    }, [])


    function getLoggedInUser() {
        const imgPath = '../media_samples/img_profile/sloner.jpeg'
        return { "_id": "u103", "userName": "Sloner_garden", "fullName": "Mashtelat Sloner", "imgUrl": imgPath}
        //return userService.getLoggedinUser()
    }

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

    async function onLikePost(postId) {
        try {
            const likedBy = await likePost(postId)
            showSuccessMsg(`Post liked by user (id: ${likedBy.userName})`)
        } catch (err) {
            showErrorMsg('Cannot like post')
        }
    }

    function onSharePost(postId, recipient) {
        console.log(`TODO Share post`)
    }

    function onSavePost(post) {
        console.log(`TODO Save post`)
    }

    const postActions = {
        onAddPost: onAddPost,
        onRemovePost: onRemovePost,
        onLikePost: onLikePost,
        onAddCommentToPost: onAddCommentToPost,
        onSharePost: onSharePost,
        onSavePost: onSavePost
       };

    return (
        <div className="layout-container">
            <nav>
                <h1>Nav</h1>
            </nav>
            <section>
                <div className="content-area">
                    <div className="featured-stories">

                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />

                    </div>
                    <div className='posts'>
                      <PostList posts={posts} postActions={postActions}/>
                    </div>
                </div>
                <button onClick={handleOpenCreatePost}>Add Post </button>
                <CreatePost isOpen={isCreatePostOpen} onClose={handleCloseCreatePost} owner={getLoggedInUser()}/>
            </section>
        </div>
    )
}
