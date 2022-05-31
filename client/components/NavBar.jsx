import styles from "./styles/nav.module.scss";
import avatar from "../public/assets/icons/profileavatar.png";
import logout from "../public/assets/icons/logout.png";
import settingsicon from "../public/assets/icons/settings.png";
import close from "../public/assets/icons/closer.png";
import emenu from "../public/assets/icons/menu.png";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function NavBar() {
  const [logged, setLogged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [details, setDetails] = useState();
  const [themenu, setThemenu] = useState(emenu);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const mobileMenu = useRef(null);

  const router = useRouter();

  function settings() {
    openMobileMenu();

    setMenu(!menu);
    if (details.user.type) {
      if (details.user.type == "Recruiter") {
        router.push(`/recruiterprofile`);
        return;
      } else {
        router.push(`/developerprofile`);
        return;
      }
    } else {
    }
  }

  function logOut() {
    localStorage.removeItem("recruiter-x-auth-token");
    openMobileMenu();
    router.reload();
    setMenu(!menu);
  }

  function showMenu() {
    setMenu(!menu);
  }

  function openMobileMenu() {
    if (mobileMenuOpened) {
      mobileMenu.current.style.display = "none";
      setMobileMenuOpened(false);
      setThemenu(emenu);
    } else {
      mobileMenu.current.style.display = "flex";
      setThemenu(close);
      setMobileMenuOpened(true);
    }
  }

  function goHome() {
    mobileMenu.current.style.display = "none";
    setMobileMenuOpened(false);
    setThemenu(emenu);
    router.push("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    const parsed = JSON.parse(token);
    if (token) {
      setDetails(parsed);
      setLogged(true);
      setMounted(true);
    } else {
      setMounted(true);
      setLogged(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      {mounted && (
        <>
          <div className={styles.pcNav}>
            <Link href="/">
              <h3 className={styles.logo}>
                <span>R</span>ecruitor
              </h3>
            </Link>
            <div className={styles.links}>
              <Link href="/devs">Find Developers</Link>
              {!logged ? (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>{" "}
                </>
              ) : (
                <div className={styles.profile}>
                  <div onClick={showMenu}>
                    <Image src={avatar} alt="Profile" width={30} height={30} />
                  </div>
                  {menu && (
                    <div className={styles.miniNav}>
                      <div onClick={settings} className={styles.icon}>
                        <Image
                          src={settingsicon}
                          alt="setting"
                          width={25}
                          height={25}
                        />
                        <p>Settings</p>
                      </div>
                      <div onClick={logOut} className={styles.icon}>
                        <Image
                          src={logout}
                          alt="setting"
                          width={25}
                          height={25}
                        />
                        <p>Logout</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.mobileNav}>
            <div onClick={goHome}>
              <h3 className={styles.logo}>
                <span>R</span>ecruitor
              </h3>
            </div>
            <div className={styles.right}>
              <div onClick={openMobileMenu} className={styles.humburger}>
                <Image src={themenu} alt="menu" width={30} height={30} />
              </div>
              <div ref={mobileMenu} className={styles.links}>
                <p
                  onClick={() => {
                    router.push("/devs");
                    openMobileMenu();
                  }}
                >
                  Find Developers
                </p>
                {!logged ? (
                  <>
                    <p
                      onClick={() => {
                        router.push("/login");
                        openMobileMenu();
                      }}
                    >
                      Login
                    </p>
                    <p
                      onClick={() => {
                        router.push("/register");
                        openMobileMenu();
                      }}
                    >
                      Register
                    </p>
                  </>
                ) : (
                  <div className={styles.miniNav}>
                    <div onClick={settings} className={styles.icon}>
                      <Image
                        src={settingsicon}
                        alt="setting"
                        width={25}
                        height={25}
                      />
                      <p>Profile</p>
                    </div>
                    <div onClick={logOut} className={styles.icon}>
                      <Image
                        src={logout}
                        alt="setting"
                        width={25}
                        height={25}
                      />
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
