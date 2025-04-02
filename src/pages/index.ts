import { defaultCardConfig } from "#shared/config/defaultCardConfig";
import { ICard } from "#shared/interface/ICard";
import { Card } from "#shared/ui/Card";
import { Title } from "#shared/ui/Title";

/**
 * Верстка главной страницы
 * @return { String }
 */
const IndexPage = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home Page</title>
    </head>
    <body>
      <header>
      </header>
      <main class="main">
        <h1>Hello</h1>
        ${Title("Привет")}
        <div class="main__cards">
          ${defaultCardConfig.map((item: ICard) => Card({ info: item }))}
        </div>
      </main>
    </body>
  </html>
`;

export default IndexPage;
