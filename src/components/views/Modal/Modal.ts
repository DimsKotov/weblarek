import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected modalButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(protected events: IEvents, conteiner: HTMLElement) {
    super(conteiner);

    this.modalButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );
    this.modalContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );

    this.modalButton.addEventListener("click", this.closeModal.bind(this));
    this.container.addEventListener("click", this.closeModal.bind(this));
    this.modalContent.addEventListener("click", (event) =>
      event.stopPropagation()
    );
  }

  set content(item: HTMLElement) {
    this.modalContent.replaceChildren(item);
  }

  openModal(): void {
    this.container.classList.add("modal_active");
  }

  closeModal(): void {
    this.container.classList.remove("modal_active");
  }
}
