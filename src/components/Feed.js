import PostCard from "./PostCard";
import "./styles.css";

const Feed = ({ posts }) => {
  return (
    <div className="feed">
      {posts.map((i) => (
        <PostCard key={i.id} post={i} />
      ))}
    </div>
  );
};

export default Feed;
