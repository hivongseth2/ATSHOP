const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Ngăn chặn form submit

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = {
    password,
    username,
  };

  fetch("http://localhost:8080/api/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(
      (data) => localStorage.setItem("data", JSON.stringify(data)),

      alert("Bạn đã đăng nhập thành công")
    )
    .catch((error) => console.error(error));
});
