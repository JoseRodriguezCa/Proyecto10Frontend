import { changeUser } from "../ChangeUser/ChangeUser";
import { createFormElements } from "../FormElementsUser/FormElementsUser";
import "./ConfigUser.css";

export const ConfigUser = (e, storedUser, token) => {
  e.preventDefault();

  const divMain = document.querySelector(".div-main");

  if (!document.getElementById("config-modal")) {
    const modalconfigUser = document.createElement("div");
    modalconfigUser.id = "config-modal";
    modalconfigUser.classList.add("config-modal");

    const form = createFormElements(e, storedUser, token, modalconfigUser);

    modalconfigUser.append(form);

    divMain.append(modalconfigUser);

    setTimeout(() => {
      modalconfigUser.classList.add("active");
    }, 300);

    window.addEventListener("click", (e) => {
      if (e.target === modalconfigUser) {
        modalconfigUser.classList.remove("active");
        setTimeout(() => {
          modalconfigUser.remove();
        }, 300);
      }
    });
  }
};
