//innlogging

//dummy-bruker

const dummyUser = {
    username: "Craig",
    password: "1234"
};

document.addEventListener("DOMContentLoaded", ()=> {
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("userName");
    const passwordInput = document.getElementById("password");
    const errorEl = document.getElementById("loginError");

    if(!login || !usernameInput || !passwordInput) {
        console.error ("Finner ikke login-elementer i innlogging.html");
        return;
    }

    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        //validering

        if(!username || !password){
            showError("Mangler brukernavn eller passord");
            return;
        }

        //Sjekk mot dummyBruker
        if(username === dummyUser.username && password === dummyUser.password) {
            //lagre kun brukernavn
            const user = {username};
            localStorage.setItem("currentUser", JSON.stringify(user));

            //videre til rutene
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