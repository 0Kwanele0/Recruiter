import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";

function ProfilePhoto({ link }) {
  const [pp, setPP] = useState("");

  async function fetcheR() {
    try {
      const { data, error } = await supabase.storage
        .from("main")
        .download(`${link}`);
      if (error) throw error;
      else {
        setPP(URL.createObjectURL(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetcheR();
  }, []);

  return <img src={pp} alt="img" />;
}

export default ProfilePhoto;
