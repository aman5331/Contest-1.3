const signupBtn = document.getElementById("signup-btn");
const signupMessage = document.getElementById("signup-message");
const profileFullName = document.getElementById("full-name");
const profileEmail = document.getElementById("email");
const logoutBtn = document.getElementById("logout-btn");

// Signup functionality
signupBtn.addEventListener("click", () => {
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (fullName && email && password) {
    const accessToken = generateAccessToken();
    const user = { fullName, email, accessToken };
    localStorage.setItem("user", JSON.stringify(user));
    signupMessage.textContent = "Successfully Signed Up!";
    signupMessage.style.color = "green";
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1000);
  } else {
    signupMessage.textContent = "Error: All the fields are mandatory.";
    signupMessage.style.color = "red";
  }
});

// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    profileFullName.textContent = user.fullName;
    profileEmail.textContent = user.email;
  } else {
    window.location.href = "index.html";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

// Helper function to generate a random access token
function generateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = 16;
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}
