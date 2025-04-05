// eslint-disable-next-line no-restricted-imports
import { ContactFormModel } from "#features/ContactForm/model/index";
import { ModalManager } from "#shared/lib/plugins/modalManager";
import "./style.js";

function domReady() {
  return new Promise((res: any) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([domReady()]).then(() => {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // ModalManager.getInstance().open(ContactForm());
  new ModalManager();
  new ContactFormModel();
});
