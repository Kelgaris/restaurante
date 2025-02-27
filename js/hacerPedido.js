document.getElementById("menuForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = localStorage.getItem("usuario"); // Recuperamos el usuario del localStorage
    const productos = [
        document.getElementById("entrante").value,
        document.getElementById("ensalada").value,
        document.getElementById("primero").value,
        document.getElementById("bebida").value,
        document.getElementById("postre").value,
    ];

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    try {
        const response = await fetch("https://restaurante-api-sage.vercel.app/api/auth/nuevoPedido", {  // Asegúrate de que la URL sea correcta
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, productos }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Pedido realizado exitosamente");
            window.location.href = "principal.html"; // Redirige a la página principal
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al realizar el pedido.");
    }
});

document.getElementById("menuInfantilForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = localStorage.getItem("usuario"); // Recuperamos el usuario del localStorage
    const productos = [
        document.getElementById("primeroInfantil").value,
        document.getElementById("bebidaInfantil").value,
        document.getElementById("postreInfantil").value,
    ];

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    try {
        const response = await fetch("https://restaurante-api-sage.vercel.app/api/auth/nuevoPedido", {  // Asegúrate de que la URL sea correcta
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, productos }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Pedido infantil realizado exitosamente");
            window.location.href = "principal.html"; // Redirige a la página principal
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al realizar el pedido.");
    }
});
