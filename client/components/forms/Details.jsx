import regstyles from "../../styles/register.module.scss";
import plus from "../../public/assets/icons/plus.png";
import { useState, useRef } from "react";
import Image from "next/image";

function Details() {
  const [exlist, setExList] = useState(false);
  const [fieldlist, setFieldList] = useState(false);
  const [responseError, setRecponseError] = useState();

  const fieldList = useRef();
  const experience = useRef();

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
  const experienceList = [
    "1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "+5 Years",
  ];

  function addSkill() {}

  function showFieldList() {
    setFieldList(!fieldlist);
  }
  function showExList() {
    setExList(!exlist);
  }

  return (
    <form className={regstyles.about}>
      <div className={regstyles.field}>
        <div onClick={showFieldList} className={regstyles.inner}>
          <p>
            Select Field <span>e.g Web Developer..</span>
          </p>
          <Image src={plus} width={20} height={20} />
        </div>
        {fieldlist && (
          <div ref={fieldList} className={regstyles.list}>
            <ul>
              {listedCategories.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
      <div className={regstyles.skillsfield}>
        <input
          placeholder="Type your skills e.g JavaScript, React js"
          type="text"
        />
        <button onClick={addSkill}>add</button>
      </div>
      <div className={regstyles.field}>
        <div onClick={showExList} className={regstyles.inner}>
          <p>
            Experience <span>e.g 3 Years..</span>
          </p>
          <Image src={plus} width={20} height={20} />
        </div>
        {exlist && (
          <div ref={experience} className={regstyles.list}>
            <ul>
              {experienceList.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
      <textarea
        placeholder="Tell us a little about yourself.."
        name="bio"
        id=""
        rows="4"
      ></textarea>

      <button type="submit">Next</button>
      {responseError ? <small>{responseError}</small> : null}
    </form>
  );
}

export default Details;
