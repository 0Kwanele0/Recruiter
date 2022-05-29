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
import { useQuery } from "react-query";
import {
  changeEditMenu,
  showProjectEditor,
} from "../../methods/developerprofile/Index";
import Resume from "../../components/Resume";
import ProfilePhoto from "../../components/ProfilePhoto";

function MyProfile() {
  const profileEditor = useRef();
  const plusBtn = useRef();
  const imgPreview = useRef();
  const [editPersonalDetails, setEditPersonalDetails] = useState(true);
  const [editLinks, setEditLinks] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [closing, setClosing] = useState(false);
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const router = useRouter();

  function closeProfileEditor() {
    setClosing(!closing);
    profileEditor.current.style.display = "none";
  }

  function openProfileEditor() {
    profileEditor.current.style.display = "flex";
  }

  function ProjectEditor() {
    return showProjectEditor(setEditProject, plusBtn, editProject);
  }

  function openImagePreview() {
    imgPreview.current.style.display = "flex";
  }
  function closeImagePreview() {
    imgPreview.current.style.display = "none";
  }

  function changeEditorMenu(ev) {
    changeEditMenu(
      ev,
      setEditLinks,
      setEditPersonalDetails,
      setDeleteUser,
      setEditSkills
    );
  }
  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      const parsed = JSON.parse(token);
      setToken(parsed.token);
      setId(parsed.user._id);
    } else {
      router.push("/login");
    }
  }, [id, router, closing]);

  const { isLoading, data, isError } = useQuery("user", fetcher);

  return (
    <main className={mystyles.wrapper}>
      {data ? (
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
              <p onClick={changeEditorMenu}>Personal details</p>
              <p onClick={changeEditorMenu}>Skills</p>
              <p onClick={changeEditorMenu}>Links</p>
              <p onClick={changeEditorMenu}>More</p>
            </div>
            <>
              {editPersonalDetails && (
                <PersonalDetails user={data} token={token} />
              )}
              {editSkills && <SkillsDetails user={data} token={token} />}
              {editLinks && <LinksDetails user={data} token={token} />}
              {deleteUser && <DeleteAccount user={data} token={token} />}
            </>
          </section>
          <section className={mystyles.profile}>
            <div className={mystyles.name}>
              <div ref={imgPreview} className={mystyles.imagePrev}>
                <div onClick={closeImagePreview} className={mystyles.imgHeader}>
                  <Image src={close} width={30} height={30} alt="close" />
                </div>
                {data.profilephoto ? (
                  <div onClick={openImagePreview}>
                    <ProfilePhoto link={data.profilephoto} />
                  </div>
                ) : (
                  data.firstname[0] + data.lastname[0]
                )}
              </div>
              <div onClick={openImagePreview} className={mystyles.image}>
                {data.profilephoto ? (
                  <ProfilePhoto link={data.profilephoto} />
                ) : (
                  data.firstname[0] + data.lastname[0]
                )}
              </div>
              <div className={mystyles.nameAndLocation}>
                <h3>{data.firstname + " " + data.lastname}</h3>
                <div className={mystyles.location}>
                  <Image width={20} height={20} src={location} alt="" />
                  <p>{data.city + ", " + data.country}</p>
                </div>
              </div>
            </div>
            <div className={mystyles.buttons}>
              {data.myresume ? (
                <Resume link={data.myresume} />
              ) : (
                <button>Upload Resume</button>
              )}
              <a href={`mailto: ${data.email}`}>Send Email</a>
            </div>
          </section>
          <section className={mystyles.details}>
            <div className={mystyles.leftSection}>
              <div className={mystyles.skills}>
                <div className={mystyles.heading}>
                  <h4>Skills</h4>
                </div>
                <ul>
                  {data.skills &&
                    data.skills.length > 0 &&
                    data.skills.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                </ul>
              </div>
              <div className={mystyles.links}>
                <div className={mystyles.heading}>
                  <h4>Links</h4>
                </div>
                <ul>
                  {data.links &&
                    data.links.map((item, index) => {
                      if (item.link.length > 0) {
                        return (
                          <a
                            key={index}
                            href={item.link}
                            rel="noreferrer"
                            target="_blank"
                          >
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
                  <h4>{data.category}</h4>
                  <p>Experience: {data.experience ? data.experience : 0}</p>
                </div>
                <p>{data.bio}</p>
              </div>
              <div className={mystyles.projects}>
                <div className={mystyles.heading}>
                  <h4>Projects</h4>
                  <div
                    onClick={ProjectEditor}
                    ref={plusBtn}
                    className={mystyles.edit}
                  >
                    <Image src={plus} width={20} height={20} alt="" />
                  </div>
                </div>
                {editProject && <AddProject user={data} token={token} />}
                <div className={mystyles.projectCards}>
                  {data.projects &&
                    data.projects.map((item, index) => {
                      return (
                        <MyProjectsCard
                          user={data}
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
      ) : isError ? (
        <>
          <p>Error</p>
        </>
      ) : isLoading ? (
        <p>Loading</p>
      ) : (
        <>Null</>
      )}
    </main>
  );
}

export default MyProfile;

function fetcher() {
  return fetch(
    `${process.env.SERVER}/user/${
      JSON.parse(localStorage.getItem("recruiter-x-auth-token")).user._id
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "recruiter-x-auth-token": JSON.parse(
          localStorage.getItem("recruiter-x-auth-token")
        ).token,
      },
    }
  ).then(async (data) => await data.json());
}
