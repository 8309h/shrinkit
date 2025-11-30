window.addEventListener("load", () => {

    const LoggedName = localStorage.getItem("LoggedName");
    const token = localStorage.getItem("normaltoken");

    const signedInName = document.getElementById("username");
    const logoutBtn = document.getElementById("logOutBtn");

    const urlParams = new URLSearchParams(window.location.search);
    const githubUser = urlParams.get("name");

    // ---------------- SHOW USERNAME ----------------
    if (githubUser) {
        signedInName.textContent = githubUser;
        localStorage.setItem("LoggedName", githubUser);
        logoutBtn.style.display = "inline-block";
    }
    else if (LoggedName && token) {
        signedInName.textContent = LoggedName;
        logoutBtn.style.display = "inline-block";
    }
    else {
        localStorage.clear();
        signedInName.textContent = "";
        logoutBtn.style.display = "none";
        window.location.href = "./login.html";
        return;
    }

    // ---------------- LOGOUT FUNCTION ----------------
    logoutBtn.addEventListener("click", () => {

        localStorage.clear();
        signedInName.textContent = "";
        logoutBtn.style.display = "none";

        // Optional: call backend logout (no need to wait)
        fetch("https://shrinkit-backend-faz4.onrender.com/user/logout")
            .catch(() => {});

        window.location.href = "./login.html";
    });
});
