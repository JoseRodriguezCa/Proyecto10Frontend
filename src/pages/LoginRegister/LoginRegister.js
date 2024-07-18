import { Footer } from "../../components/Footer/Footer";
import { HeaderReload } from "../../components/Header/Header";
import { LoginLoader } from "../../components/Loader/Loader";
import { Logo } from "../../components/Logo/Logo";
import { navigateTo } from "../../router/routes";
import { Home } from "../Home/Home";
import "./LoginRegister.css";

export const LoginRegister = (e, viewType) => {
  if (e) {
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
  const inputPasswordWrapper = document.createElement("div");
  const inputPassword = document.createElement("input");
  const eyeIcon = document.createElement("i");
  const buttonInput = document.createElement("button");
  const l = Logo();
  
  inputUserName.classList = "user-input";
  inputPasswordWrapper.classList = "password-input-wrapper";
  inputPassword.classList = "password-input";
  eyeIcon.classList.add("fa", "fa-eye", "eye-icon");
  
  inputPassword.type = "password";
  inputUserName.placeholder = "Nombre de Usuario";
  inputPassword.placeholder = "*****";
  inputUserName.required = true;
  inputPassword.required = true;
  buttonInput.textContent = "Login";
  buttonInput.classList = "button-input";
  
  eyeIcon.addEventListener("click", () => {
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      inputPassword.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  });
  
  inputPasswordWrapper.append(inputPassword, eyeIcon);
  form.append(l, inputUserName, inputPasswordWrapper, buttonInput);
  
  form.addEventListener("submit", (e) =>
    submit(inputUserName, inputPassword, e, form, eyeIcon, buttonInput)
  );
};

const submit = async (
  inputUserName,
  inputPassword,
  e,
  form,
  eyeIcon,
  buttonInput
) => {
  e.preventDefault();
  buttonInput.remove();
  LoginLoader(form);
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
    const loaderLogin = document.querySelector(".loader-login");
    if (loaderLogin) {
      loaderLogin.remove();
    }

    const existingButton = form.querySelector(".button-input");
    if (existingButton) {
      existingButton.remove();
    }

    const newButtonInput = document.createElement("button");
    newButtonInput.classList = "button-input";
    newButtonInput.textContent = "Login";

    const pError = document.createElement("p");
    pError.classList.add("p-error");
    pError.textContent = "Usuario o contraseña incorrectos";

    form.append(pError, newButtonInput);

    inputUserName.value = "";
    inputPassword.value = "";
    inputPassword.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");

    newButtonInput.addEventListener("click", (e) => {
      submit(
        inputUserName,
        inputPassword,
        e,
        form,
        eyeIcon,
        newButtonInput
      );
    });

    return;
  }

  const respuestaFinal = await res.json();

  const { rol, ...userWithoutRole } = respuestaFinal.user;

  localStorage.setItem("tokenUser", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(userWithoutRole));
  navigateTo("/events");
  window.location.reload();
};

const register = (form) => {
  const inputUserName = document.createElement("input");
  const inputPasswordWrapper = document.createElement("div");
  const inputPassword = document.createElement("input");
  const eyeIcon = document.createElement("i");
  const inputEmail = document.createElement("input");
  const fileInput = document.createElement("input");
  const fileButton = document.createElement("button");
  const buttonInput = document.createElement("button");
  const l = Logo();
  
  inputUserName.classList = "user-input";
  inputPasswordWrapper.classList = "password-input-wrapper";
  inputPassword.classList = "password-input";
  eyeIcon.classList.add("fa", "fa-eye", "eye-icon");
  inputEmail.classList = "email-input";
  fileInput.classList = "file-input";
  fileButton.classList = "file-button";
  buttonInput.classList = "button-input";

  inputPassword.type = "password";
  inputEmail.type = "email";
  fileInput.type = "file";

  inputUserName.placeholder = "Nombre de Usuario";
  inputPassword.placeholder = "*****";
  inputEmail.placeholder = "Correo Electrónico";
  fileButton.textContent = "Imagen de Perfil";
  buttonInput.textContent = "Registrarse";

  inputUserName.required = true;
  inputPassword.required = true;
  inputEmail.required = true;
  fileInput.required = true;

  eyeIcon.addEventListener("click", () => {
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      inputPassword.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  });

  fileButton.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
  });

  inputPasswordWrapper.append(inputPassword, eyeIcon);
  form.append(
    l,
    inputUserName,
    inputPasswordWrapper,
    inputEmail,
    fileButton,
    fileInput,
    buttonInput
  );

  form.addEventListener("submit", (e) =>
    submitRegister(
      inputUserName,
      inputPassword,
      inputEmail,
      fileInput,
      e,
      form,
      buttonInput
    )
  );
};


const submitRegister = async (
  inputUserName,
  inputPassword,
  inputEmail,
  fileInput,
  e,
  form,
  buttonInput
) => {
  e.preventDefault();
  buttonInput.remove();
  LoginLoader(form);
  const body = new FormData();
  body.append("userName", inputUserName.value);
  body.append("password", inputPassword.value);
  body.append("email", inputEmail.value);
  body.append("profileimg", fileInput.files[0]);

  const res = await fetch(
    "https://proyecto10-six.vercel.app/api/users/register",
    {
      method: "POST",
      body: body,
    }
  );

  const pError = document.querySelector(".p-error");
  if (pError) {
    pError.remove();
  }

  if (res.status === 400) {
    const errorResponse = await res.json();
    console.log(errorResponse);

    const loaderLogin = document.querySelector(".loader-login");
    if (loaderLogin) {
      loaderLogin.remove();
    }

    const existingButton = form.querySelector(".button-input");
    if (existingButton) {
      existingButton.remove();
    }

    const newButtonInput = document.createElement("button");
    newButtonInput.classList = "button-input";
    newButtonInput.textContent = "Registrarse";

    const pError = document.createElement("p");
    pError.classList.add("p-error");
    pError.textContent =
      errorResponse.message || "Es necesario rellenar todos los campos";

    form.append(pError, newButtonInput);

    inputUserName.value = "";
    inputPassword.value = "";
    inputEmail.value = "";
    fileInput.value = "";

    newButtonInput.addEventListener("click", (e) => {
      submitRegister(
        inputUserName,
        inputPassword,
        inputEmail,
        fileInput,
        e,
        form,
        newButtonInput
      );
    });

    return;
  }

  if (res.ok) {
    const loginRes = await fetch("https://proyecto10-six.vercel.app/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        userName: inputUserName.value,
        password: inputPassword.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (loginRes.ok) {
      const respuestaFinal = await loginRes.json();
      const { rol, ...userWithoutRole } = respuestaFinal.user;

      localStorage.setItem("tokenUser", respuestaFinal.token);
      localStorage.setItem("user", JSON.stringify(userWithoutRole));
      navigateTo("/events");
      window.location.reload();
    } else {
      alert("Registro exitoso, pero fallo al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.");
      Home();
    }
  }
};

