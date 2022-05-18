import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/login.module.scss";

function Index() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmer, setConfirmer] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [complete, setComplete] = useState(false);

  const onSubmit = (data) => {
    data.preventDefault();
    const theData = { password: password };
    if (password == confirmer) {
      fetch(`${process.env.SERVER}/user/userpassword/${router.query.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theData),
      }).then(async (data) => {
        setComplete(true);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      });
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h3>Please type your new password below:</h3>

        {complete && (
          <p className={styles.complete}>Password reset successful</p>
        )}

        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={true}
          value={password}
          type="text"
          placeholder="Type your new password"
        />
        <input
          onChange={(e) => {
            setConfirmer(e.target.value);
          }}
          required={true}
          value={confirmer}
          type="text"
          placeholder="Confirm password"
        />
        {passwordError && <small>Passwords don't match</small>}
        <button>Reset password</button>
      </form>
    </div>
  );
}

export default Index;
