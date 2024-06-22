import { buscador, buscar } from "../Buscador/Buscador";
import "./Main.css";

const app = document.querySelector("#app");
export const Main = () => {
  const screenWidth = window.innerWidth;
  const main = document.createElement("main");
  const divMain = document.createElement("div");
  const b = buscador();
  buscar(divMain)
  divMain.classList = "div-main";
  main.append(divMain,b);
  app.append(main);
};
