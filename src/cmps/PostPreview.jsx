import { useState } from "react"
import EmojiPicker from 'emoji-picker-react';
import more from "../assets/img/PostPreview/more.svg"
import like from "../assets/img/PostPreview/like.svg"
import unlike from "../assets/img/PostPreview/unlike.svg"
import comment from "../assets/img/PostPreview/comment.svg"
import share from "../assets/img/PostPreview/share.svg"
import save from "../assets/img/PostPreview/save.svg"
import remove from "../assets/img/PostPreview/remove.svg"
import emoji from "../assets/img/PostPreview/emoji.svg"

export function PostPreview({ post, postActions, isLiked, isSaved}) {
    const [postComment, setPostComment] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const likeCount = post.likedBy?.length || 0;
    const likeSubtitle = likeCount>1 ? "likes" : "like"

    const commentsCount = post.comments?.length || 0;
    const commentsSubtitle = commentsCount>1 ? "comments" : "comment"

    const addComment = () => {
        if (postComment.trim()) {
            console.log(postComment)
            postActions.onAddCommentToPost(post._id, postComment);
            setPostComment("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            addComment();
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setPostComment(prevComment => prevComment + event.emoji);
    };

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

            <div className="action-buttons">
                <button className="action-button" onClick={() => postActions.onUpdateLikeStatus(post._id, isLiked? "unlike" : "like")}>
                    <img className={isLiked? "svg" : "svg with-effect"} src={isLiked? unlike : like} alt="like" />
                </button>
                <button className="action-button comment" onClick={() => postActions.onAddCommentToPost(post._id)}>
                    <img className="svg with-effect" src={comment} alt="comment" />
                </button>
                <button className="action-button share" onClick={() => postActions.onSharePost(post._id)}>
                    <img className="svg with-effect" src={share} alt="share" />
                </button>
                <button className="action-button save" onClick={() => postActions.onSavePost(post._id)}>
                    <img className={isSaved? "svg" : "svg with-effect"} src={isSaved? remove : save} alt="save" />
                </button>
            </div>

            {likeCount>0 && <div className="like-count">{post.likedBy.length} {likeSubtitle}</div>}

            <div className="post-message">{post.desc}</div>

            {commentsCount>0 && <div className="like-count">{post.comments.length} {commentsSubtitle}</div>}
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
