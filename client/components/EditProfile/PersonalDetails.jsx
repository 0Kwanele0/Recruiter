import mystyles from "../../styles/profile.module.scss";

function PersonalDetails(props) {
  return (
    <form action="">
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">FirstName</label>
          <input value={props.user.firstname} name="firstname" type="text" />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">LaststName</label>
          <input value={props.user.lastname} name="lastname" type="text" />
        </div>
      </div>
      <div className={mystyles.inputAndLabel}>
        <label htmlFor="">Profile photo</label>
        <input value={props.user.laststname} name="profilephoto" type="file" />
      </div>
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">City</label>
          <input value={props.user.city} name="city" type="text" />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Country</label>
          <input value={props.user.country} name="country" type="text" />
        </div>
      </div>
      <button>Save</button>
    </form>
  );
}

export default PersonalDetails;
