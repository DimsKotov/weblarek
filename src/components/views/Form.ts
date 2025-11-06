import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IBuyer } from "../../types/index";

export interface IForm {
  valid: boolean;
  error: string | null;
  setErrors?: (message: string | null) => void;
}

export abstract class Form<IForm> extends Component<IForm> {
  protected submitBtn: HTMLButtonElement;
  protected errorContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.submitBtn = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      container
    );
    this.errorContainer = ensureElement<HTMLElement>(
      ".form__errors",
      container
    );

    container.addEventListener("submit", (event) => {
      event.preventDefault();
      this.events.emit(`${this.container.getAttribute("name")}:submit`);
    });
  }

  protected inputChange(field: keyof IBuyer, value: string | null) {
    this.events.emit("form:change", {
      field,
      value,
    });
  }

  setValid(isValid: boolean) {
    this.submitBtn.disabled = !isValid;
  }

  setErrors(message: string | null) {
    this.errorContainer.textContent = message ?? "";
  }
}
