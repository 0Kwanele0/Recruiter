import styles from "./styles/home.module.scss";
import illustration from "../assets/illustration.svg";

function Home() {
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
            <button>Find Talent</button>
            <button>Create Dev Profile</button>
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
        <button>Find Talent</button>
      </section>
      <section className={styles.developerDo}></section>
    </main>
  );
}

export default Home;
