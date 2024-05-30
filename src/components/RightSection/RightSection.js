import { crearBoton } from "../BtnHeader/BtnHeader";
import { DeleteEvent } from "../DeleteEvent/DeleteEvent";
import { EditEvent } from "../EditEvent/EditEvent";
import { MapLocation } from "../MapLocation/MapLocation";
import "./RightSection.css";

export const RightSection = (event, divMain, eventId, token, storedUser) => {
  const rightSection = document.createElement("div");
  rightSection.classList.add("right-section");

  const divButton = document.createElement("div");
  divButton.classList = "div-button-event";

  const eventTime = document.createElement("div");
  eventTime.classList.add("event-time");

  const timeLogo = document.createElement("i");
  timeLogo.classList = "fa-regular fa-clock";

  const pTime = document.createElement("p");
  pTime.classList = "p-time";
  pTime.textContent = new Date(event.date).toLocaleString();

  const mapContainer = MapLocation(event);

  eventTime.append(timeLogo, pTime);
  rightSection.append(eventTime, mapContainer, divButton);

  if (
    (storedUser && storedUser._id === event.user._id) ||
    storedUser.rol === "admin"
  ) {
    const editEvent = crearBoton("Editar");
    const deleteBtn = crearBoton("Eliminar");

    editEvent.addEventListener("click", (e) => {
      const eventData = {
        _id: eventId,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
      };
      EditEvent(e, eventData);
    });

    deleteBtn.addEventListener("click", (e) => DeleteEvent(e, eventId, token));

    divButton.append(editEvent, deleteBtn);
  }

  return rightSection;
};
