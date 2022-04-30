import { useEffect, useState } from "react";
import styles from "./styles/completeProfile.module.scss";
import tw from "../assets/twitter.png";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import internet from "../assets/internet.png";
import { useForm } from "react-hook-form";

function CompleteProfile(props) {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);

  const listedCategories = [
    "Web developer",
    "Mobile developer",
    "Frontend developer",
    "Backend developer",
    "Fullstack developer",
    "Game developer",
    "DevOps developer",
    "Security developer",
    "Data science developer",
    "DevOps developer",
  ];

  const { register, handleSubmit } = useForm();

  function addSkill(e) {
    e.preventDefault();
    let skill = e.target.skill.value;
    if (skills.includes(skill)) {
      return;
    } else {
      setSkills([...skills, skill]);
    }
  }
  function removeSkill(e) {
    const skill = e.target.innerText;
    setSkills(skills.filter((s) => s !== skill));
  }

  function addCategory(e) {
    const value = e.target.innerText;
    if (categories.includes(value) || categories.length >= 4) {
      return;
    } else {
      setCategories([...categories, value]);
    }
  }
  function removeCategory(e) {
    const value = e.target.innerText;
    setCategories(categories.filter((t) => t !== value));
  }

  function submitLinks(e) {
    console.log(e);
  }
  function submitSkills(e) {
    console.log(skills);
  }

  function submitCategories() {
    console.log(categories);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.linksContainer}>
        <div>
          <h4>Links</h4>
        </div>
        <form action="submit" onSubmit={handleSubmit(submitLinks)}>
          <main className={styles.links}>
            <div className={styles.individual}>
              <img src={tw} alt="" />
              <input
                {...register("twitter")}
                placeholder="Twitter"
                type="url"
              />
            </div>
            <div className={styles.individual}>
              <img src={linkedin} alt="" />
              <input
                {...register("linkedin")}
                placeholder="Linkedin"
                type="url"
              />
            </div>
            <div className={styles.individual}>
              <img src={github} alt="" />
              <input {...register("github")} placeholder="GitHub" type="url" />
            </div>
            <div className={styles.individual}>
              <img src={internet} alt="" />
              <input
                {...register("portfolio")}
                placeholder="Portfolio"
                type="url"
              ></input>
            </div>
          </main>
          <button type="submit">Save</button>
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.hearder}>
          <h4>Select Category/Field</h4>
          <p>Maximum: 4</p>
        </div>
        <div className={styles.innercontainer}>
          <ul>
            {listedCategories &&
              listedCategories.map((item, key) => {
                return (
                  <li onClick={addCategory} key={key}>
                    {item}
                  </li>
                );
              })}
          </ul>
          <div className={styles.display}>
            {categories.length > 0 &&
              categories.map((item, key) => {
                return (
                  <p onClick={removeCategory} key={key}>
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
        <button onClick={submitCategories}>Save</button>
      </div>
      <div className={styles.skillsContainer}>
        <div className={styles.hearder}>
          <h4>Skills</h4>
        </div>
        <div className={styles.innercontainer}>
          <div className={styles.search}>
            <p>Type your skill</p>
            <form onSubmit={addSkill} className={styles.inputAndbtn}>
              <input
                name="skill"
                type="text"
                placeholder="eg. C#, JavaScript, React"
              />
              <button type="submit">add</button>
            </form>
          </div>
          <div className={styles.display}>
            {skills.length > 0 &&
              skills.map((item, key) => {
                return (
                  <p onClick={removeSkill} key={key}>
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
        <button onClick={submitSkills}>save</button>
      </div>
    </div>
  );
}

export default CompleteProfile;
