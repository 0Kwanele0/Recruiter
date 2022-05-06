import styles from "../../styles/devs.module.scss";
import { useState } from "react";
import ProfileCard from "../../components/ProfileCard";

function Devs({ data }) {
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
        {data.map((item, key) => {
          return (
            <ProfileCard
              key={key}
              name={item.firstname + " " + item.lastname}
              id={item._id}
              photo={item.profilephoto}
              location={item.location}
            />
          );
        })}
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await fetch("http://localhost:3001/user/", {
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

export default Devs;
