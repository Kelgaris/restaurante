document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("usuario", data.usuario); // Guarda el usuario
        console.log("Usuario desde localStorage:", localStorage.getItem("usuario"));
        
        localStorage.setItem("token", data.token); // Guarda el token
        alert("Inicio de sesión exitoso");
        window.location.href = data.rol === "admin" ? "vistaAdministrador.html" : "principal.html";
    } else {
        alert(data.msg);
    }
    
});