import styles from "./styles/profileCard.module.scss";
import { useRouter } from "next/router";
import location from "../public/assets/location.png";
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
