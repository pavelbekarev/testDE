/**
 * Класс модального менеджера
 */
export class ModalManager {
  static instance: any;

  config: any;

  constructor(config = {}) {
    this.config = config;
    ModalManager.instance = this;
  }

  private bindEvents() {
    const openModalButton = document.querySelector(this.selectors.openModalBtn);
    const modalInstanceNode = document.querySelector("#modalInstance");

    document.addEventListener("click", (e) => {
      if (e.target === openModalButton) console.debug("!!!");

      if (e.target === modalInstanceNode) {
        console.debug("???");
        modalInstanceNode.remove();
      }
    });
  }

  open(component: string, options = {}) {
    this.createModalInstance(component);
  }

  /**
   * Создание модального окна в DOM-дереве
   * @param component - компонент, который будет отрисовываться при открытии модального окна
   */
  private createModalInstance(component: string) {
    const modalInstanceNode = document.createElement("div");
    modalInstanceNode.setAttribute("id", "modalInstance");
    modalInstanceNode.classList.add("modalInstance");

    modalInstanceNode.innerHTML = component;

    document.querySelector("body").appendChild(modalInstanceNode);
  }

  /**
   * Закрытие модального окна
   */
  closeModal() {
    document.querySelector("#modalInstance").remove();
  }

  static getInstance(config = {}) {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager(config);
    }
    return ModalManager.instance;
  }
}
