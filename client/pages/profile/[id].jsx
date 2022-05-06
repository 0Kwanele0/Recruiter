import mystyles from "../../styles/profile.module.scss";
import location from "../../public/assets/icons/location.png";
import ProjectCard from "../../components/ProjectCard";
import Image from "next/image";

function Profile({ data }) {
  const user = data;
  const emailLink = `mailto: ${data.email}`;
  const imglink = `/uploads/profilephotos/${data.profilephoto}`;
  const links = JSON.parse(user.links);
  console.log(user);

  return (
    <main className={mystyles.wrapper}>
      {user ? (
        <main className={mystyles.container}>
          <section className={mystyles.profile}>
            <div className={mystyles.name}>
              <div className={mystyles.image}>
                {imglink && (
                  <Image
                    src={imglink}
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
                <h4>Skills</h4>
                <ul>
                  {user.skills &&
                    user.skills.length > 0 &&
                    user.skills.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                </ul>
              </div>
              <div className={mystyles.links}>
                <h4>Links</h4>
                <ul>
                  {user.links &&
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
                <h4>Projects</h4>
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
        <> nothimg</>
      )}
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const data = await fetch(`http://localhost:3001/user/${context.params.id}`, {
    method: "GET",
  }).then(async (user) => {
    const data = await user.json();
    return data;
  });

  return {
    props: {
      data,
    },
  };
};

export default Profile;
