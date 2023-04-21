document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      birthday: document.getElementById("birthday").value,
      fullName: document.getElementById("full-name").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone-number").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    fetch("http://localhost:8080/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => alert("Bạn đã đăng kí thành công " + data))
      .catch((error) => console.error(error));
  });
});
