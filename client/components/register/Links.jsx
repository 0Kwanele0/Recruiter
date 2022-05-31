import { useContext, useState } from "react";
import regstyles from "../../styles/register.module.scss";
import twitter from "../../public/assets/icons/twitter.png";
import github from "../../public/assets/icons/github.png";
import linkedin from "../../public/assets/icons/linkedin.png";
import internet from "../../public/assets/icons/internet.png";
import avater from "../../public/assets/icons/avatar.png";
import file from "../../public/assets/icons/file.png";
import Image from "next/image";
import { changeLinkHandler, submitLinksHandler } from "./utils/links";
import { registerContext } from "./utils/registerContext";
import { useRouter } from "next/router";

function Links() {
  const [githubLink, setGithubLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [imageLink, setImageLink] = useState();
  const [resume, setResume] = useState();
  const [linksResponseError, setLinksResponseError] = useState();
  const [loading, setLoading] = useState(false);

  const { user, setLinks } = useContext(registerContext);
  const router = useRouter();

  function changeLink(e) {
    changeLinkHandler(
      e,
      setGithubLink,
      setLinkedinLink,
      setTwitterLink,
      setPortfolioLink
    );
  }

  function changeImage(e) {
    setImageLink(e.target.files[0]);
  }

  function changeResume(e) {
    setResume(e.target.files[0]);
  }

  async function submitLinks(e) {
    e.preventDefault();
    submitLinksHandler(
      portfolioLink,
      linkedinLink,
      twitterLink,
      githubLink,
      setLoading,
      imageLink,
      resume,
      user,
      router,
      setLinks
    );
  }

  return (
    <form
      onSubmit={submitLinks}
      encType="multipart/form-data"
      className={regstyles.links}
    >
      <div className={regstyles.file}>
        <Image src={avater} width={40} height={40} alt="avatar" />
        <label>Upload a profile pic</label>
        <input
          onChange={changeImage}
          name="profilephoto"
          id="profilephoto"
          // required={true}
          accept=".png, .jpg, .jpeg"
          type="file"
        />
      </div>
      <div className={regstyles.file}>
        <Image src={file} width={40} height={40} alt="file" />
        <label>Upload Your Resume</label>
        <input
          onChange={changeResume}
          name="resume"
          id="resume"
          // required={true}
          accept=".pdf, .docx"
          type="file"
        />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={github} width={30} height={30} alt="github" />
        <input
          value={githubLink}
          onChange={changeLink}
          name="github"
          placeholder="Add you GitHub Link"
          type="text"
        />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={linkedin} width={30} height={30} alt="linkedin" />
        <input
          value={linkedinLink}
          onChange={changeLink}
          name="linkedin"
          placeholder="Add you LinkedIn Link"
          type="text"
        />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={twitter} width={30} height={30} alt="twitter" />
        <input
          value={twitterLink}
          onChange={changeLink}
          name="twitter"
          placeholder="Add you Twitter Link"
          type="text"
        />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={internet} width={30} height={30} alt="internet" />
        <input
          value={portfolioLink}
          onChange={changeLink}
          name="portfolio"
          placeholder="Add your Portfolio Link"
          type="text"
        />
      </div>
      <button type="submit">{loading ? "Loading..." : "Submit"}</button>
      {linksResponseError ? <small>{linksResponseError}</small> : null}
    </form>
  );
}

export default Links;
