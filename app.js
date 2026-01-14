
const productos = [
  { nombre: "Tostitos", precio: 60, imagen: "https://frutilandiausa.weebly.com/uploads/1/3/1/3/131310524/s262211167476508999_p233_i1_w2155.png" },
  { nombre: "Durito sen.", precio: 15, imagen: "https://thumbs.dreamstime.com/b/durito-de-aperitivo-mexicano-tradicional-chicharron-con-lim%C3%B3n-chili-y-sal-aderezados-juego-loter%C3%ADa-mexicana-aderezado-183691476.jpg" },
  { nombre: "Durito prep.", precio: 30, imagen: "https://tse1.mm.bing.net/th/id/OIP.B3PYfQdF5YDEIk5u1kf_9wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { nombre: "Elote chi", precio: 35, imagen: "https://lh5.googleusercontent.com/p/AF1QipNJFZyoM6ShBQda6eg3348cz1aFo1XrQUKtaxvA=w640-h640-k-no" },
  { nombre: "Elote med", precio: 45, imagen: "https://monterrey10.com.mx/wp-content/uploads/2024/06/AF1QipO_gxyXia1b5dq4HqiRhj5jFc3XR1GoJpoefFzww408-h544-k-no.jpg" },
  { nombre: "Elote gde", precio: 50, imagen: "https://www.saborearte.com.mx/wp-content/uploads/2023/08/IMG-5585-696x883.jpg" },
  { nombre: "Conchitas", precio: 60, imagen: "https://i.pinimg.com/originals/e6/18/06/e618063c979c0db47e15ca03f5e54c56.jpg" },
  { nombre: "Nachos", precio: 45, imagen: "https://tse3.mm.bing.net/th/id/OIP.TtUkfVi2jWwezOlm6hwJDwHaEF?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { nombre: "Vivoritas", precio: 15, imagen: "https://tecolotito.elsiglodetorreon.com.mx/i/2024/05/1799408.jpeg" },
  { nombre: "Tostadas", precio: 15, imagen: "https://i.pinimg.com/originals/fb/96/19/fb96190827b487024fc404f7a136c8c8.jpg" },
  { nombre: "Tostadas prep", precio: 35, imagen: "https://vivepurisima.com/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-21-at-7.07.23-PM.jpeg" },
  { nombre: "Pepsi", precio: 25, imagen: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750103131024L.jpg" },
  { nombre: "Pepsi 1 ltr", precio: 50, imagen: "https://tse1.mm.bing.net/th/id/OIP.2t1CYqDmx5REqdRceNRFqgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" }
];

let carrito = [];
let total = 0;

function aplicarPromociones(producto) {
  return producto.precio; // sin promociones por ahora
}

const catalogoDiv = document.getElementById("catalogo");

// Mostrar productos con botón "Agregar" y selector de cantidad (1–10)
productos.forEach((p, index) => {
  const precioFinal = aplicarPromociones(p);
  catalogoDiv.innerHTML += `
    <div class="producto">
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="info">
        <h2>${p.nombre}</h2>
        <p>Precio: $${precioFinal}</p>
        <label>Cantidad:</label>
        <select id="cantidad-${index}">
          ${Array.from({length: 10}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
        </select>
        <button onclick="agregarAlCarrito('${p.nombre}', ${precioFinal}, ${index})">Agregar</button>
      </div>
    </div>
  `;
});



// Función para agregar al carrito con cantidad
function agregarAlCarrito(nombre, precio, index) {
  const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
  carrito.push({ nombre, precio, cantidad });
  total += precio * cantidad;
  renderCarrito();
}

// Función para eliminar del carrito
function eliminarDelCarrito(i) {
  total -= carrito[i].precio * carrito[i].cantidad;
  carrito.splice(i, 1);
  renderCarrito();
}

// Función para vaciar carrito
function vaciarCarrito() {
  carrito = [];
  total = 0;
  renderCarrito();
}

// Función para finalizar pedido → WhatsApp
function finalizarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Crear el resumen del pedido
  let mensaje = "Hola, quiero hacer un pedido:\n\n";
  carrito.forEach(item => {
    mensaje += `${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}\n`;
  });
  mensaje += `\nTotal: $${total}`;

  // Tu número de WhatsApp en formato internacional
  let numero = "528111248290"; 
  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp (web o app)
  window.open(url, "_blank");
}


// Renderizar carrito
function renderCarrito() {
  let lista = `<h2>Total: $${total}</h2><ul>`;
  carrito.forEach((item, i) => {
    lista += `<li>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad} 
                <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
              </li>`;
  });
  lista += "</ul>";
  document.getElementById("total").innerHTML = lista;

}
