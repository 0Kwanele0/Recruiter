import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import mystyles from "../../styles/profile.module.scss";
import location from "../../public/assets/icons/location.png";
import pen from "../../public/assets/icons/pen.png";
import plus from "../../public/assets/icons/plus.png";
import close from "../../public/assets/icons/close.png";
import ProjectCard from "../../components/ProjectCard";
import PersonalDetails from "../../components/EditProfile/PersonalDetails";
import SkillsDetails from "../../components/EditProfile/SkillsDetails";
import LinksDetails from "../../components/EditProfile/linksDetails";

function Profile() {
  const [user, setUser] = useState();
  const [emailLink, setEmailLink] = useState();
  const [imgLink, setImgLink] = useState();
  const [links, setLinks] = useState([]);
  const profileEditor = useRef();
  const [editPersonalDetails, setEditPersonalDetails] = useState(true);
  const [editLinks, setEditLinks] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const router = useRouter();

  function closeProfileEditor() {
    profileEditor.current.style.display = "none";
  }
  function openProfileEditor() {
    profileEditor.current.style.display = "flex";
  }

  function showProjectEditor() {
    setEditProject(!editProject);
  }

  function changeEditMenu(ev) {
    switch (ev.target.innerText) {
      case "Personal details":
        setEditLinks(false);
        setEditPersonalDetails(true);
        setEditSkills(false);
        return;
      case "Links":
        setEditLinks(true);
        setEditPersonalDetails(false);
        setEditSkills(false);
        return;
      case "Skills":
        setEditLinks(false);
        setEditPersonalDetails(false);
        setEditSkills(true);
        return;
    }
  }

  async function fetchingUser(token) {
    const id = router.query.id;
    return fetch(`http://localhost:3001/user/${id}`, {
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
        if (data.links) {
          setLinks(JSON.parse(data.links[0]));
        }
      } else {
        router.push("/login");
      }
    });
  }

  useEffect(() => {
    const details = localStorage.getItem("recruiter-x-auth-token");
    if (details) {
      const token = JSON.parse(details);
      fetchingUser(token.token);
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
            <div className={mystyles.close}>
              <div onClick={closeProfileEditor} className={mystyles.closeBtn}>
                <Image src={close} width={25} height={25} alt="add project" />
              </div>
            </div>
            <div className={mystyles.menu}>
              <p onClick={changeEditMenu}>Personal details</p>
              <p onClick={changeEditMenu}>Skills</p>
              <p onClick={changeEditMenu}>Links</p>
            </div>
            <>
              {editPersonalDetails && <PersonalDetails user={user} />}
              {editSkills && <SkillsDetails user={user} />}
              {editLinks && <LinksDetails user={user} />}
            </>
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
                  <div onClick={showProjectEditor} className={mystyles.edit}>
                    <Image src={plus} width={20} height={20} alt="" />
                  </div>
                </div>
                {editProject && (
                  <div className={mystyles.addProject}>
                    <form action="">
                      <div className={mystyles.addProjectNames}>
                        <input type="text" placeholder="Project name" />
                        <input type="url" placeholder="Project link" />
                      </div>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Project description"
                      ></textarea>
                      <button>Add project</button>
                    </form>
                  </div>
                )}
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
        <></>
      )}
    </main>
  );
}

export default Profile;
