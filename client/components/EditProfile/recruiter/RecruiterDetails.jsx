import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/editProfile.module.scss";
import { Countries } from "../../../data/Countries";

function RecruiterDetails(props) {
  const [firstname, setFirstname] = useState(props.user.firstname);
  const [lastname, setLastname] = useState(props.user.lastname);
  const [city, setCity] = useState(props.user.city);
  const [country, setCountry] = useState(props.user.country);
  const router = useRouter();
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
    }
  }

  function CountrySelected(e) {
    setCountry(e.target.innerText);
    setDisplayCountries(false);
  }

  function saveDetails(e) {
    e.preventDefault();
    const data = {
      firstname: firstname,
      lastname: lastname,
      country: country,
      city: city,
    };

    fetch(`${process.env.SERVER}/recruiter/${props.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "recruiter-x-auth-token": props.token,
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.status == 200) {
      } else {
      }
    });
  }

  function deleteAccount() {
    fetch(`${process.env.SERVER}/recruiter/${props.user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        "recruiter-x-auth-token": props.token,
      },
    }).then(async (response) => {
      if (response.status == 200) {
        localStorage.removeItem("recruiter-x-auth-token");
        router.reload();
      } else {
      }
    });
  }

  return (
    <form className={styles.form} onSubmit={saveDetails} action="submit">
      <div className={styles.inputContainer}>
        <div className={styles.inputAndLabel}>
          <label htmlFor="">FirstName</label>
          <input
            value={firstname}
            onChange={changingValues}
            name="firstname"
            type="text"
          />
        </div>
        <div className={styles.inputAndLabel}>
          <label htmlFor="">LaststName</label>
          <input
            value={lastname}
            onChange={changingValues}
            name="lastname"
            type="text"
          />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputAndLabel}>
          <label htmlFor="">City</label>
          <input
            value={city}
            onChange={changingValues}
            name="city"
            type="text"
          />
        </div>
        <div className={styles.inputAndLabel}>
          <label htmlFor="">Country</label>
          <input
            onClick={(e) => {
              setDisplayCountries(!displayCountries);
            }}
            value={country}
            onChange={changingValues}
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
      <button className={styles.deleteBtn} onClick={deleteAccount}>
        Terminate Acoount
      </button>
    </form>
  );
}

export default RecruiterDetails;
