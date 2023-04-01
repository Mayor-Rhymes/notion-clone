import { Link, useNavigate } from "react-router-dom";
import { useNotesContext } from "../hooks/useNotesContext";

const Navbar = () => {
  const { dispatch } = useNotesContext();
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "REMOVENOTES" });
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav>
      <h3>NoteTaker</h3>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        {user && (
          <li>
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
