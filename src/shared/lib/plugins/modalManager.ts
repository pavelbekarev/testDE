/**
 * Класс модального менеджера
 */
export class ModalManager {
  static instance: any;

  config: any;

  constructor(config = {}) {
    this.config = config;
    ModalManager.instance = this;
    this.bindEvents();
  }

  private bindEvents() {
    document.addEventListener("click", (e) => {
      const parent = e.target.closest("#closeIcon");

      if (parent) {
        this.closeModal();
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

    // отключаю скроллинг при открытии модалки
    document.querySelector("body").classList.add("modal-active");

    modalInstanceNode.innerHTML = component;

    document.querySelector("body").appendChild(modalInstanceNode);
  }

  /**
   * Закрытие модального окна
   */
  closeModal() {
    document.querySelector("#modalInstance").remove();
    document.querySelector("body").classList.remove("modal-active");
  }

  static getInstance(config = {}) {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager(config);
    }
    return ModalManager.instance;
  }
}
