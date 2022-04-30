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
  const [hell, setHell] = useState(false);

  const [listedCategories, setListedCategories] = useState([
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
  ]);

  const { register, handleSubmit } = useForm();

  function addSkill(e) {
    setHell(!hell);
    e.preventDefault();
    const myArr = skills;
    let skill = e.target.skill.value;
    if (skill.length > 0) {
      if (myArr.includes(skill)) {
        return;
      } else {
        myArr.push(skill);
        setSkills(myArr);
      }
    }
  }
  function removeSkill(e) {
    setHell(!hell);
    const myArr = skills;
    const skill = e.target.innerText;
    const index = myArr.indexOf(skill);
    myArr.splice(index, 1);
    console.log(skills);
  }

  function addCategory(e) {
    setHell(!hell);
    const myArr = categories;
    const vali = e.target.innerText;
    if (myArr.includes(vali) || myArr.length >= 4) {
      return;
    } else {
      myArr.push(vali);
      setCategories(myArr);
    }
  }
  function removeCategory(e) {
    setHell(!hell);
    let myArr = categories;
    const val = e.target.innerText;
    let index = myArr.indexOf(val);
    myArr.splice(index, 1);
    setCategories(myArr);
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

  useEffect(() => {}, [hell]);

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
