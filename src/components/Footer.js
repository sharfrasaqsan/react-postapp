import "./styles.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Quick Post. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
