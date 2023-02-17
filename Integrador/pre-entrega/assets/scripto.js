// menu de cafe

const cafecitos = [
    { name: "Espresso", type: "Negro", precio: 250 },
    { name: "Espreso Doble", type: "Negro", precio: 350 },
    { name: "Machiatto", type: "Con leche", precio: 350 },
    { name: "Capuccino", type: "Con leche", precio: 400 },
    { name: "Cafe Latte", type: "Frio, con leche", precio: 470}
];

var pedido = [];

function verMenu() {
    const menuCompleto = cafecitos.map(cafe => cafe.name + " - $" + cafe.precio +'\n')
    alert(menuCompleto.join(''));
    console.log(menuCompleto.join(''));
}
alert('Bienvenido/a al café "¿Cafecitoo?"\n[1]Ver menú\n[2]Ordenar\n[0]Salir');
// verMenu()

var elegir = prompt("Escriba su orden o ESC para salir.")

while (elegir != "0"){
    switch (elegir){
        case "1":
            verMenu();
            break;
        case "2":
            var orden = prompt("Qué variedad de café desea? ")
            var resultado = cafecitos.find((el) => (el.name).toLowerCase() == orden);
            resultado ? pedido.push(orden) : alert("No tenemos eso");
        case "0":
            console.log("Graias, vuelva pronto!");
            break
        default:
            console.log("Graias, vuelva pronto!");
            break;
    }
    elegir = prompt("Escriba su orden o ESC para salir.");
    
} 

// let resultado = cafecitos.find((el) => (el.name).toLowerCase() == orden);
// resultado ? pedido.push(orden) : console.log("No sé qué es eso");
// pedido.push(orden);
console.log(resultado);
console.log("su pedido:" + pedido);