import Feed from "./Feed";
import "./styles.css";

const Home = ({ posts }) => {
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
