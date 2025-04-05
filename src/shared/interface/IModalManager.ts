export interface IModalManager {
  id: string;
  component: string; // в случае с шаблонными строками - string. Если React - React.FC
  props?: any;
  cbOnClose: () => void;
}
