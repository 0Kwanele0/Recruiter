import styles from "./styles/home.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/", { method: "GET" }).then(async (user) => {
      const data = await user.json();
      setUsers(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>This is the home page</h1>
      <section className={styles.profiles}>
        {users.map((item, key) => {
          return (
            <ProfileCard
              key={key}
              name={item.firstname + " " + item.lastname}
              id={item._id}
              location={item.location}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Home;
