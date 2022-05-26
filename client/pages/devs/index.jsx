import styles from "../../styles/devs.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import { Countries } from "../../data/Countries";
import { listedCategories } from "../../data/Lists";
import { useQuery } from "react-query";

function Devs(/*{ mydata }*/) {
  const { isLoading, data, isError } = useQuery("users", fetcher);

  // const [data, setData] = useState(mydata);
  const [filteredData, setFilteredData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [userData, setUserData] = useState();
  const [displayCountries, setDisplayCountries] = useState(false);
  const [selectCategory, setSelectCategory] = useState(false);

  //filter states
  const [country, setCountry] = useState("");
  const [field, setField] = useState("");

  function CountrySelected(e) {
    setCountry(e.target.innerText);
    setDisplayCountries(false);
  }
  function CategorySelected(e) {
    setField(e.target.innerText);
    setSelectCategory(false);
  }

  function filter(e) {
    e.preventDefault();
    const mydata = {
      country,
      field,
    };
    const trimmedCountry = mydata.country.trim();
    const trimmedField = mydata.field.trim();

    if (trimmedCountry.length > 0) {
      if (trimmedField.length > 0) {
        setFilteredData(
          data.filter((item) => {
            if (item.country == trimmedCountry && item.category == trimmedField)
              return item;
          })
        );
      } else {
        setFilteredData(
          data.filter((item) => {
            if (item.country == trimmedCountry) return item;
          })
        );
      }
    } else if (trimmedField.length > 0) {
      setFilteredData(
        data.filter((item) => {
          if (item.category == trimmedField) return item;
        })
      );
    } else {
      return;
    }
  }

  function resetFilter() {
    setFilteredData();
    setCountry("");
    setField("");
  }

  useEffect(() => {
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);
    if (details) {
      setUserData(token);
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, []);

  if (isLoading) {
    return "Loading";
  }
  if (isError) {
    return "Error";
  }
  return (
    <>
      {loaded && (
        <div className={styles.container}>
          <section className={styles.filter}>
            <form autoComplete="off" onSubmit={filter} action="submit">
              <div className={styles.inputContainer}>
                <div
                  className={styles.input}
                  onClick={(e) => {
                    setDisplayCountries(!displayCountries);
                    setSelectCategory(false);
                  }}
                >
                  {country ? <h4>{country} </h4> : <p>Country</p>}
                </div>
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
              <div className={styles.inputContainer}>
                <div
                  className={styles.input}
                  onClick={() => {
                    setSelectCategory(!selectCategory);
                    setDisplayCountries(false);
                  }}
                >
                  {field ? <h4>{field} </h4> : <p>Skill</p>}
                </div>
                {selectCategory && (
                  <ul>
                    {listedCategories.map((item, index) => {
                      return (
                        <li onClick={CategorySelected} key={index}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <button type="submit">Filter</button>
              <button onClick={resetFilter}>Reset</button>
            </form>
          </section>
          <section className={styles.profiles}>
            {!filteredData
              ? data.map((item, key) => {
                  if (userData) {
                    if (item._id != userData.user._id) {
                      return (
                        <ProfileCard
                          key={key}
                          name={item.firstname + " " + item.lastname}
                          id={item._id}
                          photo={item.profilephoto}
                          city={item.city}
                          experience={item.experience}
                          country={item.country}
                          bio={item.bio}
                          skills={item.skills}
                          category={item.category}
                        />
                      );
                    }
                  } else {
                    return (
                      <ProfileCard
                        key={key}
                        name={item.firstname + " " + item.lastname}
                        id={item._id}
                        photo={item.profilephoto}
                        city={item.city}
                        experience={item.experience}
                        country={item.country}
                        bio={item.bio}
                        skills={item.skills}
                        category={item.category}
                      />
                    );
                  }
                })
              : filteredData.map((item, key) => {
                  if (userData) {
                    if (item._id != userData.user._id) {
                      return (
                        <ProfileCard
                          key={key}
                          name={item.firstname + " " + item.lastname}
                          id={item._id}
                          photo={item.profilephoto}
                          city={item.city}
                          experience={item.experience}
                          country={item.country}
                          bio={item.bio}
                          skills={item.skills}
                          category={item.category}
                        />
                      );
                    }
                  } else {
                    return (
                      <ProfileCard
                        key={key}
                        name={item.firstname + " " + item.lastname}
                        id={item._id}
                        photo={item.profilephoto}
                        city={item.city}
                        experience={item.experience}
                        country={item.country}
                        bio={item.bio}
                        skills={item.skills}
                        category={item.category}
                      />
                    );
                  }
                })}
          </section>
        </div>
      )}
    </>
  );
}

export default Devs;

function fetcher() {
  return fetch(`${process.env.SERVER}/user/`).then(
    async (data) => await data.json()
  );
}
