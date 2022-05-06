import regstyles from "../../styles/register.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
  const [responseError, setRecponseError] = useState();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function registerPassword(e) {
    setPassword(e.target.value);
  }
  function checkPassword(e) {
    setConfPassword(e.target.value);
    if (password !== confPassword) {
      setError(true);
    }
    setError(false);
  }

  async function registerUser(data) {
    fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        setRecponseError();
        console.log(response);
      } else if (data.status == 401) {
        setRecponseError(response.msg);
        console.log(response.msg);
      } else {
        setRecponseError(response.msg);
        console.log(response.msg);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(registerUser)} className={regstyles.register}>
      <div className={regstyles.names}>
        <div className={regstyles.inputContainer}>
          <input
            {...register("firstname", { required: "Firstname is required" })}
            type="text"
            placeholder="Firstname"
          />
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>
        <div className={regstyles.inputContainer}>
          <input
            {...register("lastname", { required: "Lastname is required" })}
            type="text"
            placeholder="Lastname"
          />
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>
      </div>
      <div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
        {errors.email?.type == "pattern" && <span>Invalid Email</span>}
      </div>
      <div className={regstyles.countries}>
        <div className={regstyles.inputContainer}>
          <input
            {...register("country", { required: "Country is required" })}
            type="text"
            placeholder="Country"
          />
          {errors.country && <span>{errors.country.message}</span>}
        </div>
        <div className={regstyles.inputContainer}>
          <input
            {...register("city", { required: "City is required" })}
            type="text"
            placeholder="City"
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>
      </div>
      <div>
        <input
          {...register("password", { required: "Password is required" })}
          type="text"
          placeholder="Password"
          value={password}
          onChange={registerPassword}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <input
          {...register("confirm_password", {
            required: "Please confirm password",
          })}
          value={confPassword}
          onChange={checkPassword}
          type="text"
          placeholder="Confirm password"
        />
        {errors.confirm_password && (
          <span>{errors.confirm_password.message}</span>
        )}
      </div>
      {responseError ? <small>{responseError}</small> : null}
      {error ? <small>Passwords don't match!</small> : null}
      <button type="submit">Next</button>
    </form>
  );
}

export default Register;
