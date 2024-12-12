document.addEventListener("DOMContentLoaded", () => {
  const itemForm = document.getElementById("itemForm");
  const itemList = document.getElementById("itemList");
  const BASE_URL = "http://localhost:3000/items"; 

  function fetchItems() {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((items) => {
        itemList.innerHTML = ""; 
        items.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>
                            <button class="edit-btn" onclick="editItem('${item._id}', '${item.name}', ${item.quantity})">Edit</button>
                            <button class="delete-btn" onclick="deleteItem('${item._id}')">Delete</button>
                        </td>
                    `;
          itemList.appendChild(row);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("itemName").value;
    const quantity = document.getElementById("itemQuantity").value;

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, quantity: parseInt(quantity) }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchItems();
        itemForm.reset();
      })
      .catch((error) => console.error("Error:", error));
  });

  window.editItem = (id, currentName, currentQuantity) => {
    const newName = prompt("Edit item name:", currentName);
    const newQuantity = prompt("Edit item quantity:", currentQuantity);

    if (newName !== null && newQuantity !== null) {
      fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          quantity: parseInt(newQuantity),
        }),
      })
        .then((response) => response.json())
        .then(fetchItems)
        .catch((error) => console.error("Error:", error));
    }
  };

  window.deleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(fetchItems)
        .catch((error) => console.error("Error:", error));
    }
  };

  fetchItems();
});
