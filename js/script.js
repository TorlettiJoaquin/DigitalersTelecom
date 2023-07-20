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

document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Aquí puedes realizar la validación del login o enviar los datos al servidor
        // Por ejemplo:
        if (username === "admin" && password === "admin") {
            alert("Inicio de sesión exitoso!");
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    });

document
    .getElementById("register-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;

        // Aquí puedes realizar el registro del nuevo usuario
        // Por ejemplo:
        alert(
            "¡Registro exitoso! Ahora puedes iniciar sesión con tu nueva cuenta."
        );
    });

document
    .querySelector(".register-link a")
    .addEventListener("click", function (event) {
        event.preventDefault();
        showForm("register-form");
    });

document
    .querySelector(".login-link a")
    .addEventListener("click", function (event) {
        event.preventDefault();
        showForm("login-form");
    });

function showForm(formId) {
    document
        .querySelectorAll(".form-container")
        .forEach(function (formContainer) {
            formContainer.style.display = "none";
        });
    document.getElementById(formId).style.display = "block";
}
