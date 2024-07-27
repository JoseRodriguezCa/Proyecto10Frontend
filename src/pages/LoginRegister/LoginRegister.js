import { createInput } from "../../components/createInput/createInput";
import { Footer } from "../../components/Footer/Footer";
import { HeaderReload } from "../../components/Header/Header";
import { LoginLoader } from "../../components/Loader/Loader";
import { Logo } from "../../components/Logo/Logo";
import { navigateTo } from "../../router/routes";
import { fetchApi } from "../../utils/fetchApi";
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
  const inputUserName = createInput({name:"userName",className:"user-input",placeholder:"Nombre de Usuario",required:"required",});
  const inputPasswordWrapper = document.createElement("div");
  const inputPassword = createInput({name:"password",className:"password-input",placeholder:"******",required:"required", type:"password"});
  const eyeIcon = document.createElement("i");
  const buttonInput = document.createElement("button");
  const l = Logo();
  
  inputPasswordWrapper.classList = "password-input-wrapper";
  eyeIcon.classList.add("fa", "fa-eye", "eye-icon");
  
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

  const objetoFinal = {
    userName,
    password,
  };

  try {
    const res = await fetchApi({
      endpoint: 'users/login',
      method: 'POST',
      data: objetoFinal
    });

    const pError = document.querySelector(".p-error");
    if (pError) {
      pError.remove();
    }

    if (!res.ok) {
      if (res.status === 400) {
        const errorData = await res.json();
        const errorMessage = errorData.message || 'Usuario o contraseña incorrectos';

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
        pError.textContent = errorMessage;

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
    }

    const respuestaFinal = await res.json();

    const { rol, ...userWithoutRole } = respuestaFinal.user;

    localStorage.setItem("tokenUser", respuestaFinal.token);
    localStorage.setItem("user", JSON.stringify(userWithoutRole));
    navigateTo("/events");
    window.location.reload();
  } catch (error) {
    console.error('Submit Error:', error);
    alert('Se produjo un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
  }
};


const register = (form) => {
  const inputUserName = createInput({name:"userName",className:"user-input",placeholder:"Nombre de Usuario",required:"required",});
  const inputPasswordWrapper = document.createElement("div");
  const inputPassword = createInput({name:"password",className:"password-input",placeholder:"******",required:"required", type:"password"});
  const eyeIcon = document.createElement("i");
  const inputEmail = createInput({name:"email",className:"email-input",placeholder:"Correo Electrónico",required:"required", type:"email"});
  const fileInput = createInput({name:"profileimg",className:"file-input",required:"required", type:"file"});
  const fileButton = document.createElement("button");
  const buttonInput = document.createElement("button");
  const l = Logo();
  
  inputPasswordWrapper.classList = "password-input-wrapper";
  eyeIcon.classList.add("fa", "fa-eye", "eye-icon");
  fileButton.classList = "file-button";
  buttonInput.classList = "button-input";


  fileButton.textContent = "Imagen de Perfil";
  buttonInput.textContent = "Registrarse";


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

  const res = await fetchApi({
    endpoint: 'users/register',
    method: 'POST',
    data: body
  });

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

  const userName = inputUserName.value;
  const password = inputPassword.value;

  const objetoFinal = {
    userName,
    password,
  };

  if (res.ok) {
    const loginRes = await fetchApi({
      endpoint: 'users/login',
      method: 'POST',
      data: objetoFinal
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

