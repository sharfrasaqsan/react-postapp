import Post from "./Post";
import "./styles.css";

const Feed = ({ posts }) => {
  return (
    <div className="feed">
      {posts.map((i) => (
        <Post key={i.id} post={i} />
      ))}
    </div>
  );
};

export default Feed;
