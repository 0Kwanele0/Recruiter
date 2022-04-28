import styles from "./styles/profileCard.module.scss";
import { useNavigate } from "react-router-dom";

function ProfileCard(props) {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h3>{props.name}</h3>
      <p>Web developer</p>
      <h4>{props.location}</h4>
      <ul>
        <li>Java</li>
        <li>CSS</li>
        <li>HTML</li>
        <li>Python</li>
        <li>C#</li>
      </ul>
      <button
        onClick={() => {
          navigate(`/profile/${props.id}`);
        }}
      >
        View Profile
      </button>
    </div>
  );
}

export default ProfileCard;
