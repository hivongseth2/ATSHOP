const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const fullNameEl = document.getElementById("fullName");
const birthdayEl = document.getElementById("birthday");
const phoneNumberEl = document.getElementById("phoneNumber");

console.log(localStorage);
// Set profile data
usernameEl.innerText = localStorage.getItem("data.userName");
let data = JSON.parse(localStorage.getItem("data"));

emailEl.innerText = data.email;
fullNameEl.innerText = data.fullName;
const date = new Date(data.birthday);
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const year = date.getFullYear().toString();
const formattedDate = `${day}/${month}/${year}`;

birthdayEl.innerText = formattedDate;

phoneNumberEl.innerText = data.numberPhone;
