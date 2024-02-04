const form = document.getElementById("l_form");

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
      window.location.replace("phome.html");
    });
});
