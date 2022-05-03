import styles from "./styles/devs.module.scss";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";

function Devs() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/", { method: "GET" }).then(async (user) => {
      const data = await user.json();
      setUsers(data);
    });
  }, []);

  return (
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

export default Devs;
