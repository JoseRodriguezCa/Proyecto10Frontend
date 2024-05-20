import { HeaderReload } from "../../components/Header/Header";
import { Logo } from "../../components/Logo/Logo";
import { Home } from "../Home/Home";
import "./LoginRegister.css";

export const LoginRegister = (e, viewType) => {
  e.preventDefault();
  const divMain = document.querySelector(".div-main");
  const loginDiv = document.createElement("div");
  divMain.classList.add("hidden");

  setTimeout(() => {
    divMain.innerHTML = "";
    if (viewType === "login") {
      login(loginDiv);
      loginDiv.id = "login";
    } else if (viewType === "register") {
      register(loginDiv);
      loginDiv.id = "register";
    }
    divMain.append(loginDiv);
    divMain.classList.remove("hidden");
  }, 500);
};

const login = (loginDiv) => {
  const form = document.createElement("form");
  const inputUserName = document.createElement("input");
  const inputPassword = document.createElement("input");
  const buttonInput = document.createElement("button");
  const checkboxDiv = document.createElement("div");
  const checkboxLabel = document.createElement("label");
  const checkboxInput = document.createElement("input");
  const l = Logo();
  form.classList = "login-form";
  inputUserName.classList = "user-input";
  inputPassword.classList = "password-input";
  buttonInput.classList = "button-input";
  inputPassword.type = "password";
  inputUserName.placeholder = "Nombre de Usuario";
  inputPassword.placeholder = "*****";
  buttonInput.textContent = "Login";
  checkboxDiv.classList.add("checkbox-div");
  checkboxLabel.classList.add("checkbox-label");
  checkboxInput.classList.add("checkbox-input");
  checkboxLabel.textContent = "Mostrar Contraseña";
  checkboxInput.type = "checkbox";
  checkboxInput.addEventListener("change", () => {
    if (checkboxInput.checked === false) {
      inputPassword.type = "password";
    } else {
      inputPassword.type = "text";
    }
  });
  checkboxLabel.prepend(checkboxInput);
  checkboxDiv.appendChild(checkboxLabel);
  form.append(l, inputUserName, inputPassword, checkboxDiv, buttonInput);
  loginDiv.append(form);

  form.addEventListener("submit", (e) =>
    submit(inputUserName, inputPassword, e, form, checkboxInput)
  );
};

const submit = async (inputUserName, inputPassword, e, form, checkboxInput) => {
  e.preventDefault();

  const userName = inputUserName.value;
  const password = inputPassword.value;

  const objetoFinal = JSON.stringify({
    userName,
    password,
  });
  const res = await fetch("https://proyecto10-six.vercel.app/api/users/login", {
    method: "POST",
    body: objetoFinal,
    headers: {
      "content-type": "application/json",
    },
  });

  const pError = document.querySelector(".p-error");
  if (pError) {
    pError.remove();
  }

  if (res.status === 400) {
    const pError = document.createElement("p");
    pError.classList.add("p-error");
    pError.textContent = "Usuario o contraseña incorrectos";
    form.appendChild(pError);

    inputUserName.value = "";
    inputPassword.value = "";
    inputPassword.type = "password";
    checkboxInput.checked = false;

    return;
  }

  const respuestaFinal = await res.json();
  localStorage.setItem("tokenUser", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
  Home();
  HeaderReload();
};
