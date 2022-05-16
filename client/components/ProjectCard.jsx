import styles from "./styles/projectCard.module.scss";

function ProjectCard(props) {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.header}>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <a href={props.link} target="_blank">
        View
      </a>
    </div>
  );
}

export default ProjectCard;
