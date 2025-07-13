import { Link } from "react-router-dom";
import "./styles.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);

  return (
    <nav className="nav">
      <div className="nav-search-wrapper">
        <form className="nav-search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="nav-search-input"
            type="text"
            required
            id="search-id"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="nav-links-wrapper">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/post" className="nav-link">
              Post
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
