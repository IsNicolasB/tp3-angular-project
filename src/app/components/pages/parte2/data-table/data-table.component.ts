import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { Ticket } from '../../../../models/parte2/ticket';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TicketService } from '../../../../services/parte2/ticket.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

interface CategorySummary {
  count: number;
  total: number;
}

interface Summary {
  total: number;
  categories: { [key: string]: CategorySummary };
}

@Component({
  selector: 'app-data-table-component',
  standalone: true,
  imports: [CommonModule, DataTablesModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit, OnDestroy {
  tickets: Ticket[] = [];
  dtOptions: any = {};
  summary: Summary = {
    total: 0,
    categories: {}
  };
  isBrowser: boolean = false;
  private ticketsSub!: Subscription;

  constructor(
    private _ticketService: TicketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    /*
    La sección con DataTable no es reactiva, por lo tanto la suscripción no le afecta.
    Quién ocupa esta suscripción es la parte del resumen de ventas.
    */
    this.ticketsSub = this._ticketService.tickets$.subscribe(tickets => {
      this.tickets = tickets;
      this.calculateSummary();
    });
    if (this.isBrowser) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        language: {
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "No se encontraron registros",
          info: "Mostrando página _PAGE_ de _PAGES_",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(filtrado de _MAX_ registros totales)",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
          }
        }
      };
    }
  }

  ngOnDestroy(): void {
    if (this.ticketsSub) {
      this.ticketsSub.unsubscribe();
    }
  }

  calculateSummary(): void {
    this.summary = { 
      total: 0,
      categories: {}// Se divide en  cantidad y total por categoría
    };

    this.tickets.forEach(ticket => {
      if (!this.summary.categories[ticket.touristCategory]) {
        this.summary.categories[ticket.touristCategory] = {
          count: 0,
          total: 0
        };
      }
      
      this.summary.categories[ticket.touristCategory].count++;
      this.summary.categories[ticket.touristCategory].total += ticket.totalPrice;
      this.summary.total += ticket.totalPrice;
    });
  }
}