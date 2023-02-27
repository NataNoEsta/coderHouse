// menu de cafe


const cafecitos = [
    { name: "Espresso", precio: 250, descripcion: "Café negro", img: "/assets/images/espresso.png" },
    { name: "Espresso Doble", precio: 285, descripcion: "Café negro, doble", img: "/assets/images/espresso.png" },
    { name: "Mediano", precio: 290, descripcion: "Café negro, 120ml", img: "/assets/images/mediano.png" },
    { name: "Machiatto", precio: 350, descripcion: "Café espresso con leche", img: "/assets/images/caffe_mochaccino.png" },
    { name: "Capuchino", precio: 400, descripcion: "Café con leche espumosa y canela", img: "/assets/images/cappuccino.png" },
    { name: "Cafe Latte", precio: 470, descripcion: "Café mediano con leche", img: "/assets/images/caffe_latte.png" },
    { name: "Iced Latte", precio: 470, descripcion: "Café mediano con leche y hielo", img: "/assets/images/caffe_latte.png" },
    { name: "Americano", precio: 270, descripcion: "Café mediano suave", img: "/assets/images/iced_coffee.png" },
    { name: "Mocachino", precio: 420, descripcion: "Capuchino con salsa de chocolate", img: "/assets/images/caffe_mochaccino.png" }
];
localStorage.setItem("cafecitos", JSON.stringify(cafecitos));
lista = JSON.parse(localStorage.getItem("cafecitos"));

let carrito = [];

const carritoBtn = document.getElementById("ver-carrito");
carritoBtn.addEventListener('click', verCarrito)

const menuBtn = document.getElementById("ver-menu");
menuBtn.addEventListener('click', verMenu);

function itemMenu(caf) {
    return `<article class="item-menu">
            <h3 class="caf-title">${caf.name}</h3>
            <figure><img src=${caf.img} alt="ilust"></figure>
            <p class="desc">${caf.descripcion}</p>
            <p class="precio">Precio: $${caf.precio}</p>
            <button class="btn-add" type="submit">Agregar</button>
            </article>
            `
}

function verMenu() {
    document.getElementById("app").innerHTML = `${lista.map(itemMenu).join('')}`
}
verMenu()

const btnAdd = document.querySelectorAll('.btn-add');
btnAdd.forEach((btn) => btn.addEventListener('click', agregarCarrito));

function agregarCarrito(caf) {
    let pedido = caf.target.parentElement;
    console.log(pedido)
    carrito.push({...lista[caf]});
    console.log(carrito);
    return carrito;
}

function crearCarrito(carr) {
    return `<article class="item-menu">
            <h3 class="caf-title">${carr.name}</h3>
            <figure><img src=${carr.img} alt="ilust"></figure>
            <p class="desc">${carr.descripcion}</p>
            <p class="precio">Precio: $${carr.precio}</p>
            </article>
            `
}
function verCarrito() {
    document.getElementById("app").innerHTML = `${carrito.map(crearCarrito).join('')}`
}