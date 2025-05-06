import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from "./form/form.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../models/parte2/ticket';

@Component({
  selector: 'app-parte2',
  standalone: true,
  imports: [RouterModule, FormComponent, DataTableComponent, CommonModule],
  templateUrl: './parte2.component.html',
  styleUrl: './parte2.component.css'
})

export class Parte2Component {
  constructor(private _router: Router){}

  mostrarTabla = true;
  ticketAEditar: Ticket | null = null;

  reiniciarTabla() {
    this.mostrarTabla = false;
    setTimeout(() => this.mostrarTabla = true, 0); // Espera un ciclo de cambio
  }

  editarTicket(ticket: Ticket) {
    this.ticketAEditar = ticket;
  }

  limpiarTicketAEditar() {
    this.ticketAEditar = null;
  }
}
