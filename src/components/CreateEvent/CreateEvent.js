import { Home } from "../../pages/Home/Home";
import "./CreateEvent.css";

export const CreateEvent = (e) => {
  e.preventDefault();
  const divMain = document.querySelector(".div-main");

  // Verificar si el div con la clase "event-modal" ya existe
  if (!document.getElementById("event-modal")) {
    const modalNewEvent = document.createElement("div");
    modalNewEvent.id = "event-modal";
    modalNewEvent.classList.add("event-modal");

    // Crear el formulario dentro del modal
    const form = document.createElement("form");
    form.classList.add("event-form");

    // Crear los campos del formulario
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Título";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Fecha";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "date";

    const timeLabel = document.createElement("label");
    timeLabel.textContent = "Hora";
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.name = "time";

    const locationLabel = document.createElement("label");
    locationLabel.textContent = "Ubicación";
    const locationInput = document.createElement("input");
    locationInput.type = "text";
    locationInput.name = "location";

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Descripción";
    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "description";

    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Subir imagen (archivo)";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "file";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Crear Evento";

    const closeModal = document.createElement("i");
    closeModal.classList = 'fa-solid fa-circle-xmark';
    closeModal.classList.add("close-modal");
    closeModal.addEventListener("click", () => {
      modalNewEvent.remove();
    })
    

    // Agregar los campos al formulario
    form.append(
      closeModal,
      titleLabel,
      titleInput,
      dateLabel,
      dateInput,
      timeLabel,
      timeInput,
      locationLabel,
      locationInput,
      descriptionLabel,
      descriptionInput,
      fileLabel,
      fileInput,
      submitButton
    );

    // Agregar el formulario al modal
    modalNewEvent.append(form);

    // Agregar el modal al divMain
    divMain.append(modalNewEvent);

    // Agregar un listener para cerrar el modal cuando se hace clic fuera de él
    window.addEventListener("click", (event) => {
      if (event.target === modalNewEvent) {
        modalNewEvent.remove();
      }
    });

    // Manejar la subida del formulario
    form.addEventListener("submit", (e) => postEvent(e,form));
  }
};

const postEvent = async (e, form) => {
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

  const body = new FormData();
  body.append("title", titleInput.value);
  body.append("date", combinedDateTime);
  body.append("location", locationInput.value);
  body.append("description", descriptionInput.value);
  body.append("poster", fileInput.files[0]);
  body.append("user", localStorage.getItem("user"));

  const token = localStorage.getItem("tokenUser");

  const res = await fetch("https://proyecto10-six.vercel.app/api/events", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: body,
  });

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
