let carrito = JSON.parse(localStorage.getItem("carrito")) || []
// localStorage.setItem("carrito", JSON.stringify(carrito));

async function fetchdata() {
    let response = await fetch("./data/data.json")
    let data = await response.json();
    let app = document.getElementById('app');
    for (let caf of data) {
        console.log(caf)
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
            // let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            let match = carrito.some((el) => caf.id === el.id)
            let count = 0;
            carrito.count = count
            if (!match) {
                carrito.push(caf)
                console.log(carrito)
            } else {
                count++
                console.log()
            }


            localStorage.setItem("carrito", JSON.stringify(carrito));
        });

    }
};

fetchdata()

const carritoBtn = document.getElementById("ver-carrito");

carritoBtn.addEventListener('click', () => {
    document.getElementById("sidebar").style = "display:block"
})
// const menuBtn = document.getElementById("ver-menu");
// menuBtn.addEventListener("onload", fetchdata());



function verCarrito(carrito) {
    let orden = document.getElementById('carrito');

    for (let el of carrito) {
        let div = document.createElement('div');
        div.innerHTML = `<article class="item-orden">
                    <h3 class="caf-title">${el.name}</h3>
                    <figure><img src=${el.img} alt="ilust"></figure>
                    <p class="desc">${el.descripcion}</p>
                    <p class="precio">Precio: $${el.precio},00</p>
                    `;
        orden.appendChild(div);
    }
    orden.style = "display: block"
};


if (carrito.length > 0) {
    verCarrito(carrito);
} else {
    console.log('no hay carrito')
}
