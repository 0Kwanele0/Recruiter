import styles from "./styles/profileCard.module.scss";
import location from "../public/assets/icons/location.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import { useQuery } from "react-query";

function ProfileCard(props) {
  const [link, setLink] = useState("");

  function fetcheR() {
    return supabase.storage.from("main").download(`${props.photo}`);
  }
  const { isLoading, data, isError } = useQuery(["pp", props.id], fetcheR);

  useEffect(() => {
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
              {data ? (
                data.data ? (
                  <img src={URL.createObjectURL(data.data)} alt="" />
                ) : (
                  <smaa style={{ color: "black" }}>
                    {props.firstname[0] + props.lastname[0]}
                  </smaa>
                )
              ) : (
                <></>
              )}
            </div>
            <div className={styles.name}>
              <h3>{props.firstname + " " + props.lastname}</h3>
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
