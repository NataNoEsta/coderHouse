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
let carrito = []
localStorage.setItem("carrito", JSON.stringify(carrito));


i=0;
cafecitos.forEach((el) => el.id = i++)



const carritoBtn = document.getElementById("ver-carrito");
carritoBtn.addEventListener('click', verCarrito(carrito))

const menuBtn = document.getElementById("ver-menu");
menuBtn.addEventListener('click', itemMenu(cafecitos));

function itemMenu(caf) {
    let app = document.getElementById('app');
      for (let caf of cafecitos) {
        let div = document.createElement('div');
        div.innerHTML =`
                    <article class="item-menu" id="">
                    <h3 class="caf-title">${caf.name}</h3>
                    <figure><img src=${caf.img} alt="ilust" id=""></figure>
                    <p class="desc">${caf.descripcion}</p>
                    <p class="precio">Precio: $${caf.precio}</p>
                    <button class="btn-add" id="agregar${caf.name}${caf.id}" type="submit">Agregar</button>
                    </article>`
        
        app.append(div);
        let btnAdd = document.getElementById(`agregar${caf.name}${caf.id}`);
        btnAdd.addEventListener('click', () => carrito.push(caf));  
        console.log(carrito)
    
    }    
};



function verCarrito(carr) {  
    let app = document.getElementById('pedido');
    for(let carr of carrito){
        let div = document.createElement('div');
        div.innerHTML = ` <article class="item-menu" id="">
                            <h3 class="caf-title">${carr.name}</h3>
                            <figure><img src=${carr.img} alt="ilust" id=""></figure>
                            <p class="desc">${carr.descripcion}</p>
                            <p class="precio">Precio: $${carr.precio}</p>
                            `
        app.appendChild(div);

    }
    console.log(carrito)
};
carrito = JSON.parse(localStorage.getItem("carrito")) || [];