import { Home } from "../../pages/Home/Home";
import { EventEditModal } from "../EventEditModal/EventEditModal";
import { DeleteEvent } from "../DeleteEvent/DeleteEvent";
import { isAdmin } from "../IsAdmin/IsAdmin";
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
  pTime.classList.add("p-time");
  pTime.textContent = new Date(event.date).toLocaleString();

  const mapContainer = MapLocation(event);

  eventTime.append(timeLogo, pTime);
  rightSection.append(eventTime, mapContainer, divButton);

  if ((storedUser && storedUser._id === event.user._id) || isAdmin()) {
    const editEventBtn = document.createElement("button");
    editEventBtn.textContent = "Editar";
    editEventBtn.classList = "btnHeader";
    editEventBtn.addEventListener("click", async () => {
      await EventEditModal(event, token);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList = "btnHeader";
    deleteBtn.addEventListener("click", (e) => DeleteEvent(e, eventId, token));

    divButton.append(editEventBtn, deleteBtn);
  }

  return rightSection;
};
