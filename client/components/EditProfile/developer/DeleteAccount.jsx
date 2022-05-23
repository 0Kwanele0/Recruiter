import { useRouter } from "next/router";
import styles from "../styles/editProfile.module.scss";

function DeleteAccount(props) {
 const router = useRouter();

 async function Delete(e) {
  e.preventDefault();
  fetch(`${process.env.SERVER}/user/${props.user._id}`, {
   method: "DELETE",
   headers: {
    "recruiter-x-auth-token": props.token,
   },
  }).then(async (response) => {
   const { data, error } = await supabase.storage
    .from("main")
    .remove([
     `${props.user.profilephoto ? props.user.profilephoto : ""}`,
     `${props.user.myresume ? props.user.myresume : ""}`,
    ]);
   if (data) {
    localStorage.removeItem("recruiter-x-auth-token");
    router.reload();
   }
   localStorage.removeItem("recruiter-x-auth-token");
   router.reload();
  });
 }

 return (
  <form className={styles.form} action="submit" onSubmit={Delete}>
   <button type="submit">Terminate Account</button>
  </form>
 );
}

export default DeleteAccount;
