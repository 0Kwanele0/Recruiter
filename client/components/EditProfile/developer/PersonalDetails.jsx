import { useState } from "react";
import mystyles from "../styles/editProfile.module.scss";
import { Countries } from "../../../data/Countries";

function PersonalDetails(props) {
  const [firstname, setFirstname] = useState(props.user.firstname);
  const [profilephoto, setProfilephoto] = useState();
  const [resume, setResume] = useState();
  const [lastname, setLastname] = useState(props.user.lastname);
  const [city, setCity] = useState(props.user.city);
  const [country, setCountry] = useState(props.user.country);
  const [bio, setBio] = useState(props.user.bio);
  const [displayCountries, setDisplayCountries] = useState(false);

  function changingValues(e) {
    switch (e.target.name) {
      case "firstname":
        setFirstname(e.target.value);
        return;
      case "lastname":
        setLastname(e.target.value);
        return;
      case "country":
        return;
      case "city":
        setCity(e.target.value);
        return;
      case "bio":
        setBio(e.target.value);
        return;
    }
  }

  function CountrySelected(e) {
    setCountry(e.target.innerText);
    setDisplayCountries(false);
  }

  function changeImage(e) {
    setProfilephoto(e.target.files[0]);
  }

  function changeResume(e) {
    setResume(e.target.files[0]);
  }

  function saveDetails(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("bio", bio);
    formData.append("lastname", lastname);
    formData.append("resume", resume);
    formData.append("profilephoto", profilephoto);

    fetch(`http://localhost:3001/user/detailsedit/${props.user._id}`, {
      method: "PUT",
      headers: {
        "recruiter-x-auth-token": props.token,
      },
      body: formData,
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
      } else {
      }
    });
  }

  return (
    <form
      enctype="multipart/form-data"
      className={mystyles.form}
      onSubmit={saveDetails}
      action="submit"
    >
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Bio</label>
          <textarea
            rows="3"
            value={bio}
            onChange={changingValues}
            name="bio"
            type="text"
          />
        </div>
      </div>
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Profile Photo</label>
          <input onChange={changeImage} name="profilephoto" type="file" />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Resume</label>
          <input onChange={changeResume} name="resume" type="file" />
        </div>
      </div>
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">FirstName</label>
          <input
            value={firstname}
            onChange={changingValues}
            name="firstname"
            type="text"
          />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">LaststName</label>
          <input
            value={lastname}
            onChange={changingValues}
            name="lastname"
            type="text"
          />
        </div>
      </div>

      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">City</label>
          <input
            value={city}
            onChange={changingValues}
            name="city"
            type="text"
          />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Country</label>
          <input
            value={country}
            onChange={changingValues}
            onClick={(e) => {
              setDisplayCountries(!displayCountries);
            }}
            name="country"
            type="text"
          />
          {displayCountries && (
            <ul>
              {Countries.map((item, index) => {
                return (
                  <li onClick={CountrySelected} key={index}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default PersonalDetails;
