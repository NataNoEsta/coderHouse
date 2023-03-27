let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// localStorage.setItem("carrito", JSON.stringify(carrito));

let cont = JSON.parse(localStorage.getItem("cont")) || 0;

// hace visible el carrito
const contador = document.getElementById("item-count");
cont > 0 ? (contador.innerText = `${cont}`) : 0;

const carritoBtn = document.getElementById("ver-carrito");

let aviso = document.getElementById("guia");
let aside = document.getElementById("sidebar");

function emptyCart() {
  if (carrito.length === 0) {
    orden.innerText = "El carrito está vacío"
  }
};


  for (let caf of data) {
    let div = document.createElement("div");
    div.innerHTML = `
                        <article class="item-menu">
                        <h3 class="caf-title">${caf.name}</h3>
                        <figure><img src=${caf.img} alt="ilust"></figure>
                        <p class="desc">${caf.descripcion}</p>
                        <p class="precio">Precio: $${caf.precio},00</p>
                        <button class="btn-add" id="${caf.id}" type="submit">Agregar</button>
                        </article>`;

// oculta el carrito al hacer click en el background
// document.addEventListener("mouseup", function () {
//   if (!aside.contains(e.target)) {
//     aside.style = "visibility: hiden";
//   }
// });

    let reloj = document.getElementById("reloj");

    function getTime() {
      const dt = luxon.DateTime.now();
      const dtplus = dt.plus({ minutes: 30 });
      return dtplus.toLocaleString(luxon.DateTime.TIME_SIMPLE);
    }

    function menuTemplate(p) {
      return `
  <article class="item-menu">
  <h3 class="caf-title">${p.name}</h3>
  <figure><img src=${p.img} alt="ilust"></figure>
  <p class="desc">${p.descripcion}</p>
  <p class="precio">Precio: $${p.precio},00</p>
  <button class="btn-add" id="${p.id}" type="submit">Agregar</button>
  </article>`;
    }
    const toast = () => {
      Swal.fire({
        title: "Gracias",
        text: "Su pedido ha sido recibido",
        iconHtml: '<img src="assets/images/coffee.png" width="100px">',
        confirmationButtonText: "Ok!",
        backdrop: true,
        customClass: {
          icon: "no-border",
        },
      });
      // se guardan los items del carrito en el localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
      localStorage.setItem("cont", cont);
    });
  }
  cont > 0
    ? (document.getElementById("item-count").innerText = `${cont}`)
    : "0";
}

fetchdata();

function verCarrito(carrito) {
  let orden = document.getElementById("carrito");

  for (let el of carrito) {
    let div = document.createElement("div");
    div.className = "ordenes";
    div.innerHTML = `<article class="item-orden">
                    <h3 class="caf-title">${el.name}</h3>
                    <figure><img src=${el.img} alt="ilust"></figure>
                    <p class="desc">${el.descripcion}</p>
                    <p class="desc" id="el-qty">Cantidad: ${el.qty}</p>
                    <p class="precio">Precio: $${el.precio},00</p>
                    `;
    orden.appendChild(div);
  }

}
// vacía el localstorage



let vaciarCarrito = document.getElementById("vaciar-carrito");
vaciarCarrito.addEventListener("click", resetCart);

function resetCart() {
  if (carrito.length > 0) {
    localStorage.clear();
    orden.innerHTML = "<p>Su carrito está vacío</p>";
  }
  cont = 0
  contador.innerText = 0;
  vaciarCarrito.disabled = true;
}
// carritoBtn.addEventListener('click', (e) => {
//   aside.classList.toggle("show");
// });

function visualizar() {
  verCarrito() && emptyCart();

}
visualizar();
// } else {
//   orden.textContent = "Su carrito está vacío";
// }
// obtiene la hora actual cuando se hace un pedido y calcula 30 min a partir de esa hora

// contenido de carrito vacío
// function carritoVacio() {
//     return document.getElementById('carrito').innerHTML = `<p>No hay ordenes</p>`
// }

// mostrar carrito / contenido de carrito vacío