import { Home } from "../../pages/Home/Home";
import { HeaderReload } from "../Header/Header";
import { isAdmin } from "../IsAdmin/IsAdmin";
import { viewAdminPanel } from "../viewAdminPanel/viewAdminPanel";


export const changeUser = async (
  e,
  userNameInput,
  passwordInput,
  emailInput,
  fileInput,
  form,
  storedUser,
  token,
  roleSelect
) => {
  e.preventDefault();

  const body = new FormData();
  body.append("userName", userNameInput.value);
  body.append("password", passwordInput.value);
  body.append("email", emailInput.value);
  body.append("profileimg", fileInput.files[0]);
  if (roleSelect && roleSelect.value) {
    body.append("rol", roleSelect.value);
  } else {
    console.log("No se seleccionó un rol");
  }
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
    const { rol, ...userWithoutRole } = response;
    if(!isAdmin()) {
      localStorage.setItem("user", JSON.stringify(userWithoutRole));
    }
    alert("Datos Editados Correctamente");
    HeaderReload();
    Home();
    const adminPanel = document.querySelector(".admin-panel-container");
    document.body.style.overflow = "auto";
    adminPanel.remove()

  }
};
