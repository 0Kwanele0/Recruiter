import styles from "./styles/nav.module.scss";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img
        onClick={() => {
          navigate("/");
        }}
        src={logo}
        alt="Recruiter"
      />
      <ul>
        <li
          onClick={() => {
            navigate("/devs");
          }}
        >
          Find
        </li>
        <li>About</li>
        <li>Login</li>
        <li>SignUp</li>
      </ul>
    </div>
  );
}

export default NavBar;
