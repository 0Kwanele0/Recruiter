import mystyles from "./styles/profile.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import location from "../assets/location.png";

function Profile() {
  let params = useParams();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/user/${params.id}`, { method: "GET" }).then(
      async (user) => {
        const data = await user.json();
        console.log(data);
        setUsers(data);
      }
    );
  }, []);
  return (
    <main className={mystyles.wrapper}>
      {users ? (
        <main className={mystyles.container}>
          <section className={mystyles.profile}>
            <div className={mystyles.name}>
              <div className={mystyles.image}></div>
              <div className={mystyles.nameAndLocation}>
                <h3>{users.firstname + " " + users.lastname}</h3>
                <div className={mystyles.location}>
                  <img src={location} alt="" />
                  <p>Manzini, eSwatini</p>
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
                  <li>React js</li>
                  <li>JavaScript</li>
                  <li>Node js</li>
                  <li>Python</li>
                </ul>
              </div>
              <div className={mystyles.links}>
                <h4>Links</h4>
                <ul>
                  <li>GitHub</li>
                  <li>Twitter</li>
                  <li>LinkedIn</li>
                </ul>
              </div>
            </div>
            <div className={mystyles.mainSection}>
              <div className={mystyles.bio}>
                <div className={mystyles.bioHearder}>
                  <h4>Web Developer</h4>
                  <p>Experience: 2 years</p>
                </div>
                <p>
                  Nunc eu urna id at vestibulum quisque lobortis et. Commodo
                  tempor blandit erat gravida fermentum pellentesque habitant
                  eget. Massa, aliquam sem ullamcorper faucibus pharetra
                  faucibus sit sit metus. Lectus sit tristique nulla ac
                  malesuada molestie velit commodo. Tortor egestas tempor
                  integer iaculis.
                </p>
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
