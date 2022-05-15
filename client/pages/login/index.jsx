import styles from "../../styles/login.module.scss";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [responseError, setRecponseError] = useState();
  const [recruiterCheckbox, setRecruiterCheckbox] = useState(false);
  const [developerCheckbox, setDeveloperCheckbox] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const recruiterBox = useRef();
  const developerBox = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function labelClicked(e) {
    switch (e.target.innerText) {
      case "Developer":
        setDeveloperCheckbox(true);
        setRecruiterCheckbox(false);
        recruiterBox.current.style.backgroundColor = "white";
        developerBox.current.style.backgroundColor = "#2fe032";
        return;
      case "Recruiter":
        setRecruiterCheckbox(true);
        setDeveloperCheckbox(false);
        recruiterBox.current.style.backgroundColor = "#2fe032";
        developerBox.current.style.backgroundColor = "white";
        return;
    }
  }

  function recboxClicked(e) {
    setRecruiterCheckbox(true);
    setDeveloperCheckbox(false);
    recruiterBox.current.style.backgroundColor = "#2fe032";
    developerBox.current.style.backgroundColor = "white";
    return;
  }

  function devboxClicked(e) {
    setDeveloperCheckbox(true);
    setRecruiterCheckbox(false);
    recruiterBox.current.style.backgroundColor = "white";
    developerBox.current.style.backgroundColor = "#2fe032";
    return;
  }

  const onSubmit = (data) => {
    if (developerCheckbox) {
      fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(async (data) => {
        const response = await data.json();
        if (data.status == 200) {
          localStorage.setItem(
            "recruiter-x-auth-token",
            JSON.stringify(response)
          );
          router.push("/devs");
          setRecponseError();
        } else {
          setRecponseError(response.msg);
        }
      });
    } else if (recruiterCheckbox) {
      fetch("http://localhost:3001/recruiter/login", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(data),
      }).then(async (data) => {
        const response = await data.json();
        if (data.status == 200) {
          localStorage.setItem(
            "recruiter-x-auth-token",
            JSON.stringify(response)
          );
          router.push("/devs");
          setRecponseError();
        } else {
          setRecponseError(response.msg);
        }
      });
    } else {
      setCheckboxError(true);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      router.push("/developerprofile");
    } else {
      setNotLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {notLoggedIn ? (
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)} action="submit">
            <h3>Hey! welcome back!</h3>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <small>Email is required</small>
            )}
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              type="text"
            />
            {errors.password?.type === "required" && (
              <small>Password is required</small>
            )}
            <div className={styles.recOrDev}>
              <p>Are you a Develper or a recruiter?</p>
              <div className={styles.checkboxContainer}>
                <div className={styles.checkbox}>
                  <div
                    onClick={recboxClicked}
                    ref={recruiterBox}
                    className={styles.check}
                  ></div>
                  <p onClick={labelClicked}>Recruiter</p>
                </div>
                <div className={styles.checkbox}>
                  <div
                    onClick={devboxClicked}
                    ref={developerBox}
                    className={styles.check}
                  ></div>
                  <p onClick={labelClicked}>Developer</p>
                </div>
              </div>
              {checkboxError ? <small>Please select one!</small> : null}
            </div>
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
