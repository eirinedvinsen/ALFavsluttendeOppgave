//innlogging

// Dummy-bruker
const dummyUser = {
    username: "Craig",
    password: "CrackIsKing!123_demo"
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("userName");
    const passwordInput = document.getElementById("password");
    const errorEl = document.getElementById("loginError");
  
    if (!loginBtn || !usernameInput || !passwordInput) {
      console.error("Finner ikke login-elementer i innlogging.html");
      return;
    }
  
    loginBtn.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
  
      if (!username || !password) {
        showError("Fyll inn både brukernavn og passord.");
        return;
      }
  
      // Sjekk mot dummy-bruker (case-sensitiv)
      if (username === dummyUser.username && password === dummyUser.password) {
        const user = { username }; // lagrer bare brukernavn
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "ruter.html";
      } else {
        showError("Feil brukernavn eller passord.");
      }
    });
  
    function showError(message) {
      if (errorEl) {
        errorEl.textContent = message;
      } else {
        alert(message);
      }
    }
  });