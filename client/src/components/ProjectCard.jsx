import styles from "./styles/projectCard.module.scss";

function ProjectCard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <h3 className={styles.header}>{props.title}</h3>
      <p>{props.description}</p>
      <button
        onClick={() => {
          console.log(props.title);
        }}
      >
        View
      </button>
    </div>
  );
}

export default ProjectCard;
