import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((i) => i.id.toString() === id);

  return (
    <main className="post-page-container">
      <article className="single-post">
        {post && (
          <>
            <h2 className="single-post-title">{post.title}</h2>
            <p className="single-post-date">{post.datetime}</p>
            <p className="single-post-body">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="edit-btn">Edit</button>
            </Link>
            <button
              className="delete-btn"
              onClick={() => {
                handleDelete(post.id);
                navigate("/");
              }}
            >
              Delete
            </button>
          </>
        )}

        {!post && (
          <>
            <p className="no-post">No post found.</p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
