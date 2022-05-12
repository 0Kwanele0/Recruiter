import { useState } from "react";
import mystyles from "../../styles/profile.module.scss";

function PersonalDetails(props) {
  const [firstname, setFirstname] = useState(props.user.firstname);
  const [lastname, setLastname] = useState(props.user.lastname);
  const [city, setCity] = useState(props.user.city);
  const [country, setCountry] = useState(props.user.country);

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
    }
  }

  function saveDetails(e) {
    e.preventDefault();
    const data = {
      firstname,
      lastname,
      city,
      country,
    };

    console.log(data);
  }

  return (
    <form onSubmit={saveDetails} action="submit">
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
