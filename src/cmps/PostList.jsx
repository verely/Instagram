import { PostPreview } from "./PostPreview";

export function PostList({posts, postActions, currentUser}){
    return (
        <div className="post-list">
          {posts?.map((post) => (
            <PostPreview
              key={post._id}
              post={post}
              postActions={postActions}
              isLiked={post.likedBy?.some(user => user._id === currentUser._id)}
              isSaved={post.isSaved}
            />
          ))}
        </div>
    );
}
