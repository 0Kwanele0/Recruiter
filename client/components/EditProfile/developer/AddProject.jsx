import { useRouter } from "next/router";
import { useState } from "react";
import mystyles from "../../../styles/profile.module.scss";

function AddProject(props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  function saveProject(e) {
    e.preventDefault();
    const data = { title, link, description };
    fetch(`http://localhost:3001/user/addproject/${props.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "recruiter-x-auth-token": props.token,
      },
      body: JSON.stringify({ project: data }),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
        router.reload();
      } else {
      }
    });
  }

  return (
    <div className={mystyles.addProject}>
      <form onSubmit={saveProject}>
        <div className={mystyles.addProjectNames}>
          <input
            value={title}
            required={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Project name"
          />
          <input
            value={link}
            required={true}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            type="url"
            placeholder="Project link"
          />
        </div>
        <textarea
          value={description}
          required={true}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          name=""
          id=""
          cols="30"
          rows="4"
          placeholder="Project description"
        ></textarea>
        <button>Add project</button>
      </form>
    </div>
  );
}

export default AddProject;
