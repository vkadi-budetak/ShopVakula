document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search_input');
    const container = document.getElementById('product-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase().trim();

        if (searchText === "") {
            displayedCount = 0;
            container.innerHTML = "";
            renderMoreProducts();
            loadMoreBtn.style.display = 'block';
            return;
        }

        const filtered = window.allProducts.filter(product => 
            product.name.toLowerCase().includes(searchText)
        );

        loadMoreBtn.style.display = 'none';

        renderSearchResults(filtered);
    });
});

function renderSearchResults(results) {
    const container = document.getElementById('product-container');
    
    if (results.length === 0) {
        container.innerHTML = `<p class="no-results">Нічого не знайдено за вашим запитом 😔</p>`;
        return;
    }

    const html = results.map(product => `
        <li class="product-item">
            <img class="product-img" src="${product.image}" alt="${product.name}" width="240" height="200">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price} <span class="currency">грн</span><span class="unit">/${product.unit}</span></p>
            <button class="buy-btn" type="button" data-id="${product.id}">В кошик</button>
        </li>
    `).join('');

    container.innerHTML = html;
}