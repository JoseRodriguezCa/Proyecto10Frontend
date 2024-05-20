import { Home } from "../../pages/Home/Home";
import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import { CreateEvent } from "../CreateEvent/CreateEvent";
import "./BtnHeader.css";

export const crearBoton = (texto) => {
  const aBoton = document.createElement("a");
  const boton = document.createElement("button");
  aBoton.href = "/";
  boton.textContent = texto;
  boton.classList.add("btnHeader");
  aBoton.append(boton);
  return aBoton;
};

export const containerBoton = () => {
  const btnContainerIzq = document.createElement("div");
  const btnIzquierda1 = crearBoton("Inicio");
  const btnIzquierda2 = crearBoton("Crear Evento");
  const btnContainerDrc = document.createElement("div");
  const btnDerecha1 = crearBoton("Iniciar Sesion");
  const btnDerecha2 = crearBoton("Registrarse");
  btnDerecha1.addEventListener("click", (e) => LoginRegister(e, 'login'));
  btnDerecha2.addEventListener("click", (e) => LoginRegister(e, 'register'));
  btnIzquierda1.addEventListener("click", (e) => Home(e));
  btnIzquierda2.addEventListener("click", (e) => CreateEvent(e))
  btnContainerIzq.classList = "btnContainerIzq";
  btnContainerDrc.classList = "btnContainerDrc";
  if (localStorage.getItem("tokenUser")) {
    const btnDerecha3 = crearBoton("Cerrar Sesion");
    const btnDerecha4 = crearBoton("Ajustes");
    btnDerecha3.addEventListener("click", () => {
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("user");
      window.location.reload();
    });
    btnContainerDrc.append(btnDerecha4, btnDerecha3);
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
