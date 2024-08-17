import like from "../assets/img/PostPreview/like.svg"
import unlike from "../assets/img/PostPreview/unlike.svg"
import comment from "../assets/img/PostPreview/comment.svg"
import share from "../assets/img/PostPreview/share.svg"
import save from "../assets/img/PostPreview/save.svg"
import remove from "../assets/img/PostPreview/remove.svg"

export function ActionButtons({ postActions, post, isLiked }) {

    const likeCount = post.likedBy?.length || 0;
    const likeSubtitle = likeCount > 1? "likes" : "like"

    const isSaved = post.isSaved

    return (
        <div className="action-buttons">
            <div className="action-buttons-layout">
                <button className="action-button" onClick={() => postActions.onUpdateLikeStatus(post._id, isLiked? "unlike" : "like")}>
                    <img className={isLiked? "svg" : "svg with-effect"} src={isLiked? unlike : like} alt="like" />
                </button>
                <button className="action-button comment" onClick={() => postActions.onCommentDisplayAction(post._id)}>
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
        </div>
    )
}
