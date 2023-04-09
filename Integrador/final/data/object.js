class Cafe {
  constructor(id, name, img, descripcion, precio, qty) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.descripcion = descripcion;
    this.precio = precio;
    this.qty = qty;
  }
  setQty() {
    this.qty += 1
  }
}

export {Cafe}