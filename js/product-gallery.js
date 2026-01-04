document.querySelector('.load-more-btn').addEventListener('click', renderMoreProducts);
document.addEventListener('DOMContentLoaded', loadProducts);

window.allProducts = [];
let displayedCount = 0; 
const itemsPerPage = 12;


async function loadProducts() {
    try {
        const response = await fetch('./products.json');
        if (!response.ok) throw new Error('Помилка завантаження');
        
        allProducts = await response.json();
        
        renderMoreProducts();
        
    } catch (error) {
        console.error('Помилка:', error);
    }
}

function renderMoreProducts() {
    const container = document.getElementById('product-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    const nextBatch = allProducts.slice(displayedCount, displayedCount + itemsPerPage);
    
    const html = nextBatch.map(product => `
        <li class="product-item">
            <img class="product-img" src="${product.image}" alt="${product.name}" width="240" height="200">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price} <span class="currency">грн</span><span class="unit">/${product.unit}</span></p>
            <button class="buy-btn" type="button" data-id="${product.id}">В кошик</button>
        </li>
    `).join('');

    container.insertAdjacentHTML('beforeend', html);
    
    displayedCount += nextBatch.length;

    if (displayedCount >= allProducts.length) {
        loadMoreBtn.style.display = 'none';
    }
}


