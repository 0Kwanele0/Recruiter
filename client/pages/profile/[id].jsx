import mystyles from "../../styles/profile.module.scss";
import location from "../../public/assets/icons/location.png";
import pen from "../../public/assets/icons/pen.png";
import close from "../../public/assets/icons/close.png";
import ProjectCard from "../../components/ProjectCard";
import Image from "next/image";
import twitter from "../../public/assets/icons/twitter.png";
import github from "../../public/assets/icons/github.png";
import linkedin from "../../public/assets/icons/linkedin.png";
import internet from "../../public/assets/icons/internet.png";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function Profile() {
  const [user, setUser] = useState();
  const [emailLink, setEmailLink] = useState();
  const [imgLink, setImgLink] = useState();
  const [links, setLinks] = useState();
  const profileEditor = useRef();
  const [editPersonalDetails, setEditPersonalDetails] = useState(true);
  const [editLinks, setEditLinks] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [typedSkill, setTypedSkill] = useState("");
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
        setSkills(data.skills);
        const links = "";
        setLinks(links);
      } else {
        router.push("/login");
      }
    });
  }

  function addSkill(e) {
    e.preventDefault();
    if (!skills.includes(typedSkill)) {
      setSkills([...skills, typedSkill]);
      setTypedSkill("");
    }
    setTypedSkill("");
  }
  function removeSkill(e) {
    const skill = e.target.innerText;
    setSkills(
      skills.filter((ee) => {
        if (ee != skill) {
          return ee;
        }
      })
    );
  }

  function saveSkills(e) {
    e.preventDefault();
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(skills),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
        console.log(data);
      } else {
        console.log(data);
      }
    });
  }

  function closeProfileEditor() {
    profileEditor.current.style.display = "none";
  }
  function openProfileEditor() {
    profileEditor.current.style.display = "flex";
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
            <div className={mystyles.close}>
              <div onClick={closeProfileEditor} className={mystyles.closeBtn}>
                <Image src={close} width={25} height={25} alt="add project" />
              </div>
            </div>
            <div className={mystyles.menu}>
              <p onClick={changeEditMenu}>Personal details</p>
              <p onClick={changeEditMenu}>Links</p>
              <p onClick={changeEditMenu}>Skills</p>
            </div>
            <>
              {editPersonalDetails && (
                <form action="">
                  <div className={mystyles.inputContainer}>
                    <div className={mystyles.inputAndLabel}>
                      <label htmlFor="">FirstName</label>
                      <input
                        value={user.firstname}
                        name="firstname"
                        type="text"
                      />
                    </div>
                    <div className={mystyles.inputAndLabel}>
                      <label htmlFor="">LaststName</label>
                      <input
                        value={user.lastname}
                        name="lastname"
                        type="text"
                      />
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
              )}
              {editLinks && (
                <form action="">
                  <div className={mystyles.addSkills}>
                    <input
                      placeholder="Type you skill e.g React"
                      type="text"
                      value={typedSkill}
                      onChange={(e) => {
                        setTypedSkill(e.target.value);
                      }}
                      name=""
                      id=""
                    />
                    <button
                      onClick={addSkill}
                      className={mystyles.addSkillsBtn}
                    >
                      Add
                    </button>
                  </div>
                  <div className={mystyles.displaySkills}>
                    {skills &&
                      skills.length > 0 &&
                      skills.map((item, index) => {
                        return (
                          <p onClick={removeSkill} key={index}>
                            {item}
                          </p>
                        );
                      })}
                  </div>
                  <button>Save</button>
                </form>
              )}
              {editSkills && (
                <form action="">
                  <div className={mystyles.skillsfield}>
                    <Image src={github} width={40} height={40} />
                    <input
                      name="github"
                      placeholder="Add you GitHub Link"
                      type="text"
                    />
                  </div>
                  <div className={mystyles.skillsfield}>
                    <Image src={linkedin} width={40} height={40} />
                    <input
                      name="linkedin"
                      placeholder="Add you LinkedIn Link"
                      type="text"
                    />
                  </div>
                  <div className={mystyles.skillsfield}>
                    <Image src={twitter} width={40} height={40} />
                    <input
                      name="twitter"
                      placeholder="Add you Twitter Link"
                      type="text"
                    />
                  </div>
                  <div className={mystyles.skillsfield}>
                    <Image src={internet} width={40} height={40} />
                    <input
                      name="portfolio"
                      placeholder="Add your Portfolio Link"
                      type="text"
                    />
                  </div>
                  <button type="submit">Save</button>
                </form>
              )}
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
        <></>
      )}
    </main>
  );
}

export default Profile;
