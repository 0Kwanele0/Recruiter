import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className={styles.body}>{children}</main>
      <Footer />
    </>
  );
}
