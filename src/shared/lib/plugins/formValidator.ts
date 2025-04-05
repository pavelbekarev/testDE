import { ApiClient } from "../services/ApiClient";

/**
 * Класс-валидатор
 */
export class FormValidator {
  form: HTMLFormElement;

  rules: any;

  private errors: any;

  formData: FormData;

  private dataForSend: any;

  constructor({ form, rules }) {
    this.form = form;
    this.rules = rules;
    this.errors = {};

    this.bindEvents();
  }

  validateField(name, value): any {
    const rule = this.rules[name];

    if (!rule) return null;

    const error = rule(value);

    this.errors[name] = error || "";

    return error;
  }

  public validateAll(): boolean {
    this.clearErrors();
    if (!(this.form instanceof HTMLFormElement)) {
      console.error("FormValidator: `form` is not an HTMLFormElement");
      return false;
    }

    this.formData = new FormData(this.form);

    for (const [name, value] of this.formData.entries()) {
      this.validateField(name, value.toString());
    }

    this.showErrors();
    return this.isValid();
  }

  private isValid(): boolean {
    return Object.values(this.errors).every((err) => err === "");
  }

  private async handleSubmit(e) {
    const parent = e.target.closest("[data-js-submit-btn]");
    if (!parent) return;

    if (!this.validateAll()) {
      this.showErrors();
      return;
    }

    // валидная информация для отправки
    this.dataForSend = Object.fromEntries(this.formData.entries());
    const api = new ApiClient(
      "https://67f0fde1c733555e24abd6b3.mockapi.io/api/v1/"
    );

    /**
     * Отправляю данные на сервис mockapi.io
     * "https://67f0fde1c733555e24abd6b3.mockapi.io/api/v1/users"
     *
     * Пример данных:
     *  {fullname: 'fsadfsa', email: 'example@gmail.com', message: 'fsdafasdfs'}
     */
    console.debug(this.dataForSend);
    await api.post("users", this.dataForSend);
  }

  private showErrors(): void {
    Object.entries(this.errors).forEach(([name, error]) => {
      const field = this.form.querySelector(`[name="${name}"]`) as HTMLElement;
      if (!field) return;

      let errorEl = field.nextElementSibling as HTMLElement;
      if (!errorEl || !errorEl.classList.contains("error-message")) {
        errorEl = document.createElement("div");
        errorEl.classList.add("error-message");
        field.after(errorEl);
      }

      errorEl.textContent = error;
    });
  }

  private clearErrors(): void {
    this.errors = {};
    this.form
      .querySelectorAll(".errorMessages")
      .forEach((element) => element.remove());
  }

  private bindEvents(): void {
    document.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;

      if (!target || target.tagName !== "INPUT") return;

      this.validateField(target.name, target.value);
    });

    document.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleSubmit(e);
    });
  }
}
