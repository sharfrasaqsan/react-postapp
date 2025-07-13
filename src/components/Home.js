import Feed from "./Feed";
import "./styles.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Home = () => {
  const { posts } = useContext(DataContext);

  return (
    <main className="home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p className="no-posts">No posts available</p>
      )}
    </main>
  );
};

export default Home;
