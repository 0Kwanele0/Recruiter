import Image from "next/image";
import styles from "../../styles/projectCard.module.scss";
import bin from "../../../public/assets/icons/bin.png";
import { useState } from "react";
import { useRouter } from "next/router";

function MyProjectsCard(props) {
  const router = useRouter();
  const [data, setData] = useState(props.title);

  function deleteProject(e) {
    e.preventDefault();
    fetch(`${process.env.SERVER}/user/deleteproject/${props.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "recruiter-x-auth-token": props.token,
      },
      body: JSON.stringify({ projectTitle: data }),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
        router.reload();
      } else {
      }
    });
  }

  return (
    <div className={styles.container}>
      <div onClick={deleteProject} className={styles.image}>
        <Image src={bin} width={30} height={30} alt="trash" />
      </div>
      <div>
        <h3 className={styles.header}>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <a href={props.link} rel="noreferrer" target="_blank">
        View
      </a>
    </div>
  );
}

export default MyProjectsCard;
