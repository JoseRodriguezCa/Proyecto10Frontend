import { Home } from "../../pages/Home/Home";
import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import "./Main.css";

const app = document.querySelector("#app");
export const Main = () => {
  const main = document.createElement("main");
  const divMain = document.createElement("div");
  divMain.classList = "div-main";
  main.append(divMain);
  app.append(main);
};
