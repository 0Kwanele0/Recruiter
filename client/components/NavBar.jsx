import styles from "./styles/nav.module.scss";
import logo from "../public/assets/logo.png";
import avatar from "../public/assets/icons/profileavatar.png";
import logout from "../public/assets/icons/logout.png";
import settingsicon from "../public/assets/icons/settings.png";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router'

function NavBar() {
  const [logged, setLogged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [details, setDetails] = useState();

  const router = useRouter()

  function settings(){
    setMenu(!menu)
  router.push(`/myprofile/${details.user._id}`)
  return
  
}

function logOut(){
  localStorage.removeItem("recruiter-x-auth-token")
  router.push('/')
  setMenu(!menu)
  }
  
  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    setDetails(JSON.parse(token))
    if (token) {
      setLogged(true);
      setMounted(true);
    } else {
      setMounted(true);
      setLogged(false);
    }
  },[]);

  function showMenu(){
    setMenu(!menu)
  }
  

  return (
    <div className={styles.container}>
      {mounted && (
        <>
          <Link href="/">
            <img src="assets/logo.png" alt="Recruiter" />
          </Link>
          <div className={styles.links}>
            <Link href="/devs">Find Developers</Link>
            <Link href="/about">About</Link>
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
                  {menu &&<div className={styles.miniNav}>
                    <div onClick={settings} className={styles.icon}>
                      <Image src={settingsicon} alt='setting' width={25} height={25} />
                      <p>Settings</p>
                    </div>
                    <div onClick={logOut} className={styles.icon}>
                      <Image src={logout} alt='setting' width={25} height={25} />
                      <p>Logout</p>
                    </div>
                  </div>}
                </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
