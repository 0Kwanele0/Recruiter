export const registerUser = (
  data,
  setUser,
  setLoading,
  setResponseError,
  setRegistering,
  setLinks,
  setDetails
) => {
  setLoading(true);
  fetch(`${process.env.SERVER}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (data) => {
    const response = await data.json();
    if (data.status == 200) {
      setResponseError();
      setUser(response);
      setRegistering(false);
      setDetails(true);
      setLinks(false);
      localStorage.setItem("recruiter-x-auth-token", JSON.stringify(response));
      setLoading(false);
    } else if (data.status == 401) {
      setLoading(false);
      setResponseError(response.msg);
    } else {
      setLoading(false);
      setResponseError(response.msg);
    }
  });
};

export const registerRecruiter = (data, setLoading, setResponseError) => {
  setLoading(true);
  fetch(`${process.env.SERVER}/recruiter/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (data) => {
    const response = await data.json();
    if (data.status == 200) {
      setLoading(false);
      setResponseError();
      localStorage.setItem("recruiter-x-auth-token", JSON.stringify(response));
    } else if (data.status == 401) {
      setLoading(false);
      setResponseError(response.msg);
    } else {
      setLoading(false);
      setResponseError(response.msg);
    }
  });
};

export function labelClickedHandler(
  e,
  recruiterBox,
  developerBox,
  setDeveloperCheckbox,
  setRecruiterCheckbox
) {
  switch (e.target.innerText) {
    case "Developer":
      setDeveloperCheckbox(true);
      setRecruiterCheckbox(false);
      recruiterBox.current.style.backgroundColor = "white";
      developerBox.current.style.backgroundColor = "#2fe032";
      return;
    case "Recruiter":
      setRecruiterCheckbox(true);
      setDeveloperCheckbox(false);
      recruiterBox.current.style.backgroundColor = "#2fe032";
      developerBox.current.style.backgroundColor = "white";
      return;
  }
}

export function recboxClickedHandler(
  recruiterBox,
  developerBox,
  setRecruiterCheckbox,
  setDeveloperCheckbox
) {
  setRecruiterCheckbox(true);
  setDeveloperCheckbox(false);
  recruiterBox.current.style.backgroundColor = "#2fe032";
  developerBox.current.style.backgroundColor = "white";
  return;
}

export function devboxClickedHandler(
  recruiterBox,
  developerBox,
  setRecruiterCheckbox,
  setDeveloperCheckbox
) {
  setDeveloperCheckbox(true);
  setRecruiterCheckbox(false);
  recruiterBox.current.style.backgroundColor = "white";
  developerBox.current.style.backgroundColor = "#2fe032";
  return;
}
