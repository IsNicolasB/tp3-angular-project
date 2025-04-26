import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  imports: [CommonModule],
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css'
})

export class Punto1Component {
  noticias = [
    {
      titulo: 'Central Córdoba hace historia en el Maracaná',
      noticia: 'Obtuvo su primer victoria en la copa Libertadores contra Flamengo.',
      img: '../../../../assets/img/central-cordoba.jpg',
      style: 'color: white'
    },
    {
      titulo: 'Super Clásico River vs Boca',
      noticia: 'Este domingo 27 de abril Boca y River se mediran en el estadio Más Monumental',
      img: '../../../../assets/img/river-boca.jpg',
      textColor: 'text-dark'
    },
    {
      titulo: 'Super Clásico en España, por la copa del Rey',
      noticia: 'Barcelona y Real Madrid se enfrentarán este sábado 26 de abril, en la final de la copa del Rey.',
      img: '../../../assets/img/barcelona-madrid.jpg',
      textColor: 'text-light'
    }
  ];

  indiceActual = 0;

  siguiente() {
    this.indiceActual = (this.indiceActual + 1) % this.noticias.length;
  }

  anterior() {
    this.indiceActual = (this.indiceActual - 1 + this.noticias.length) % this.noticias.length;
  }
}
