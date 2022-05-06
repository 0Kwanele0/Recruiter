import regstyles from "../../styles/register.module.scss";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import twitter from "../../public/assets/icons/twitter.png";
import github from "../../public/assets/icons/github.png";
import linkedin from "../../public/assets/icons/linkedin.png";
import internet from "../../public/assets/icons/internet.png";
import avater from "../../public/assets/icons/avatar.png";
import plus from "../../public/assets/icons/plus.png";

import Image from "next/image";

function Index() {
  const [registering, setRegistering] = useState(true);
  const [details, setdetails] = useState(false);
  const [links, setlinks] = useState(false);

  //register state
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [responseError, setRecponseError] = useState();
  const [error, setError] = useState(false);

  //details states
  const fieldList = useRef();
  const [fieldlist, setFieldList] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedExperience, setSelectedExperience] = useState();
  const [detailsError, setDetailsError] = useState();

  const experience = useRef();
  const [exlist, setExList] = useState(false);
  const [detailsResponseError, setDetailsResponseError] = useState();
  const [typedSkill, setTypedSkill] = useState("");

  const [linksResponseError, setLinksResponseError] = useState();

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

  //details methods
  function changeTypedSkill(e) {
    setTypedSkill(e.target.value);
  }
  function addSkill(e) {
    e.preventDefault();
    setSkills([...skills, typedSkill]);
    setTypedSkill("");
    console.log(skills);
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
  function submitDetails(e) {
    e.preventDefault();
    if (selectedCategory && selectedExperience && skills.length > 0) {
      setDetailsError();
      setRegistering(false);
      setdetails(false);
      setlinks(true);
    }
    setDetailsError("all fields should be complete.");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function registerPassword(e) {
    setPassword(e.target.value);
  }
  function checkPassword(e) {
    setConfPassword(e.target.value);
    if (password !== confPassword) {
      setError(true);
    }
    setError(false);
  }

  async function registerUser(data) {
    fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        setRecponseError();
        console.log(response);
        setRegistering(false);
        setdetails(true);
        setlinks(false);
      } else if (data.status == 401) {
        setRecponseError(response.msg);
        console.log(response.msg);
      } else {
        setRecponseError(response.msg);
        console.log(response.msg);
      }
    });
  }

  return (
    <div className={regstyles.container}>
      <div className={regstyles.formsContainer}>
        <div className={regstyles.counter}>
          <div className={regstyles.paraCont}>
            <p>1</p>
          </div>
          <div className={regstyles.paraCont}>
            <p>2</p>
          </div>
          <div className={regstyles.paraCont}>
            <p>3</p>
          </div>
        </div>
        {registering && (
          <form
            onSubmit={handleSubmit(registerUser)}
            className={regstyles.register}
          >
            <div className={regstyles.names}>
              <div className={regstyles.inputContainer}>
                <input
                  {...register("firstname", {
                    required: "Firstname is required",
                  })}
                  type="text"
                  placeholder="Firstname"
                />
                {errors.firstname && <span>{errors.firstname.message}</span>}
              </div>
              <div className={regstyles.inputContainer}>
                <input
                  {...register("lastname", {
                    required: "Lastname is required",
                  })}
                  type="text"
                  placeholder="Lastname"
                />
                {errors.lastname && <span>{errors.lastname.message}</span>}
              </div>
            </div>
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                })}
                type="text"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
              {errors.email?.type == "pattern" && <span>Invalid Email</span>}
            </div>
            <div className={regstyles.countries}>
              <div className={regstyles.inputContainer}>
                <input
                  {...register("country", { required: "Country is required" })}
                  type="text"
                  placeholder="Country"
                />
                {errors.country && <span>{errors.country.message}</span>}
              </div>
              <div className={regstyles.inputContainer}>
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  placeholder="City"
                />
                {errors.city && <span>{errors.city.message}</span>}
              </div>
            </div>
            <div>
              <input
                {...register("password", { required: "Password is required" })}
                type="text"
                placeholder="Password"
                value={password}
                onChange={registerPassword}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
              <input
                {...register("confirm_password", {
                  required: "Please confirm password",
                })}
                value={confPassword}
                onChange={checkPassword}
                type="text"
                placeholder="Confirm password"
              />
              {errors.confirm_password && (
                <span>{errors.confirm_password.message}</span>
              )}
            </div>
            {responseError ? <small>{responseError}</small> : null}
            {error ? <small>Passwords don't match!</small> : null}
            <button type="submit">Next</button>
          </form>
        )}
        {details && (
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
                <Image src={plus} width={20} height={20} />
              </div>
              {fieldlist && (
                <div ref={fieldList} className={regstyles.list}>
                  <ul>
                    {listedCategories.map((item, index) => {
                      return <li onClick={addCategory}>{item}</li>;
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
                {skills.map((item) => {
                  return <li onClick={removeSkill}>{item}</li>;
                })}
              </ul>
            )}
            <div className={regstyles.field}>
              <div onClick={showExList} className={regstyles.inner}>
                {selectedExperience ? (
                  <p className={regstyles.selectedExperience}>
                    {selectedExperience}
                  </p>
                ) : (
                  <p>
                    Experience <span>e.g 3 Years..</span>
                  </p>
                )}
                <Image src={plus} width={20} height={20} />
              </div>
              {exlist && (
                <div ref={experience} className={regstyles.list}>
                  <ul>
                    {experienceList.map((item, index) => {
                      return <li onClick={addExperience}>{item}</li>;
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
              required={true}
            ></textarea>

            {detailsError ? <small>{detailsError}</small> : null}
            <button type="submit">Next</button>
            {detailsResponseError ? (
              <small>{detailsResponseError}</small>
            ) : null}
          </form>
        )}
        {links && (
          <div className={regstyles.links}>
            <div className={regstyles.file}>
              <Image src={avater} width={40} height={40} />
              <label>Upload a profile pic</label>
              <input type="file" />
            </div>
            <div className={regstyles.skillsfield}>
              <Image src={github} width={30} height={30} />
              <input placeholder="Add you GitHub Link" type="text" />
            </div>
            <div className={regstyles.skillsfield}>
              <Image src={linkedin} width={30} height={30} />
              <input placeholder="Add you LinkedIn Link" type="text" />
            </div>
            <div className={regstyles.skillsfield}>
              <Image src={twitter} width={30} height={30} />
              <input placeholder="Add you Twitter Link" type="text" />
            </div>
            <div className={regstyles.skillsfield}>
              <Image src={internet} width={30} height={30} />
              <input placeholder="Add you Website Link" type="text" />
            </div>
            <button type="submit">Submit</button>
            {linksResponseError ? <small>{linksResponseError}</small> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
