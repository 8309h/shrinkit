const BASE_URL = "https://shrinkit-backend-faz4.onrender.com/";

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

countClicks();
fetchUsers();

function dropdown_menu() {
    dropdown_content.style.display = "block";
}

logout_btn?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "./index.html";
});

async function fetchUsers() {
    try {
        const res = await fetch(`${BASE_URL}user/allusers`);
        const data = await res.json();
        displayData(data);
    } catch (err) {
        console.error("Fetch Users Error:", err);
        swal("Error", "Backend Not Responding", "error");
    }
}

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

function countClicks() {
    fetch(`${BASE_URL}url/all`)
        .then(res => res.json())
        .then(res => {
            if (!Array.isArray(res)) return;

            let totalClicks = res.reduce((sum, item) => sum + (item.visited || 0), 0);

            all_links.innerText = res.length;
            all_clicks.innerText = totalClicks;
        })
        .catch(() => {
            swal("Error", "Unable to load link stats", "error");
        });
}

if (shrink_form) {
    shrink_form.addEventListener("submit", async (event) => {
        event.preventDefault();

        full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;

        const category = search_category.value || "name";
        const searchValue = shrink_full_url.value;

        try {
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

        } catch (err) {
            swal("Error", "Search failed", "error");
        }

        full_url_btn.innerHTML = "Search";
    });
}
