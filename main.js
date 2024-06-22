import { buscar } from "./src/components/Buscador/Buscador";
import { Footer } from "./src/components/Footer/Footer";
import { Header, mobileHeader } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { router, navigateTo } from "./src/router/routes";
import "./style.css";


function checkScreenWidth() {
  const screenWidth = window.innerWidth;

  const existingHeader = document.querySelector('header');
  if (existingHeader) {
    existingHeader.remove();
  }

  if (screenWidth <= 800) {
    mobileHeader();
    const footer = document.querySelector('footer');
    const newHeader = document.querySelector('header');
    if (footer && newHeader) {
      footer.insertAdjacentElement('afterend', newHeader);
    }
  } else {
    Header();
    const main = document.querySelector('main');
    const newHeader = document.querySelector('header');
    if (main && newHeader) {
      main.insertAdjacentElement('beforebegin', newHeader);
    }
  }

  if (screenWidth <= 800) {
    const divMain = document.querySelector('.div-main');
    buscar(divMain)
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
