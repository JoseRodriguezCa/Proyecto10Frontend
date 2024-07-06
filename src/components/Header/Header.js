import { navigateTo } from "../../router/routes";
import { containerBoton } from "../BtnHeader/BtnHeader";
import { buscador } from "../Buscador/Buscador";
import { Logo } from "../Logo/Logo";
import "./Header.css";

const app = document.querySelector("#app");
const divContainer = document.createElement("div");

export const HeaderReload = () => {
  divContainer.innerHTML = "";

  const l = Logo();
  const { btnContainerIzq, btnContainerDrc } = containerBoton();
  divContainer.append(l, btnContainerIzq, btnContainerDrc);
};

export const Header = () => {
  if (document.querySelector(".header")) {
    return;
  }

  const header = document.createElement("header");
  divContainer.innerHTML = "";
  divContainer.classList = "divContainer";
  HeaderReload();
  const b = buscador();
  divContainer.insertBefore(b, divContainer.querySelector(".btnContainerDrc"));
  header.append(divContainer);
  header.classList.add("header");
  document.body.prepend(header);
};

export const mobileHeader = () => {
  if (document.querySelector(".mobile-header")) {
    return;
  }
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const header = document.createElement("header");
  divContainer.innerHTML = "";
  if (storedUser) {
    divContainer.innerHTML = `
    <div class="navigation-card">
      <a href="/events" class="tab home">
        <i class="fa-solid fa-house"></i>
      </a>
      <a href="/create-event" class="tab add">
        <i class="fa-regular fa-calendar-plus"></i>
      </a>
      <button class="tab search" id="searchTab">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <a href="/config-user" class="tab profile">
        <i class="fa-solid fa-user-pen"></i>
      </a>
      <button class="tab logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  `;
    divContainer.classList = "divContainer mobile";
    const b = buscador();
    header.append(divContainer, b);
    header.classList.add("mobile-header");
    document.body.append(header);
    const links = divContainer.querySelectorAll("a.tab");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = link.getAttribute("href");
        navigateTo(path);
      });
    });

    const logoutBtn = document.querySelector(".logout");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("user");
      window.location.reload();
    });

    const searchTab = document.getElementById("searchTab");
    searchTab.addEventListener("click", (e) => {
      e.preventDefault();
      if (b.style.opacity === "1") {
        b.style.opacity = "0";
      } else {
        b.style.opacity = "1";
      }
    });
  } else {
    divContainer.innerHTML = `
    <div class="navigation-card">
      <a href="/events" class="tab home">
        <i class="fa-solid fa-house"></i>
      </a>
      <button class="tab search" id="searchTab">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <a href="/login" class="tab login">
        <i class="fa-solid fa-right-to-bracket"></i>
      </a>
      <a href="/register" class="tab register">
        <i class="fa-solid fa-user-plus"></i>
      </a>
    </div>
  `;

    divContainer.classList = "divContainer mobile";
    const b = buscador();
    header.append(divContainer, b);
    header.classList.add("mobile-header");
    document.body.append(header);
    const links = divContainer.querySelectorAll("a.tab");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = link.getAttribute("href");
        navigateTo(path);
      });
    });

    const searchTab = document.getElementById("searchTab");
    searchTab.addEventListener("click", (e) => {
      e.preventDefault();
      if (b.style.opacity === "1") {
        b.style.opacity = "0";
      } else {
        b.style.opacity = "1";
      }
    });
  }
};
