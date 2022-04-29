import { useEffect, useState } from "react";
import styles from "./styles/completeProfile.module.scss";

function CompleteProfile() {
  const [categories, setCategories] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const [listedCategories, setListedCategories] = useState([
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
  ]);

  function typing() {
    setDisplayList(!displayList);
  }
  function addToList(e) {}
  function removeFromList() {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.hearder}>
          <h4>Category/Field</h4>
        </div>
        <div className={styles.innercontainer}>
          <form action="">
            <div className={styles.search}>
              <p>Search your catagory/field</p>
              <input
                onClick={typing}
                // onChange={typing}
                type="text"
                placeholder="eg. Web developer"
              />
            </div>
            {displayList && (
              <ul>
                {listedCategories &&
                  listedCategories.map((item, key) => {
                    return (
                      <li onClick={addToList} key={key}>
                        {item}
                      </li>
                    );
                  })}
              </ul>
            )}
          </form>
          <div className={styles.display}>
            {categories.length > 0 &&
              categories.map((item, key) => {
                return (
                  <p onClick={removeFromList} key={key}>
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
