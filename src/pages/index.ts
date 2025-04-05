import { ClientsGrid } from "#shared/ui/ClientsGrid";
import { Footer } from "#shared/ui/Footer";
import { Header } from "#shared/ui/Header";
import { OurClient } from "#shared/ui/OurClient";
import { WhatWeDo } from "#shared/ui/WhatWeDo/ui";

/**
 * Верстка главной страницы
 * @return { String }
 */
const IndexPage = (): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
      </head>
      <body>
        ${Header()}
        <main class="main">
          ${WhatWeDo()}
          <section class="ourClient__wrapper">
            ${OurClient()}
            ${ClientsGrid()}
          </section>
        </main>
        <div class="footer__wrapper">
          ${Footer()}
        </div>
      </body>
    </html>
  `;
};

export default IndexPage;
