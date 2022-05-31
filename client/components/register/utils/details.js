export function submitDetailsHandler(
  selectedCategory,
  selectedExperience,
  skills,
  bio,
  setLoading,
  user,
  setLinks,
  setDetails,
  setDetailsError
) {
  if (
    selectedCategory &&
    selectedExperience &&
    skills.length > 0 &&
    bio.trim().length > 0
  ) {
    const data = {
      skills: skills,
      bio: bio,
      category: selectedCategory,
      experience: selectedExperience,
    };
    setLoading(true);
    fetch(`http://localhost:3001/user/details/${user.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "recruiter-x-auth-token": user.token,
      },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        setDetailsError();
        setDetails(false);
        setLinks(true);
        setLoading(false);
      } else if (data.status == 401) {
        setLoading(false);
        //server error
      } else {
        setLoading(false);
        //server error
      }
    });
  } else {
    setDetailsError(true);
  }
}
