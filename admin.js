// Special link protection
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key');
/* if (key !== 'SuperSecret123') {
  alert("Access Denied!");
  window.location.href = "login.html";
}
 */
// References
const productList = document.getElementById("product-list");
const purchaseList = document.getElementById("purchase-list");
const storageRef = firebase.storage().ref();

// Display products
function loadProducts() {
  db.ref("products").on("value", snapshot => {
    productList.innerHTML = "";
    const products = snapshot.val();
    for (let id in products) {
      const p = products[id];
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${p.name}</h3>
        <img src="${p.image}" width="150"><br>
        <p>Price: $${p.price}</p>
        <p>${p.description}</p>
        <button onclick="editProduct('${id}')">Edit</button>
        <button onclick="deleteProduct('${id}', '${p.image}')">Delete</button>
        <hr>
      `;
      productList.appendChild(div);
    }
  });
}

// Add new product
window.addProduct = () => {
  const name = document.getElementById("new-name").value;
  const price = document.getElementById("new-price").value;
  const desc = document.getElementById("new-desc").value;
  const file = document.getElementById("new-image").files[0];
  if (!name || !price || !desc || !file) { alert("Fill all fields!"); return; }

  const fileRef = storageRef.child("products/" + Date.now() + "_" + file.name);
  fileRef.put(file).then(() => {
    fileRef.getDownloadURL().then(url => {
      const productId = db.ref("products").push().key;
      db.ref("products/" + productId).set({
        name, price, description: desc, image: url
      });
      alert("Product added!");
      document.getElementById("new-name").value = "";
      document.getElementById("new-price").value = "";
      document.getElementById("new-desc").value = "";
      document.getElementById("new-image").value = "";
    });
  });
}

// Delete product
window.deleteProduct = (id, imageUrl) => {
  if (!confirm("Delete this product?")) return;
  // Delete image from storage
  const imageRef = storageRef.refFromURL(imageUrl);
  imageRef.delete();
  // Delete product from database
  db.ref("products/" + id).remove();
};

// Edit product
window.editProduct = (id) => {
  const name = prompt("New name:");
  const price = prompt("New price:");
  const desc = prompt("New description:");
  if (!name || !price || !desc) return;
  db.ref("products/" + id).update({ name, price, description: desc });
}

// Load products & purchases
loadProducts();

// Load purchases (same as before)
db.ref("purchases").on("value", snapshot => {
  purchaseList.innerHTML = "";
  const purchases = snapshot.val();
  for (let id in purchases) {
    const p = purchases[id];
    const div = document.createElement("div");
    div.innerHTML = `
      <p>Product ID: ${p.productId} | Email: ${p.email} | Status: ${p.status}</p>
      <button onclick="markReceived('${id}')">Mark as Received</button>
      <hr>
    `;
    purchaseList.appendChild(div);
  }
});

window.markReceived = (id) => {
  db.ref("purchases/" + id + "/status").set("received");
};