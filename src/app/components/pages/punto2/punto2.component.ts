import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Producto {
  nombre: string;
  descripcion: string;
  img: string;
  precio: number;
}

@Component({
  selector: 'app-punto2',
  imports: [CommonModule],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})

export class Punto2Component {
  productos: Producto[] = [
    {
      nombre: 'Mouse Logitech G203',
      descripcion: 'Mouse de 7000 DPI',
      img: 'assets/img/products/mouse-g203.jpg',
      precio: 40
    },
    {
      nombre: 'Auriculares Red Dragon Pandora',
      descripcion: 'Auriculares con micrófono',
      img: 'assets/img/products/auriculares-red-dragon.jpg',
      precio: 60
    }
  ];

  carrito: Producto[] = [];

  animandoCarrito = false;

  agregarAlCarrito(producto: Producto) {
    if (!this.carrito.includes(producto)) {
      this.carrito.push(producto);
      this.animarCarrito();
    }
  }

  animarCarrito() {
    this.animandoCarrito = true;
    setTimeout(() => this.animandoCarrito = false, 500); // Duración de la animación
  }
  
  get total(): number {
    return this.carrito.reduce((acc, prod) => acc + prod.precio, 0);
  }
}