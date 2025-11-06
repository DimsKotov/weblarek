import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface ISuccess {
    counter: number;
}

export class Success extends Component<ISuccess> {
    protected modalCounter: HTMLElement;
    protected modalButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)

        this.modalCounter = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.modalButton = ensureElement<HTMLButtonElement>('order-success__close', this.container);
        this.modalButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        })
    }

    set counter(value: number) {
        this.modalCounter.textContent = String(value);
    }
}