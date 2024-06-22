import { fetchUsersByUserName } from "../../utils/fetchUserByName";
import { crearBoton } from "../BtnHeader/BtnHeader";
import { displayUsersAndEvents } from "../DisplayUsersAndEvents/DisplayUsersAndEvents";
import { printEvents } from "../PrintEvents/PrintEvents";
import { filterUsers } from "../viewAdminPanel/viewAdminPanel";
import "./Buscador.css";

export const buscador = () => {
  const screenWidth = window.innerWidth;
  const divBuscador = document.createElement("div");
  const buscadorInput = document.createElement("input");
  const iBuscador = document.createElement("i");

  iBuscador.classList = "fa-solid fa-magnifying-glass";
  buscadorInput.type = "text";
  buscadorInput.placeholder = "Buscar Eventos";
  buscadorInput.classList = "buscador";

  if (screenWidth <= 800) {
    divBuscador.classList.add("searchDiv");
  } else {
    divBuscador.classList.add("divBuscador");
    const btnBuscar = crearBoton("Buscar");
    btnBuscar.removeAttribute("href");
    btnBuscar.classList = "btnBuscar";
    divBuscador.append(btnBuscar)
  }

  divBuscador.append(iBuscador, buscadorInput);
  return divBuscador;
};

export const buscar = async (divMain) => {
  const buscador = document.querySelector(".buscador");
  const btnBuscar = document.querySelector(".btnBuscar");
  let valorBusqueda = "";

  const realizarBusqueda = async () => {
    valorBusqueda = buscador.value;
    divMain.classList.add("hidden");

    if (valorBusqueda === "") {
      return;
    }

    const event = await fetch(
      `https://proyecto10-six.vercel.app/api/events/title/${valorBusqueda}`
    );
    const events = await event.json();

    if (event.status === 404) {
      divMain.style.height = "63svh";
      divMain.innerHTML = `
      <h1 class="h1-error" >No se encontró ningún evento con ese título</h1>`;
      divMain.classList.remove("hidden");
      return;
    }

    setTimeout(() => {
      divMain.innerHTML = "";
      printEvents(events, null, divMain);
      divMain.classList.remove("hidden");
    }, 500);
  };

  buscador.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      realizarBusqueda();
    }
  });
  if(btnBuscar) {
    btnBuscar.addEventListener("click", realizarBusqueda);
  }
};

export const searchAdmin = (
  adminPanel,
  closePanel,
  usersContainer,
  users,
  events,
  token,
  paginationContainer
) => {
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "search__input";
  searchInput.placeholder = "Buscar Por Usuario";

  const searchButton = document.createElement("button");
  searchButton.className = "search__button";
  const searchIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  searchIcon.classList.add("search__icon");
  searchIcon.setAttribute("aria-hidden", "true");
  searchIcon.setAttribute("viewBox", "0 0 24 24");
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
  );
  g.appendChild(path);
  searchIcon.appendChild(g);
  searchButton.appendChild(searchIcon);

  const clearButton = document.createElement("button");
  clearButton.textContent = "Limpiar";
  clearButton.classList = "clear-button";
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    displayUsersAndEvents(users, events, usersContainer, token);
    paginationContainer.style.display = "flex";
  });

  searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchInput.value.trim() === "") {
        alert("Por favor, ingresa un nombre de usuario para buscar.");
        return;
      }
      const filteredUsers = await fetchUsersByUserName(searchInput.value);
      filterUsers(
        filteredUsers,
        events,
        usersContainer,
        token,
        users,
        paginationContainer
      );
    }
  });

  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
  searchContainer.appendChild(clearButton);

  adminPanel.appendChild(closePanel);
  adminPanel.appendChild(searchContainer);
};
