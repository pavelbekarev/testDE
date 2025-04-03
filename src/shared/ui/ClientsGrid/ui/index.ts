import { ClientsGridConfig } from "#shared/config/clientsGridConfig";

/**
 *
 */
export const ClientsGrid = () => {
  return `
    <div class="clientsGrid">
      ${ClientsGridConfig.map(
        (client) => `
        <span class="clientsGrid__client">${client.logo}</span>
      `
      ).join("")}
      <span class="clientsGrid__client">more clients</span>
    </div>
  `;
};
