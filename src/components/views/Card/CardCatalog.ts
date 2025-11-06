import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { categoryMap, CDN_URL } from "../../../utils/constants";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
interface ICardCatalog {
  image: string;
  category: string;
}
export class CardCatalog extends Card<ICardCatalog> {
  protected cardImage: HTMLImageElement;
  protected cardCatagory: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardCatagory = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
  set image(src: string) {
    this.cardImage.src = `${CDN_URL}/${src}`;
    this.cardImage.alt = this.cardTitle.textContent || "Изображение товара";
  }
  set category(value: string) {
    this.cardCatagory.textContent = value;    
    const modifier = (categoryMap as Record<string, string>)[
      value.toLowerCase()
    ];
    if (modifier) {
      this.cardCatagory.classList.add(modifier);
    }
  }
}
