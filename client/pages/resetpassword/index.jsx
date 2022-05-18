import { useRef, useState } from "react";
import styles from "../../styles/login.module.scss";

function Index() {
  const [recruiterCheckbox, setRecruiterCheckbox] = useState(false);
  const [developerCheckbox, setDeveloperCheckbox] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const recruiterBox = useRef();
  const developerBox = useRef();

  function labelClicked(e) {
    switch (e.target.innerText) {
      case "Developer":
        setDeveloperCheckbox(true);
        setRecruiterCheckbox(false);
        setCheckboxError(false);
        recruiterBox.current.style.backgroundColor = "white";
        developerBox.current.style.backgroundColor = "#2fe032";
        return;
      case "Recruiter":
        setRecruiterCheckbox(true);
        setDeveloperCheckbox(false);
        setCheckboxError(false);
        recruiterBox.current.style.backgroundColor = "#2fe032";
        developerBox.current.style.backgroundColor = "white";
        return;
    }
  }

  function recboxClicked(e) {
    setRecruiterCheckbox(true);
    setDeveloperCheckbox(false);
    setCheckboxError(false);
    recruiterBox.current.style.backgroundColor = "#2fe032";
    developerBox.current.style.backgroundColor = "white";
    return;
  }

  function devboxClicked(e) {
    setCheckboxError(false);
    setDeveloperCheckbox(true);
    setRecruiterCheckbox(false);
    recruiterBox.current.style.backgroundColor = "white";
    developerBox.current.style.backgroundColor = "#2fe032";
    return;
  }

  const onSubmit = (data) => {
    data.preventDefault();
    const theData = { email: email };
    if (developerCheckbox) {
      fetch(`${process.env.SERVER}/user/resetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theData),
      }).then(async (data) => {
        const response = await data.json();
        if (data.status == 200) {
          //email found
        } else {
        }
      });
    } else if (recruiterCheckbox) {
      fetch(`${process.env.SERVER}/recruiter/resetpassword`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(theData),
      }).then(async (data) => {
        const response = await data.json();
        if (data.status == 200) {
          setDone(true);
        } else {
        }
      });
    } else {
      setCheckboxError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        {done && <p>We've sent your a link via email</p>}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required={true}
          value={email}
          type="email"
          placeholder="Type your email"
        />
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
        <button>Reset password</button>
      </form>
    </div>
  );
}

export default Index;
