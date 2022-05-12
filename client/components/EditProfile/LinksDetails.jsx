import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/profile.module.scss";
import twitter from "../../public/assets/icons/twitter.png";
import github from "../../public/assets/icons/github.png";
import linkedin from "../../public/assets/icons/linkedin.png";
import internet from "../../public/assets/icons/internet.png";

function LinksDetails(props) {
  const links = JSON.parse(props.user.links[0]);
  const [githubLink, setGithubLink] = useState(links[0].link);
  const [twitterLink, setTwitterLink] = useState(links[1].link);
  const [linkedinLink, setLinkedinLink] = useState(links[2].link);
  const [portfolioLink, setPortfolioLink] = useState(links[3].link);

  function changeLinks(e) {
    switch (e.target.name) {
      case "github":
        setGithubLink(e.target.value);
        return;
      case "twitter":
        setTwitterLink(e.target.value);
        return;
      case "linkedin":
        setLinkedinLink(e.target.value);
        return;
      case "portfolio":
        setPortfolioLink(e.target.value);
        return;
    }
  }

  function saveLinks(e) {
    e.preventDefault();
    const links = [
      { name: "GitHub", link: githubLink },
      { name: "Twitter", link: twitterLink },
      { name: "LinkeIn", link: linkedinLink },
      { name: "Portfolio", link: portfolioLink },
    ];

    fetch("", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(links),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 200) {
        console.log(data);
      } else {
        console.log(data);
      }
    });
  }

  return (
    <form>
      <div className={styles.skillsfield}>
        <Image src={github} width={40} height={40} />
        <input
          value={githubLink}
          onChange={changeLinks}
          name="github"
          placeholder="Add you GitHub Link"
          type="text"
        />
      </div>
      <div className={styles.skillsfield}>
        <Image src={linkedin} width={40} height={40} />
        <input
          value={linkedinLink}
          onChange={changeLinks}
          name="linkedin"
          placeholder="Add you LinkedIn Link"
          type="text"
        />
      </div>
      <div className={styles.skillsfield}>
        <Image src={twitter} width={40} height={40} />
        <input
          value={twitterLink}
          onChange={changeLinks}
          name="twitter"
          placeholder="Add you Twitter Link"
          type="text"
        />
      </div>
      <div className={styles.skillsfield}>
        <Image src={internet} width={40} height={40} />
        <input
          value={portfolioLink}
          onChange={changeLinks}
          name="portfolio"
          placeholder="Add your Portfolio Link"
          type="text"
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default LinksDetails;
