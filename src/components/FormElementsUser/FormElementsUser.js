import { changeUser } from "../ChangeUser/ChangeUser";
import { deleteUser } from "../DeleteUser/DeleteUser";
import { isAdmin } from "../IsAdmin/IsAdmin";
import "./FormElementsUser.css";

export const createFormElements = (e, storedUser, token, modalconfigUser) => {
  const form = document.createElement("form");
  let roleSelect;
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

  const passwordContainer = document.createElement("div");
  passwordContainer.classList.add("password-container");

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.classList.add("password-input");

  const togglePassword = document.createElement("i");
  togglePassword.classList.add("fa", "fa-eye", "toggle-password");
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
    }
  });

  passwordContainer.appendChild(passwordInput);
  passwordContainer.appendChild(togglePassword);

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email";
  const emailInput = document.createElement("input");
  emailInput.name = "email";
  emailInput.type = "email";

  const fileInputContainer = document.createElement("div");
  fileInputContainer.classList.add("file-input-container");

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "file";
  fileInput.classList.add("file-input");

  const fileButton = document.createElement("button");
  fileButton.type = "button";
  fileButton.classList.add("file-button-config-user");
  fileButton.textContent = "Cambiar Imagen de Perfil"

  fileButton.addEventListener("click", () => fileInput.click());

  fileInputContainer.appendChild(fileButton);
  fileInputContainer.appendChild(fileInput);

  const roleLabel = document.createElement("label");
  roleLabel.textContent = "Rol";

  roleSelect = document.createElement("select");
  roleSelect.name = "role";

  const userOption = document.createElement("option");
  userOption.value = "user";
  userOption.textContent = "User";
  roleSelect.appendChild(userOption);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Editar Datos";

  const removeUser = document.createElement("button");
  removeUser.type = "button";
  removeUser.classList.add("delete-button");
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
    passwordContainer,
    roleLabel,
    roleSelect,
    emailLabel,
    emailInput,
    fileInputContainer,
    submitButton,
    removeUser
  );

  const isAdminUser = isAdmin();
  if (isAdminUser) {
    const adminOption = document.createElement("option");
    adminOption.value = "admin";
    adminOption.textContent = "Admin";
    roleSelect.appendChild(adminOption);
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
