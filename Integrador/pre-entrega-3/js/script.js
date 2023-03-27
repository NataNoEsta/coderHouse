import { Cafe } from "../data/object.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// localStorage.setItem("carrito", JSON.stringify(carrito));

let cont = JSON.parse(localStorage.getItem("cont")) || 0;
let contador = document.getElementById("item-count");

let sidebar = document.getElementById("sidebar");
let orden = document.getElementById("pedido");

const showCont = () => {
  return cont > 0
    ? (contador.innerHTML = `${cont}`)
    : (contador.innerText = "0");
};

showCont();

// hace visible el carrito
const carritoBtn = document.getElementById("ver-carrito");

function getTime(itemqty) {
  const dt = luxon.DateTime.now();
  const dtplus = dt.plus({ minutes: 15 });
  dtplus *= itemqty;
  console.log(dtplus)
  return dtplus.toLocaleString(luxon.DateTime.TIME_SIMPLE);
}


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


async function fetchdata() {
  let response = await fetch("./data/data.json");
  let data = await response.json();
  let app = document.getElementById("app");

  for (let caf of data) {
    let div = document.createElement("div");
    div.innerHTML = `   <article class="item-menu">
                        <h3 class="caf-title">${caf.name}</h3>
                        <figure><img src=${caf.img} alt="ilust"></figure>
                        <p class="desc">${caf.descripcion}</p>
                        <p class="precio">Precio: $${caf.precio},00</p>
                        <button class="btn-add" id="${caf.id}" type="submit">Agregar</button>
                        </article>`;

    app.appendChild(div);

    let btnAdd = document.getElementById(`${caf.id}`);
    btnAdd.addEventListener("click", () => {

      let match = carrito.some((el) => caf.id == el.id);
      if (!match) {
        carrito.push(caf)
      } else {
        caf.qty++;
      }
      cont++;

      toast();
      verCarrito();
      // se guardan los items del carrito en el localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
      localStorage.setItem("cont", cont);

    });
  }
}
fetchdata();


// VISUALIZACIÓN DEL CARRITO
function carttemplate(el) {
  return `<article class="item-orden">
                       <h3 class="caf-title">${el.name}</h3>
                       <figure><img src=${el.img} alt="ilust"></figure>
                       <p class="desc">${el.descripcion}</p>
                       <p class="desc" id="el-qty">Cantidad: ${el.qty}</p>
                       <p class="precio">Precio: $${el.precio},00</p>
                       </article>`
}

function verCarrito() {
  orden.innerHTML = `${carrito.map(carttemplate).join('')}`
  showCont();
}

//   let erer = carrito.map((el) => el.name + el.descripcion + el.id)
//   for (let el of carrito) {
//     console.log(el)
//     let div = document.createElement("div");

//     div.innerHTML = `<article class="item-orden">
//                     <h3 class="caf-title">${el.name}</h3>
//                     <figure><img src=${el.img} alt="ilust"></figure>
//                     <p class="desc">${el.descripcion}</p>
//                     <p class="desc" id="el-qty">Cantidad: ${el.qty}</p>
//                     <p class="precio">Precio: $${el.precio},00</p>
//                     </article>`;
//
//     orden.insertAdjacentElement("beforeend", div);
//   }
//   // vacía el carrito
// }

let vaciarCarrito = document.getElementById("vaciar-carrito");
vaciarCarrito.addEventListener("click", resetCart);

function emptyCart() {
  if (carrito.length == 0) {
    pedido.innerText = "No hay pedidos";
    vaciarCarrito.disabled = true;
  }
}
function resetCart() {
  if (carrito.length > 0) {
    localStorage.clear();
    orden.remove()
    emptyCart();
  }
  cont = 0;
  showCont();
}
// obtiene la hora actual cuando se hace un pedido y calcula 30 min a partir de esa hora

// carrito.length > 0
//   ? (guia.innerHTML = `<p>Su pedido estará a las: ${getTime()}</p>`)
//   : "";

// mostrar carrito / contenido de carrito vacío
carrito.length > 0
  ? verCarrito(carrito)
  : `${(pedido.innerText = "No hay órdenes")}`;



// carritoBtn.addEventListener('click', () => {
//   verCarrito() || emptyCart();
// }
// );
