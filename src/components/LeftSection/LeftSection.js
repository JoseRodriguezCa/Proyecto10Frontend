import "./LeftSection.css"
import { AddAttender } from "../AddAttender/AddAttender";
import { RemoveAttender } from "../RemoveAttender/RemoveAttender";
import { crearBoton } from "../BtnHeader/BtnHeader";
import { AttenderContainer } from "../AttenderContainer/AttenderContainer";

export const LeftSection = (event, divMain, eventId, token, storedUser) => {
  const leftSection = document.createElement("div");
  leftSection.classList.add("left-section");
  const eventImage = document.createElement("img");
  eventImage.classList.add("event-image");
  eventImage.src = event.poster;
  const h1Description = document.createElement("h2");
  h1Description.textContent = "Detalles";
  const eventDescription = document.createElement("p");
  eventDescription.classList.add("event-description");
  eventDescription.innerHTML = event.description.replace(/\n/g, "<br>");
  const attendeesContainer = AttenderContainer(event, divMain, eventId, token, storedUser);
  const userAttending = event.attender.find(
    (attender) => attender.user._id === storedUser._id
  );

  leftSection.append(
    eventImage,
    h1Description,
    eventDescription,
    attendeesContainer
  );

  if (userAttending) {
    const cancelAttendButton = document.createElement("button");
    cancelAttendButton.classList = "btnHeader"
    cancelAttendButton.classList.add("attend-button");
    cancelAttendButton.textContent = "Cancelar Asistencia"
    leftSection.append(cancelAttendButton);

    cancelAttendButton.addEventListener("click", (e) =>
      RemoveAttender(e, eventId, divMain, token, userAttending)
    );
  } else {
    if(storedUser) {
      const attendButton = crearBoton("Asistiré", `/event/${eventId}/add-attender`);
      attendButton.classList.add("attend-button");
      leftSection.append(attendButton);
    }

  }

  return leftSection;
};
