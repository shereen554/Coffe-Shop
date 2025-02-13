document.addEventListener("DOMContentLoaded", () => {
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirmPassword");
    let messageElement = document.getElementById("message");
    let loginForm = document.getElementById("loginForm");
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");

  
    let validateEmail = (email) =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    let validateusername = (username) =>
      /^[a-zA-Z0]/.test(username);
  
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let username = usernameInput.value.trim();
      let email = emailInput.value.trim();
      let password = passwordInput.value;
      let confirmPassword = confirmPasswordInput.value;
  
      if (!validateEmail(email)) {
        messageElement.style.color = "red";
        messageElement.textContent = "Invalid email address.";
        return;
      }
  
      if (password !== confirmPassword) {
        messageElement.style.color = "red";
        messageElement.textContent = "Passwords do not match.";
        return;
      }
      if (!validateusername(username)) {
        messageElement.style.color = "red";
        messageElement.textContent = "Username should be a string.";
        return;
      }
  
      if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("confirm", confirmPassword);
        window.location.href = "../Html/home.html";
      } else {
        messageElement.style.color = "red";
        messageElement.textContent = "Please fill in all fields.";
      }
    });
  });
  