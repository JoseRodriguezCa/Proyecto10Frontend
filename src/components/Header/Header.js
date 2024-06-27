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
        <svg class="svgIcon" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z" stroke="black" stroke-width="7"></path>
        </svg>
      </a>
      <a href="/create-event" class="tab add">
        <svg class="svgIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5v14m-7 -7h14" />
        </svg>
      </a>
      <button class="tab search" id="searchTab">
        <svg width="101" height="114" viewBox="0 0 101 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="46.1726" cy="46.1727" r="29.5497" transform="rotate(36.0692 46.1726 46.1727)" stroke="black" stroke-width="7"></circle>
          <line x1="61.7089" y1="67.7837" x2="97.7088" y2="111.784" stroke="black" stroke-width="7"></line>
        </svg>
      </button>
      <a href="/config-user" class="tab profile">
        <svg width="104" height="100" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="21.5" y="3.5" width="60" height="60" rx="30" stroke="black" stroke-width="7"></rect>
          <g clip-path="url(#clip0_41_27)">
            <mask id="mask0_41_27" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="61" width="104" height="52">
              <path d="M0 113C0 84.2812 23.4071 61 52.1259 61C80.706 61 104 84.4199 104 113H0Z" fill="white"></path>
            </mask>
            <g mask="url(#mask0_41_27)">
              <path d="M-7 113C-7 80.4152 19.4152 54 52 54H52.2512C84.6973 54 111 80.3027 111 112.749H97C97 88.0347 76.9653 68 52.2512 68H52C27.1472 68 7 88.1472 7 113H-7ZM-7 113C-7 80.4152 19.4152 54 52 54V68C27.1472 68 7 88.1472 7 113H-7ZM52.2512 54C84.6973 54 111 80.3027 111 112.749V113H97V112.749C97 88.0347 76.9653 68 52.2512 68V54Z" fill="black"></path>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_41_27">
              <rect width="104" height="39" fill="white" transform="translate(0 61)"></rect>
            </clipPath>
          </defs>
        </svg>
      </a>
      <button class="tab logout">
        <svg class="svgIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M14 8v-4a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-4" />
          <path d="M7 12h14l-3 -3m0 6l3 -3" />
        </svg>
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
      window.location.reload()
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
        <svg class="svgIcon" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z" stroke="black" stroke-width="7"></path>
        </svg>
      </a>
      <button class="tab search" id="searchTab">
        <svg width="101" height="114" viewBox="0 0 101 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="46.1726" cy="46.1727" r="29.5497" transform="rotate(36.0692 46.1726 46.1727)" stroke="black" stroke-width="7"></circle>
          <line x1="61.7089" y1="67.7837" x2="97.7088" y2="111.784" stroke="black" stroke-width="7"></line>
        </svg>
      </button>
      <a href="/login" class="tab login">
        <svg class="svgIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-5a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2 -2v-2" />
          <path d="M20 12h-13l3 -3m0 6l-3 -3" />
        </svg>
      </a>
      <a href="/register" class="tab register">
        <svg class="svgIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
          <path d="M16 11h6m-3 -3v6" />
        </svg>
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
