import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  totalPrice: string;
  listOfProducts: HTMLElement[];
  basketButton: HTMLButtonElement;
}

export class Basket extends Component<IBasket> { //Класс разметки корзины
  protected totalPriceCounter: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected basketList: HTMLElement;
  
  constructor(protected events: IEvents, conteiner: HTMLElement) {
    super(conteiner);

    this.totalPriceCounter = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.basketList = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:arrange");
      
    });

    this.basketButton.disabled = true;
  }

  set listOfProducts(value: HTMLElement[]) {    
    this.basketList.replaceChildren(...value);
  }

  set totalCounter(value: string) {
    this.totalPriceCounter.textContent = String(value);    
  }

  set buttonStatus(value: boolean) {
    this.basketButton.disabled = value;    
  }

  public isEmpty(): boolean {
    return this.listOfProducts.length === 0;
  }
  
}
