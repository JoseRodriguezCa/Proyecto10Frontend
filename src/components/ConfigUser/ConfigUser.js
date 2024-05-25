import { Home } from "../../pages/Home/Home";
import { HeaderReload } from "../Header/Header";
import "./ConfigUser.css";

export const ConfigUser = (e) => {
  e.preventDefault();

  const divMain = document.querySelector(".div-main");

  if (!document.getElementById("config-modal")) {
    const modalconfigUser = document.createElement("div");
    modalconfigUser.id = "config-modal";
    modalconfigUser.classList.add("config-modal");

    const form = document.createElement("form");
    form.classList.add("config-form");

    const h1ChangeUser = document.createElement("h1");
    h1ChangeUser.textContent = "Editar Perfil";

    const userNameLabel = document.createElement("label");
    userNameLabel.textContent = "Nombre de Usuario";
    const userNameInput = document.createElement("input");
    userNameInput.type = "text";
    userNameInput.name = "userName";

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Contraseña";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email";
    const emailInput = document.createElement("input");
    emailInput.name = "email";
    emailInput.type = "email";

    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Cambiar Imagen Perfil (archivo)";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "file";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Editar Datos";

    const closeModal = document.createElement("i");
    closeModal.classList = "fa-solid fa-circle-xmark";
    closeModal.classList.add("close-modal");
    closeModal.addEventListener("click", () => {
      modalconfigUser.classList.remove("active");
      setTimeout(() => {
        modalconfigUser.remove();
      }, 300);
    });

    form.append(
      closeModal,
      h1ChangeUser,
      userNameLabel,
      userNameInput,
      passwordLabel,
      passwordInput,
      emailLabel,
      emailInput,
      fileLabel,
      fileInput,
      submitButton
    );

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

    form.addEventListener("submit", (e) =>
      changeUser(e, userNameInput, passwordInput, emailInput, fileInput, form)
    );
  }
};

const changeUser = async (
  e,
  userNameInput,
  passwordInput,
  emailInput,
  fileInput,
  form
) => {
  e.preventDefault();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const body = new FormData();

  body.append("userName", userNameInput.value);
  body.append("password", passwordInput.value);
  body.append("email", emailInput.value);
  body.append("profileimg", fileInput.files[0]);

  const token = localStorage.getItem("tokenUser");

  const res = await fetch(
    `https://proyecto10-six.vercel.app/api/users/${storedUser._id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }
  );

  if (!document.querySelector(".p-error")) {
    if (res.status === 400) {
      const errorResponse = await res.json();
      const pError = document.createElement("p");
      pError.classList = "p-error";
      pError.textContent = errorResponse.message;
      form.append(pError);
      return;
    }
  }
  if (res.ok) {
    const response = await res.json();
    localStorage.setItem("user", JSON.stringify(response));
    HeaderReload();
    Home();
  }
};
