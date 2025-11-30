let form = document.querySelector("form");

const adminData = [
  { email: "admin@shrinkit.com", pass: "admin123" }
];

let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const pass = passwordInput.value.trim();

  if (email === "" || pass === "") {
    swal("Empty Fields", "Please enter both fields!", "warning");
    return;
  }

  const admin = adminData.find(
    (user) => user.email === email && user.pass === pass
  );

  if (admin) {
    localStorage.setItem("adminEmail", email);

    swal({
      title: "Login Successful! 🎉",
      text: "Welcome Back, Admin!",
      icon: "success",
      buttons:false,
      timer:800
    }).then(() => {
      window.location.href = "./admin.html";
    });
  } else {
    swal({
      title: "Login Failed ❌",
      text: "Incorrect Email or Password",
      icon: "error",
      button: false,
      timer:800
    });
  }
});
