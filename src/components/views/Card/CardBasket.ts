import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { EventEmitter } from "../../base/Events";


interface ICardData {
  container: HTMLElement;
  events: EventEmitter;
  index?: number;
  id?: string;
}


export class CardBasket extends Card<ICardData> { //Класс товара в самой корзине
  protected indexProduct: HTMLElement;
  protected deleteProduct: HTMLButtonElement;
  protected productId: string = '';

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    

    this.deleteProduct = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    this.indexProduct = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );

    this.deleteProduct.addEventListener("click", () => {
      if (this.productId)
        this.events.emit("product:delete", { id: this.productId });
    });
  }

  set index(value: number) {
    this.indexProduct.textContent = value.toString();
  }

  set id(value: string) {
    this.productId = value;
  }
}
