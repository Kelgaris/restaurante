const logout = () => {
    localStorage.removeItem("token");  // Elimina el token del almacenamiento local
    sessionStorage.removeItem("token"); // También si usas sessionStorage
    window.location.href = "index.html";  // Redirige al login
};

// Asignar la función al botón
document.getElementById("logOut").addEventListener("click", logout);