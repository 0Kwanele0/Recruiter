import regstyles from "../../styles/register.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Register from "../../components/register/Register";
import Details from "../../components/register/Details";
import Links from "../../components/register/Links";
import { registerContext } from "../../components/register/utils/registerContext";

function Index() {
  const router = useRouter();
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [registering, setRegistering] = useState(true);
  const [details, setDetails] = useState(false);
  const [links, setLinks] = useState(false);

  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("recruiter-x-auth-token");
    if (token) {
      router.push("/developerprofile");
    } else {
      setNotLoggedIn(true);
    }
  }, []);

  return (
    <registerContext.Provider
      value={{
        user,
        setUser,
        registering,
        setRegistering,
        details,
        setDetails,
        links,
        setLinks,
      }}
    >
      <div>
        {notLoggedIn ? (
          <div className={regstyles.container}>
            <div className={regstyles.formsContainer}>
              {registering && <Register />}
              {details && <Details />}
              {links && <Links />}
              <p className={regstyles.referParagraph}>
                You already have an account?{" "}
                <span>
                  <Link href="/login">Login here.</Link>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </registerContext.Provider>
  );
}

export default Index;
