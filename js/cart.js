const productList = document.getElementById("product-container");
const cartBtn = document.querySelector(".header-cart");
const modal = document.getElementById("cart-modal");
const backdrop = document.getElementById("cart-backdrop");
const closeBtn = document.querySelector("[data-modal-close]");
const cartItemsList = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

let cart = [];

productList.addEventListener("click", (e) => {
  const buyBtn = e.target.closest(".buy-btn");
  if (buyBtn) {
    const id = buyBtn.dataset.id;
    addToCart(id);
  }
});

let addToCart = (productId) => {
  const product = window.allProducts.find(
    (item) => item.id === parseInt(productId)
  );

  if (product) {
    cart.push(product);

    const cartWrapper = document.querySelector(".header-cart-buy");
    if (cartWrapper) {
      cartWrapper.style.display = "flex";
    }

    console.log("Поточний кошик:", cart);
  }

  const countSpan = document.querySelector(".cart-count");
  if (countSpan) {
    countSpan.textContent = cart.length;
  }
};

const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove("is-hidden");
  backdrop.classList.remove("is-hidden");
  renderCartItems();
};

const closeModal = () => {
  modal.classList.add("is-hidden");
  backdrop.classList.add("is-hidden");
};

cartBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
function renderCartItems() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((product) => {
    total += product.price;

    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
        <span>${product.name}</span>
        <span>${product.price} грн</span>
    `;
    cartItemsList.appendChild(li);
  });

  totalPriceElement.textContent = total;
}
