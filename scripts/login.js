const errorText = document.querySelector(".logError");
const loginForm = document.querySelector("#loginForm");
const pwdInput = document.querySelector("#passwordInput");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pwdInput.value === "pinktouch") {
        window.location.href = "../pages/home.html";
        sessionStorage.setItem("isLogged", true);
    } else {
        loginForm.classList.add("shake");
        setTimeout(() => loginForm.classList.remove("shake"), 300);
        errorText.textContent = "Mot de passe incorrect";
        errorText.style.top = "0";
        pwdInput.value = "";
    }
});

pwdInput.addEventListener("input", () => {
    errorText.textContent = "";
    errorText.style.top = "";
});
