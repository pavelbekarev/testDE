import { ICard } from "#shared/interface/ICard";

/**
 * Карточка
 * @return {String}
 */
export const Card = ({ info }: { info: ICard }): string => {
  return `
    <div class="card">
      <img class="card__img" src=${info.imgUrl} alt="Изображение карточки" />
      <h2 class="card__title">${info.title}</h2>
      <span class="card__description">${info.description}</span>
    </div>
  `;
};
