import { post } from './data-model/post.js'

export function PostPreview({ post }) {
    return (
        <div className="post-preview">

            <div className="owner-details">
                <img className="owner-icon" src={post.owner.imgUrl} alt={post.owner.userName} />
                <span className="owner-username">{post.owner.userName}</span>
            </div>

            <img className="post-image" src={post.imgUrl} alt="Post" />

            <div className="action-buttons">
                <button className="action-button save">Save</button>
                <button className="action-button post">Post</button>
                <button className="action-button like">Like</button>
                <button className="action-button comment">Comment</button>
            </div>

            <div className="like-count">{post.likedBy.length} Likes</div>

            <div className="post-message">{post.desc}</div>
        </div>
    );
}
