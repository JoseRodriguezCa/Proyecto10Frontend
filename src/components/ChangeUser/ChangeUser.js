import { Home } from "../../pages/Home/Home";
import { HeaderReload } from "../Header/Header";


export const changeUser = async (
    e,
    userNameInput,
    passwordInput,
    emailInput,
    fileInput,
    form,
    storedUser,
    token
  ) => {
    e.preventDefault();
  
    const body = new FormData();
  
    body.append("userName", userNameInput.value);
    body.append("password", passwordInput.value);
    body.append("email", emailInput.value);
    body.append("profileimg", fileInput.files[0]);
  
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
      alert("Datos Editados Correctamente");
      HeaderReload();
      Home();
    }
  };