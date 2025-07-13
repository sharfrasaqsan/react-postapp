import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import DataContext from "../context/DataContext";

const EditPost = () => {
  const { posts, editTitle, setEditTitle, editBody, setEditBody, handleEdit } =
    useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((i) => i.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main>
      <article>
        <form className="new-post-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="post-title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            required
            id="post-title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="form-input"
          />

          <label htmlFor="post-body" className="form-label">
            Post Body
          </label>
          <textarea
            id="post-body"
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows="10"
            className="form-textarea"
          />

          <button
            type="submit"
            onClick={() => handleEdit(post.id)}
            className="btn"
          >
            Save
          </button>
        </form>
      </article>
    </main>
  );
};

export default EditPost;
