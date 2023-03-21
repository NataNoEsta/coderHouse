class Cafe {
    constructor(id, name, descripcion, img, precio, qty){
        this.id = id;
        this.name = name;
        this.descripcion = descripcion;
        this.img = img
        this.precio = precio
        this.qty = 0
    }
    setQty() {
        return this.qty += 1;
    }
    getData() {
        return `${this.id, this.name, this.descripcion, this.img, this.precio, this.qty}`
    }
}
export { Cafe }