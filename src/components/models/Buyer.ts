import { TPayment } from "../../types";
import { ValidationResult } from "../../types";

class Buyer {
  private payment: TPayment = "cash";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

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

    if (!["cash", "card"].includes(this.payment)) {
      result.payment = "Не выбран вид оплаты";
    }

    if (!/\S+@\S+\.\S+/.test(this.email)) {
      result.email = "Некорректный адрес электронной почты";
    }

    if (!/^\d+$/.test(this.phone)) {
      result.phone = "Телефон должен содержать только цифры";
    }

    if (!this.address.trim()) {
      result.address = "Адрес доставки обязателен";
    }

    return result;
  }
}

export default Buyer;
