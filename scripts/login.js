const loginForm = document.getElementById("loginForm");
const pwdInput = document.getElementById("passwordInput");
const pwdSubmit = document.getElementById("passwordSubmit");
const errorText = document.querySelector(".logError");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pwdInput.value === "pinktouch") {
        window.location.href = "../pages/home.html";
        sessionStorage.setItem("pwd", true);
    } else {
        loginForm.classList.add("shake");
        setTimeout(() => loginForm.classList.remove("shake"), 300);
        errorText.textContent = "Mot de passe incorrect";
        errorText.style.top = "0";
        pwdInput.value = "";
    }
});

pwdInput.addEventListener("input", (e) => {
    errorText.textContent = "";
    errorText.style.top = "";
});



