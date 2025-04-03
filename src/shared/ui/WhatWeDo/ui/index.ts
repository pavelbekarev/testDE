import { defaultCardConfig } from "#shared/config/defaultCardConfig";
import { Card } from "#shared/ui/Card";

/**
 * Возвращает верстку секции WhatWeDo
 * @return { String }
 */
export const WhatWeDo = (): string => {
  return `
    <section class="container whatWeDo">
      <h2 class="whatWeDo__title">
        What we do to help our client grow in digital era,
      </h2>
      <div class="whatWeDo__cards">
        ${defaultCardConfig.map((item) => Card({ info: item })).join("")}
      </div>
    </section>
  `;
};
