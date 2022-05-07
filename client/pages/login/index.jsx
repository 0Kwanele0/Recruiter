import styles from "../../styles/login.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [responseError, setRecponseError] = useState();

  const onSubmit = (data) => {
    fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        console.log(response);
        setRecponseError();
      } else if (data.status == 401) {
        setRecponseError(response.msg);
      } else {
        setRecponseError(response.msg);
      }
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="submit">
        <h3>Hey! welcome back!</h3>
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
        <button type="submit">Login</button>
        {responseError ? <small>{responseError}</small> : null}
        <p className={styles.referParagraph}>
          You don't have an account?{" "}
          <span>
            <Link href="/register">Register here.</Link>
          </span>
          !
        </p>
      </form>
    </div>
  );
}

export default Login;
