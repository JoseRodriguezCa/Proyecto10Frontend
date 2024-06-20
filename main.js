import { buscar } from "./src/components/Buscador/Buscador";
import { Footer } from "./src/components/Footer/Footer";
import { Header, mobileHeader } from "./src/components/Header/Header";
import { Main } from "./src/components/Main/Main";
import { SearchPage } from "./src/components/SearchPage/SearchPage";
import { router, navigateTo } from "./src/router/routes";
import "./style.css";

// Inicializar los componentes de la aplicación


// Función para determinar el tipo de header basado en el ancho de la pantalla
function checkScreenWidth() {
  const screenWidth = window.innerWidth;

  // Elimina cualquier header existente
  const existingHeader = document.querySelector('header');
  if (existingHeader) {
    existingHeader.remove();
  }

  if (screenWidth <= 800) {
    mobileHeader(); // Usar header móvil si el ancho es menor o igual a 650px
    SearchPage()
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
    const divMain = document.querySelector('.divMain');
    buscar(divMain)
   }

}
checkScreenWidth();



Main();
Footer();

// Verificar la ruta inicial y navegar si es necesario
const initialPath = window.location.pathname + window.location.search;
if (initialPath === '/' || initialPath === '/index.html') {
  navigateTo("/events?page=1");
} else {
  router();
}

// Agregar un listener para cambiar el header si el tamaño de la pantalla cambia
window.addEventListener('resize', checkScreenWidth);
