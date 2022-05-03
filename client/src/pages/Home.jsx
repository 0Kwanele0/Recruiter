import styles from "./styles/home.module.scss";
import illustration from "../assets/illustration.svg";
import fields from "../assets/fields.svg";
import projects from "../assets/projects.svg";
import links from "../assets/links.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <section className={styles.showcase}>
        <div className={styles.text}>
          <h1>The place where recruiters find talent.</h1>
          <p>
            Find the type of developers your company needs. detailed search
            filters to help your requirements
          </p>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                navigate("/devs");
              }}
            >
              Find Talent
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Create Dev Profile
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <img src={illustration} alt="" />
        </div>
      </section>
      <section className={styles.filters}>
        <div className={styles.title}>
          <h2>Advanced Filters</h2>
          <p>
            Our search filters allows you to go straight to what you're looking
            for
          </p>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h4>By Location</h4>
            <p>
              Urna, orci, convallis volutpat, nibh et velit, neque. Neque cras
              posuere purus, mattis congue nisl.{" "}
            </p>
          </div>
          <div className={styles.card}>
            <h4>By Skill</h4>
            <p>
              Urna, orci, convallis volutpat, nibh et velit, neque. Neque cras
              posuere purus, mattis congue nisl.{" "}
            </p>
          </div>
          <div className={styles.card}>
            <h4>By Field</h4>
            <p>
              Urna, orci, convallis volutpat, nibh et velit, neque. Neque cras
              posuere purus, mattis congue nisl.{" "}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/devs");
          }}
        >
          Find Talent
        </button>
      </section>
      <section className={styles.developerDo}>
        <h2>What can developers do:</h2>
        <div className={styles.action}>
          <div className={styles.image}>
            <img src={fields} alt="" />
          </div>
          <div className={styles.text}>
            <h3>List skills and fields</h3>
            <p>
              Urna, orci, convallis volutpat, nibh et velit, neque. Neque cras
              posuere purus, mattis congue nisl. Urna, orci, convallis volutpat,
              nibh et velit, neque. Neque cras posuere purus, mattis congue
              nisl.{" "}
            </p>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.text}>
            <h3>Display projects</h3>
            <p>
              Urna, orci, convallis volutpat, nibh et velit, neque. Neque cras
              posuere purus, mattis congue nisl. Urna, orci, convallis volutpat,
              nibh et velit, neque. Neque cras posuere purus, mattis congue
              nisl.{" "}
            </p>
          </div>
          <div className={styles.image}>
            <img src={projects} alt="" />
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.image}>
            <img src={links} alt="" />
          </div>
          <div className={styles.text}>
            <h3>Pin their links</h3>
            <p>
              Urna, orci, convallis volutpat, nibh et velit, neque. Neque cras
              posuere purus, mattis congue nisl. Urna, orci, convallis volutpat,
              nibh et velit, neque. Neque cras posuere purus, mattis congue
              nisl.{" "}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Create Dev Profile
        </button>
      </section>
    </main>
  );
}

export default Home;
