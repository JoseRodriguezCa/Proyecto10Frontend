import { Home } from "../../pages/Home/Home";
import { fetchApi } from "../../utils/fetchApi";
import { viewAdminPanel } from "../viewAdminPanel/viewAdminPanel";



export const postEvent = async (e, form) => {
    e.preventDefault();
  
    const [
      titleInput,
      dateInput,
      timeInput,
      locationInput,
      descriptionInput,
      fileInput,
    ] = e.target;
  
    const pError = document.querySelector(".p-error");
    if (pError) {
      pError.remove();
    }
  
    if (!titleInput.value || !dateInput.value || !timeInput.value || !locationInput.value || !descriptionInput.value || !fileInput.files[0]) {
      const pError = document.createElement("p");
      pError.classList = "p-error";
      pError.textContent = "Es necesario rellenar todos los campos";
      form.append(pError);
      return;
    }
  
    const dateValue = dateInput.value;
    const timeValue = timeInput.value;
    const combinedDateTime = new Date(`${dateValue}T${timeValue}`);
    console.log(combinedDateTime);
  
    const body = new FormData();
    body.append("title", titleInput.value);
    body.append("date", combinedDateTime);
    body.append("location", locationInput.value);
    body.append("description", descriptionInput.value);
    body.append("poster", fileInput.files[0]);
    body.append("user", localStorage.getItem("user"));
  
    const token = localStorage.getItem("tokenUser");
  
    const res = await fetchApi({endpoint:"events",method:"POST",token,data:body});
  
    if (res.status === 400) {
      const errorResponse = await res.json();
      const pError = document.createElement("p");
      pError.classList = "p-error";
      pError.textContent = errorResponse.message || "Es necesario rellenar todos los campos";
      form.append(pError);
      return;
    }
  
    const response = await res.json();
    Home()
  };
  