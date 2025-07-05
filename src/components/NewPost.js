import "./styles.css";

const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handlesubmit,
}) => {
  return (
    <main className="new-post-container">
      <h2 className="new-post-heading">Create New Post</h2>
      <form className="new-post-form" onSubmit={handlesubmit}>
        <label htmlFor="post-title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          required
          id="post-title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Enter post title"
          className="form-input"
        />

        <label htmlFor="post-body" className="form-label">
          Post Body
        </label>
        <textarea
          id="post-body"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Write your post here..."
          rows="10"
          className="form-textarea"
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
