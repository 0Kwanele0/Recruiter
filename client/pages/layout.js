import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/layout.module.scss";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Layout({ children }) {
  const loarder = useRef();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      loarder.current.style.display = "block";
    });
    router.events.on("routeChangeComplete", () => {
      loarder.current.style.display = "none";
    });
  }, [router]);

  return (
    <>
      <NavBar />
      <div ref={loarder} className={styles.loader}></div>
      <main className={styles.body}>{children}</main>
      <Footer />
    </>
  );
}
