// crea el carrito y lo almacena en el localStorage para su uso posterior
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//contador de items del carrito
let cont = JSON.parse(localStorage.getItem("cont")) || 0;
let contador = document.getElementById("item-count");

let confirmar = document.getElementById("confirmar");
confirmar.addEventListener('click', confirmOrder)

let sidebar = document.getElementById("sidebar");
let orden = document.getElementById("pedido");
const carritoBtn = document.getElementById("ver-carrito");

// toggle del carrito
carritoBtn.addEventListener("click", (e) => {
  sidebar.classList.toggle("visible")
})

let vaciarCarrito = document.getElementById("vaciar-carrito");
vaciarCarrito.addEventListener("click", resetCart);

// contador del carrito
const showCont = () => {
  return cont > 0
    ? (contador.innerHTML = `${cont}`)
    : (contador.innerText = "0");
};

showCont();
let calcTime = document.getElementById('time-calc');

// confirmacion de pedido
const toast = () => {
  Swal.fire({
    title: "Gracias",
    text: "Revise el carrito para confirmar el pedido",
    iconHtml: '<img src="../assets/images/coffee.png" width="100px">',
    confirmationButtonText: "Ok!",
    backdrop: true,
    customClass: {
      icon: "no-border",
    },
    allowEscapeKey: true
  });
};
// visualiza el carrito cuando no hay items
function emptyCart() {
  if (carrito.length == 0) {
    orden.innerHTML = `<p>No hay pedidos</p>`
    vaciarCarrito.disabled = true;
    confirmar.disabled = true;
  }
}
// toma los datos desde data.json a través de async -> await fetch -> response
async function fetchdata() {
  let response = await fetch("../data/data.json");
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
      // agrega el item al carrito sólo si no está ya en él
      let match = carrito.some((el) => caf.id == el.id);
      if (!match) {
        carrito.push(caf)
        caf.qty++;
      } else {
        // si el item ya está actualiza la cantidad
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

// Suma el total de los precios
function suma(p) {
  return carrito.reduce((acc, p) => acc + p.precio * p.qty, 0)
}

// CREACIÓN DEL CARRITO
function carttemplate(el) {
  let preciosuma = el.qty * el.precio
  return `<article class="item-orden">
                       <h3 class="caf-title">${el.name}</h3>
                       <figure><img src=${el.img} alt="ilust"></figure>
                       <p class="desc">${el.descripcion}</p>
                       <p class="desc" id="el-qty">Cantidad: ${el.qty}</p>
                       <p class="precio">Precio: $${preciosuma},00</p>
                       <button id="quitar-${el.id}" class="quitar btn-add">quitar</button>
                       </article>`
}

// RENDERIZA EL CARRITO
function verCarrito() {
  orden.innerHTML = `${carrito.map(carttemplate).join('')}`
  let p = document.createElement('p')
  p.className = "precio-total";
  p.textContent = `Total = $${suma(carrito)},00`
  orden.lastChild.append(p)
  showCont();
  vaciarCarrito.disabled = false;
  confirmar.disabled = false;
  let botonQuitar = document.querySelectorAll('.quitar')
  for (let btn of botonQuitar) {
    btn.addEventListener('click', removeItems)
  }
}

// remueve cada item
function removeItems(e) {
  let identificador = e.target.id.split("-")[1]
  if (cont > 0 & carrito.length > 0) {
    for (let el of carrito) {
      if (el.id == identificador /*&& el.qty == cont*/) {
        e.target.parentElement.remove()
        carrito.pop(el)

      }
      cont > 0 && cont--
    }

    localStorage.removeItem("carrito")

  } else {
    carrito.length === 0 && (cont = 0)
    localStorage.removeItem("cont")
    localStorage.removeItem("carrito")
    showCont()
  }
  localStorage.setItem("cont", cont)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  showCont()
  emptyCart()
}
// CALCULA UN TIUEMPO DE BASE DE 30min Y 15+ POR CADA ITEM
function getTime(n) {
  let m = 30 + (15 * n)
  console.log(m)
  const dt = luxon.DateTime.now();
  let dtplus = dt.plus({ minutes: m });
  console.log(dtplus)
  return dtplus.toLocaleString(luxon.DateTime.TIME_SIMPLE);
}

const toastReady = () => {
  Swal.fire({
    title: "Gracias",
    iconHtml: '<img src="../assets/images/coffee.png" width="100px">',
    html: `<p>Su pedido estará listo a las: <b>${getTime(cont)}</b></p>`,
    confirmationButtonText: 'Aceptar',
    backdrop: true,
    customClass: {
      icon: "no-border",
    },
    allowEscapeKey: true,
  });
}
// CONFIRMAR COMPRA
function confirmOrder() {
  // let tempocalculado = getTime(cont)
  orden.innerHTML = `
                  <img src="/assets/images/cafe-listo.png" class="cart-confirm">
                  `
  localStorage.clear()
  vaciarCarrito.remove();
  document.getElementById('cart-title').textContent = "Gracias!"
  confirmar.disabled = true;
  cont = 0;
  showCont()
  toastReady()
}

//ELIMINA EL CARRITO
function resetCart() {
  if (carrito.length > 0) {
    localStorage.clear();
    orden.innerHTML = `<p>No hay pedidos</p>`
  }
  vaciarCarrito.disabled = true;
  confirmar.disabled = true;
  cont = 0;
  showCont();
}


// mostrar carrito / contenido de carrito vacío
carrito.length > 0
  ? verCarrito()
  : emptyCart();
