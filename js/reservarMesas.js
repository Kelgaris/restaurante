document.addEventListener("DOMContentLoaded", () => {
    const horaSelect = document.getElementById("hora");

    // Función para generar intervalos de 1 hora
    const generarHoras = (inicio, fin) => {
        let opciones = [];
        let hora = Number(inicio.split(":")[0]);

        while (hora <= Number(fin.split(":")[0])) {
            let horaStr = hora.toString().padStart(2, "0") + ":00";
            opciones.push(horaStr);
            hora++;
        }
        return opciones;
    };

    // Generamos las opciones y las agregamos al <select>
    const horasDisponibles = [
        ...generarHoras("12:00", "16:00"),
        ...generarHoras("20:00", "23:00"),
    ];

    horasDisponibles.forEach((hora) => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });

    const usuario = localStorage.getItem("usuario");
    
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let cantidadPersonas = document.getElementById("personas").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        return;
    }

});


document.getElementById("reservaForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = localStorage.getItem("usuario");
    
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let cantidadPersonas = document.getElementById("personas").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/nuevaMesa", {  // Asegúrate de que la URL sea correcta
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, nombre, apellidos, telefono, cantidadPersonas, fecha, hora }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Mesa reservada correctamente.");
            window.location.href = "principal.html"; // Redirige a la página principal
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al realizar el pedido.");
    }
});