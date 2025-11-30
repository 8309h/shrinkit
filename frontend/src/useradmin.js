const tbody = document.getElementById("tbody");
const BASE_URL = "https://shrinkit-backend-faz4.onrender.com";

// ---------------- GET ALL USERS ----------------
async function fetchUsers() {
    try {
        const res = await fetch(`${BASE_URL}/user/allusers`);
        const users = await res.json();

        tbody.innerHTML = "";
        renderTable(users);

    } catch (err) {
        console.log("Error loading users:", err);
        swal("Error", "Failed to fetch users", "error");
    }
}

fetchUsers();

// ---------------- RENDER TABLE ----------------
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

// ---------------- DELETE USER ----------------
function activateDeleteButtons() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const userId = btn.dataset.id;

            swal({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                buttons: ["Cancel", "Delete"],
                dangerMode: true,
            }).then(async (confirmDelete) => {
                if (!confirmDelete) return;

                try {
                    const res = await fetch(`${BASE_URL}/user/delete/${userId}`, {
                        method: "DELETE"
                    });

                    const result = await res.json();

                    if (res.ok) {
                        swal({
                            title: "Deleted!",
                            text: "User removed successfully",
                            icon: "success",
                            buttons: false,
                            timer: 900
                        });

                        btn.parentElement.remove();
                    } else {
                        swal("Error", result.msg || "Failed to delete user", "error");
                    }

                } catch (err) {
                    console.log("Delete error:", err);
                    swal("Error", "Failed to delete user", "error");
                }
            });
        });
    });
}
