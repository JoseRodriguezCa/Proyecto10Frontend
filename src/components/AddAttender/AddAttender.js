import { navigateTo } from "../../router/routes";
import { fetchApi } from "../../utils/fetchApi";
import { createInput } from "../createInput/createInput";
import "./AddAttender.css";
export const AddAttender = async (e, eventId) => {
  if (e) {
    e.preventDefault();
  }
  const token = localStorage.getItem("tokenUser");
  const divMain = document.querySelector(".div-main");
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  const containerForm = document.createElement("div");
  containerForm.classList.add("form-container");
  const form = document.createElement("form");
  const formTitle = document.createElement("h1");
  const closeForm = document.createElement("i");
  const labelFirstName = document.createElement("label");
  const inputfirstName = createInput({name:"firstName",className:"firstName-input"});
  const labelLastName = document.createElement("label");
  const inputlastName = createInput({name:"LastName",className:"lastName-input"});
  const buttonInput = document.createElement("button");
  buttonInput.textContent = "Asistiré";
  buttonInput.classList.add("btnHeader");
  inputfirstName.id = "firstName-input";
  inputfirstName.setAttribute("required", "");
  inputlastName.id = "lastName-input";
  inputlastName.setAttribute("required", "");
  formTitle.classList = "form-title";
  form.classList = "form-attender";
  labelFirstName.textContent = "Nombre";
  labelLastName.textContent = "Apellido";
  labelFirstName.setAttribute("for", "fisrtName-input");
  labelLastName.setAttribute("for", "lastName-input");
  formTitle.textContent = "Completa tu Asistencia";
  closeForm.classList = "fa-solid fa-circle-xmark";
  closeForm.classList.add("close-form");
  form.append(
    closeForm,
    formTitle,
    labelFirstName,
    inputfirstName,
    labelLastName,
    inputlastName,
    buttonInput
  );
  containerForm.append(form);
  divMain.append(containerForm);
  setTimeout(() => {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    containerForm.classList.add("active");
  }, 500);

  closeForm.addEventListener("click", () => {
    document.body.style.overflow = "";
    document.body.style.backgroundColor = "";
    document.body.style.paddingRight = "";
    containerForm.classList.remove("active");
    setTimeout(() => {
      divMain.removeChild(containerForm);
    }, 500);
  });

  form.addEventListener("submit", (e) =>
    submitAttender(inputfirstName, inputlastName, e, divMain, eventId, token)
  );
};

const submitAttender = async (
  inputfirstName,
  inputlastName,
  e,
  divMain,
  eventId,
  token
) => {
  e.preventDefault();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const completeName = `${inputfirstName.value} ${inputlastName.value}`;
  const objetoFinal ={
    name: completeName,
    email: storedUser.email,
    event: eventId,
    user: storedUser._id,
  };

  const res = await fetchApi({endpoint:`attenders`,method:"POST",token,data:objetoFinal});

  if (res.ok) {
    document.body.style.overflow = "";
    document.body.style.backgroundColor = "";
    document.body.style.paddingRight = "";
    navigateTo(`/event/${eventId}`);
  }
};
