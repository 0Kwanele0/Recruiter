import regstyles from "../../styles/register.module.scss";
import { useState, useEffect, useRef } from "react";
import plus from "../../public/assets/icons/plus.png";
import Image from "next/image";

function Register() {
  const [responseError, setRecponseError] = useState();
  const [user, setUser] = useState();
  const [register, setRegister] = useState(true);
  const [details, setdetails] = useState(false);
  const [fieldlist, setFieldList] = useState(false);
  const [exlist, setExList] = useState(false);
  const [links, setlinks] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [profilephoto, setprofilephoto] = useState();
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

  function changeVuew(e) {
    switch (e.target.innerText) {
      case "1":
        setRegister(true);
        setdetails(false);
        setlinks(false);
        return;
      case "2":
        setRegister(false);
        setdetails(true);
        setlinks(false);
        return;
      case "3":
        setRegister(false);
        setdetails(false);
        setlinks(true);
        return;
    }
  }

  function formChange(e) {
    switch (e.target.name) {
      case "firstname":
        setfirstname(e.target.value);
        break;
      case "lastname":
        setlastname(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      case "profilephoto":
        setprofilephoto(e.target.files[0]);
        break;
    }
  }

  const onSubmit = (data) => {
    data.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilephoto", profilephoto);

    console.log(formData);
    fetch("http://localhost:3001/user/register", {
      method: "POST",
      body: formData,
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        console.log(response);
        setUser(response);
        setRecponseError();
      } else if (data.status == 401) {
        setRecponseError(response.msg);
      } else {
        setRecponseError(response.msg);
      }
    });
  };
  useEffect(() => {}, [user]);

  return (
    <div className={regstyles.container}>
      <form
        onSubmit={onSubmit}
        method="POST"
        // action="http://localhost:3001/user/register"
        encType="multipart/form-data"
      >
        <div className={regstyles.counter}>
          <div onClick={changeVuew} className={regstyles.paraCont}>
            <p>1</p>
          </div>
          <div onClick={changeVuew} className={regstyles.paraCont}>
            <p>2</p>
          </div>
          <div onClick={changeVuew} className={regstyles.paraCont}>
            <p>3</p>
          </div>
        </div>
        {register && (
          <div className={regstyles.register}>
            <div className={regstyles.names}>
              <input
                onChange={formChange}
                value={firstname}
                name="firstname"
                type="text"
                placeholder="Firstname"
                required={true}
              />
              <input
                onChange={formChange}
                value={lastname}
                name="lastname"
                type="text"
                placeholder="Lastname"
                required={true}
              />
            </div>
            <input
              onChange={formChange}
              value={email}
              name="email"
              type="email"
              placeholder="Email"
              required={true}
            />
            <div className={regstyles.countries}>
              <input
                onChange={formChange}
                value={country}
                name="country"
                type="text"
                placeholder="Country"
                required={true}
              />
              <input
                onChange={formChange}
                value={city}
                name="city"
                type="text"
                placeholder="City"
                required={true}
              />
            </div>
            <input
              onChange={formChange}
              value={password}
              name="password"
              placeholder="Password"
              type="text"
              required={true}
            />
            <input
              onChange={formChange}
              value={confirmpassword}
              name="confirmpassword"
              placeholder="Confirm Password"
              type="text"
              required={true}
            />
            {/* <input onChange={formChange} name="profilephoto" type="file" /> */}
            <button type="submit">Next</button>
            {responseError ? <small>{responseError}</small> : null}
          </div>
        )}
        {details && (
          <div className={regstyles.about}>
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
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
