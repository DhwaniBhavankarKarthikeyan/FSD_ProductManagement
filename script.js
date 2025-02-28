const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop", price: "$1200", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNYHnRaMZhJaHzqgdCf3WmVUIwzrk4J8BSg&s" },
  { id: 2, name: "Smartphone", description: "Latest smartphone", price: "$800", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-pNdBAhmr_benJrQHCsYxAFOvSlloV8Qng&s" },
  { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: "$300", image: "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg" }
];

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const editFormContainer = document.createElement("div");
editFormContainer.id = "edit-form-container";
document.body.appendChild(editFormContainer);

// Function to render products
function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="openEditForm(${product.id})">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productContainer.appendChild(card);
  });
}

// Function to open edit form
function openEditForm(id) {
  const product = products.find(p => p.id === id);
  editFormContainer.innerHTML = `
    <form id="edit-form">
      <label>Name:</label>
      <input type="text" id="edit-name" value="${product.name}">
      
      <label>Description:</label>
      <input type="text" id="edit-description" value="${product.description}">
      
      <label>Price:</label>
      <input type="text" id="edit-price" value="${product.price}">
      
      <label>Image URL:</label>
      <input type="text" id="edit-image" value="${product.image}" oninput="updateImagePreview(this.value)">
      
      <img id="image-preview" src="${product.image}" alt="Preview">
      
      <button type="button" onclick="saveChanges(${id})">Save</button>
      <button type="button" onclick="closeEditForm()">Cancel</button>
    </form>
  `;
  editFormContainer.classList.add("show");
}

// Function to update image preview
function updateImagePreview(url) {
  document.getElementById("image-preview").src = url;
}

// Function to save changes
function saveChanges(id) {
  const product = products.find(p => p.id === id);
  product.name = document.getElementById("edit-name").value;
  product.description = document.getElementById("edit-description").value;
  product.price = document.getElementById("edit-price").value;
  product.image = document.getElementById("edit-image").value;

  closeEditForm();
  renderProducts();
}

// Function to close edit form
function closeEditForm() {
  editFormContainer.classList.remove("show");
}

// Function to delete a product
function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index > -1) {
    products.splice(index, 1);
    renderProducts();
  }
}

// Function to open add product form
function openAddProductForm() {
  editFormContainer.innerHTML = `
    <form id="add-form">
      <label>Name:</label>
      <input type="text" id="add-name">
      
      <label>Description:</label>
      <input type="text" id="add-description">
      
      <label>Price:</label>
      <input type="text" id="add-price">
      
      <label>Image URL:</label>
      <input type="text" id="add-image" oninput="updateImagePreview(this.value)">
      
      <img id="image-preview" src="" alt="Preview">
      
      <button type="button" onclick="addProduct()">Add Product</button>
      <button type="button" onclick="closeEditForm()">Cancel</button>
    </form>
  `;
  editFormContainer.classList.add("show");
}

// Function to add a new product
function addProduct() {
  const name = document.getElementById("add-name").value;
  const description = document.getElementById("add-description").value;
  const price = document.getElementById("add-price").value;
  const image = document.getElementById("add-image").value;

  if (name && description && price && image) {
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price,
      image
    };
    products.push(newProduct);
    closeEditForm();
    renderProducts();
  } else {
    alert("Please fill in all fields.");
  }
}

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

renderProducts();
