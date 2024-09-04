import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'

import emoji from '../assets/img/PostPreview/emoji.svg'


export function CommentArea({post, onAddCommentToPost, showIcon = false, iconSrc = '', isEmojiLarge=false,
    inputRef}) {

    const [postComment, setPostComment] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const commentsCount = post.comments?.length || 0
    const commentsSubtitle = commentsCount>1 ? "comments" : "comment"

    const addComment = () => {
        if (postComment.trim()) {
            console.log(postComment)
            onAddCommentToPost(post._id, postComment)
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
        <>
            {/* {commentsCount>0 && <div className="comment-count"> View {post.comments.length} {commentsSubtitle}</div>} */}

            <div className="comment-area">
                {showIcon && <img src={iconSrc} alt="Owner Icon" className="comment-owner-icon" />}
                <textarea
                    ref={inputRef}
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

                <div className={`emoji ${isEmojiLarge? 'large' : ''}`} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <img src={emoji} alt="Emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                </div>
                {showEmojiPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
        </>
    )
}
