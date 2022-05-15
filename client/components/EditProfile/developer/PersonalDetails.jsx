import { useState } from "react";
import mystyles from "../styles/editProfile.module.scss";

function PersonalDetails(props) {
  const [firstname, setFirstname] = useState(props.user.firstname);
  const [lastname, setLastname] = useState(props.user.lastname);
  const [city, setCity] = useState(props.user.city);
  const [country, setCountry] = useState(props.user.country);
  const [bio, setBio] = useState(props.user.bio);

  function changingValues(e) {
    switch (e.target.name) {
      case "firstname":
        setFirstname(e.target.value);
        return;
      case "lastname":
        setLastname(e.target.value);
        return;
      case "country":
        setCountry(e.target.value);
        return;
      case "city":
        setCity(e.target.value);
        return;
      case "bio":
        setBio(e.target.value);
        return;
    }
  }

  function saveDetails(e) {
    e.preventDefault();

    const data = {
      firstname: firstname,
      lastname: lastname,
      country: country,
      city: city,
      bio: bio,
    };

    fetch(`http://localhost:3001/user/detailsedit/${props.user._id}`, {
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
    <form className={mystyles.form} onSubmit={saveDetails} action="submit">
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
            name="country"
            type="text"
          />
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default PersonalDetails;
