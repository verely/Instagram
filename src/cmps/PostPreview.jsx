import more from "../assets/img/PostPreview/more.svg"
import like from "../assets/img/PostPreview/like.svg"
import comment from "../assets/img/PostPreview/comment.svg"
import share from "../assets/img/PostPreview/share.svg"
import save from "../assets/img/PostPreview/save.svg"

export function PostPreview({ post, postActions }) {
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
                    <img className="svg" src={more} alt="more" />
                </span>
            </div>

            <img className="post-image" src={post.imgUrl} alt={post.imgUrl} />

            <div className="action-buttons">
                <button className="action-button" onClick={() => postActions.onLikePost(post._id)}>
                    <img className="svg" src={like} alt="like" />
                </button>
                <button className="action-button comment" onClick={() => postActions.onAddCommentToPost(post._id)}>
                    <img className="svg" src={comment} alt="comment" />
                </button>
                <button className="action-button share" onClick={() => postActions.onSharePost(post._id)}>
                    <img className="svg" src={share} alt="share" />
                </button>
                <button className="action-button save" onClick={() => postActions.onSavePost(post._id)}>
                    <img className="svg" src={save} alt="save" />
                </button>
            </div>

            {likeCount>0 && <div className="like-count">{post.likedBy.length} {likeSubtitle}</div>}

            <div className="post-message">{post.desc}</div>
            <hr/>
        </div>
    );
}
