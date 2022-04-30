import { useEffect, useState } from "react";
import styles from "./styles/completeProfile.module.scss";
import tw from "../assets/twitter.png";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import internet from "../assets/internet.png";
import { useForm } from "react-hook-form";

function CompleteProfile() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [hell, setHell] = useState(false);
  const [displayList, setDisplayList] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function typing() {
    setDisplayList(!displayList);
  }

  function sendLinks(e) {
    console.log(e);
  }
  function removeSkill() {}

  function addToList(e) {
    setHell(!hell);
    const myArr = categories;
    const vali = e.target.innerText;
    if (myArr.includes(vali) || myArr.length >= 3) {
      return;
    } else {
      myArr.push(vali);
      setCategories(myArr);
    }
  }
  function removeFromList(e) {
    setHell(!hell);
    let myArr = categories;
    const val = e.target.innerText;
    let index = myArr.indexOf(val);
    myArr.splice(index, 1);
    setCategories(myArr);
  }
  useEffect(() => {}, [hell]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.linksContainer}>
        <div>
          <h4>Links</h4>
        </div>
        <form action="submit" onSubmit={handleSubmit(sendLinks)}>
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
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.hearder}>
          <h4>Category/Field</h4>
        </div>
        <div className={styles.innercontainer}>
          <form action="">
            <div className={styles.search}>
              <p>Search your catagory/field</p>
              <input
                onClick={typing}
                type="text"
                placeholder="eg. Web developer"
              />
            </div>
            {displayList && (
              <ul>
                {listedCategories &&
                  listedCategories.map((item, key) => {
                    return (
                      <li onClick={addToList} key={key}>
                        {item}
                      </li>
                    );
                  })}
              </ul>
            )}
          </form>
          <div className={styles.display}>
            {categories.length > 0 &&
              categories.map((item, key) => {
                return (
                  <p onClick={removeFromList} key={key}>
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.skillsContainer}>
        <div className={styles.hearder}>
          <h4>Skills</h4>
        </div>
        <div className={styles.innercontainer}>
          <form action="">
            <div className={styles.search}>
              <p>Type your skill</p>
              <div className={styles.inputAndbtn}>
                <input type="text" placeholder="eg. C#, JavaScript, React" />
                <button>add</button>
              </div>
            </div>
          </form>
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
      </div>
    </div>
  );
}

export default CompleteProfile;
