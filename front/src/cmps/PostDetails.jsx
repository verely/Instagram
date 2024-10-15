import { useState, useEffect , useRef} from 'react'
import { useSelector } from 'react-redux'

import { PostOwnerInfoDetailsCard } from './PostOwnerInfoDetailsCard.jsx'
import { PostOwnerCommentInfoDetailsCard } from './PostOwnerCommentInfoDetailsCard.jsx'
import { PostCommentList } from './PostCommentList.jsx'
import { ActionButtons } from './ActionButtons.jsx'
import { CommentArea } from './CommentArea.jsx'

import { postService } from '../services/post.service.js'
// import { guestPostService } from '../services/guest.post.service.js'
import { removePost,
         updateLikeStatus, addCommentToPost } from '../store/actions/post.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function PostDetails({postId}) {

    //const [post, setPost] = useState(null)
    const selectPostById = (state, postId) => state.postModule.posts.find(post => post._id === postId)
    const post = useSelector(state => selectPostById(state, postId))
    const loggedInUser = useSelector(state => state.userModule.user)
    //const isGuestMode = useSelector(state => state.userModule.isGuestMode)
    const [shouldFocus, setShouldFocus] = useState(false)
    const commentInputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState(null)

    const onCommentDisplayAction = () => {
      setShouldFocus(true)
    }

    useEffect(() => {
        if (shouldFocus && commentInputRef.current) {
          commentInputRef.current.focus()
          setShouldFocus(false)
        }
    }, [shouldFocus])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setIsLoading(true)
                const comments = await postService.getCommentsByPostId(postId)
                console.log('comments', comments)
                setComments(comments)
            } catch (error) {
                console.error('Failed to fetch post:', error)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchComments()

    }, [postId])

    const postActions = {
        onRemovePost: onRemovePost,
        onUpdateLikeStatus: onUpdateLikeStatus,
        onAddCommentToPost: onAddCommentToPost,
        onSharePost: onSharePost,
        onSavePost: onSavePost,
        onCommentDisplayAction: onCommentDisplayAction
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
        //console.log(`TODO Share post`)
    }


    function onSavePost(post) {
        console.log(`TODO Save post`)
    }

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="post-details">
            <img className="image-area" src={post.imgUrl} alt="post image" />
            <div className='details-area'>
                <div className='details-header'>
                    <PostOwnerInfoDetailsCard owner = {post?.owner} postId={post._id}
                        onDeleteAction={postActions.onRemovePost} isOwner={loggedInUser._id === post.owner._id}/>
                </div>

                <div className='comments'>
                    <PostOwnerCommentInfoDetailsCard owner={post?.owner}
                        postDate={post.created_at} desc={post.desc}/>
                    {!isLoading  && <PostCommentList currentUser={loggedInUser} postId={post._id}
                        comments={comments} likeAction={postActions.onUpdateLikeStatus}/>}
                </div>

                <div className='details-footer'>
                    <ActionButtons postActions={postActions} post={post} isLiked={post.likedBy?.some(user => user._id === loggedInUser._id)}/>
                </div>
                <div className='comment-footer'>
                    <CommentArea post={post} onAddCommentToPost={postActions.onAddCommentToPost}
                        showIcon={false} iconSrc={loggedInUser.imgUrl} isEmojiLarge={true}
                        inputRef={commentInputRef}/>
                </div>
            </div>
        </div>
    )
}
