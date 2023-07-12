const loginAndRedirect = () => {
  let formElement = document.forms.loginForm;
  let formValues = new FormData(formElement);
  const email = formValues.get("email");
  const password = formValues.get("password");
  postLoginData(email, password).then(async (response) => {
    const data = await response.json();
    localStorage.setItem("tokens", JSON.stringify(data));
    window.location.href = "/dashboard";
  });
};

const handleLogout = ()=>{
  localStorage.clear();
  window.location.href = "/"
}

const postLoginData = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
};


const openModal = (courseId)=>{
  document.querySelector(".dropdown-container-id-"+courseId).style.display="block";
  document.querySelector(".modal-background").style.display="block";
}

const closeModal = ()=>{
  document.querySelector(".dropdown-container").style.display="none";
  document.querySelector(".modal-background").style.display="none";
}

const showFileSection = ()=>{
  document.querySelector(".image-display-section").style.display="none";
  document.querySelector(".file-section-container").style.display="block";
}

const showImageSection = ()=>{
  document.querySelector(".image-display-section").style.display="block";
  document.querySelector(".file-section-container").style.display="none";
}

const aboutUseditor = Jodit.make("#about-us-description");

const updateAboutUs = (event)=>{
  event.preventDefault();
  const formElement = document.querySelector("#aboutUsForm");
  const formData = new FormData(formElement);
  // formData.append("courseDescription",editor.value);
  postAboutUsData(formData).then(async (response) => {
    // window.location.href = "/courses";
  }).catch(err=>{
    console.log(err);
  })
}

const postAboutUsData = async (aboutUsData) => {
  const { accessToken } = JSON.parse(localStorage.getItem("tokens"));
  const response = await fetch(`/api/v1/about/add-about-us`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: aboutUsData
  });
  return response;
};
