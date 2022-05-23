import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import mystyles from "../../styles/profile.module.scss";
import location from "../../public/assets/icons/location.png";
import ProjectCard from "../../components/ProjectCard";
import { supabase } from "../../data/supabaseClient";
import close from "../../public/assets/icons/close.png";

function Profile() {
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [emailLink, setEmailLink] = useState();
  const [imgLink, setImgLink] = useState();
  const [links, setLinks] = useState([]);
  const router = useRouter();
  const [resumeLink, setResumeLink] = useState();
  const [linksCount, setLinksCount] = useState(0);
  const imgPreview = useRef();

  function openImagePreview() {
    imgPreview.current.style.display = "flex";
  }
  function closeImagePreview() {
    imgPreview.current.style.display = "none";
  }

  async function fetchingUser() {
    setLinksCount(0);
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);
    return fetch(`${process.env.SERVER}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "recruiter-x-auth-token": token.token,
      },
    }).then(async (user) => {
      if (user.status === 200) {
        const userdata = await user.json();
        setUser(userdata);
        setEmailLink(`mailto: ${userdata.email}`);
        if (userdata.links) {
          setLinks(userdata.links);
          let mylist = userdata.links;
          mylist.map((item) => {
            if (item.link.length > 1) {
            } else {
              setLinksCount(linksCount + 1);
            }
          });
        }
        if (userdata.profilephoto && !userdata.myresume) {
          try {
            const { data, error } = await supabase.storage
              .from("main")
              .download(`${userdata.profilephoto}`);
            if (error) throw error;
            else {
              setImgLink(URL.createObjectURL(data));
            }
          } catch (error) {
            console.log(error.message);
          }
        } else if (userdata.profilephoto && userdata.myresume) {
          try {
            const { data, error } = await supabase.storage
              .from("main")
              .download(`${userdata.profilephoto}`);
            if (error) throw error;
            else {
              setImgLink(URL.createObjectURL(data));
            }
          } catch (error) {
            console.log(error.message);
          }
          try {
            const { data, error } = await supabase.storage
              .from("main")
              .download(`${userdata.myresume}`);
            if (error) throw error;
            else {
              setResumeLink(URL.createObjectURL(data));
            }
          } catch (error) {
            console.log(error.message);
          }
        } else if (!userdata.profilephoto && userdata.myresume) {
          try {
            const { data, error } = await supabase.storage
              .from("main")
              .download(`${userdata.myresume}`);
            if (error) throw error;
            else {
              setResumeLink(URL.createObjectURL(data));
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    });
  }

  useEffect(() => {
    setId(router.query.id);
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      fetchingUser();
    } else {
      router.push("/login");
    }
  }, [id, router]);

  return (
    <main className={mystyles.wrapper}>
      {user ? (
        <main className={mystyles.container}>
          <section className={mystyles.profile}>
            <div className={mystyles.name}>
              <div ref={imgPreview} className={mystyles.imagePrev}>
                <div onClick={closeImagePreview} className={mystyles.imgHeader}>
                  <Image src={close} width={30} height={30} alt="close" />
                </div>
                {imgLink && (
                  <img onClick={openImagePreview} src={imgLink} alt="" />
                )}
              </div>
              <div className={mystyles.image}>
                {imgLink && (
                  <img onClick={openImagePreview} src={imgLink} alt="" />
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
              {user.myresume ? (
                <a className={mystyles.resumelink} href={resumeLink}>
                  Download resume
                </a>
              ) : null}
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
                  {links && linksCount === 4 ? (
                    <p>No links</p>
                  ) : (
                    links.map((item, index) => {
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
                    })
                  )}
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
                </div>
                <div className={mystyles.projectCards}>
                  {user.projects && user.projects.length > 0 ? (
                    user.projects.map((item, index) => {
                      return (
                        <ProjectCard
                          key={index}
                          title={item.title}
                          description={item.description}
                          link={item.link}
                        />
                      );
                    })
                  ) : (
                    <p>No projects</p>
                  )}
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
