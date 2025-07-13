import { useContext } from "react";
import "../components/styles.css";
import DataContext from "../context/DataContext";

const Header = () => {
  const { title } = useContext(DataContext);

  return <header className="header">{title}</header>;
};

export default Header;
