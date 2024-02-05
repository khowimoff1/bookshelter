const form = document.getElementById("l_form");
const pass = document.getElementById("l_password");
const eye = document.querySelector(".eye");
const eyeSlash = document.querySelector(".eye_slash"); 

eye.addEventListener("click", ()=>{
  pass.setAttribute("type","text")
  eye.setAttribute("style","display:none");
  eyeSlash.setAttribute("style","display:block");
})
eyeSlash.addEventListener("click", ()=>{
  pass.setAttribute("type","password")
  eyeSlash.setAttribute("style","display:none");
  eye.setAttribute("style","display:block");
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userValue = document.getElementById("l_text").value;
  const passwordValue = document.getElementById("l_password").value;
  if (passwordValue.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  localStorage.setItem("password", passwordValue);
  localStorage.setItem("user", userValue);
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.setItem("token", data.token);
      window.location.replace("home.html");
    });
});

