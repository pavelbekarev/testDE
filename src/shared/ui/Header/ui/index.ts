import illustration from "#assets/illustration.svg";
import logo from "#assets/logo.svg";
import { IconBurger } from "#shared/ui/IconBurger";

/**
 * Вёрстка Header
 * @return { String }
 */
export const Header = (): string => {
  return `
    <header class="header">
      <div class="header__navigation">
        <img class="header__navigation__logoImg" src=${logo} alt="Логотип" />
        ${IconBurger()}
      </div>
      <div class="container header__content">
        <div class="header__content__textContent">
          <h2 class="header__content__textContent__title">New Automation Tool for Your Home</h2>
          <span class="header__content__textContent__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus tristique vulputate ultrices ut mauris tellus at. Posuere sollicitudin odio tellus elit.</span>
          <a class="header__content__textContent__btn" data-js-header-btn href="/">See our project</a>
        </div>
        <div class="header__content__imgContent">
          <img class="header__content__imgContent__img" src=${illustration} alt="Иллюстрация хедера" />
        </div>
      </div>
    </header>
  `;
};
