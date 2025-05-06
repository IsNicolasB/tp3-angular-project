import { Output, EventEmitter, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../../services/parte2/ticket.service';
import { Ticket } from '../../../../models/parte2/ticket';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formularioBoleto : FormGroup
  constructor(private _formBuilder: FormBuilder, private _ticketService: TicketService){
    this.formularioBoleto = this._formBuilder.group({
      dni:["",[Validators.required, Validators.pattern("^[0-9]{7,8}$")]],
      email:['',[Validators.required, Validators.email]],
      touristCategory:["",Validators.required],
      destination:["",Validators.required],
    })
  }

  //Emite evento al componente padre para que se actualice la tabla
  @Output() ticketAgregado = new EventEmitter<void>();
  
  hasErrors(controlName: string, errorType: string){
    return this.formularioBoleto.get(controlName)?.hasError(errorType)
  }

  submit(){
    this.generateTicket()
  }

  //Genera un ticket y lo agrega al servicio
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
