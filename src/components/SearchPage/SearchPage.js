import "./SearchPage.css"
import { buscador } from "../Buscador/Buscador";

export const SearchPage = (e) => {
  const divContainer = document.querySelector(".divContainer");
  const searchDiv = buscador();
  divContainer.appendChild(searchDiv);
};
