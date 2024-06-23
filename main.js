import { buscador, buscar } from "./src/components/Buscador/Buscador";
import { Footer } from "./src/components/Footer/Footer";
import { Header, mobileHeader } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { router, navigateTo } from "./src/router/routes";
import "./style.css";

function checkScreenWidth() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 801) {
    Header();
  }

  if (screenWidth <= 800) {
    mobileHeader();
   }

}
checkScreenWidth();

Main();
Footer();

const initialPath = window.location.pathname + window.location.search;
if (initialPath === '/' || initialPath === '/index.html') {
  navigateTo("/events");
} else {
  router();
}

window.addEventListener('resize', checkScreenWidth);
