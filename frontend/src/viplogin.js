const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const BASE_URL = "https://shrinkit-backend-faz4.onrender.com";

// PANEL SWITCH
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// ---------------- SIGNUP ----------------------
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!passwordRegex.test(passwordInput.value)) {
        alert('Weak password. Add 1 uppercase, 1 lowercase, 1 number, 1 symbol.');
        return;
    }

    let data = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        swal("Sign Up Successful!", "Now login 🎉", "success");
    })
    .catch(err => console.log(err));
});

// ---------------- LOGIN ----------------------
let signInform = document.getElementById("signin-form");

signInform.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = {
        email: signInform[0].value,
        password: signInform[1].value
    };

    fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {

        if (result.msg === 'Login Successful') {

            // SAVE TOKEN (fixed)
            localStorage.setItem("normaltoken", result.normaltoken);
            localStorage.setItem("refreshToken", result.refreshtoken);

            // USER INFO
            localStorage.setItem("LoggedName", result.user.name);
            localStorage.setItem("clientID", result.user._id);

            swal({
                title: "Login Successful!",
                text: "Redirecting...",
                icon: "success",
                buttons: false,
                timer: 800
            });

            setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 800);
        }
        else if (result.msg === 'User not found') {
            swal("User Not Found ❌", "Try Again", "error");
        }
        else {
            swal("Wrong Password ❌", "Try Again", "error");
        }
    })
    .catch(err => console.log(err));
});
