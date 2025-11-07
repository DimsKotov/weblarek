import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class Cart {
  private items: IProduct[] = []; //Создается пустой массив товаров (items), который будет хранить товары, добавляемые в корзину.
  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  addItem(item: IProduct): void {
    //Метод добавляет товар в корзину. Перед добавлением проверяется наличие товара с таким же идентификатором (hasItem()). Если товар ещё отсутствует в корзине, он добавляется в конец массива items.
    if (!this.hasItem(item.id)) {
      this.items.push(item);
      this.events.emit("cart:change");
    }
  }

  removeItem(item: IProduct): void {
    this.items = this.items.filter((product) => product.id !== item.id);
    this.events.emit("cart:change");
  }

  clearCart(): void {
    this.items.length = 0;
    this.events.emit("cart:change");
  }

  getItems(): IProduct[] {
    //Возвращает список всех товаров, находящихся в корзине.
    return this.items;
  }

  getTotalPrice(): number {
    //Рассчитывает общую стоимость товаров в корзине путём суммирования цен каждого элемента. Используется метод reduce(), начинающийся с нуля и последовательно прибавляющий цену каждого товара к общей сумме.
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.getItems().some(item => item.id === id);
}
}
