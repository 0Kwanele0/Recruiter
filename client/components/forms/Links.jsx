import { useState } from "react";
import regstyles from "../../styles/register.module.scss";
import github from "../../public/assets/icons/github.png";
import twitter from "../../public/assets/icons/twitter.png";
import linkedin from "../../public/assets/icons/linkedin.png";
import internet from "../../public/assets/icons/internet.png";
import avater from "../../public/assets/icons/avatar.png";
import Image from "next/image";

function Links() {
  const [responseError, setRecponseError] = useState();

  return (
    <div className={regstyles.links}>
      <div className={regstyles.file}>
        <Image src={avater} width={40} height={40} />
        <label>Upload a profile pic</label>
        <input type="file" />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={github} width={30} height={30} />
        <input placeholder="Add you GitHub Link" type="text" />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={linkedin} width={30} height={30} />
        <input placeholder="Add you LinkedIn Link" type="text" />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={twitter} width={30} height={30} />
        <input placeholder="Add you Twitter Link" type="text" />
      </div>
      <div className={regstyles.skillsfield}>
        <Image src={internet} width={30} height={30} />
        <input placeholder="Add you Website Link" type="text" />
      </div>
      <button type="submit">Next</button>
      {responseError ? <small>{responseError}</small> : null}
    </div>
  );
}

export default Links;
