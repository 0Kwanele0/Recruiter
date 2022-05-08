import "../styles/globals.css";
import Layout from "./layout";
import { createContext, useState, useEffect } from "react";
import { UserDetails } from "../context/UserDetails";

function MyApp({ Component, pageProps }) {
  const [details, setDetails] = useState();
  useEffect(() => {
    setDetails(localStorage.getItem("recruiter-auth-token"));
  }, []);

  return (
    <UserDetails.Provider value={details}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserDetails.Provider>
  );
}

export default MyApp;
