import { PostCommentPreview } from './PostCommentPreview';


export function PostCommentList({ currentUser, postId, comments, likeAction }) {

  if (!Array.isArray(comments) || !comments.length) {
    return <div className="comment-list">No comments available.</div>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <PostCommentPreview
          key={comment._id}
          postId={postId}
          comment={comment}
          likeAction={likeAction}
          isLiked={comment.likedBy?.some(user => user._id === currentUser._id)} />
      ))}
    </div>
  );
}
