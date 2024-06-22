import "./BuscadorMobile.css";

export const BuscadorMobile = () => {
  const divInput = document.createElement("div");
  const PruebaBuscador = document.createElement("input");
  PruebaBuscador.type = "text";
  PruebaBuscador.classList = "buscador";
  divInput.classList = "div-input-buscador"
  divInput.append(PruebaBuscador)
  return divInput
}
