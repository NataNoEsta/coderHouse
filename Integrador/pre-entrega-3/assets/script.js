let carrito = JSON.parse(localStorage.getItem("carrito")) || []
// localStorage.setItem("carrito", JSON.stringify(carrito));

const carritoBtn = document.getElementById("ver-carrito");
carritoBtn.addEventListener('click', () => {
    document.getElementById("sidebar").style = "display:block";
})

async function fetchdata() {
    let response = await fetch("./data/data.json")
    let data = await response.json();
    let app = document.getElementById('app');
    for (let caf of data) {
        let div = document.createElement('div');
        div.innerHTML = `
                        <article class="item-menu">
                        <h3 class="caf-title">${caf.name}</h3>
                        <figure><img src=${caf.img} alt="ilust"></figure>
                        <p class="desc">${caf.descripcion}</p>
                        <p class="precio">Precio: $${caf.precio},00</p>
                        <button class="btn-add" id="${caf.id}" type="submit">Agregar</button>
                        </article>`

        app.appendChild(div);
        let btnAdd = document.getElementById(`${caf.id}`);
        btnAdd.addEventListener('click', () => {
            let cont = 0
            let match = carrito.some((el) => caf.id === el.id)  
            if (!match) {  
                carrito.push(caf)
                cont += caf.qty
                console.log(caf.qty)
            } else {
                while(match) {
                    caf.qty += 1
                    cont += caf.qty
                    console.log(caf.qty)
                    break
                }
            }
            Swal.fire({
                title:'Gracias',
                text:'Su pedido ha sido recibido',
                iconHtml: "assets/images/coffee.png",
                confirmationButtonText:'Ok!',
                backdrop:true,
            
            });
            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("cont", cont)
            
        });
        let contador = localStorage.getItem("cont")
        contador ? document.getElementById("item-count").innerText = `${contador}` : ''
    }
};

fetchdata()

function verCarrito(carrito) {
    let orden = document.getElementById('carrito');

    for (let el of carrito) {
        let div = document.createElement('div');
        div.innerHTML = `<article class="item-orden">
                    <h3 class="caf-title">${el.name}</h3>
                    <figure><img src=${el.img} alt="ilust"></figure>
                    <p class="desc">${el.descripcion}</p>
                    <p class="desc">Cantidad: ${el.qty}</p>
                    <p class="precio">Precio: $${el.precio},00</p>
                    `;
        orden.appendChild(div);           
    }
    let vaciarCarrito = document.getElementById("vaciar-carrito");
    vaciarCarrito.addEventListener('click', () => {
        carrito.length > 0 ? localStorage.clear() : vaciarCarrito.style="display:none"
    })
};
function updateQty() {
    //
}
function carritoVacio() {
    return document.getElementById('carrito').innerHTML = `<p>No hay ordenes</p>`
}
// let pedidos = document.getElementById('carrito');
carrito.length > 0 ? verCarrito(carrito) :  carritoVacio()
