import { useState } from 'react'

import EmojiPicker from 'emoji-picker-react'

import more from '../assets/img/PostPreview/more.svg'
import emoji from '../assets/img/PostPreview/emoji.svg'

import { ActionButtons } from './ActionButtons'


export function PostPreview({ post, postActions, isLiked}) {

    const [postComment, setPostComment] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const commentsCount = post.comments?.length || 0
    const commentsSubtitle = commentsCount>1 ? "comments" : "comment"

    const addComment = () => {
        if (postComment.trim()) {
            console.log(postComment)
            postActions.onAddCommentToPost(post._id, postComment)
            setPostComment("")
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            addComment()
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setPostComment(prevComment => prevComment + event.emoji)
    }

    return (
        <div className="post-preview">

            <div className="post-header">
                <img className="owner-icon" src={post.owner.imgUrl} alt={post.owner.userName} />
                <span className="owner-username">{post.owner.userName}</span>
                <span className="owner-fullName">{post.owner.fullName}</span>
                <span className="date">{post.date}</span>
                <span className="menu">
                    <img className="svg with-effect" src={more} alt="more" />
                </span>
            </div>

            <img className="post-image" src={post.imgUrl} alt={post.imgUrl} />

            <ActionButtons postActions={postActions} post={post} isLiked={isLiked}/>

            <div className="post-message">{post.desc}</div>

            {commentsCount>0 && <div className="comment-count">{post.comments.length} {commentsSubtitle}</div>}
            <div className="comment-area">
                <textarea
                    value={postComment}
                    onChange={(e) => setPostComment(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Add a comment..."
                />

                {postComment.trim() && (
                    <div className="submit-comment" onClick={addComment}>
                        Post
                    </div>
                )}

                <div className="emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <img src={emoji} alt="Emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                </div>
                {showEmojiPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}

            </div>

            <hr/>
        </div>
    );
}
