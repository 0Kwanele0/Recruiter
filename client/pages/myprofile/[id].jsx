import styles from "../../styles/myprofile.module.scss";
import location from "../../public/assets/icons/location.png";
import ProjectCard from "../../components/ProjectCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyProfile() {
  const [user, setUser] = useState();
  const [emailLink, setEmailLink] = useState();
  const [imgLink, setImgLink] = useState();
  const [links, setLinks] = useState();
  const [token, setToken] = useState();
  const router = useRouter();

  async function fetchUser() {
    console.log(token)
    fetch(`http://localhost:3001/user/${router.query.id}`, {
      method: "GET",
      headers: {
        "recruiter-x-auth-token": token.token,
      },
    }).then(async (theuser) => {
      if (theuser.status === 200) {
        const data = await theuser.json();
        setUser(data);
        setEmailLink(`mailto: ${data.email}`);
        setImgLink(`/uploads/profilephotos/${data.profilephoto}`);
        const links = "";
        setLinks(links);
      } else {
        router.push("/login");
      }
    });
  }

  function editProfile(){
    setEditProfile(true)
  }
  function editSkills(){
    setEditSkills(true)
  }
  function editLinks(){
    setEditLinks(true)
  }
  
  function editProjects(){
    setEditProjects(true)
  }

  function deleteAccount(){
    fetch(`http://localhost:3001/user/${router.query.id}`, {
      method: "DELETE",
      headers: {
        "recruiter-x-auth-token": token.token,
      },
    }).then(async (theuser) => {
      if (theuser.status === 200) {
        router.push("/login");
      } else {
        const data = await theuser.json();
        console.log(data)
      }
    });
    router.push('/')
  }

  useEffect(() => {
    const details = localStorage.getItem("recruiter-x-auth-token");
    if (details) {
      const mytoken = JSON.parse(details);
      setToken(mytoken)
      fetchUser();
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <main className={styles.wrapper}>
      {user ? (
        <main className={styles.container}>
          <section className={styles.MyProfile}>
            <div className={styles.name}>
              <div className={styles.image}>
                {imgLink && (
                  <Image
                    src={imgLink}
                    objectFit="cover"
                    width={60}
                    height={60}
                    alt=""
                  />
                )}
              </div>
              <div className={styles.nameAndLocation}>
                <h3>{user.firstname + " " + user.lastname}</h3>
                <div className={styles.location}>
                  <Image width={20} height={20} src={location} alt="" />
                  <p>{user.city + ", " + user.country}</p>
                </div>
              </div>
              <button onClick={editProfile}>Edit</button>
            </div>
            <div className={styles.buttons}>
              <button>Resume</button>
              <a href={emailLink}>Send Email</a>
            </div>
          </section>
          <section className={styles.details}>
            <div className={styles.leftSection}>
              <div className={styles.skills}>
                <h4>Skills</h4>
                <ul>
                  {user.skills &&
                    user.skills.length > 0 &&
                    user.skills.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                </ul>
              </div>
              <div className={styles.links}>
                <h4>Links</h4>
                <ul>
                  {links &&
                    links.map((item, index) => {
                      if (item.link.length > 0) {
                        return (
                          <a key={index} href={item.link} target="_blank">
                            <li>{item.name}</li>
                          </a>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
            <div className={styles.mainSection}>
              <div className={styles.bio}>
                <div className={styles.bioHearder}>
                  <h4>{user.category}</h4>
                  <p>Experience: {user.experience ? user.experience : 0}</p>
                </div>
                <p>{user.bio}</p>
              </div>
              <div className={styles.projects}>
                <h4>Projects</h4>
                <div className={styles.projectCards}>
                  {user.projects &&
                    user.projects.map((item, index) => {
                      return (
                        <ProjectCard
                          key={index}
                          title={item.title}
                          description={item.description}
                          link={item.link}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
          <button onClick={deleteAccount}>Permanantly delete Account!</button>
        </main>
      ) : (
        <> .....</>
      )}
    </main>
  );
}

export default MyProfile;
