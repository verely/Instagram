import { utilService } from '../services/util.service';
import like from "../assets/img/PostPreview/like.svg"
import unlike from "../assets/img/PostPreview/unlike.svg"

export function PostCommentPreview({ postId, comment, likeAction, isLiked }) {
    const commentDateFormatted = utilService.formatDate(comment.created_at);
    const commentLikeCount = comment.likedBy?.length || 0;
    const commentsLikeSubtitle = commentLikeCount > 1 ? "likes" : "like";
    return (
        <div className="card-container PostCommentPreview">
            <img className="icon" src={comment.by.imgUrl} alt="icon" />
            <div className="info">
                <span className="userName">{comment.by.userName}</span>
                <span className="date">• {commentDateFormatted}</span>
            </div>
            <span className="comment">{comment.txt}</span>
            <button className="action-button" onClick={() => likeAction(postId, comment._id, isLiked ? "unlike" : "like")}>
                <img className={isLiked ? "svg" : "svg with-effect"} src={isLiked ? unlike : like} alt="like" />
            </button>
            <span className="commentLikeCount">{commentLikeCount}</span>
            {commentLikeCount > 0 && <div className="comment-like-count"> {commentLikeCount} {commentsLikeSubtitle}</div>}
        </div>
    );
}


