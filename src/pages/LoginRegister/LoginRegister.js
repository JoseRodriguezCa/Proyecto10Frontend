import { Footer } from "../../components/Footer/Footer";
import { HeaderReload } from "../../components/Header/Header";
import { Logo } from "../../components/Logo/Logo";
import { navigateTo } from "../../router/routes";
import { Home } from "../Home/Home";
import "./LoginRegister.css";

export const LoginRegister = (e, viewType) => {
  if(e) {
    e.preventDefault();
  }
  const divMain = document.querySelector(".div-main");

  const loginDiv = document.createElement("div");
  const form = document.createElement("form");
  divMain.classList.add("hidden");
  loginDiv.id = "login";

  setTimeout(() => {
    divMain.innerHTML = "";
    if (viewType === "login") {
      login(form);
      form.classList = "login-form";
    } else if (viewType === "register") {
      register(form);
      form.classList = "register-form";
    }
    loginDiv.append(form);
    divMain.append(loginDiv);
    divMain.style.height = "";
    divMain.classList.remove("hidden");
  }, 500);
};

const login = (form) => {
  
  const inputUserName = document.createElement("input");
  const inputPassword = document.createElement("input");
  const buttonInput = document.createElement("button");
  const checkboxDiv = document.createElement("div");
  const checkboxLabel = document.createElement("label");
  const checkboxInput = document.createElement("input");
  const l = Logo();
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

  const { rol, ...userWithoutRole } = respuestaFinal.user;

  localStorage.setItem("tokenUser", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(userWithoutRole));
  navigateTo("/events");
  window.location.reload()
};

const register = (form) => {
  const inputUserName = document.createElement("input");
  const inputPassword = document.createElement("input");
  const inputEmail = document.createElement("input");
  const fileLabel = document.createElement("label");
  fileLabel.textContent = "Imagen de Perfil (archivo)";
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "file";
  fileInput.classList = "file-input"
  const buttonInput = document.createElement("button");
  const checkboxDiv = document.createElement("div");
  const checkboxLabel = document.createElement("label");
  const checkboxInput = document.createElement("input");
  const l = Logo();
  inputUserName.classList = "user-input";
  inputUserName.setAttribute("maxlength", "20");
  inputPassword.classList = "password-input";
  buttonInput.classList = "button-input";
  inputPassword.type = "password";
  inputUserName.placeholder = "Nombre de Usuario";
  inputPassword.placeholder = "*****";
  inputEmail.placeholder = "Correo Electronico"
  buttonInput.textContent = "Registrarse";
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
  form.append(l, inputUserName, inputPassword, checkboxDiv,inputEmail,fileLabel,fileInput, buttonInput);

  form.addEventListener("submit", (e) =>
    submitRegister(inputUserName, inputPassword,inputEmail,fileInput, e, form)
  );
}

const submitRegister = async (inputUserName, inputPassword,inputEmail,fileInput, e, form) => {
  e.preventDefault();

  const body = new FormData();
  body.append("userName", inputUserName.value);
  body.append("password", inputPassword.value);
  body.append("email", inputEmail.value);
  body.append("profileimg", fileInput.files[0]);

  const res = await fetch("https://proyecto10-six.vercel.app/api/users/register", {
    method: "POST",
    body: body,
  });

  const pError = document.querySelector(".p-error");
  if (pError) {
    pError.remove();
  }

  if (res.status === 400) {
    const errorResponse = await res.json();
    alert(errorResponse.message || "Es necesario rellenar todos los campos")
    console.log(errorResponse);
    return;
  }



  if(res.ok) {
    alert("Te has registrado con exito");
    Home()
  }

};