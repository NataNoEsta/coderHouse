// menu de cafe
const cafecitos = [
    { name: "Espresso", precio: 250 },
    { name: "Espreso Doble", precio: 350 },
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
    alert("Su pedido:\n"+ ordenPedido.join(''));
    console.log("Su pedido:\n" + ordenPedido.join(''));
};
var elegir = prompt("Escriba su orden o [0] para salir.")

while (elegir != "0"){
    switch (elegir){
        case "1":
            verMenu();
            break;
        case "2":
            var orden = prompt("Qué variedad de café desea? ")
            var resultado = cafecitos.find((el) => (el.name).toLowerCase() == orden);
            resultado ? pedido.push(resultado) : alert("No tenemos eso");
        case "0":
            console.log("Gracias, vuelva pronto!");
            break
        default:
            verPedido();
            alert()
            break;
    }
    elegir = prompt("Escriba su orden o [0] para salir.");  
} 

verPedido();