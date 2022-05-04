import styles from "./styles/nav.module.scss";
import logo from "../public/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

function NavBar() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="Recruiter" />
      </Link>
      <ul>
        <Link href="/devs">
          <li>Find</li>
        </Link>
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/login">
          <li>Login</li>
        </Link>
        <Link href="/register">
          <li>SignUp</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;
