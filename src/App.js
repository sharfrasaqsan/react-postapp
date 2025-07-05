import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Error from "./components/Error";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "./api/posts";
import EditPost from "./components/EditPost";

function App() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.message);
        } else {
          console.log(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const addNewPost = [...posts, response.data];
      setPosts(addNewPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const listPosts = posts.filter((i) => i.id !== id);
      setPosts(listPosts);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      const updatedPost = posts.map((i) =>
        i.id === id ? { ...response.data } : i
      );
      setPosts(updatedPost);
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const filterResults = posts.filter(
      (i) =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.body.toLowerCase().includes(search.toLowerCase())
    );

    setSearchPosts(filterResults.reverse());
  }, [posts, search]);

  return (
    <div className="app">
      <Header title="React Post App" />
      <Nav search={search} setSearch={setSearch} />

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {loading && (
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </p>
                )}

                {!loading && <Home posts={searchPosts} />}
              </>
            }
          />

          <Route path="post">
            <Route
              index
              element={
                <NewPost
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                  handlesubmit={handlesubmit}
                />
              }
            />
            <Route
              path=":id"
              element={<PostPage posts={posts} handleDelete={handleDelete} />}
            />
          </Route>
          <Route
            path="edit/:id"
            element={
              <EditPost
                posts={posts}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
                handleEdit={handleEdit}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
