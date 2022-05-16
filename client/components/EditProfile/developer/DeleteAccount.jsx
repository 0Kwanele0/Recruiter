import { useRouter } from "next/router";
import styles from "../styles/editProfile.module.scss";

function DeleteAccount(props) {
  const router = useRouter();

  function Delete(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/user/${props.user._id}`, {
      method: "DELETE",
      headers: {
        "recruiter-x-auth-token": props.token,
      },
    }).then(async (response) => {
      localStorage.removeItem("recruiter-x-auth-token");
      router.reload();
      router.push("/");
    });
  }

  return (
    <form className={styles.form} action="submit" onSubmit={Delete}>
      <button type="submit">Terminate Account</button>
    </form>
  );
}

export default DeleteAccount;
