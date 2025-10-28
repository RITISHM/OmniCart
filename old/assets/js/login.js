//login js is to be done here
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginBtn = loginForm.querySelector(".login-btn");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add loading state
      loginBtn.classList.add("loading");
      // Simulate processing
      setTimeout(() => {
        loginForm.style.animation = "fadeOut 0.6s ease-out forwards";
        // Reset after fake login
        setTimeout(() => {
          alert("Logged in (Demo)");
          loginBtn.classList.remove("loading");
          loginForm.style.animation = "";
        }, 1000);
      }, 2000);
    });
  });
