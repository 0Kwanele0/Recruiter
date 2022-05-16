import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import mystyles from "../../styles/profile.module.scss";
import location from "../../public/assets/icons/location.png";
import pen from "../../public/assets/icons/pen.png";
import plus from "../../public/assets/icons/plus.png";
import close from "../../public/assets/icons/close.png";
import MyProjectsCard from "../../components/EditProfile/developer/MyProjectsCard";
import PersonalDetails from "../../components/EditProfile/developer/PersonalDetails";
import SkillsDetails from "../../components/EditProfile/developer/SkillsDetails";
import LinksDetails from "../../components/EditProfile/developer/LinksDetails";
import DeleteAccount from "../../components/EditProfile/developer/DeleteAccount";
import AddProject from "../../components/EditProfile/developer/AddProject";

function MyProfile() {
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [emailLink, setEmailLink] = useState();
  const [imgLink, setImgLink] = useState();
  const [links, setLinks] = useState([]);
  const profileEditor = useRef();
  const plusBtn = useRef();
  const [editPersonalDetails, setEditPersonalDetails] = useState(true);
  const [editLinks, setEditLinks] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
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

  function showProjectEditor() {
    setEditProject(!editProject);
    if (editProject) {
      plusBtn.current.style.transform = "rotate(0)";
    } else {
      plusBtn.current.style.transform = "rotate(45deg)";
    }
  }

  function changeEditMenu(ev) {
    switch (ev.target.innerText) {
      case "Personal details":
        setEditLinks(false);
        setEditPersonalDetails(true);
        setEditSkills(false);
        setDeleteUser(false);
        return;
      case "Links":
        setEditLinks(true);
        setEditPersonalDetails(false);
        setEditSkills(false);
        setDeleteUser(false);
        return;
      case "Skills":
        setEditLinks(false);
        setEditPersonalDetails(false);
        setEditSkills(true);
        setDeleteUser(false);
        return;
      case "More":
        setEditLinks(false);
        setEditPersonalDetails(false);
        setEditSkills(false);
        setDeleteUser(true);
        return;
    }
  }

  async function fetchingUser() {
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);
    if (token.user.type == "Developer") {
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
          setEmailLink(`mailto: ${data.email}`);
          setImgLink(`/uploads/profilephotos/${data.profilephoto}`);
          if (data.links) {
            setLinks(data.links);
          }
        } else {
        }
      });
    } else {
      router.push("/recruiterprofile");
    }
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
              <p onClick={changeEditMenu}>More</p>
            </div>
            <>
              {editPersonalDetails && (
                <PersonalDetails user={user} token={token} />
              )}
              {editSkills && <SkillsDetails user={user} token={token} />}
              {editLinks && <LinksDetails user={user} token={token} />}
              {deleteUser && <DeleteAccount user={user} token={token} />}
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
                  <h4>Projects</h4>
                  <div
                    onClick={showProjectEditor}
                    ref={plusBtn}
                    className={mystyles.edit}
                  >
                    <Image src={plus} width={20} height={20} alt="" />
                  </div>
                </div>
                {editProject && <AddProject user={user} token={token} />}
                <div className={mystyles.projectCards}>
                  {user.projects &&
                    user.projects.map((item, index) => {
                      return (
                        <MyProjectsCard
                          user={user}
                          token={token}
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

export default MyProfile;
