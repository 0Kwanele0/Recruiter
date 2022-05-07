import styles from "./styles/profileCard.module.scss";
import { useRouter } from "next/router";
import location from "../public/assets/icons/location.png";
import Image from "next/image";

function ProfileCard(props) {
  const router = useRouter();

  const imglink = `/uploads/profilephotos/${props.photo}`;
  console.log(imglink);
  return (
    <main
      onClick={() => {
        router.push(`/profile/${props.id}`);
      }}
      className={styles.container}
    >
      <section className={styles.profile}>
        <div className={styles.image}>
          <Image
            width={50}
            height={50}
            src={imglink}
            alt=""
            objectFit="cover"
          />
        </div>
        <div className={styles.name}>
          <h3>{props.name}</h3>
          <div className={styles.location}>
            <Image src={location} alt="" width={20} height={20} />
            <p>{props.city + ", " + props.country}</p>
          </div>
        </div>
      </section>
      <section className={styles.details}>
        <h3>{props.category}</h3>
        <p>{props.bio}</p>
        <h4>
          Experience: <span>{props.experience}</span>
        </h4>
      </section>
      <div className={styles.skillsContainer}>
        <h4>Skills</h4>
        <ul className={styles.skills}>
          {props.skills.map((item, key) => {
            return <li key={key}>{item}</li>;
          })}
        </ul>
      </div>
    </main>
  );
}

export default ProfileCard;
