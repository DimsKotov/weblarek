import { TPayment } from "../../types";
import { ValidationResult } from "../../types";
import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment: TPayment = "cash";
  private email: string = "";
  private phone: string = "";
  private address: string = "";
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  savePayment(payment: TPayment): void {
    this.payment = payment;
  }

  savePhone(phone: string): void {
    this.phone = phone;
  }

  saveEmail(email: string): void {
    this.email = email;
  }

  saveAddress(address: string): void {
    this.address = address;
  }

  getData(): {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
  } {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;
    this.events.emit("data:change");
    
  }

  clearData(): void {
    this.payment = "cash";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events.emit("data:change");
  }

  validate(): ValidationResult {
    let result: ValidationResult = {};

    if (!this.payment) {
      result.payment = "Не выбран вид оплаты";
    }

    if (!this.email) {
      result.email = "Укажите емэйл";
    }

    if (!this.phone) {
      result.phone = "Укажите телефон";
    }

    if (!this.address) {
      result.address = "Укажите адрес";
    }

    return result;
  }
}
