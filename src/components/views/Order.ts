import { ensureElement, ensureAllElements } from "../../utils/utils";
import { Form, IForm } from "./Form";
import { IEvents } from "../base/Events";
import { TPayment } from "../../types";


export interface IOrder extends IForm {
  address: string;
  payment: TPayment | null;
}

export class Order extends Form<IOrder> {
  protected addressInput: HTMLInputElement;
  protected paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.paymentButtons = ensureAllElements<HTMLButtonElement>('.order__buttons button', this.container);

    
    this.addressInput.addEventListener('input', () => {
      this.inputChange('address', this.addressInput.value.trim());
    });

    
    this.paymentButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.inputChange('payment', btn.name as TPayment); 
      });
    });
  }
  
  set payment(payment: TPayment | null) {
    this.paymentButtons.forEach((btn) => {
      btn.classList.toggle('button_alt-active', btn.name === payment);
    });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}