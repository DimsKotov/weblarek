import { TPayment } from "../../types";
import { ValidationResult } from "../../types";

class Buyer {
  private payment: TPayment = "cash";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  saveAddress(address: string): void {
    this.address = address;
  }

  savePhone(phone: string): void {
    this.phone = phone;
  }

  saveData(
    payment: TPayment,
    email: string,
    phone: string,
    address: string
  ): void {
    this.payment = payment;
    this.email = email;
    this.phone = phone;
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

  clearData(): void {
    this.payment = "cash";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validate(): ValidationResult {
    let result: ValidationResult = {};

    if (!this.payment) {
      result.payment = "Не выбран вид оплаты";
    }

    // Проверка email
    if (!this.email) {
      result.email = "Укажите емэйл";
    }

    // Проверка номера телефона
    if (!this.phone) {
      result.phone = "Укажите телефон";
    }

    // Проверка адреса
    if (!this.address) {
      result.address = "Укажите адрес";
    }

    return result;
  }
}

export default Buyer;
