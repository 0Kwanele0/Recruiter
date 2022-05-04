import styles from "./styles/nav.module.scss";
import logo from "../public/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="Recruiter" />
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
