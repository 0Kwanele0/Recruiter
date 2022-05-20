import styles from "../../styles/devs.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import { useRouter } from "next/router";
import { Countries } from "../../data/Countries";
import { listedCategories } from "../../data/Lists";
function Devs({ mydata }) {
  const router = useRouter();
  const [data, setData] = useState(mydata);
  const [filteredData, setFilteredData] = useState();
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

  function filterInputsChanging(e) {
    switch (e.target.name) {
      case "country":
        return;
      case "field":
        return;
    }
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

    const filtered = data.filter((item) => {
      if (token) {
        if (item._id !== token.user._id) {
          return item;
        }
        return;
      }
      return item;
    });
    setData(filtered);
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.container}>
          <section className={styles.filter}>
            <form autoComplete="off" onSubmit={filter} action="submit">
              <div className={styles.inputContainer}>
                <input
                  onClick={(e) => {
                    setDisplayCountries(!displayCountries);
                    setSelectCategory(false);
                  }}
                  autoComplete={false}
                  value={country}
                  onChange={filterInputsChanging}
                  name="country"
                  placeholder="Location"
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
              <div className={styles.inputContainer}>
                <input
                  value={field}
                  onClick={() => {
                    setSelectCategory(!selectCategory);
                    setDisplayCountries(false);
                  }}
                  onChange={filterInputsChanging}
                  name="field"
                  placeholder="Skill"
                  type="text"
                />
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
            {filteredData
              ? filteredData.map((item, key) => {
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
                })
              : data.map((item, key) => {
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
                })}
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Devs;

export const getServerSideProps = async () => {
  // const details = localStorage.getItem("recruiter-x-auth-token");
  // const token = JSON.parse(details);

  const mydata = await fetch(`${process.env.SERVER}/user/`, {
    method: "GET",
  }).then(async (user) => {
    const data = await user.json();
    return data;
  });

  return {
    props: {
      mydata,
    },
  };
};
