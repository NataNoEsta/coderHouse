// menu de cafe
const cafecitos = [
    { name: "Espresso", precio: 250, descripcion: "Café negro", img: "assets/images/espresso.png" },
    { name: "Espresso Doble", precio: 285, descripcion: "Café negro, doble", img: "assets/images/espresso.png" },
    { name: "Mediano", precio: 290, descripcion: "Café negro, 120ml", img: "assets/images/mediano.png" },
    { name: "Machiatto", precio: 350, descripcion: "Café espresso con leche", img: "assets/images/caffe_mochaccino.png" },
    { name: "Capuchino", precio: 400, descripcion: "Café con leche espumosa y canela", img: "assets/images/cappuccino.png" },
    { name: "Cafe Latte", precio: 470, descripcion: "Café mediano con leche", img: "assets/images/caffe_latte.png" },
    { name: "Iced Latte", precio: 470, descripcion: "Café mediano con leche y hielo", img: "assets/images/caffe_latte.png" },
    { name: "Americano", precio: 270, descripcion: "Café mediano suave", img: "assets/images/iced_coffee.png" },
    { name: "Mocachino", precio: 420, descripcion: "Capuchino con salsa de chocolate", img: "assets/images/caffe_mochaccino.png" }
];

let carrito = [];
localStorage.setItem("cafecitos", JSON.stringify(cafecitos))
// localStorage.setItem("carrito", JSON.stringify(carrito));

// genera un id para cada objeto en el array
i=0;
cafecitos.forEach((el) => el.id = i++)


const carritoBtn = document.getElementById("ver-carrito");
carritoBtn.addEventListener('click', verCarrito(carrito))

const menuBtn = document.getElementById("ver-menu");
menuBtn.addEventListener('click', itemMenu(cafecitos));


function itemMenu(cafecitos) {
    let app = document.getElementById('app');
      for (let caf of cafecitos) {
        let div = document.createElement('div');
        div.innerHTML =`
                    <article class="item-menu">
                    <h3 class="caf-title">${caf.name}</h3>
                    <figure><img src=${caf.img} alt="ilust"></figure>
                    <p class="desc">${caf.descripcion}</p>
                    <p class="precio">Precio: $${caf.precio}</p>
                    <button class="btn-add" id="agregar${caf.name}${caf.id}" type="submit">Agregar</button>
                    </article>`
        
        app.appendChild(div);
        let btnAdd = document.getElementById(`agregar${caf.name}${caf.id}`);
        btnAdd.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(caf)
            
           localStorage.setItem("carrito", JSON.stringify(carrito)); 
        });
       
    }
    return carrito;
};


function verCarrito(carrito) {  
    let orden = document.getElementById('carrito');
    
    for(let el of carrito){
        let div = document.createElement('div');
        div.innerHTML = `<article class="item-menu">
                    <h3 class="caf-title">${el.name}</h3>
                    <figure><img src=${el.img} alt="ilust"></figure>
                    <p class="desc">${el.descripcion}</p>
                    <p class="precio">Precio: $${el.precio}</p>
                    `;
        orden.appendChild(div);
    }
};
