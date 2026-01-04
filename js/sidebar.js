document.addEventListener('DOMContentLoaded', () => {
    // --- Частина 1: Робота зі стрілочками (ваш існуючий код) ---
    const arrowButtons = document.querySelectorAll('.arrow-btn');

    arrowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentLi = button.closest('.has-dropdown');
            if (parentLi) {
                parentLi.classList.toggle('is-open');
            }
        });
    });

    // --- Частина 2: Фільтрація товарів (додаємо нове) ---
    const container = document.getElementById('product-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const searchInput = document.getElementById('search_input');

    // Слухаємо кліки по посиланнях категорій
    const filterLinks = document.querySelectorAll('[data-category]');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Щоб сторінка не перевантажувалась
            
            const category = link.dataset.category;

            // 1. Очищуємо пошук, щоб результати не змішувалися
            if (searchInput) searchInput.value = "";

            // 2. Логіка вибору категорії
            if (category === "all") {
                window.displayedCount = 0; // скидаємо лічильник з основного файлу
                container.innerHTML = "";
                if (typeof renderMoreProducts === "function") {
                    renderMoreProducts();
                }
                if (loadMoreBtn) loadMoreBtn.style.display = 'block';
            } else {
                // Фільтруємо масив, який ми зберегли в window.allProducts
                const filtered = window.allProducts.filter(product => product.category === category);
                
                if (loadMoreBtn) loadMoreBtn.style.display = 'none';
                renderFilteredResults(filtered);
            }

            // Опціонально: підсвітка активної категорії
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Допоміжна функція для рендерингу (можна тримати тут або в gallery.js)
function renderFilteredResults(products) {
    const container = document.getElementById('product-container');
    
    if (products.length === 0) {
        container.innerHTML = `<p class="no-results">У цій категорії поки немає товарів 🥦</p>`;
        return;
    }

    const html = products.map(product => `
        <li class="product-item">
            <img class="product-img" src="${product.image}" alt="${product.name}" width="240" height="200">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price} <span class="currency">грн</span><span class="unit">/${product.unit}</span></p>
            <button class="buy-btn" type="button" data-id="${product.id}">В кошик</button>
        </li>
    `).join('');

    container.innerHTML = html;
}