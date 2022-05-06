import regstyles from "../../styles/register.module.scss";
import { useState } from "react";
import Details from "../../components/forms/Details";
import Links from "../../components/forms/Links";
import Register from "../../components/forms/Register";

function Index() {
  const [register, setRegister] = useState(true);
  const [details, setdetails] = useState(false);
  const [links, setlinks] = useState(false);

  function changeVuew(e) {
    switch (e.target.innerText) {
      case "1":
        setRegister(true);
        setdetails(false);
        setlinks(false);
        return;
      case "2":
        setRegister(false);
        setdetails(true);
        setlinks(false);
        return;
      case "3":
        setRegister(false);
        setdetails(false);
        setlinks(true);
        return;
    }
  }

  return (
    <div className={regstyles.container}>
      <div className={regstyles.formsContainer}>
        <div className={regstyles.counter}>
          <div onClick={changeVuew} className={regstyles.paraCont}>
            <p>1</p>
          </div>
          <div onClick={changeVuew} className={regstyles.paraCont}>
            <p>2</p>
          </div>
          <div onClick={changeVuew} className={regstyles.paraCont}>
            <p>3</p>
          </div>
        </div>
        {register && <Register />}
        {details && <Details />}
        {links && <Links />}
      </div>
    </div>
  );
}

export default Index;
