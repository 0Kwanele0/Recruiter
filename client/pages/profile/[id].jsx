import mystyles from "../../styles/profile.module.scss";
import location from "../../public/assets/icons/location.png";
import pen from "../../public/assets/icons/pen.png";
import plus from "../../public/assets/icons/plus.png";
import ProjectCard from "../../components/ProjectCard";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function Profile() {
  const [user, setUser] = useState();
  const [emailLink, setEmailLink] = useState();
  const [imgLink, setImgLink] = useState();
  const [links, setLinks] = useState();
  const profileEditor = useRef();
  const router = useRouter();

  async function fetchUser(token) {
    return fetch(`http://localhost:3001/user/${router.query.id}`, {
      method: "GET",
      headers: {
        "recruiter-x-auth-token": token,
      },
    }).then(async (user) => {
      if (user.status === 200) {
        const data = await user.json();
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

  function closeProfileEditor() {
    profileEditor.current.style.display = "none";
  }
  function openProfileEditor() {
    profileEditor.current.style.display = "flex";
  }

  useEffect(() => {
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);
    if (details) {
      fetchUser(token.token);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <main className={mystyles.wrapper}>
      {user ? (
        <main className={mystyles.container}>
          <div className={mystyles.editProfile}>
            <p>Edit profile</p>
            <div onClick={openProfileEditor} className={mystyles.edit}>
              <Image src={pen} width={20} height={20} alt="" />
            </div>
          </div>
          <section ref={profileEditor} className={mystyles.editor}>
            <div onClick={closeProfileEditor} className={mystyles.close}>
              <Image src={plus} width={20} height={20} alt="add project" />
            </div>
            <form action="">
              <div className={mystyles.inputContainer}>
                <div className={mystyles.inputAndLabel}>
                  <label htmlFor="">FirstName</label>
                  <input value={user.firstname} name="firstname" type="text" />
                </div>
                <div className={mystyles.inputAndLabel}>
                  <label htmlFor="">LaststName</label>
                  <input value={user.lastname} name="lastname" type="text" />
                </div>
              </div>
              <div className={mystyles.inputAndLabel}>
                <label htmlFor="">Profile photo</label>
                <input
                  value={user.laststname}
                  name="profilephoto"
                  type="file"
                />
              </div>
              <div className={mystyles.inputContainer}>
                <div className={mystyles.inputAndLabel}>
                  <label htmlFor="">City</label>
                  <input value={user.city} name="city" type="text" />
                </div>
                <div className={mystyles.inputAndLabel}>
                  <label htmlFor="">Country</label>
                  <input value={user.country} name="country" type="text" />
                </div>
              </div>
              <button>Save</button>
            </form>
          </section>
          <section className={mystyles.profile}>
            <div className={mystyles.name}>
              <div className={mystyles.image}>
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
              <div className={mystyles.nameAndLocation}>
                <h3>{user.firstname + " " + user.lastname}</h3>
                <div className={mystyles.location}>
                  <Image width={20} height={20} src={location} alt="" />
                  <p>{user.city + ", " + user.country}</p>
                </div>
              </div>
            </div>
            <div className={mystyles.buttons}>
              <button>Resume</button>
              <a href={emailLink}>Send Email</a>
            </div>
          </section>
          <section className={mystyles.details}>
            <div className={mystyles.leftSection}>
              <div className={mystyles.skills}>
                <div className={mystyles.heading}>
                  <h4>Skills</h4>
                </div>
                <ul>
                  {user.skills &&
                    user.skills.length > 0 &&
                    user.skills.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                </ul>
              </div>
              <div className={mystyles.links}>
                <div className={mystyles.heading}>
                  <h4>Links</h4>
                </div>
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
            <div className={mystyles.mainSection}>
              <div className={mystyles.bio}>
                <div className={mystyles.bioHearder}>
                  <h4>{user.category}</h4>
                  <p>Experience: {user.experience ? user.experience : 0}</p>
                </div>
                <p>{user.bio}</p>
              </div>
              <div className={mystyles.projects}>
                <div className={mystyles.heading}>
                  <h4>Project</h4>
                </div>
                <div className={mystyles.projectCards}>
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
        </main>
      ) : (
        <> .....</>
      )}
    </main>
  );
}

export default Profile;
