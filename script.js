// script.js
document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search');
    const sortOrder = document.getElementById('sort-order');

    // Fetch products from the FakeStoreAPI
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);

            // Populate categories in the dropdown
            const categories = [...new Set(products.map(product => product.category))];
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Display products in the container
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productsContainer.appendChild(productItem);
        });
    }

    // Filter products by category
    categoryFilter.addEventListener('change', function () {
        const selectedCategory = this.value;
        fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => console.error('Error filtering products by category:', error));
    });

    // Search products by title
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product =>
                    product.title.toLowerCase().includes(searchTerm)
                );
                displayProducts(filteredProducts);
            })
            .catch(error => console.error('Error searching products:', error));
    });

    // Sort products by price
    sortOrder.addEventListener('change', function () {
        const selectedOrder = this.value;
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                const sortedProducts = products.sort((a, b) => {
                    if (selectedOrder === 'asc') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                });
                displayProducts(sortedProducts);
            })
            .catch(error => console.error('Error sorting products:', error));
    });
});
