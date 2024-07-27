
import { navigateTo } from "../../router/routes";
import { fetchApi } from "../../utils/fetchApi";
import { isAdmin } from "../../utils/IsAdmin/IsAdmin";


export const changeUser = async (
  e,
  userNameInput,
  passwordInput,
  emailInput,
  fileInput,
  form,
  storedUser,
  token,
  roleSelect,
  user
) => {
  e.preventDefault();

  const isAdminEditing = isAdmin();

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


 const userId = user ? user._id : storedUser._id;
  const res = await fetchApi({endpoint:`users/${userId}`,method:"PUT",token,data:body})

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
    
    const adminPanel = document.querySelector(".admin-panel-container");
    document.body.style.overflow = "auto";
    if(adminPanel) {
      adminPanel.remove()
    }
    navigateTo("/events");
    window.location.reload()
    
  }
};
