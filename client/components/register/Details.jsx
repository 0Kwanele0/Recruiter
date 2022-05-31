import { useState, useRef } from "react";
import regstyles from "../../styles/register.module.scss";
import { submitDetailsHandler } from "./utils/details";
import plus from "../../public/assets/icons/plus.png";
import Image from "next/image";
import { listedCategories, experienceList } from "../../data/Lists";

function Details() {
  const [loading, setLoading] = useState(false);
  const experience = useRef();
  const fieldList = useRef();
  const [fieldlist, setFieldList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedExperience, setSelectedExperience] = useState();
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [detailsError, setDetailsError] = useState();
  const [detailsResponseError, setDetailsResponseError] = useState();
  const [typedSkill, setTypedSkill] = useState("");
  const [exlist, setExList] = useState(false);

  function changeTypedSkill(e) {
    setTypedSkill(e.target.value);
  }

  function addSkill(e) {
    e.preventDefault();
    const str = typedSkill.trim();
    if (str.length > 0) {
      if (!skills.includes(str)) {
        setSkills([...skills, typedSkill]);
        setTypedSkill("");
      }
    }
    setTypedSkill("");
  }

  function removeSkill(ev) {
    setSkills(
      skills.filter((e) => {
        if (e != ev.target.innerText) {
          return e;
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

  function changeBio(e) {
    setBio(e.target.value);
  }

  function submitDetails(e) {
    e.preventDefault();
    submitDetailsHandler(
      selectedCategory,
      selectedExperience,
      skills,
      bio,
      setLoading,
      setDetailsError
    );
  }

  return (
    <form onSubmit={submitDetails} className={regstyles.about}>
      <div className={regstyles.field}>
        <div onClick={showFieldList} className={regstyles.inner}>
          {selectedCategory ? (
            <p className={regstyles.category}>{selectedCategory}</p>
          ) : (
            <p>
              Select Field <span>e.g Web Developer..</span>
            </p>
          )}
          <Image src={plus} width={20} height={20} alt="plus" />
        </div>
        {fieldlist && (
          <div ref={fieldList} className={regstyles.list}>
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
      <div className={regstyles.skillsfield}>
        <input
          value={typedSkill}
          onChange={changeTypedSkill}
          placeholder="Type your skills e.g JavaScript, React js"
          type="text"
        />
        <button onClick={addSkill}>add</button>
      </div>
      {skills.length > 0 && (
        <ul className={regstyles.skillList}>
          {skills.map((item, index) => {
            return (
              <li key={index} onClick={removeSkill}>
                {item}
              </li>
            );
          })}
        </ul>
      )}
      <div className={regstyles.field}>
        <div onClick={showExList} className={regstyles.inner}>
          {selectedExperience ? (
            <p className={regstyles.selectedExperience}>{selectedExperience}</p>
          ) : (
            <p>
              Experience <span>e.g 3 Years..</span>
            </p>
          )}
          <Image src={plus} width={20} height={20} alt="plus" />
        </div>
        {exlist && (
          <div ref={experience} className={regstyles.list}>
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
      <textarea
        placeholder="Tell us a little about yourself.."
        name="bio"
        onChange={changeBio}
        value={bio}
        id=""
        rows="4"
        required={true}
      ></textarea>
      {detailsError ? <small>{detailsError}</small> : null}
      <button type="submit">{loading ? "Loading..." : "Next"}</button>
      {detailsResponseError ? <small>{detailsResponseError}</small> : null}
    </form>
  );
}

export default Details;
