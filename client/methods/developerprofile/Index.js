export function changeEditMenu(
  ev,
  setEditLinks,
  setEditPersonalDetails,
  setDeleteUser,
  setEditSkills
) {
  switch (ev.target.innerText) {
    case "Personal details":
      setEditLinks(false);
      setEditPersonalDetails(true);
      setEditSkills(false);
      setDeleteUser(false);
      return;
    case "Links":
      setEditLinks(true);
      setEditPersonalDetails(false);
      setEditSkills(false);
      setDeleteUser(false);
      return;
    case "Skills":
      setEditLinks(false);
      setEditPersonalDetails(false);
      setEditSkills(true);
      setDeleteUser(false);
      return;
    case "More":
      setEditLinks(false);
      setEditPersonalDetails(false);
      setEditSkills(false);
      setDeleteUser(true);
      return;
  }
}

export function showProjectEditor(setEditProject, plusBtn, editProject) {
  setEditProject(!editProject);
  if (editProject) {
    plusBtn.current.style.transform = "rotate(0)";
  } else {
    plusBtn.current.style.transform = "rotate(45deg)";
  }
}
