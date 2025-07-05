import { Link } from "react-router-dom";
import "./styles.css";

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`post/${post.id}`} className="back-link">
        {" "}
        <h2 className="post-title">{post.title}</h2>
        <p className="post-datetime">{post.datetime}</p>
      </Link>

      <p className="post-body">
        {post.body.length <= 60 ? post.body : `${post.body.slice(0, 60)}...`}
      </p>
    </article>
  );
};

export default Post;
