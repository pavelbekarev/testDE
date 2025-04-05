import { IContactForm } from "#shared/interface/IContactForm";

/**
 * Верстка формы обратной связи
 * @return { String }
 */
export const ContactForm = (cfg: IContactForm[]): string => {
  return `
    <form data-js-form="" id="contactForm" class="contactForm">
      <h2 class="contactForm__title">
        Send Us Message
      </h2>
      <div class="contactForm__field">
        ${cfg
          .map(
            (item) => `
            <label class="contactForm__field__label">
              ${item.placeholder}
            </label>
            <input 
              class="contactForm__field__input" 
              id=${item.name}
              type="${item.type}" 
              name="${item.name}" 
              placeholder="${item.placeholder}" 
            />
          `
          )
          .join("")}
      </div>
      <a data-js-submit-btn={""} class="contactForm__submitBtn">SUBMIT</a>
    </form>
  `;
};
