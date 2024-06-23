import { ConfigUser } from "../ConfigUser/ConfigUser";
import "./BtnHeader.css";
import { navigateTo } from "../../router/routes";
import { HeaderReload } from "../Header/Header";

export const crearBoton = (texto, href) => {
  const aBoton = document.createElement("a");
  const boton = document.createElement("button");
  aBoton.href = href;
  boton.textContent = texto;
  boton.classList.add("btnHeader");
  aBoton.append(boton);
  aBoton.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(href);
  });
  return aBoton;
};

export const containerBoton = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("tokenUser");
  const btnContainerIzq = document.createElement("div");
  const btnIzquierda1 = crearBoton("Inicio", "/events?page=1");
  const btnIzquierda2 = crearBoton("Crear Evento", "/create-event");
  const btnContainerDrc = document.createElement("div");
  const btnDerecha1 = crearBoton("Iniciar Sesion", "/login");
  const btnDerecha2 = crearBoton("Registrarse", "/register");

  btnContainerIzq.classList = "btnContainerIzq";
  btnContainerDrc.classList = "btnContainerDrc";

  if (storedUser) {
    const btnDerecha3 = crearBoton("Cerrar Sesion");
    const userName = document.createElement("span");
    const btnDerecha4 = document.createElement("img");
    userName.textContent = storedUser.userName;
    btnDerecha4.src = storedUser.profileimg;
    btnDerecha4.classList = "creator-image";
    btnDerecha4.classList.add("config-user");
    userName.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/config-user", storedUser, token);
    });
    btnDerecha3.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("user");
      navigateTo("/events?page=1");
      window.location.reload()
    });

    btnContainerDrc.append(userName, btnDerecha4, btnDerecha3);
    btnContainerIzq.append(btnIzquierda2);
  } else {
    btnContainerDrc.append(btnDerecha1, btnDerecha2);
  }

  btnContainerIzq.prepend(btnIzquierda1);
  return {
    btnContainerIzq: btnContainerIzq,
    btnContainerDrc: btnContainerDrc,
  };
};
