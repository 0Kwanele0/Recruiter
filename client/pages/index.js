import styles from "../styles/home.module.scss";
import illustration from "../public/assets/skill.svg";
import fields from "../public/assets/fields.svg";
import bylocation from "../public/assets/icons/locationicon.png";
import api from "../public/assets/icons/apiicon.png";
import laptop from "../public/assets/icons/laptopicon.png";
import { useRouter } from "next/router";
import Image from "next/image";

function Home() {
  const router = useRouter();
  return (
    <main className={styles.container}>
      <section className={styles.showcase}>
        <div className={styles.text}>
          <h1>The place where recruiters find talent.</h1>
          <p>
            Find the exact talent your company needs. Detailed search filters to
            help your requirements
          </p>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                router.push("/devs");
              }}
            >
              Find Talent
            </button>
            <button
              onClick={() => {
                router.push("/register");
              }}
            >
              Create Dev Profile
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <Image src={illustration} alt="" width={400} />
        </div>
      </section>
      <section className={styles.filters}>
        <div className={styles.title}>
          <h2>Advanced Filters</h2>
          <p>
            Our search filters allows you to go straight to what you&apos;re
            looking for
          </p>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <Image width={40} height={40} src={bylocation} alt="" />
              <h4>By Location</h4>
            </div>
            <h3>Easly filter to see only local talent.</h3>
            <p>
              You want to see only local talent? We&apos;ve got you , just
              filter by lacation.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <Image width={40} height={40} src={api} alt="" />
              <h4>By Skill</h4>
            </div>
            <h3>Only go for the skills and talent your company desires</h3>
            <p>
              You know the exact skill your company needs; You can select the
              skill from our filter.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <Image width={40} height={40} src={laptop} alt="" />
              <h4>By Field</h4>
            </div>
            <h3>Serach directly the type of developers you need</h3>
            <p>
              Let&apos;s you&apos;re looking for Mobile developers only; you can
              easly filter to display only Mobile devs.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            router.push("/devs");
          }}
        >
          Find Talent
        </button>
      </section>
      <section className={styles.developerDo}>
        <h2>What can developers do</h2>
        <div className={styles.action}>
          <div className={styles.image}>
            <Image width={300} height={300} src={fields} alt="" />
          </div>
          <div className={styles.text}>
            <h3>List skills and fields</h3>
            <p>
              Developers can display all their skills and field of programming
              they are operating in.
            </p>
            <h3>Display projects</h3>
            <p>
              The profile can also act as a portfolio. Devs are able to list
              their projects for recruiters to see.
            </p>
            <h3>Pin their links</h3>
            <p>
              Dislaying social media and other links is a feature that will help
              make contaction devs easy.
            </p>
            <button
              onClick={() => {
                router.push("/register");
              }}
            >
              Create Dev Profile
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
