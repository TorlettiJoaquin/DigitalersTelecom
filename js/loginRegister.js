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
            redirectToHome();
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
        redirectToHome();
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

    if (formId === "login-form") {
        document.title = "Login";
        currentForm = "login-form";
    } else if (formId === "register-form") {
        document.title = "Registro";
        currentForm = "register-form";
    }
}

function redirectToHome() {
    window.location.href = "../index.html";
}
