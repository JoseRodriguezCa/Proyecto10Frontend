import { AddAttender } from "../AddAttender/AddAttender";
import { AttenderContainer } from "../AttenderContainer/AttenderContainer";
import { crearBoton } from "../BtnHeader/BtnHeader";
import { RemoveAttender } from "../RemoveAttender/RemoveAttender";
import "./LeftSection.css";

export const LeftSection = (event, divMain, eventId,token,storedUser) => {
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
  const attendeesContainer = AttenderContainer(event, divMain, eventId,token,storedUser);
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
    const cancelAttendButton = crearBoton("Cancelar Asistencia");
    cancelAttendButton.classList.add("attend-button");
    leftSection.append(cancelAttendButton);

    cancelAttendButton.addEventListener("click", (e) =>
      RemoveAttender(e, eventId, divMain, token, userAttending)
    );
  } else {
    const attendButton = crearBoton("Asistiré");
    attendButton.classList.add("attend-button");
    leftSection.append(attendButton);

    attendButton.addEventListener("click", (e) =>
      AddAttender(e, eventId, divMain, token)
    );
  }

  return leftSection
};
