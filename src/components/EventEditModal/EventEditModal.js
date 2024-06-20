import "./EventEditModal.css"
import { EditEvent } from "../EditEvent/EditEvent";

export const EventEditModal = async (event, token) => {
  const { onSubmit, localTime } = await EditEvent(event);
  
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
  titleInput.value = "";

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Fecha";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "date";
  dateInput.value = event.date.split("T")[0];

  const timeLabel = document.createElement("label");
  timeLabel.textContent = "Hora";
  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.name = "time";
  timeInput.value = localTime;

  const locationLabel = document.createElement("label");
  locationLabel.textContent = "Ubicación";
  const locationInput = document.createElement("input");
  locationInput.type = "text";
  locationInput.name = "location";
  locationInput.value = event.location;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Descripción";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.name = "description";
  descriptionInput.value = event.description;

  const fileLabel = document.createElement("label");
  fileLabel.textContent = "Subir imagen (archivo)";
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "file";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Editar Evento";

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
  formTitleElement.textContent = "Editar Evento";

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

  document.body.append(modalNewEvent);

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
};
