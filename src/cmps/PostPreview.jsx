import more from "../assets/img/PostPreview/more.svg"
import like from "../assets/img/PostPreview/like.svg"
import unlike from "../assets/img/PostPreview/unlike.svg"
import comment from "../assets/img/PostPreview/comment.svg"
import share from "../assets/img/PostPreview/share.svg"
import save from "../assets/img/PostPreview/save.svg"
import remove from "../assets/img/PostPreview/remove.svg"

export function PostPreview({ post, postActions, isLiked, isSaved}) {
    const likeCount = post.likedBy?.length || 0;
    const likeSubtitle = likeCount>0 ? "likes" : "like"
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
            <hr/>
        </div>
    );
}
