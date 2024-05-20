import { Home } from "../../pages/Home/Home";
import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import { containerBoton } from "../BtnHeader/BtnHeader";
import { buscador } from "../Buscador/Buscador";
import { Logo } from "../Logo/Logo";
import "./Header.css";

const app = document.querySelector("#app");
const divContainer = document.createElement("div");

export const HeaderReload = () => {
  divContainer.innerHTML = "";
  const b = buscador();
  const l = Logo();
  const { btnContainerIzq, btnContainerDrc } = containerBoton();
  divContainer.append(l, btnContainerIzq, b, btnContainerDrc);
};

export const Header = () => {
  const header = document.createElement("header");
  divContainer.innerHTML = "";
  divContainer.classList = "divContainer";
  HeaderReload();
  header.append(divContainer);
  app.append(header);
};
