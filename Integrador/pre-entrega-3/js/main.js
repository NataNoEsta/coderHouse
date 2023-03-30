let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// localStorage.setItem("carrito", JSON.stringify(carrito));
// let carrito = []

let cont = JSON.parse(localStorage.getItem("cont")) || 0;
let contador = document.getElementById("item-count");

let sidebar = document.getElementById("sidebar");
let orden = document.getElementById("pedido");
const carritoBtn = document.getElementById("ver-carrito");

carritoBtn.addEventListener("click", (e) => {
  sidebar.classList.toggle("visible")
  console.log(e.target)

})

let vaciarCarrito = document.getElementById("vaciar-carrito");
vaciarCarrito.addEventListener("click", resetCart);

const showCont = () => {
  return cont > 0
    ? (contador.innerHTML = `${cont}`)
    : (contador.innerText = "0");
};

showCont();

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

function emptyCart() {
  if (carrito.length == 0) {
    orden.innerHTML = `<p>No hay pedidos</p>`
    vaciarCarrito.disabled = true;
  }
}


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
      // for (let i = 0; i < carrito.length; i++) {
      //   localStorage.setItem("" + carrito[i].id, JSON.stringify(carrito[i]))
      // }
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
  p = `Total = ${suma(carrito)}`
  orden.lastChild.append(p)
  showCont();
  vaciarCarrito.disabled = false;
  let botonQuitar = document.querySelectorAll('.quitar')
  for (let btn of botonQuitar) {
    btn.addEventListener('click', removeItems)
  }
}

function removeItems(e) {

  let identificador = e.target.id.split("-")[1]
  if (carrito.length > 0) {
    for (let el of carrito) {
      if (el.id == identificador && el.qty == 1) {
        e.target.parentElement.remove()
        carrito.pop(el)
      }
      el.qty = el.qty - 1
      // el.id == identificador ? e.target.parentElement.remove() : el.qty -= 1;
      // carrito.pop(el)
    }
    cont > 0 && cont--

    localStorage.removeItem("carrito")
    localStorage.removeItem("cont")
  } else {
    emptyCart()
  }
  localStorage.setItem("cont", cont)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  showCont()
}

//ELIMINA EL CARRITO
function resetCart() {
  if (carrito.length > 0) {
    localStorage.clear();
    orden.innerHTML = `<p>No hay pedidos</p>`

  }
  vaciarCarrito.disabled = true;
  cont = 0;
  showCont();
}


// mostrar carrito / contenido de carrito vacío
carrito.length > 0
  ? verCarrito()
  : emptyCart();
