import { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        search,
        setSearch,
        searchPosts,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
        loading,
        handlesubmit,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
