const tbody = document.getElementById("tbody");
const BASE_URL = "https://beige-swordfish-wear.cyclic.app";

// ---------------- GET ALL USERS ----------------
async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}/user/allusers`);
        const users = await response.json();

        tbody.innerHTML = ""; 
        renderTable(users);

    } catch (err) {
        console.log("Error loading users:", err);
        swal("Error", "Failed to fetch users", "error");
    }
}

fetchUsers();


// ---------------- DISPLAY USERS ----------------
function renderTable(users) {
    users.forEach(user => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user._id}</td>
            <td class="delete-btn" data-id="${user._id}" style="cursor:pointer; color:red;">Delete</td>
        `;

        tbody.appendChild(tr);
    });

    activateDeleteButtons();
}


// ---------------- ACTIVATE DELETE BUTTONS ----------------
function activateDeleteButtons() {
    const deleteBtns = document.querySelectorAll(".delete-btn");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", async () => {
            const userId = btn.dataset.id;

            try {
                const res = await fetch(`${BASE_URL}/user/delete/${userId}`, {
                    method: "DELETE"
                });

                const result = await res.json();

                if (res.ok) {
                    swal({
                        title: "User Deleted",
                        text: "Successfully removed user",
                        icon: "success",
                        buttons: false,
                        timer: 900
                    });

                    btn.parentElement.remove(); // remove row without reload
                }

            } catch (err) {
                console.log("Delete error:", err);
                swal("Error", "Failed to delete user", "error");
            }
        });
    });
}
