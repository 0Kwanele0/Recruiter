import { useState } from "react";
import mystyles from "../styles/editProfile.module.scss";
import { Countries } from "../../../data/Countries";
import { supabase } from "../../../data/supabaseClient";

function PersonalDetails(props) {
  const [firstname, setFirstname] = useState(props.user.firstname);
  const [profilephoto, setProfilephoto] = useState(
    props.user.profilephoto || null
  );
  const [resume, setResume] = useState(props.user.myresume || null);
  const [lastname, setLastname] = useState(props.user.lastname);
  const [city, setCity] = useState(props.user.city);
  const [country, setCountry] = useState(props.user.country);
  const [bio, setBio] = useState(props.user.bio);
  const [displayCountries, setDisplayCountries] = useState(false);

  function changingValues(e) {
    switch (e.target.name) {
      case "firstname":
        setFirstname(e.target.value);
        return;
      case "lastname":
        setLastname(e.target.value);
        return;
      case "country":
        return;
      case "city":
        setCity(e.target.value);
        return;
      case "bio":
        setBio(e.target.value);
        return;
    }
  }

  function CountrySelected(e) {
    setCountry(e.target.innerText);
    setDisplayCountries(false);
  }

  async function saveDetails(e) {
    e.preventDefault();
    if (e.target.profilephoto.files[0] && !e.target.resume.files[0]) {
      if (profilephoto) {
        const avatarFile = e.target.profilephoto.files[0];
        const { data, error } = await supabase.storage
          .from("main")
          .update(`${profilephoto}`, avatarFile);
        if (data) {
          console.log("done", data);
        }
        //Request
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          profilephoto: profilephoto,
          resume: resume,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
        //End Request
      } else {
        const imageName = `avatars/${props.user._id}pp.png`;
        const avatarFile = e.target.profilephoto.files[0];
        supabase.storage.from("main").upload(imageName, avatarFile);
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          resume: resume,
          profilephoto: imageName,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
        //End Request
      }
    } else if (e.target.profilephoto.files[0] && e.target.resume.files[0]) {
      if (profilephoto && resume) {
        const avatarFile = e.target.profilephoto.files[0];
        const resumeFile = e.target.resume.files[0];
        supabase.storage.from("main").update(`${profilephoto}`, avatarFile);
        supabase.storage.from("main").update(`${resume}`, resumeFile);
        //Request
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          resume: resume,
          profilephoto: profilephoto,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
      } else if (profilephoto && !resume) {
        const avatarFile = e.target.profilephoto.files[0];
        const resumeFile = e.target.resume.files[0];
        const resumeName = `resumes/${props.user._id}res.pdf`;
        supabase.storage.from("main").upload(resumeName, resumeFile);
        supabase.storage.from("main").update(`${profilephoto}`, avatarFile);
        //Request
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          resume: resumeName,
          profilephoto: profilephoto,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
      } else if (!profilephoto && resume) {
        const resumeFile = e.target.resume.files[0];
        const avatarFile = e.target.profilephoto.files[0];
        const imageName = `avatars/${props.user._id}pp.png`;
        supabase.storage.from("main").upload(imageName, avatarFile);
        supabase.storage.from("main").update(`${resume}`, resumeFile);
        //Request
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          profilephoto: imageName,
          resume: resume,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
      } else {
        const avatarFile = e.target.profilephoto.files[0];
        const resumeFile = e.target.resume.files[0];
        const imageName = `avatars/${props.user._id}pp.png`;
        const resumeName = `resumes/${props.user._id}res.pdf`;
        supabase.storage.from("main").upload(imageName, avatarFile);
        supabase.storage.from("main").upload(resumeName, resumeFile);
        //Request
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          resume: resumeName,
          profilephoto: imageName,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
      }
    } else if (!e.target.profilephoto.files[0] && e.target.resume.files[0]) {
      if (resume) {
        const resumeFile = e.target.profilephoto.files[0];
        supabase.storage.from("main").update(`${resume}`, resumeFile);
        //Request
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          resume: resume,
          profilephoto: profilephoto,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
        //End Request
      } else {
        const resumeFile = e.target.resume.files[0];
        const resumeName = `resumes/${props.user._id}res.pdf`;
        supabase.storage.from("main").upload(resumeName, resumeFile);
        const formData = {
          firstname: firstname,
          city: city,
          country: country,
          bio: bio,
          lastname: lastname,
          resume: resumeName,
          profilephoto: profilephoto,
        };
        fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
          method: "PUT",
          headers: {
            "recruiter-x-auth-token": props.token,
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (response.status == 200) {
          } else {
          }
        });
        //End Request
      }
    } else {
      const formData = {
        firstname: firstname,
        city: city,
        country: country,
        bio: bio,
        lastname: lastname,
        resume: resume,
        profilephoto: profilephoto,
      };
      fetch(`${process.env.SERVER}/user/detailsedit/${props.user._id}`, {
        method: "PUT",
        headers: {
          "recruiter-x-auth-token": props.token,
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        const data = await response.json();
        if (response.status == 200) {
        } else {
        }
      });
    }
  }

  return (
    <form
      encType="multipart/form-data"
      className={mystyles.form}
      onSubmit={saveDetails}
      action="submit"
    >
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Bio</label>
          <textarea
            rows="3"
            value={bio}
            onChange={changingValues}
            name="bio"
            type="text"
          />
        </div>
      </div>
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Profile Photo</label>
          <input name="profilephoto" type="file" />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Resume</label>
          <input name="resume" type="file" />
        </div>
      </div>
      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">FirstName</label>
          <input
            value={firstname}
            onChange={changingValues}
            name="firstname"
            type="text"
          />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">LaststName</label>
          <input
            value={lastname}
            onChange={changingValues}
            name="lastname"
            type="text"
          />
        </div>
      </div>

      <div className={mystyles.inputContainer}>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">City</label>
          <input
            value={city}
            onChange={changingValues}
            name="city"
            type="text"
          />
        </div>
        <div className={mystyles.inputAndLabel}>
          <label htmlFor="">Country</label>
          <input
            value={country}
            onChange={changingValues}
            onClick={(e) => {
              setDisplayCountries(!displayCountries);
            }}
            name="country"
            type="text"
          />
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
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default PersonalDetails;
