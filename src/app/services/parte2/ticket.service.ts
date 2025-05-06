import { Injectable } from '@angular/core';
import { Ticket } from '../../models/parte2/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];
  private counter: number = 1;

  constructor() {}

  private generateId(): number {
    return this.counter++;
  }

  addTicket(ticket: Omit<Ticket, 'id'>): void {
    const newTicket: Ticket = {
      ...ticket,
      id: this.generateId()
    };
    this.tickets.push(newTicket);
  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  getTicketById(id: number): Ticket | undefined {
    return this.tickets.find(ticket => ticket.id === id);
  }

  updateTicket(id: number, updatedTicket: Omit<Ticket, 'id'>): void {
    const index = this.tickets.findIndex(ticket => ticket.id === id);
    if (index !== -1) {
      this.tickets[index] = {
        ...updatedTicket,
        id: id
      };
    }
  }

  deleteTicket(id: number): void {
    this.tickets = this.tickets.filter(ticket => ticket.id !== id);
  }
}
