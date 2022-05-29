import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import { useQuery } from "react-query";

function ProfilePhoto({ link }) {
  const [pp, setPP] = useState("");

  function fetcheR() {
    return supabase.storage.from("main").download(`${link}`);
  }
  const { isLoading, data, isError } = useQuery("pp", fetcheR);

  return (
    <div>
      {data ? <img src={URL.createObjectURL(data.data)} alt="img" /> : ""}
    </div>
  );
}

export default ProfilePhoto;
