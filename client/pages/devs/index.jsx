import styles from "../../styles/devs.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import { useRouter } from "next/router";

function Devs() {
  const router = useRouter();
  const [data, setData] = useState();

  async function fetchUsers() {
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);

    fetch("http://localhost:3001/user/", {
      method: "GET",
      headers: {
        "recruiter-x-auth-token": token.token,
      },
    }).then(async (user) => {
      if (user.status === 200) {
        const data = await user.json();
        const filtered = data.filter((item) => {
          if (item._id !== token.user._id) {
            return item;
          }
        });
        setData(filtered);
      } else {
        router.push("/login");
      }
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      fetchUsers();
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.container}>
          <section className={styles.filter}>
            <form action="submit">
              <input placeholder="Location" type="text" />
              <input placeholder="Field" type="text" />
              <input placeholder="Skills" type="text" />
              <button>Filter</button>
            </form>
          </section>
          <section className={styles.profiles}>
            {data.map((item, key) => {
              return (
                <ProfileCard
                  key={key}
                  name={item.firstname + " " + item.lastname}
                  id={item._id}
                  photo={item.profilephoto}
                  city={item.city}
                  experience={item.experience}
                  country={item.country}
                  bio={item.bio}
                  skills={item.skills}
                  category={item.category}
                />
              );
            })}
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Devs;
