import mystyles from "./styles/profile.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import location from "../assets/location.png";

function Profile() {
  let params = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/user/${params.id}`, { method: "GET" }).then(
      async (user) => {
        const data = await user.json();
        console.log(data);
        setUser(data);
      }
    );
  }, []);
  return (
    <main className={mystyles.wrapper}>
      {user ? (
        <main className={mystyles.container}>
          <section className={mystyles.profile}>
            <div className={mystyles.name}>
              <div className={mystyles.image}></div>
              <div className={mystyles.nameAndLocation}>
                <h3>{user.firstname + " " + user.lastname}</h3>
                <div className={mystyles.location}>
                  <img src={location} alt="" />
                  <p>{user.location}</p>
                </div>
              </div>
            </div>
            <div className={mystyles.buttons}>
              <button>Resume</button>
              <button>Send Email</button>
            </div>
          </section>
          <section className={mystyles.details}>
            <div className={mystyles.leftSection}>
              <div className={mystyles.skills}>
                <h4>Skills</h4>
                <ul>
                  {user.skills.length > 0 &&
                    user.skills.map((item, index) => {
                      <li key={index}>{item}</li>;
                    })}
                </ul>
              </div>
              <div className={mystyles.links}>
                <h4>Links</h4>
                <ul>
                  {user.links.length > 0 &&
                    user.links.map((item, index) => {
                      <li key={index}>{item.name}</li>;
                    })}
                </ul>
              </div>
            </div>
            <div className={mystyles.mainSection}>
              <div className={mystyles.bio}>
                <div className={mystyles.bioHearder}>
                  <h4>Web Developer</h4>
                  <p>
                    Experience: {user.experience ? user.experience : 0} years
                  </p>
                </div>
                <p>{user.bio}</p>
              </div>
              <div className={mystyles.projects}>
                <h4>Projects</h4>
                <div className={mystyles.projectCards}></div>
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
