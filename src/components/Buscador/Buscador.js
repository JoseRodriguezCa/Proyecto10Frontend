import { printEvents } from "../../pages/Home/Home";
import { crearBoton } from "../BtnHeader/BtnHeader";
import "./Buscador.css";

export const buscador = () => {
  const divBuscador = document.createElement("div");
  const buscador = document.createElement("input");
  const iBuscador = document.createElement("i");
  const btnBuscar = crearBoton("Buscar");
  btnBuscar.removeAttribute("href");
  btnBuscar.classList = "btnBuscar";
  iBuscador.classList = "fa-solid fa-magnifying-glass";
  buscador.type = "text";
  buscador.placeholder = "Buscar Eventos";
  buscador.classList = "buscador";
  divBuscador.classList = "divBuscador";
  divBuscador.append(iBuscador, buscador, btnBuscar);
  return divBuscador;
};

export const buscar = (divMain) => {
  const buscador = document.querySelector(".buscador");
  const btnBuscar = document.querySelector(".btnBuscar");
  let valorBusqueda = "";
  

  const realizarBusqueda = async () => {
    valorBusqueda = buscador.value;
    divMain.innerHTML = "";
    console.log("Búsqueda realizada:", valorBusqueda);
    const event = await fetch(
      `https://proyecto10-six.vercel.app/api/events/title/${valorBusqueda}`
    );
    const events = await event.json();

    if(event.status === 404) {
      divMain.innerHTML = `
      <h1>No se encontro ningun evento con ese titulo</h1>`
    }


    printEvents(events, divMain);
  };

  buscador.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      realizarBusqueda();
    }
  });

  btnBuscar.addEventListener("touchend", () => {
    realizarBusqueda();
  });

  btnBuscar.addEventListener("click", () => {
    realizarBusqueda();
  });


};
