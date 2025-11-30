const BASE_URL = "https://shrinkit-backend-faz4.onrender.com";
const userId = localStorage.getItem("clientID");

const url_list_box = document.getElementById("url-list-box");
const linkCount = document.getElementById("all-links");
const totalClicks = document.getElementById("all-clicks");
const logout_btn = document.getElementById("logOutBtn");

// Load user URLs
function getUserInfo() {
    fetch(`${BASE_URL}url/user/${userId}`)
        .then(res => res.json())
        .then(res => {
            displayStats(res);
        })
        .catch(err => console.log(err));
}

getUserInfo();

// Logout
logout_btn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "./index.html";
});

// Display URL stats
function displayStats(urls) {
    url_list_box.innerHTML = urls.map(element => {
        const longUrl = element.longUrl;
        const shortUrl = `${BASE_URL}url/${element.shortUrl}`;

        return `
            <div class="url-list">
                <a target="_blank" class="fullUrl" href="${longUrl}">
                    ${longUrl}
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
                        <img class="delete-btn" src="./img/delete.png" alt="${element.shortUrl}">
                    </div>

                    <button>
                        <p>${element.visited || 0}</p> Clicks
                    </button>
                </div>
            </div>
        `;
    }).join("");

    linkCount.innerText = urls.length;

    let clicks = 0;
    urls.forEach(el => {
        clicks += Number(el.visited || 0);
    });

    totalClicks.innerText = clicks;

    // Copy Button
    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            navigator.clipboard.writeText(e.target.alt);
            swal({
                title: "Copied!",
                text: "Short URL copied to clipboard",
                icon: "success",
                button: "OK",
            });
        });
    });

    // Delete Button
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const shortUrl = e.target.alt;

            fetch(`${BASE_URL}url/delete/${shortUrl}`, { method: "DELETE" })
                .then(res => res.json())
                .then(data => {
                    if (data.msg === "URL Deleted") {
                        swal({
                            title: "Deleted!",
                            icon: "success"
                        }).then(() => location.reload());
                    }
                });
        });
    });
}
