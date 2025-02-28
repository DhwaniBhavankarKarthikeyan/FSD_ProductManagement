/* script.js */
const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop", price: "$1200", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Smartphone", description: "Latest smartphone", price: "$800", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: "$300", image: "https://via.placeholder.com/150" }
];

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");

function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="editProduct(${product.id})">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productContainer.appendChild(card);
  });
}

function addProduct() {
  const newProduct = { id: products.length + 1, name: "New Product", description: "Description", price: "$0", image: "https://via.placeholder.com/150" };
  products.push(newProduct);
  renderProducts();
}

function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index > -1) {
    products.splice(index, 1);
    renderProducts();
  }
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  const newName = prompt("Enter new name", product.name);
  const newDesc = prompt("Enter new description", product.description);
  const newPrice = prompt("Enter new price", product.price);
  if (newName) product.name = newName;
  if (newDesc) product.description = newDesc;
  if (newPrice) product.price = newPrice;
  renderProducts();
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

renderProducts();
