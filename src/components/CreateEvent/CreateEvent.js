import { postEvent } from "../PostEvent/PostEvent";
import "./CreateEvent.css";

export const CreateEvent = (e, options = {}) => {
  if (e) {
    e.preventDefault();
  }
  const divMain = document.querySelector(".div-main");

  const {
    formTitle = "Crear Evento",
    submitButtonText = "Crear Evento",
    onSubmit = (e, form) => postEvent(e, form),
    eventData = {},
  } = options;

  const isEditing = !!eventData._id;

  if (!document.getElementById("event-modal")) {
    const modalNewEvent = document.createElement("div");
    modalNewEvent.id = "event-modal";
    modalNewEvent.classList.add("event-modal");

    const form = document.createElement("form");
    form.classList.add("event-form");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Título";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.value = eventData.title || "";

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Fecha";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "date";
    dateInput.value = eventData.date || "";

    const timeLabel = document.createElement("label");
    timeLabel.textContent = "Hora";
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.name = "time";
    timeInput.value = eventData.time || "";

    const locationLabel = document.createElement("label");
    locationLabel.textContent = "Ubicación";
    const locationInput = document.createElement("input");
    locationInput.type = "text";
    locationInput.name = "location";
    locationInput.value = eventData.location || "";

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Descripción";
    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "description";
    descriptionInput.value = eventData.description || "";

    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Subir imagen (archivo)";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "file";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = submitButtonText;

    const closeModal = document.createElement("i");
    closeModal.classList = 'fa-solid fa-circle-xmark';
    closeModal.classList.add("close-modal");
    closeModal.addEventListener("click", () => {
      modalNewEvent.classList.remove("active");
      setTimeout(() => {
        modalNewEvent.remove();
      }, 300);
    });

    const formTitleElement = document.createElement("h2");
    formTitleElement.textContent = formTitle;

    form.append(
      closeModal,
      formTitleElement,
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

    modalNewEvent.append(form);

    divMain.append(modalNewEvent);

    setTimeout(() => {
      modalNewEvent.classList.add("active");
    }, 300);

    window.addEventListener("click", (event) => {
      if (event.target === modalNewEvent) {
        modalNewEvent.classList.remove("active");
        setTimeout(() => {
          modalNewEvent.remove();
        }, 300);
      }
    });

    form.addEventListener("submit", (e) => onSubmit(e, form));

    if (isEditing) {
      titleInput.value = eventData.title || "";
      dateInput.value = eventData.date || "";
      timeInput.value = eventData.time || "";
      locationInput.value = eventData.location || "";
      descriptionInput.value = eventData.description || "";
    }
  }
};
