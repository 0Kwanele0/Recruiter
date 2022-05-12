import { useState, useEffect, useRef } from "react";
import mystyles from "../../styles/profile.module.scss";
import Image from "next/image";
import { experienceList, listedCategories } from "../../data/Lists";
import plus from "../../public/assets/icons/plus.png";

function SkillsDetails() {
  const experience = useRef();
  const fieldList = useRef();
  const [skills, setSkills] = useState([]);
  const [typedSkill, setTypedSkill] = useState("");
  const [fieldlist, setFieldList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedExperience, setSelectedExperience] = useState();
  const [exlist, setExList] = useState(false);

  function addSkill(e) {
    e.preventDefault();
    if (!skills.includes(typedSkill)) {
      setSkills([...skills, typedSkill]);
      setTypedSkill("");
    }
    setTypedSkill("");
  }
  function removeSkill(e) {
    const skill = e.target.innerText;
    setSkills(
      skills.filter((ee) => {
        if (ee != skill) {
          return ee;
        }
      })
    );
  }

  function showFieldList() {
    setFieldList(!fieldlist);
  }

  function addCategory(ev) {
    setSelectedCategory(ev.target.innerText);
    showFieldList();
  }
  function addExperience(ev) {
    setSelectedExperience(ev.target.innerText);
    showExList();
  }
  function showExList() {
    setExList(!exlist);
  }

  function saveSkills(e) {
    e.preventDefault();
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(skills),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
        console.log(data);
      } else {
        console.log(data);
      }
    });
  }

  return (
    <form action="">
      <div className={mystyles.addSkills}>
        <div onClick={showExList} className={mystyles.inner}>
          {selectedExperience ? (
            <p className={mystyles.selectedExperience}>{selectedExperience}</p>
          ) : (
            <p>
              Experience <span>e.g 3 Years..</span>
            </p>
          )}
          <Image src={plus} width={20} height={20} />
        </div>
        {exlist && (
          <div ref={experience} className={mystyles.list}>
            <ul>
              {experienceList.map((item, index) => {
                return (
                  <li key={index} onClick={addExperience}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className={mystyles.skillInput}>
          <input
            placeholder="Type you skill e.g React"
            type="text"
            value={typedSkill}
            onChange={(e) => {
              setTypedSkill(e.target.value);
            }}
            name=""
            id=""
          />
          <button onClick={addSkill} className={mystyles.addSkillsBtn}>
            Add
          </button>
        </div>
      </div>
      <div className={mystyles.displaySkills}>
        {skills &&
          skills.length > 0 &&
          skills.map((item, index) => {
            return (
              <p onClick={removeSkill} key={index}>
                {item}
              </p>
            );
          })}
      </div>
      <button>Save</button>
    </form>
  );
}

export default SkillsDetails;
