import styles from "./styles/profileCard.module.scss";
import location from "../public/assets/icons/location.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";

function ProfileCard(props) {
 const [link, setLink] = useState("");
 const [imglink, setImgLink] = useState();

 async function photoDownloader() {
  try {
   const { data, error } = await supabase.storage
    .from("main")
    .download(`${props.photo}`);
   if (error) throw error;
   else {
    setImgLink(URL.createObjectURL(data));
   }
  } catch (error) {
   console.log(error.message);
  }
 }

 useEffect(() => {
  photoDownloader();
  const token = localStorage.getItem("recruiter-x-auth-token");
  if (token) {
   setLink(`profile/${props.id}`);
  } else {
   setLink("/login");
  }
 }, []);

 return (
  <Link href={link}>
   <main className={styles.container}>
    <div className={styles.top}>
     <section className={styles.profile}>
      <div className={styles.image}>
       {imglink && <img src={imglink} alt="" />}
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
    </div>
    <div className={styles.skillsContainer}>
     <h4>Skills</h4>
     <ul className={styles.skills}>
      {props.skills.map((item, key) => {
       return <li key={key}>{item}</li>;
      })}
     </ul>
    </div>
   </main>
  </Link>
 );
}

export default ProfileCard;
