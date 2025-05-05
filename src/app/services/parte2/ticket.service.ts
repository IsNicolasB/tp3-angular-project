import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Ticket } from '../../models/parte2/ticket';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];
  private readonly STORAGE_KEY = 'tickets';
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  tickets$ = this.ticketsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadTickets();
  }

  private loadTickets(): void {
    if (this.isBrowser) {
      const storedTickets = localStorage.getItem(this.STORAGE_KEY);
      if (storedTickets) {
        this.tickets = JSON.parse(storedTickets);
        this.ticketsSubject.next(this.tickets);
      }
    }
  }

  private saveTickets(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tickets));
      this.ticketsSubject.next(this.tickets);
    }
  }

  addTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
    this.saveTickets();
  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  getTicketsByCategory(category: string): Ticket[] {
    return this.tickets.filter(ticket => ticket.touristCategory === category);
  }

  updateTicket(index: number, newTicket: Ticket): void {
    if (this.tickets[index]) {
      this.tickets[index] = newTicket;
      this.saveTickets();
    }
  }

  deleteTicket(index: number): void {
    if (this.tickets[index]) {
      this.tickets.splice(index, 1);
      this.saveTickets();
    }
  }
}
