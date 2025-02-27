document.addEventListener("DOMContentLoaded", () => {
    const containerPedidos = document.querySelector(".containerPedidos .pedidos");
    const containerMesas = document.querySelector(".containerMesas .mesas");
  
    function eliminarPedido(id) {
      fetch("https://restaurante-api-sage.vercel.app/api/auth/pedidos/eliminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.msg);
          cargarPedidos();
        })
        .catch((error) => console.error("Error al eliminar el pedido:", error));
    }
  
    function eliminarMesa(id) {
      fetch("https://restaurante-api-sage.vercel.app/api/auth/mesas/eliminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.msg);
          cargarMesas();
        })
        .catch((error) => console.error("Error al eliminar la mesa:", error));
    }
  
    function cargarPedidos() {
      fetch("https://restaurante-api-sage.vercel.app/api/auth/pedidos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.json();
        })
        .then((data) => {
          containerPedidos.innerHTML = "";
          data.forEach((pedido) => {
            const pedidoHTML = document.createElement("div");
            pedidoHTML.classList.add("pedido", "w-100", "d-flex", "justify-content-between", "align-items-center", "p-3", "border", "rounded", "shadow", "bg-light");
            pedidoHTML.innerHTML = `
              <div class="datosPersonales w-75">
                  <h2 class="nombre">${pedido.usuario}</h2>
                  <div class="infoPedido d-flex justify-content-between mt-2">
                      <p class="descripcion">${pedido.productos}</p>
                  </div>
              </div>
              <div class="botones d-flex flex-column gap-2">
                  <button class="btn btn-success">Aceptar</button>
                  <button class="btn btn-danger">Rechazar</button>
              </div>
            `;
  
            const botones = pedidoHTML.querySelectorAll(".botones button");
            botones.forEach((boton) => {
              boton.addEventListener("click", () => eliminarPedido(pedido._id));
            });
  
            containerPedidos.appendChild(pedidoHTML);
          });
        })
        .catch((error) => console.error("Error al obtener los pedidos:", error));
    }

    function cargarMesas() {
      fetch("https://restaurante-api-sage.vercel.app/api/auth/mesas")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.json();
        })
        .then((data) => {
          containerMesas.innerHTML = "";
          data.forEach((mesa) => {
            const mesaHTML = document.createElement("div");
            mesaHTML.classList.add("pedido", "w-100", "d-flex", "justify-content-between", "align-items-center", "p-3", "border", "rounded", "shadow", "bg-light");
            mesaHTML.innerHTML = `
              <div class="datosPersonales w-75">
                  <h2 class="nombre">${mesa.usuario}</h2>
                  <h3 class="telefono">${mesa.telefono}</h3>
                  <div class="infoPedido d-flex justify-content-between mt-2">
                      <p class="hora">${mesa.fecha} - ${mesa.hora}</p>
                  </div>
              </div>
              <div class="botones d-flex flex-column gap-2">
                  <button class="btn btn-success">Aceptar</button>
                  <button class="btn btn-danger">Rechazar</button>
              </div>
            `;
  
            const botones = mesaHTML.querySelectorAll(".botones button");
            botones.forEach((boton) => {
              boton.addEventListener("click", () => eliminarMesa(mesa._id));
            });
  
            containerMesas.appendChild(mesaHTML);
          });
        })
        .catch((error) => console.error("Error al obtener las mesas:", error));
    }
  
    cargarPedidos();
    cargarMesas();
  });
  