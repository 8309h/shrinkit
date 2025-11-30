const BASE_URL = "http://localhost:8080/";

// DOM Elements
const dropdown_content = document.getElementById("dropdown-content");
const logout_btn = document.getElementById("nav-logout-btn");
const all_links = document.getElementById("all-links");
const all_clicks = document.getElementById("all-clicks");
const all_users = document.getElementById("all-users");
const url_list_box = document.getElementById("url-list-box");

const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const search_category = document.getElementById("search-options");
const full_url_btn = document.getElementById("full-url-btn");

// INIT
countClicks();
fetchUsers();

function dropdown_menu() {
    dropdown_content.style.display = "block";
}

// ---------------- LOGOUT ----------------
logout_btn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.clear();
        window.location.href = "./index.html";
    }
});

// ---------------- FETCH USERS ----------------
async function fetchUsers() {
    try {
        const res = await fetch(`${BASE_URL}user/allusers`); 
        const data = await res.json();
        displayData(data);
    } catch (err) {
        console.error(err);
    }
}

// ---------------- DISPLAY USERS ----------------
function displayData(data) {
    all_users.innerText = data.length;

    url_list_box.innerHTML = data.map(element => `
        <div class="url-list">
            <p><strong>UserID: </strong>${element._id}</p>
            <p><strong>Name: </strong>${element.name}</p>
            <p><strong>Email: </strong>${element.email}</p>
            <button id="${element._id}" name="${element.name}">User Info</button>
        </div>
    `).join("");

    document.querySelectorAll(".url-list button").forEach(btn => {
        btn.addEventListener("click", e => {
            localStorage.setItem("clientID", e.target.id);
            localStorage.setItem("username", e.target.name);
            window.location.href = "./userDetail.html";
        });
    });
}

// ---------------- COUNT CLICKS ----------------
function countClicks() {
    fetch(`${BASE_URL}url/all`)
        .then(res => res.json())
        .then(res => {

            if (!Array.isArray(res)) {
                console.error("Expected array, got:", res);
                return;
            }

            let allClicks = 0;
            let allinks = res.length;

            res.forEach(element => {
                allClicks += Number(element.visited || 0);
            });

            all_clicks.innerText = allClicks;
            all_links.innerText = allinks;
        });
}

// ---------------- SEARCH ----------------
if (shrink_form) {
    shrink_form.addEventListener("submit", async (event) => {
        event.preventDefault();

        full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;

        const category = search_category.value || "name";
        const searchValue = shrink_full_url.value;

        const request = await fetch(`${BASE_URL}user/search?category=${category}&term=${searchValue}`);
        const response = await request.json();

        url_list_box.innerHTML = response.map(element => `
            <div class="url-list">
                <p><strong>Client ID: </strong>${element._id}</p>
                <p><strong>Name: </strong>${element.name}</p>
                <p><strong>Email: </strong>${element.email}</p>
                <button id="${element._id}">User Detail</button>
            </div>
        `).join("");

        full_url_btn.innerHTML = "Search";
    });
}
