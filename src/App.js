import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Error from "./components/Error";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import EditPost from "./components/EditPost";
import DataContext from "./context/DataContext";
import { useContext } from "react";

function App() {
  const { loading } = useContext(DataContext);

  return (
    <div className="app">
      <Header title="React Post App" />
      <Nav />

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

                {!loading && <Home />}
              </>
            }
          />

          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
