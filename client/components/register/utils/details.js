export function submitDetailsHandler(
  selectedCategory,
  selectedExperience,
  skills,
  bio,
  setLoading,
  token = JSON.parse(localStorage.getItem("recruiter-x-auth-token")).token,
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
    fetch(`${process.env.SERVER}/user/details/${user.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "recruiter-x-auth-token": token,
      },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const response = await data.json();
      if (data.status == 200) {
        setDetailsError();
        setLoading(false);
      } else if (data.status == 401) {
        setLoading(false);
        setDetailsError("kaka");
      } else {
        setLoading(false);
        setDetailsError("kaka");
      }
    });
  } else {
    setDetailsError("all fields should be complete.");
  }
}
