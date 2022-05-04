import styles from "./styles/profileCard.module.scss";
import { useNavigate } from "react-router-dom";
import location from "../assets/location.png";

function ProfileCard(props) {
  let navigate = useNavigate();
  const imglink = `/uploads/profilephotos/${props.photo}`;
  console.log(imglink);
  return (
    <main
      onClick={() => {
        navigate(`/profile/${props.id}`);
      }}
      className={styles.container}
    >
      <section className={styles.profile}>
        <div className={styles.image}>
          <img src={imglink} alt="" />
        </div>
        <div className={styles.name}>
          <h3>{props.name}</h3>
          <div className={styles.location}>
            <img src={location} alt="" />
            <p>Manzini, eSwatini</p>
          </div>
        </div>
      </section>
      <section className={styles.details}>
        <h3>Web Developer</h3>
        <p>
          Odio sed sed interdum euismod mattis neque, metus eu. Vestibulum,
          nunc, dolor nisi, risus, enim viverra neque.{" "}
        </p>
        <h4>Experience: 2 years</h4>
      </section>
      <ul className={styles.skills}>
        <li>Java</li>
        <li>CSS</li>
        <li>HTML</li>
        <li>Python</li>
        <li>C#</li>
      </ul>
    </main>
  );
}

export default ProfileCard;
