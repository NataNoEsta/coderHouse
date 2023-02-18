// menu de cafe
const cafecitos = [
    { name: "Espresso", precio: 250 },
    { name: "Espresso Doble", precio: 350 },
    { name: "Machiatto", precio: 350 },
    { name: "Capuccino", precio: 400 },
    { name: "Cafe Latte", precio: 470},
    { name: "Americano", precio: 270 },
    { name: "Mokaccino", precio: 420 }
];
alert('Bienvenido/a al café "¿Cafecitoo?"\n[1]Ver menú\n[2]Ordenar\n[0]Salir');
let pedido = [];

function verMenu() {
    const menuCompleto = cafecitos.map(cafe => cafe.name + " - $" + cafe.precio +'\n')
    alert(menuCompleto.join(''));
    console.log(menuCompleto.join(''));
}
function verPedido() {
    const ordenPedido = pedido.map(cafe => cafe.name + " - $" + cafe.precio + "\n");
    alert("Detalle del pedido:\n"+ ordenPedido.join(''));
    console.log("Detalle del pedido:\n" + ordenPedido.join(''));
};
function sumarOrden(){
    let acc = 0;
    const precios = pedido.map(el => acc += el.precio)
    for (let i in precios) {
        acc += precios[i];
    }
    return acc;
}
var elegir = prompt("Escriba su orden o [0] para salir.")

while (elegir !== "0"){
    switch (elegir){
        case "1":
            verMenu();
            break;
        case "2":
            var orden = prompt("Qué variedad de café desea? ");
            var resultado = cafecitos.find((el) => (el.name).toLowerCase() == orden);
            resultado ? pedido.push(resultado) : alert("No tenemos eso");
            break
        case "0":
            alert("Gracias, Vuelva pronto")
            break
        default:
            console.log("Gracias, vuelva pronto!");
            alert("Gracias, Vuelva pronto")
            break;
    }
    elegir = prompt("Escriba su orden o [0] para salir.");  
} 
alert("La cuenta es: $"+sumarOrden());
verPedido();