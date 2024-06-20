import { changeUser } from "../ChangeUser/ChangeUser";
import { deleteUser } from "../DeleteUser/DeleteUser";
import { isAdmin } from "../IsAdmin/IsAdmin";
import "./FormElementsUser.css"

export const createFormElements = (e, storedUser, token,modalconfigUser) => {
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

  const removeUser = document.createElement("button");
  removeUser.type = "button";
  removeUser.textContent = "Eliminar Cuenta";
  removeUser.addEventListener("click", (e) => deleteUser(e, storedUser, token));

  const closeModal = document.createElement("i");
  closeModal.classList = "fa-solid fa-circle-xmark close-modal";
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
    submitButton,
    removeUser
  );

  let roleSelect;
  const isAdminUser = isAdmin();


if (isAdminUser) {
  const roleLabel = document.createElement("label");
  roleLabel.textContent = "Rol";

  roleSelect = document.createElement("select");
  roleSelect.name = "role";

  const adminOption = document.createElement("option");
  adminOption.value = "admin";
  adminOption.textContent = "Admin";

  const userOption = document.createElement("option");
  userOption.value = "user";
  userOption.textContent = "User";

  roleSelect.appendChild(adminOption);
  roleSelect.appendChild(userOption);

  form.insertBefore(roleLabel, emailLabel);
  form.insertBefore(roleSelect, emailLabel);
}

form.addEventListener("submit", (e) =>
  changeUser(
    e,
    userNameInput,
    passwordInput,
    emailInput,
    fileInput,
    form,
    storedUser,
    token,
    roleSelect
  )
);

  return form;
};
