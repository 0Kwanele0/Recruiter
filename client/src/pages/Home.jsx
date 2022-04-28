import { useState, useEffect } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/", { method: "GET" }).then(async (user) => {
      const data = await user.json();
      setUsers(data);
    });
  }, [users]);

  return (
    <div>
      <h1>This is the home page</h1>
      <section>
        {users.map((item, key) => {
          return (
            <div key={key}>
              <h3>{item.firstname + " " + item.lastname}</h3>
              <p>{item.email}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Home;
