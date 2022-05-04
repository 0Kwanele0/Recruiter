import regstyles from "./styles/register.module.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CompleteProfile from "./CompleteProfile";

function Register() {
  const [responseError, setRecponseError] = useState();
  const [user, setUser] = useState();
  const [registered, setRegistered] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profilephoto, setprofilephoto] = useState();
  function formChange(e) {
    switch (e.target.name) {
      case "firstname":
        setfirstname(e.target.value);
        break;
      case "lastname":
        setlastname(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      case "profilephoto":
        setprofilephoto(e.target.files[0]);
        break;
    }
  }

  const onSubmit = (data) => {
    data.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilephoto", profilephoto);

    console.log(formData);
    fetch("http://localhost:3001/user/register", {
      method: "POST",
      body: formData,
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        console.log(response);
        setUser(response);
        setRegistered(true);
        setRecponseError();
      } else if (data.status == 401) {
        setRecponseError(response.msg);
      } else {
        setRecponseError(response.msg);
      }
    });
  };
  useEffect(() => {}, [user]);

  return (
    <div className={regstyles.container}>
      <h2>Register</h2>
      {!registered ? (
        <form
          onSubmit={onSubmit}
          method="POST"
          // action="http://localhost:3001/user/register"
          encType="multipart/form-data"
        >
          <input
            onChange={formChange}
            value={firstname}
            name="firstname"
            type="text"
            placeholder="Firstname"
          />
          <input
            onChange={formChange}
            value={lastname}
            name="lastname"
            type="text"
            placeholder="Lastname"
          />
          <input
            onChange={formChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={formChange}
            value={password}
            name="password"
            placeholder="Password"
            type="text"
          />
          <input onChange={formChange} name="profilephoto" type="file" />
          <button type="submit">Register</button>
          {responseError ? <small>{responseError}</small> : null}
        </form>
      ) : (
        <CompleteProfile user={user} />
      )}
    </div>
  );
}

export default Register;
