import regstyles from "./styles/register.module.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CompleteProfile from "./CompleteProfile";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [responseError, setRecponseError] = useState();
  const [user, setUser] = useState();

  const onSubmit = (data) => {
    fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        console.log(response);
        setUser(response);
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
      <form onSubmit={handleSubmit(onSubmit)} action="submit">
        <input
          {...register("firstname", { required: true })}
          type="text"
          placeholder="Firstname"
        />
        {errors.firstname?.type === "required" && (
          <small>Firstname is required</small>
        )}
        <input
          {...register("lastname", { required: true })}
          type="text"
          placeholder="Lastname"
        />
        {errors.lastname?.type === "required" && (
          <small>Lastname is required</small>
        )}
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
        {errors.email?.type === "required" && <small>Email is required</small>}
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="text"
        />
        {errors.password?.type === "required" && (
          <small>Password is required</small>
        )}
        <button type="submit">Register</button>
        {responseError ? <small>{responseError}</small> : null}
      </form>
      <CompleteProfile user={user} />
    </div>
  );
}

export default Register;
