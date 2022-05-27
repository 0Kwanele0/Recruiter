import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import { useQuery } from "react-query";

function Resume({ link }) {
  function fetcheR() {
    return supabase.storage.from("main").download(`${link}`);
  }
  const { isLoading, data, isError } = useQuery("res", fetcheR);

  if (isLoading) {
    return <a href="">Loading resume</a>;
  }
  if (isError) {
    return <a href="">Download resume</a>;
  }
  if (data) {
    return <a href={URL.createObjectURL(data.data)}>Download resume</a>;
  }
}

export default Resume;
