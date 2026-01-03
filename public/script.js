function loadUsers() {
  fetch("/users")
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById("userTable");
      table.innerHTML = "";

      data.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>
                        <button onclick="editUser(${user.id}, '${user.name}')">Edit</button>

                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;

        table.appendChild(row);
      });
    });
}

function addUser() {
  const name = document.getElementById("name").value;

  if (!name) {
    alert("Nama wajib diisi");
    return;
  }

  fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then(() => {
    document.getElementById("name").value = "";
    loadUsers();
  });
}

function deleteUser(id) {
  if (!confirm("Yakin mau hapus?")) return;

  fetch(`/users/${id}`, { method: "DELETE" }).then(() => loadUsers());
}

function editUser(id, oldName) {
  const newName = prompt("Edit nama:", oldName);
  if (!newName) return;

  fetch(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Update gagal");
      }
      return res.json();
    })
    .then(() => {
      loadUsers();
    })
    .catch((err) => {
      alert(err.message);
    });
}



loadUsers();