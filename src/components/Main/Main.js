import { buscar } from "../Buscador/Buscador";
import "./Main.css";

const app = document.querySelector("#app");
export const Main = () => {
  const main = document.createElement("main");
  const divMain = document.createElement("div");
  buscar(divMain)
  divMain.classList = "div-main";
  main.append(divMain);
  app.append(main);
};
