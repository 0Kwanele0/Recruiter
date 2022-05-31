import { useState, useContext, useRef } from "react";
import { Countries } from "../../data/Countries";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import regstyles from "../../styles/register.module.scss";
import {
  devboxClickedHandler,
  labelClickedHandler,
  recboxClickedHandler,
  registerRecruiter,
  registerUser,
} from "./utils/register";
import { registerContext } from "./utils/registerContext";

function Register() {
  const recruiterBox = useRef();
  const developerBox = useRef();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [country, setCountry] = useState("");
  const [displayCountries, setDisplayCountries] = useState(false);
  const [recruiterCheckbox, setRecruiterCheckbox] = useState(false);
  const [developerCheckbox, setDeveloperCheckbox] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseError, setResponseError] = useState();
  const [checkboxError, setCheckboxError] = useState(false);

  const { setUser, setRegistering, setLinks, setDetails } =
    useContext(registerContext);

  const router = useRouter();

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

  function CountrySelected(e) {
    setCountry(e.target.innerText);
    setDisplayCountries(false);
  }

  function labelClicked(e) {
    labelClickedHandler(
      e,
      recruiterBox,
      developerBox,
      setDeveloperCheckbox,
      setRecruiterCheckbox
    );
  }

  function recboxClicked() {
    recboxClickedHandler(
      recruiterBox,
      developerBox,
      setRecruiterCheckbox,
      setDeveloperCheckbox
    );
  }

  function devboxClicked() {
    devboxClickedHandler(
      recruiterBox,
      developerBox,
      setRecruiterCheckbox,
      setDeveloperCheckbox
    );
  }

  function registerMe(data) {
    data.country = country;
    if (developerCheckbox) {
      registerUser(
        data,
        setUser,
        setLoading,
        setResponseError,
        setRegistering,
        setLinks,
        setDetails
      );
    } else if (recruiterCheckbox) {
      registerRecruiter(data, setLoading, setResponseError, router);
    } else {
      setCheckboxError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(registerMe)} className={regstyles.register}>
      <div className={regstyles.names}>
        <div className={regstyles.inputContainer}>
          <input
            {...register("firstname", {
              required: "Firstname is required",
            })}
            type="text"
            placeholder="Firstname"
          />
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>
        <div className={regstyles.inputContainer}>
          <input
            {...register("lastname", {
              required: "Lastname is required",
            })}
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
            onClick={() => setDisplayCountries(!displayCountries)}
            value={country}
            type="text"
            placeholder="Country"
            required={true}
            onChange={() => {
              null;
            }}
          />
          {errors.country && <span>{errors.country.message}</span>}
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
          {...register("password", {
            required: "Password is required",
          })}
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
      <div className={regstyles.recOrDev}>
        <p>Are you a Develper or a recruiter?</p>
        <div className={regstyles.checkboxContainer}>
          <div className={regstyles.checkbox}>
            <div
              onClick={recboxClicked}
              ref={recruiterBox}
              className={regstyles.check}
            ></div>
            <p onClick={labelClicked}>Recruiter</p>
          </div>
          <div className={regstyles.checkbox}>
            <div
              onClick={devboxClicked}
              ref={developerBox}
              className={regstyles.check}
            ></div>
            <p onClick={labelClicked}>Developer</p>
          </div>
        </div>
        {checkboxError ? <small>Please select one!</small> : null}
      </div>
      {responseError ? <small>{responseError}</small> : null}
      {error ? <small>Passwords don&apos;t match!</small> : null}
      <button type="submit">
        {developerCheckbox
          ? loading
            ? "Loading..."
            : "Next"
          : loading
          ? "Loading..."
          : "Register"}{" "}
      </button>
    </form>
  );
}

export default Register;
