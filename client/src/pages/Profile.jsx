import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  let params = useParams();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/user/${params.id}`, { method: "GET" }).then(
      async (user) => {
        const data = await user.json();
        setUsers(data);
      }
    );
  }, [users]);
  return <div>{users && <h1>Hello {users.firstname}</h1>}</div>;
}

export default Profile;
