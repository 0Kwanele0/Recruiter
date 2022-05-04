import { useEffect, useState, useReducer } from "react";
import styles from "../styles/completeProfile.module.scss";
import tw from "../public/assets/twitter.png";
import github from "../public/assets/github.png";
import linkedin from "../public/assets/linkedin.png";
import internet from "../public/assets/internet.png";
import { useForm } from "react-hook-form";

function CompleteProfile(props) {
  const [categories, setCategories] = useState([]);
  const [skill, setSkill] = useState("");
  const [skills, dispatcher] = useReducer(skillsReducer, []);

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
    dispatcher({
      type: "add-skill",
      value: skill,
    });
    setSkill("");
  }
  function removeSkill(e) {
    e.preventDefault();
    const skill = e.target.innerText;
    dispatcher({
      type: "remove-skill",
      value: skill,
    });
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
    let linkArray = [];
    if (e.twitter.length > 1) {
      linkArray.push({ name: "Twitter", link: e.twitter });
    }
    if (e.linkedin.length > 1) {
      linkArray.push({ name: "Linkedin", link: e.linkedin });
    }
    if (e.github.length > 1) {
      linkArray.push({ name: "GitHub", link: e.github });
    }
    if (e.portfolio.length > 1) {
      linkArray.push({ name: "Portfolio", link: e.portfolio });
    }
    return fetch(`http://localhost:3001/user/links/${props.user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ data: linkArray }),
    })
      .then(async (value) => {
        const data = await value.json();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function submitSkills(e) {
    return fetch(`http://localhost:3001/user/skills/${props.user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ data: skills }),
    })
      .then(async (value) => {
        const data = await value.json();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function submitCategories() {
    return fetch(`http://localhost:3001/user/field/${props.user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ data: categories }),
    })
      .then(async (value) => {
        const data = await value.json();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
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

function skillsReducer(state, action) {
  switch (action.type) {
    case "add-skill": {
      if (!state.includes(action.value) && action.value.trim().length > 0)
        return [...state, action.value];
      else {
        return [...state];
      }
    }
    case "remove-skill": {
      if (state.includes(action.value))
        return state.filter((t) => t !== action.value);
      else {
        return;
      }
    }
  }
}