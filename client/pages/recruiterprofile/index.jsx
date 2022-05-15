import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/recruiterProfile.module.scss";
import location from "../../public/assets/icons/location.png";
import close from "../../public/assets/icons/close.png";
import PersonalDetails from "../../components/EditProfile/PersonalDetails";

function MyProfile() {
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const profileEditor = useRef();
  const [closing, setClosing] = useState(false);
  const [token, setToken] = useState();
  const router = useRouter();

  function closeProfileEditor() {
    setClosing(!closing);
    profileEditor.current.style.display = "none";
  }
  function openProfileEditor() {
    profileEditor.current.style.display = "flex";
  }

  async function fetchingUser() {
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);
    return fetch(`http://localhost:3001/user/${token.user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "recruiter-x-auth-token": token.token,
      },
    }).then(async (user) => {
      if (user.status === 200) {
        const data = await user.json();
        setUser(data);
        if (data.links) {
        }
      } else {
      }
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      fetchingUser();
      const parsed = JSON.parse(token);
      setToken(parsed.token);
      setId(parsed.user._id);
    } else {
      router.push("/login");
    }
  }, [id, router, closing]);

  return (
    <main className={styles.wrapper}>
      {user ? (
        <main className={styles.container}>
          <section ref={profileEditor} className={styles.editor}>
            <div className={styles.close}>
              <div onClick={closeProfileEditor} className={styles.closeBtn}>
                <Image src={close} width={25} height={25} alt="add project" />
              </div>
            </div>
            <>
              <PersonalDetails user={user} token={token} />
            </>
          </section>
          <section className={styles.profile}>
            <div className={styles.name}>
              <h3>{user.firstname + " " + user.lastname}</h3>
              <div className={styles.location}>
                <Image width={20} height={20} src={location} alt="" />
                <p>{user.city + ", " + user.country}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <button onClick={openProfileEditor}>Edit profile</button>
            </div>
          </section>
          <section className={styles.details}>
            <div className={styles.mainSection}>
              <h4>Recruiter</h4>
              <p>Enjoy your search for talent</p>
            </div>
          </section>
        </main>
      ) : (
        <></>
      )}
    </main>
  );
}

export default MyProfile;
