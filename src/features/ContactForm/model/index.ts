import { FormValidator } from "#shared/lib/plugins/formValidator";
import { ModalManager } from "#shared/lib/plugins/modalManager";
import { DefaultContactFormConfig } from "../config/ContactFormConfig";
import { ContactForm } from "../ui";

/**
 * Модель формы обратной связи
 */
export class ContactFormModel {
  attrs = {
    openModalBtn: "[data-js-open-modal]",
    form: "[data-js-form]",
    submitBtn: "[data-js-submit-btn]",
  };

  constructor() {
    this.bindEvents();
    this.validateForm();
  }

  private handleClick(e) {
    const parent = e.target.closest(this.attrs.openModalBtn);

    if (!parent) return;

    try {
      ModalManager.getInstance().open(ContactForm(DefaultContactFormConfig));
      this.validateForm();
    } catch (error) {
      console.error(error);
    }
  }

  private validateForm() {
    const formNode = document.querySelector(this.attrs.form);

    if (formNode instanceof HTMLFormElement) {
      new FormValidator({
        form: formNode,
        rules: {
          fullname: (value) => (value.length === 0 ? "Введите имя" : null),
          email: (value) =>
            !/^\S+@\S+\.\S+$/.test(value) ? "Введите корректный email" : null,
          message: (value) =>
            value.length < 5 ? "Длина сообщения должна быть больше 5" : null,
        },
      });
    }
  }

  private bindEvents() {
    document.addEventListener("click", (e) => {
      // Обработка клика
      this.handleClick(e);

      // Закрытие модалки
      if (e.target === document.querySelector("#modalInstance")) {
        ModalManager.getInstance().closeModal();
      }
    });
  }
}
