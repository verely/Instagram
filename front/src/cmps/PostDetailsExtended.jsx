import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PostOwnerInfoDetailsCard } from './PostOwnerInfoDetailsCard.jsx'
import { PostOwnerCommentInfoDetailsCard } from './PostOwnerCommentInfoDetailsCard.jsx'
import { PostCommentList } from './PostCommentList.jsx'
import { ActionButtons } from './ActionButtons.jsx'
import { CommentArea } from './CommentArea.jsx'

import { postService } from '../services/post.service.js'

import { loadPosts, removePost,
    updateLikeStatus, addCommentToPost,
    sharePost, getActionRemovePost } from '../store/actions/post.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function PostDetailsExtended() {

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [recentPosts, setRecentPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector(state => state.userModule.user)

    useEffect(() => {
      const fetchPostDetails = async () => {
        try {
          const postData = await postService.get(id)
          setPost(postData)
        } catch (error) {
          console.error('Failed to fetch post:', error)
        }
      }

      fetchPostDetails()
    }, [id])

    useEffect(() => {
        const fetchMorePosts = async ()=> {
            setIsLoading(true)
            try {
                if(!post?.owner) return
                const posts = await postService.getPostsByOwnerId(post.owner.id)
                setRecentPosts(posts)
            } catch (err) {
                console.error('Failed to fetch post:', err)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchMorePosts()
    }, [post?.owner])

    const postActions = {
        onRemovePost: onRemovePost,
        onUpdateLikeStatus: onUpdateLikeStatus,
        onAddCommentToPost: onAddCommentToPost,
        onSharePost: onSharePost,
        onSavePost: onSavePost
       }

       async function onRemovePost(postId) {
        try {
            await removePost(postId)
            showSuccessMsg('Post removed')
        } catch (err) {
            showErrorMsg('Cannot remove post')
        }
    }

    async function onUpdateLikeStatus(postId, actionType) {
        try {
            updateLikeStatus(actionType, postId, loggedInUser)
        } catch (err) {
            showErrorMsg(`Cannot ${actionType} post`)
        }
    }

    function onAddCommentToPost(postId, text) {
        try {
            addCommentToPost(postId, text, loggedInUser)
        } catch (err) {
            showErrorMsg(`Cannot comment post`)
        }
    }

    function onSharePost(postId, recipient) {
        console.log(`TODO Share post`)
    }


    function onSavePost(post) {
        console.log(`TODO Save post`)
    }


    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="post-details-extended">
            <div className="post-details-layout">
                <img className="image-area" src={post.imgUrl} alt="post image" />
                <div className='details-area'>
                    <div className='details-header'>
                        <PostOwnerInfoDetailsCard owner = {post?.owner} postId={post._id}
                          onDeleteAction={postActions.onRemovePost} isOwner={loggedInUser._id === post.owner._id}/>
                    </div>

                    <div className='comments'>
                        <PostOwnerCommentInfoDetailsCard owner={post?.owner}
                            postDate={post.created_at} desc={post.desc}/>
                        <PostCommentList currentUser={loggedInUser} postId={post._id}
                            comments={post.comments} likeAction={postActions.onUpdateLikeStatus}/>
                    </div>

                    <div className='details-footer'>
                        <ActionButtons postActions={postActions} post={post} isLiked={post.likedBy?.some(user => user._id === loggedInUser._id)}/>
                        <CommentArea post={post} onAddCommentToPost={postActions.onAddCommentToPost}
                            showIcon="true" iconSrc={loggedInUser.imgUrl} isEmojiLarge="true"/>
                    </div>
                </div>
            </div>
            <div className='more-posts'>
                <div>
                  More posts from <span className='from-post-owner'>{post.owner.userName}</span>
                </div>

                <div className='additional-posts'>
                    {!isLoading && recentPosts.map((post, index) => (
                        <img
                            key={index}
                            className="additional-post-image"
                            src={post.imgUrl}
                            alt={`post image ${index}`}
                        />
                        ))}
               </div>
            </div>

        </div>
    )
}
