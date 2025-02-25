document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Obtener los valores de los campos
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const passwordrepetir = document.getElementById("passwordrepetir").value;

    // Verificar que las contraseñas coincidan
    if (password !== passwordrepetir) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Hacer la solicitud POST a la API de registro
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
    });

    const data = await response.json();

    // Verificar la respuesta de la API
    if (response.ok) {
        alert("Usuario registrado con éxito. Redirigiendo a la página de inicio de sesión.");
        window.location.href = "index.html";  // Redirige al inicio de sesión
    } else {
        alert(data.msg);  // Mostrar el mensaje de error de la API
    }
});