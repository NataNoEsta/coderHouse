let precio = 0, sumaTotal = 0, descuento = 0;
let nroItems = prompt("¿Cuántos items ha adquirido?")

function calculaDescuento() {
    for (let i = 1; i <= nroItems; i++) {
        precio = prompt(`Precio del item ${i} :`)
        sumaTotal += parseFloat(precio)
    }
    if ((nroItems >= 1) && (nroItems <= 3)) {
        descuento = sumaTotal - (sumaTotal * 0.05)
        console.log(descuento)
    }
    else if ((nroItems >= 4) && (nroItems <= 6)) {
        descuento = sumaTotal - (sumaTotal * 0.10)
        console.log(descuento)
    }
    else if ((nroItems > 6) && (nroItems <= 10)) {
        descuento = sumaTotal - (sumaTotal * 1.15)
        console.log(descuento)
    }
    else {
        descuento = sumaTotal - (sumaTotal * 1.20)
        console.log(descuento)

    }
    return descuento;
}


const totalText = document.getElementById("total");
totalText.innerText = calculaDescuento()
