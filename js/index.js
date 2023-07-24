function showProducts(products, productsContainer) {
	products.forEach((product) => {
		const productDiv = document.createElement("div");
		productDiv.classList.add("product");

		productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h4>${product.title}</h4>
                <p>Precio: $${product.price}</p>
            `;

		productsContainer.appendChild(productDiv);
	});
}

const productsContainer1 = document.querySelector(
	".collection:nth-child(1) .productsContainer"
);
const productsContainer2 = document.querySelector(
	".collection:nth-child(2) .productsContainer"
);
const productsContainer3 = document.querySelector(
	".collection:nth-child(3) .productsContainer"
);

fetch("https://fakestoreapi.com/products")
	.then((res) => res.json())
	.then((products) => {
		const limitedProducts1 = products.slice(0, 4);
		const limitedProducts2 = products.slice(4, 8);
		const limitedProducts3 = products.slice(8, 12);

		showProducts(limitedProducts1, productsContainer1);
		showProducts(limitedProducts2, productsContainer2);
		showProducts(limitedProducts3, productsContainer3);
	})
	.catch((error) => console.error("Error al obtener los productos:", error));
