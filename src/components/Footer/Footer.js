import { navigateTo } from "../../router/routes";
import { isAdmin } from "../IsAdmin/IsAdmin";
import { viewAdminPanel } from "../viewAdminPanel/viewAdminPanel";
import "./Footer.css";

const app = document.querySelector("#app");

export const Footer = () => {
  const footer = document.createElement("footer");
  const containerFooter = document.createElement("div");
  containerFooter.classList = "footer-container";

  const footerContent = `
        <p>&copy; ${new Date().getFullYear()} Todos los derechos reservados</p>
        <div class="social-links">
            <a href="https://twitter.com" target="_blank"><i class="fa fa-twitter"></i></a>
            <a href="https://facebook.com" target="_blank"><i class="fa fa-facebook"></i></a>
            <a href="https://instagram.com" target="_blank"><i class="fa fa-instagram"></i></a>
        </div>
        <div class="contact-info">
            <p>Email: <a href="mailto:jose.rodriguez0@hotmail.es">jose.rodriguez0@hotmail.es</a></p>
        </div>
    `;

  containerFooter.innerHTML = footerContent;
  footer.append(containerFooter);
  footer.classList.add("fixed-footer");
  app.append(footer);

  if (isAdmin()) {
    const contactInfo = document.querySelector(".contact-info");
    const adminPanel = document.createElement("p");
    adminPanel.classList = "admin-panel";
    adminPanel.innerText = "Panel Administrador";
    adminPanel.addEventListener("click", () => navigateTo("/admin-panel?page=1"));
    contactInfo.append(adminPanel);
  }

  return footer;
};
