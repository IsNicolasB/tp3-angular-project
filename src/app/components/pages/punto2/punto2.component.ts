import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';

interface Producto {
  id: number;
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
  @ViewChild('compraModal') compraModal!: ElementRef;
  cart: Producto[] = [];
  animatingCart = false;

  addProduct(producto: Producto) {
    if (!this.cart.includes(producto)) {
      this.cart.push(producto);
      this.animateCart();
    }
  }

  deleteProduct(id: number) {
    this.cart = this.cart.filter( p => p.id !== id);
  }

  animateCart() {
    this.animatingCart = true;
    setTimeout(() => this.animatingCart = false, 1000);
  }

  get total(): number {
    return this.cart.reduce((acc, prod) => acc + prod.precio, 0);
  }

  realizarCompra() {
    // Cerrar el modal del carrito usando data-bs-dismiss
    const carritoModal = document.getElementById('carritoModal');
    const closeButton = carritoModal?.querySelector('.btn-close');
    if (closeButton) {
      (closeButton as HTMLElement).click();
    }

    // compra exitosa
    setTimeout(() => {
      const modalElement = this.compraModal.nativeElement;
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }, 300);

    // Reiniciar el carrito
    this.cart = [];
  }

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Mouse Logitech G203',
      descripcion: 'Mouse de 7000 DPI',
      img: 'assets/img/products/mouse-g203.jpg',
      precio: 40
    },
    {
      id: 2,
      nombre: 'Auriculares Red Dragon Pandora',
      descripcion: 'Auriculares con micrófono',
      img: 'assets/img/products/auriculares-red-dragon.jpg',
      precio: 60
    },
    {
      id: 3,
      nombre: "RTX 3060",
      descripcion: "Placa de Video 12GB Msi Ventus",
      img: "assets/img/products/rtx-3060.jpeg",
      precio: 150
    },
    {
      id: 4,
      nombre: "Teclado Onikuma G38",
      descripcion: "Teclado mecánico Onikuma G38",
      img: "assets/img/products/teclado-onikuma.jpg",
      precio: 100
    },
    {
      id: 5,
      nombre: "Mouse Onikuma CW905",
      descripcion: "Mouse inalámbrico profesional",
      img: "assets/img/products/mouse-onikuma.jpg",
      precio: 50
    },
    {
      id:6,
      nombre:"Auriculares KZ EDX PRO",
      descripcion: "Auriculares con micrófono",
      img: "assets/img/products/kz-edx-pro.jpg",
      precio: 25
    }

  ];

}