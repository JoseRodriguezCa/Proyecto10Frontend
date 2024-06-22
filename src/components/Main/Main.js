import { buscar } from "../Buscador/Buscador";
import "./Main.css";

const app = document.querySelector("#app");
export const Main = () => {
  const screenWidth = window.innerWidth;
  const main = document.createElement("main");
  const divMain = document.createElement("div");
  const inputy = document.createElement("input")
  buscar(divMain)
  divMain.classList = "div-main";
  main.append(divMain,inputy);
  app.append(main);
};
