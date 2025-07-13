import { useContext } from "react";
import PostCard from "./PostCard";
import "./styles.css";
import DataContext from "../context/DataContext";

const Feed = () => {
  const { posts } = useContext(DataContext);

  return (
    <div className="feed">
      {posts.map((i) => (
        <PostCard key={i.id} post={i} />
      ))}
    </div>
  );
};

export default Feed;
