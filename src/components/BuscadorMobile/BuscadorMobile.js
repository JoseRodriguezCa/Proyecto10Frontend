import "./BuscadorMobile.css";

export const BuscadorMobile = () => {
  const divMain = document.querySelector('.div-main');
  const divInput = document.createElement("div");
  const PruebaBuscador = document.createElement("input");
  PruebaBuscador.type = "text";
  PruebaBuscador.classList = "prueba-input";
  divInput.append(PruebaBuscador)
  divMain.append(divInput);
}
