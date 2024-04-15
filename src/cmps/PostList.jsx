import { PostPreview } from "./PostPreview";

export function PostList({posts, postActions}){
    return (
        <div className="post-list">
          {posts?.map((post) => (
            <PostPreview
              key={post._id}
              post={post}
              postActions={postActions}
            />
          ))}
        </div>
    );
}
