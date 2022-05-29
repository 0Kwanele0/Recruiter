import { supabase } from "../data/supabaseClient";
import { useQuery } from "react-query";

function ProfilePhoto({ link }) {
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
