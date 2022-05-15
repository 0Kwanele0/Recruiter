import styles from "../../styles/devs.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import { useRouter } from "next/router";

function Devs() {
  const router = useRouter();
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

  //filter states
  const [country, setCountry] = useState("");
  const [field, setField] = useState("");

  async function fetchUsers() {
    const details = localStorage.getItem("recruiter-x-auth-token");
    const token = JSON.parse(details);

    fetch("http://localhost:3001/user/", {
      method: "GET",
      headers: {
        "recruiter-x-auth-token": token.token,
      },
    }).then(async (user) => {
      if (user.status === 200) {
        const data = await user.json();
        const filtered = data.filter((item) => {
          if (item._id !== token.user._id) {
            return item;
          }
        });
        setData(filtered);
      } else {
        router.push("/login");
      }
    });
  }

  function filterInputsChanging(e) {
    switch (e.target.name) {
      case "country":
        setCountry(e.target.value);
        return;
      case "field":
        setField(e.target.value);
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
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      fetchUsers();
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.container}>
          <section className={styles.filter}>
            <form onSubmit={filter} action="submit">
              <input
                value={country}
                onChange={filterInputsChanging}
                name="country"
                placeholder="Location"
                type="text"
              />
              <input
                value={field}
                onChange={filterInputsChanging}
                name="field"
                placeholder="Field"
                type="text"
              />
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
