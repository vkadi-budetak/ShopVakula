const productList = document.getElementById("product-container");

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-btn")) {
    const id = e.target.dataset.id;
    addToCart(id);
  }
});

let cart = [];

let addToCart = (productId) => {
  const product = window.allProducts.find(
    (item) => item.id === parseInt(productId)
  );

  if (product) {
    cart.push(product);

    console.log("Поточний кошик:", cart);
  }

  const countSpan = document.querySelector(".cart-count");
  if (countSpan) {
    countSpan.textContent = cart.length;
  }
};
