import logo from "#assets/logo.svg";

/**
 * Верстка подвала
 * @return { String }
 */
export const Footer = (): string => {
  return `
    <footer class="footer">
      <div class="container footer__topContent">
        <div class="footer__topContent__left">
          <h1 class="footer__topContent__left__title">
            Intersted to woek with our team?
          </h1>
          <span class="footer__topContent__left__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </span>
        </div>
        <div class="footer__topContent__right">
          <a data-js-open-modal="" class="footer__topContent__right__button">
            Let’s Talk
          </a>
        </div>
      </div>
      <hr class="footer__hr" />

      <div class="container footer__bottomContent">
        <div class="footer__bottomContent__content">
          <div class="footer__bottomContent__content__column">
            <div class="footer__bottomContent__content__column__item">
              <img class="footer__bottomContent__content__column__item__img" src=${logo} alt="Логотип" />
              <span class="footer__bottomContent__content__column__item__title">Afrianska</span>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <span class="footer__bottomContent__content__column__item__text">A.</span>
              <span class="footer__bottomContent__content__column__item__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <span class="footer__bottomContent__content__column__item__text">T.</span>
              <span class="footer__bottomContent__content__column__item__text">+62-812-7313-4321</span>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <span class="footer__bottomContent__content__column__item__text">E.</span>
              <span class="footer__bottomContent__content__column__item__text">hello.afrian@gmail.com</span>
            </div>
          </div>
          
          <div class="footer__bottomContent__content__column">
            <div class="footer__bottomContent__content__column__item">
              <span class="footer__bottomContent__content__column__item__title">About US</span>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">About</a>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">What We Do</a>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">Project</a>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">How It Work With Us</a>
            </div>
          </div>

          <div class="footer__bottomContent__content__column">
            <div class="footer__bottomContent__content__column__item">
              <span class="footer__bottomContent__content__column__item__title">Follow Us</span>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">Instagram</a>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">Facebook</a>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">LinkedIn</a>
            </div>
            <div class="footer__bottomContent__content__column__item">
              <a href="/" class="footer__bottomContent__content__column__item__text">Youtube</a>
            </div>
          </div>
        </div>
        
        <span class="footer__bottomContent__signature">2019 © Afrianska. All rights reserved.</span>
      </div>
    </footer>
  `;
};
