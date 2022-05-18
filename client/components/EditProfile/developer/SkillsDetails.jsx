import { useState, useRef } from "react";
import Image from "next/image";
import mystyles from "../styles/editProfile.module.scss";
import plus from "../../../public/assets/icons/plus.png";
import { experienceList, listedCategories } from "../../../data/Lists";

function SkillsDetails(props) {
  const { experience, category, skills } = props.user;
  const userExperience = useRef();
  const fieldList = useRef();
  const [userSkills, setSkills] = useState(skills);
  const [typedSkill, setTypedSkill] = useState("");
  const [fieldlist, setFieldList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedExperience, setSelectedExperience] = useState(experience);
  const [exlist, setExList] = useState(false);

  function addSkill(e) {
    e.preventDefault();
    const str = typedSkill.trim();
    if (str.length > 0) {
      if (!userSkills.includes(typedSkill)) {
        setSkills([...userSkills, typedSkill]);
        setTypedSkill("");
      }
    }
    setTypedSkill("");
  }

  function removeSkill(e) {
    const skill = e.target.innerText;
    setSkills(
      userSkills.filter((item) => {
        if (item != skill) {
          return item;
        }
        return null;
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
    const data = {
      skills: userSkills,
      experience: selectedExperience,
      category: selectedCategory,
    };

    fetch(`${process.env.SERVER}/user/skillsedit/${props.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "recruiter-x-auth-token": props.token,
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
      } else {
      }
    });
  }

  return (
    <form className={mystyles.form} action="submit" onSubmit={saveSkills}>
      <div className={mystyles.addField}>
        <div onClick={showFieldList} className={mystyles.inner}>
          {selectedCategory ? (
            <p className={mystyles.selectedExperience}>{selectedCategory}</p>
          ) : (
            <p>
              Cartegory <span>e.g 3 Web developer..</span>
            </p>
          )}
          <Image src={plus} width={20} height={20} />
        </div>
        {fieldlist && (
          <div ref={fieldList} className={mystyles.list}>
            <ul>
              {listedCategories.map((item, index) => {
                return (
                  <li key={index} onClick={addCategory}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className={mystyles.addExperience}>
        <div onClick={showExList} className={mystyles.inner}>
          {selectedExperience ? (
            <p className={mystyles.selectedExperience}>
              Experience : {selectedExperience}
            </p>
          ) : (
            <p>
              Experience <span>e.g 3 Years..</span>
            </p>
          )}
          <Image src={plus} width={20} height={20} />
        </div>
        {exlist && (
          <div ref={userExperience} className={mystyles.list}>
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
      </div>
      <div className={mystyles.addSkills}>
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
        {userSkills &&
          userSkills.map((item, index) => {
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
