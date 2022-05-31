import { supabase } from "../../../data/supabaseClient";
export function changeLinkHandler(
  e,
  setGithubLink,
  setLinkedinLink,
  setTwitterLink,
  setPortfolioLink
) {
  switch (e.target.name) {
    case "github":
      setGithubLink(e.target.value);
      return;
    case "linkedin":
      setLinkedinLink(e.target.value);
      return;
    case "twitter":
      setTwitterLink(e.target.value);
      return;
    case "portfolio":
      setPortfolioLink(e.target.value);
      return;
  }
}

export function submitLinksHandler(
  portfolioLink,
  linkedinLink,
  twitterLink,
  githubLink,
  setLoading,
  imageLink,
  resume,
  user,
  router
) {
  const links = [
    { name: "GitHub", link: githubLink },
    { name: "Twitter", link: twitterLink },
    { name: "LinkeIn", link: linkedinLink },
    { name: "Portfolio", link: portfolioLink },
  ];

  if (imageLink && resume) {
    LinksAndMedia(
      links,
      setLoading,
      resume,
      imageLink,
      user.token,
      user.user._id,
      router,
      setLinks
    );
  } else if (imageLink && !resume) {
    LinksAndProfilePic(
      links,
      setLoading,
      resume,
      user.token,
      user.user._id,
      router,
      setLinks
    );
  } else if (resume && !imageLink) {
    LinksAndResume(
      links,
      setLoading,
      resume,
      user.token,
      user.user._id,
      router,
      setLinks
    );
  } else {
    linksNoMedia(
      links,
      setLoading,
      user.token,
      user.user._id,
      router,
      setLinks
    );
  }
}

function linksNoMedia(links, setLoading, token, id, router, setLinks) {
  const formData = { links: links };
  setLoading(true);
  fetch(`${process.env.SERVER}/user/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/Json",
      "recruiter-x-auth-token": token,
    },
    body: JSON.stringify(formData),
  }).then(async (data) => {
    const response = await data.json();
    if (data.status == 200) {
      setLoading(false);
      router.reload();
      setLinks(false);
    } else if (data.status == 401) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  });
}

async function LinksAndResume(
  links,
  setLoading,
  resume,
  token,
  id,
  router,
  setLinks
) {
  setLoading(true);
  const resumeName = `resumes/${id}res.pdf`;
  const { resumedata, imgerror } = await supabase.storage
    .from("main")
    .upload(resumeName, resume);
  const formData = { resume: resumeName, links: links };
  fetch(`${process.env.SERVER}/user/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/Json",
      "recruiter-x-auth-token": token,
    },
    body: JSON.stringify(formData),
  }).then(async (data) => {
    const response = await data.json();
    if (data.status == 200) {
      setLoading(false);
      router.reload();
      setLinks(false);
    } else if (data.status == 401) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  });
}

async function LinksAndProfilePic(
  links,
  setLoading,
  imageLink,
  token,
  id,
  router,
  setLinks
) {
  setLoading(true);
  const imageName = `avatars/${id}pp.png`;
  const { imgdata, imgerror } = await supabase.storage
    .from("main")
    .upload(imageName, imageLink);
  const formData = { profilephoto: imageName, links: links };
  fetch(`${process.env.SERVER}/user/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/Json",
      "recruiter-x-auth-token": token,
    },
    body: JSON.stringify(formData),
  }).then(async (data) => {
    const response = await data.json();
    if (data.status == 200) {
      setLoading(false);
      router.reload();
      setLinks(false);
    } else if (data.status == 401) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  });
}

async function LinksAndMedia(
  links,
  setLoading,
  resume,
  imageLink,
  token,
  id,
  router,
  setLinks
) {
  setLoading(true);
  const imageName = `avatars/${id}pp.png`;
  const resumeName = `resumes/${id}res.pdf`;
  const { imgdata, imgerror } = await supabase.storage
    .from("main")
    .upload(imageName, imageLink);
  const { resumedata, resumeerror } = await supabase.storage
    .from("main")
    .upload(resumeName, resume);

  const formData = {
    resume: resumeName,
    profilephoto: imageName,
    links: links,
  };
  fetch(`${process.env.SERVER}/user/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/Json",
      "recruiter-x-auth-token": token,
    },
    body: JSON.stringify(formData),
  }).then(async (data) => {
    const response = await data.json();
    if (data.status == 200) {
      setLoading(false);
      router.reload();
      setLinks(false);
    } else if (data.status == 401) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  });
}
