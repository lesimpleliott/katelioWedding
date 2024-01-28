const errorText = document.querySelector(".logError");
const loginForm = document.querySelector("#loginForm");
const pwdInput = document.querySelector("#passwordInput");
const togglePwdBtn = document.getElementById("togglePwdBtn");

togglePwdBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const visibleIcon = document.getElementById('visibleIcon');

    if (togglePwdBtn.value === 'hidden') {
        togglePwdBtn.value = 'visible'
        passwordInput.type = "text";
        visibleIcon.classList.remove('fa-eye')
        visibleIcon.classList.add('fa-eye-slash')
    } else {
        togglePwdBtn.value = 'hidden'
        passwordInput.type = "password";
        visibleIcon.classList.add('fa-eye')
        visibleIcon.classList.remove('fa-eye-slash')
    }
});

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
