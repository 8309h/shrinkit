const BASE = "https://shrinkit-backend-faz4.onrender.com/";

let token = localStorage.getItem("normaltoken");
if (!token) window.location.href = "./login.html";
token = token.replace(/"/g, "").trim();

let LoggedName = localStorage.getItem("LoggedName");
if (LoggedName) document.getElementById("username").innerText = LoggedName;

document.getElementById("logOutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "./login.html";
});

const shrink_form = document.getElementById("shortener-input");
const full_url_btn = document.getElementById("full-url-btn");
const shrink_full_url = document.getElementById("full-url");

shrink_form.addEventListener("submit", (event) => {
    event.preventDefault();
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;

    fetch(`${BASE}url/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ longUrl: shrink_full_url.value })
    })
    .then(res => res.json())
    .then(() => {
        swal("Shortened!", "URL created successfully 🎉", "success")
            .then(() => loadUserURLs());
    })
    .catch(err => console.log(err));

    full_url_btn.innerText = "Shrink";
});

function loadUserURLs() {
    fetch(`${BASE}url/my`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => {
        if (res.status === 401) {
            localStorage.clear();
            window.location.href = "./login.html";
        }
        return res.json();
    })
    .then(urls => renderURLList(urls))
    .catch(err => console.log(err));
}

function renderURLList(urls) {
    const box = document.getElementById("url-list-box");

    box.innerHTML = urls.map(item => {
        const shortUrl = `${BASE}url/${item.shortUrl}`;
        return `
            <div class="url-list">
                <a target="_blank" class="fullUrl" href="${item.longUrl}">
                    ${item.longUrl}
                </a>
                <hr>
                <div class="shortUrl-box">
                    <div>
                        <a target="_blank" class="shortUrl" href="${shortUrl}">
                            ${shortUrl}
                        </a>
                    </div>
                    <div class="pngfixing">
                        <img class="copy-btn" src="./img/copy.png" alt="${shortUrl}">
                        <img class="delete-btn" src="./img/delete.png" alt="${item.shortUrl}">
                    </div>
                    <div>
                        <p>${item.visited || 0}</p> Clicks
                    </div>
                </div>
            </div>
        `;
    }).join("");

    document.getElementById("all-links").innerText = urls.length;
    document.getElementById("all-clicks").innerText = urls.reduce((a, b) => a + (b.visited || 0), 0);

    activateCopyButtons();
    activateDeleteButtons();
}

function activateCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(btn.alt);
            swal("Copied!", "Short URL copied 📋", "success");
        });
    });
}

function activateDeleteButtons() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let shortUrl = btn.alt;

            fetch(`${BASE}url/delete/${shortUrl}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(() => {
                swal("Deleted!", "URL removed", "success")
                    .then(() => loadUserURLs());
            });
        });
    });
}

loadUserURLs();
