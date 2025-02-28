document.addEventListener("DOMContentLoaded", () => {
    obtenerPedidosPorUsuario(localStorage.getItem("usuario"));
});

const obtenerPedidosPorUsuario = async (usuario) => {
    try {
        const response = await fetch("https://restaurante-api-sage.vercel.app/api/auth/pedidos/filtro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario })
        });

        if (!response.ok) {
            throw new Error(`Error al obtener pedidos: ${response.status}`);
        }

        const pedidos = await response.json();
        console.log('Pedidos del usuario:', pedidos);
        mostrarPedidos(pedidos);
    } catch (error) {
        console.error('Error al hacer fetch:', error);
    }
};

const mostrarPedidos = (pedidos) => {
    const containerPedidos = document.querySelector('.pedidos');
    containerPedidos.innerHTML = '';

    if (pedidos.length === 0) {
        containerPedidos.innerHTML = '<p>No hay pedidos para este usuario.</p>';
        return;
    }

    pedidos.forEach(pedido => {
        const pedidoElement = document.createElement('div');
        pedidoElement.classList.add('pedido-item', 'p-3', 'border', 'rounded', 'w-100');
        pedidoElement.innerHTML = `
            <strong>Pedido ID:</strong> ${pedido._id} <br>
            <strong>Detalles:</strong> ${pedido.detalles}
        `;

        containerPedidos.appendChild(pedidoElement);
    });
};