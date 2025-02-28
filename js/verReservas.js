document.addEventListener("DOMContentLoaded", () => {
    obtenerPedidosPorUsuario(localStorage.getItem("usuario"));
});

const obtenerPedidosPorUsuario = async (usuario) => {
    try {
        const response = await fetch("https://restaurante-api-sage.vercel.app/api/auth/pedidos/filtro", {
            method: 'POST',  // Usamos POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario })  // Enviamos el usuario en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al obtener pedidos: ${response.status}`);
        }

        const pedidos = await response.json();  // Parseamos la respuesta JSON
        console.log('Pedidos del usuario:', pedidos);
        mostrarPedidos(pedidos);  // Llamamos a la función para mostrar los pedidos
    } catch (error) {
        console.error('Error al hacer fetch:', error);
    }
};

const mostrarPedidos = (pedidos) => {
    const containerPedidos = document.querySelector('.pedidos');
    containerPedidos.innerHTML = '';  // Limpiamos el contenedor antes de mostrar nuevos pedidos

    if (pedidos.length === 0) {
        containerPedidos.innerHTML = '<p>No hay pedidos para este usuario.</p>';
        return;
    }

    pedidos.forEach(pedido => {
        console.log(pedido.productos);
        
        
        const pedidoElement = document.createElement('div');
        pedidoElement.classList.add('pedido-item', 'p-3', 'border', 'rounded', 'w-100');
        pedidoElement.innerHTML = `
            <strong>Pedido ID:</strong> ${pedido._id} <br>
            <strong>Detalles:</strong> ${pedido.productos}
        `;

        containerPedidos.appendChild(pedidoElement);
    });
};
