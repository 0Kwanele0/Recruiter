import styles from "./styles/nav.module.scss";
import logo from "../public/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

function NavBar() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="assets/logo.png" alt="Recruiter" />
      </Link>
      <div className={styles.links}>
        <Link href="/devs">Devs</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}

export default NavBar;
