import { Cafe } from "../data/object.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// localStorage.setItem("carrito", JSON.stringify(carrito));

let cont = JSON.parse(localStorage.getItem("cont")) || 0;
let contador = document.getElementById("item-count");

const showCont = () => {
  return cont > 0
    ? (contador.innerHTML = `${cont}`)
    : (contador.innerText = "0");
};
showCont();
// hace visible el carrito
const carritoBtn = document.getElementById("ver-carrito");
carritoBtn.addEventListener("click", () => {
  document.getElementById("sidebar").style = "display:block";
});

// oculta el carrito al hacer click en el background
document.addEventListener("mouseup", function (e) {
  let aside = document.getElementById("sidebar");
  if (!aside.contains(e.target)) {
    aside.style = "display: none";
  }
});

let guia = document.getElementById("guia");

function getTime() {
  const dt = luxon.DateTime.now();
  const dtplus = dt.plus({ minutes: 30 });
  return dtplus.toLocaleString(luxon.DateTime.TIME_SIMPLE);
}

// alert de 'sweetAlert // se dispara cada ez que se agrega un item
const toast = () => {
  Swal.fire({
    title: "Gracias",
    text: "Revise el carrito para confirmar el pedido",
    iconHtml: '<img src="assets/images/coffee.png" width="100px">',
    confirmationButtonText: "Ok!",
    backdrop: true,
    customClass: {
      icon: "no-border",
    },
  });
};


// función asíncrona // obtiene los datos de un JSON local
async function fetchdata() {
  let response = await fetch("./data/data.json");
  let data = await response.json();
  let app = document.getElementById("app");

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

    app.appendChild(div);

    let btnAdd = document.getElementById(`${caf.id}`);
    btnAdd.addEventListener("click", () => {
      // asigna a 'match' si el item con el id existe en el carrito
      // si 'f' lo agrega, si no aumenta la cantidad (qty)
      let match = carrito.some((el) => caf.id === el.id);
      if (!match) {
        carrito.push(
          new Cafe(
            caf.id,
            caf.name,
            caf.descripcion,
            caf.img,
            caf.precio,
            caf.qty
          )
        );

      } else {
        caf.qty++;
      }
      cont++;
      toast();
      deshabiliatrBoton(caf.id)
      guia.style = "display: block;";
      // se guardan los items del carrito en el localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
      localStorage.setItem("cont", cont);
      showCont();
    });
  }
}
function deshabiliatrBoton(caf) {
  if (btnAdd.id == caf.id) {
    btnAdd.disable = true;
  }
}
fetchdata();



// VISUALIZACIÓN DEL CARRITO

function verCarrito() {
  let orden = document.getElementById("pedido");
  for (let el of carrito) {
    let div = document.createElement("div");
    div.innerHTML = `<article class="item-orden">
                    <h3 class="caf-title">${el.name}</h3>
                    <figure><img src=${el.img} alt="ilust"></figure>
                    <p class="desc">${el.descripcion}</p>
                    <p class="desc" id="el-qty">Cantidad: ${el.qty}</p>
                    <p class="precio">Precio: $${el.precio},00</p>
                    `;
    orden.appendChild(div);
  }
  guia.innerHTML = `<p>Su pedido estará a las: ${getTime()}</p>`;
  contador.innerText = `${cont}`
  // vacía el carrito
}

let vaciarCarrito = document.getElementById("vaciar-carrito");
vaciarCarrito.addEventListener("click", resetCart);
function resetCart() {
  if (carrito.length > 0) {
    localStorage.clear();
    emptyCart();
  }
  cont = 0;
  showCont();
}
// obtiene la hora actual cuando se hace un pedido y calcula 30 min a partir de esa hora

if (carrito.length > 0) {
  vaciarCarrito.disabled = false;
  verCarrito();
} else {
  emptyCart();

}

// carrito.length > 0
//   ? (guia.innerHTML = `<p>Su pedido estará a las: ${getTime()}</p>`)
//   : "";

// // mostrar carrito / contenido de carrito vacío
// carrito.length > 0
//   ? verCarrito(carrito)
//   : `${(pedido.innerText = "No hay órdenes")}`;
function emptyCart() {
  if (carrito.length == 0) {
    pedido.innerText = "No hay pedidos";
    vaciarCarrito.disabled = true;
  }
  showCont()
}

carritoBtn.addEventListener('click', () => {
  verCarrito() || emptyCart();
}
);
