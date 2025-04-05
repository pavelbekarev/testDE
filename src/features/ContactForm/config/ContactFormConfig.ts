import { IContactForm } from "#shared/interface/IContactForm";

export const DefaultContactFormConfig: IContactForm[] = [
  {
    name: "fullname",
    type: "text",
    placeholder: "Your Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Your Email",
  },
  {
    name: "message",
    type: "text",
    placeholder: "Your Message",
  },
];
