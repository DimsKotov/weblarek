import { Form, IForm } from "./Form";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IContact extends IForm {
    email: string,
    phone: string
}

export class Contact extends Form<IContact> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;  

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);   

    
    this.emailInput.addEventListener('input', () => {
      this.inputChange('email', this.emailInput.value.trim());
    });

    this.phoneInput.addEventListener('input', () => {
      this.inputChange('phone', this.phoneInput.value.trim());
    });    
    
  }  

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}