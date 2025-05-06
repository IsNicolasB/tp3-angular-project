import { Output, EventEmitter, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../../services/parte2/ticket.service';
import { Ticket } from '../../../../models/parte2/ticket';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnChanges {
  @Input() ticketAEditar: Ticket | null = null;
  @Output() ticketAgregado = new EventEmitter<void>();
  @Output() edicionCompletada = new EventEmitter<void>();

  formularioBoleto: FormGroup;
  modoEdicion = false;

  constructor(private _formBuilder: FormBuilder, private _ticketService: TicketService){
    this.formularioBoleto = this._formBuilder.group({
      dni:["",[Validators.required, Validators.pattern("^[0-9]{7,8}$")]],
      email:['',[Validators.required, Validators.email]],
      touristCategory:["",Validators.required],
      destination:["",Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ticketAEditar']) {
      if (this.ticketAEditar) {
        this.modoEdicion = true;
        const destination = this.destinations.find(d => d.destination === this.ticketAEditar?.destination);
        this.formularioBoleto.patchValue({
          dni: this.ticketAEditar.dni,
          email: this.ticketAEditar.email,
          touristCategory: this.ticketAEditar.touristCategory,
          destination: destination
        });
      } else {
        this.modoEdicion = false;
        this.formularioBoleto.reset();
      }
    }
  }
  
  hasErrors(controlName: string, errorType: string){
    return this.formularioBoleto.get(controlName)?.hasError(errorType)
  }

  submit(){
    if (this.formularioBoleto.valid) {
      if (this.modoEdicion && this.ticketAEditar) {
        const updatedTicket = {
          dni: this.formularioBoleto.get("dni")?.value,
          email: this.formularioBoleto.get("email")?.value,
          touristCategory: this.formularioBoleto.get("touristCategory")?.value,
          destination: this.formularioBoleto.get("destination")?.value.destination,
          fecha: new Date(),
          totalPrice: this.getTotalPrice(this.formularioBoleto.get("destination")?.value.price)
        };
        this._ticketService.updateTicket(this.ticketAEditar.id, updatedTicket);
        this.modoEdicion = false;
        this.edicionCompletada.emit();
      } else {
        this.generateTicket();
      }
      this.ticketAgregado.emit();
      this.formularioBoleto.reset();
    }
  }

  generateTicket(){
    const ticket = {
      dni: this.formularioBoleto.get("dni")?.value,
      email: this.formularioBoleto.get("email")?.value,
      touristCategory: this.formularioBoleto.get("touristCategory")?.value,
      destination: this.formularioBoleto.get("destination")?.value.destination,
      fecha: new Date(),
      totalPrice: this.getTotalPrice(this.formularioBoleto.get("destination")?.value.price)
    }
    this._ticketService.addTicket(ticket);
    this.ticketAgregado.emit();
    this.formularioBoleto.reset();
  }
  
  getTotalPrice(price : number){
    switch(this.formularioBoleto.get("touristCategory")?.value){
      case "menor":
        return price * 0.65
      case "jubilado":
        return price * 0.50
      default:
        return price
    }
  }

  destinations : any[] = [
    {
      destination: "San Salvador de Jujuy",
      price: 983.45
    },
    {destination: "San Salvador de Jujuy a Reyes",
      price: 983.45
    },
    {destination: "San Salvador de Jujuy a Guerrero",
      price: 1131.25
    },
    {destination: "San Salvador de Jujuy a Termas de Reyes",
      price: 1278.39
    },
    {destination: "San Salvador de Jujuy a San Pablo de Reyes",
      price: 1131.25
    },
    {destination: "San Salvador de Jujuy a Yala",
      price: 1278.39
    },
    {destination: "San Salvador de Jujuy a Los Nogales",
      price: 1426.19
    },
    {destination: "San Salvador de Jujuy a Lozano",
      price: 1426.19
    },
    {destination: "San Salvador de Jujuy a León",
      price: 1573.32
    }
  ]
}
