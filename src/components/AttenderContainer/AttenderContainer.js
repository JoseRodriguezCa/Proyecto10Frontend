import { DeleteAttenderFromEvent } from "../DeleteAttenderFromEvent/DeleteAttenderFromEvent";
import "./AttenderContainer.css"

export const AttenderContainer = (event, divMain, eventId,token,storedUser) => {

    const attendeesContainer = document.createElement("div");
    attendeesContainer.classList.add("attendees-container");
  
    const attendeesDiv = document.createElement("div");
    attendeesDiv.classList = "attendees-div";
  
    const attendeesTitle = document.createElement("h1");
    attendeesTitle.textContent = "Asistiran";
  

  
    for (const attender of event.attender) {
      const divAttender = document.createElement("div");
      const attendeesName = document.createElement("h2");
      const imgProfile = document.createElement("img");
      if(storedUser) {
        if (storedUser.rol === "admin" || event.user._id === storedUser._id) {
          const removeAttender = document.createElement("i");
          removeAttender.classList = "fa-solid fa-circle-xmark";
          removeAttender.classList.add("delete-attender");
          removeAttender.addEventListener("click", (e) => DeleteAttenderFromEvent(e,eventId,attender,token,divMain));
          divAttender.prepend(removeAttender);
        }

      }
  
      imgProfile.classList = "creator-image";
      imgProfile.src = attender.user.profileimg;
      attendeesName.textContent = attender.name;
      divAttender.append(imgProfile, attendeesName);
      attendeesDiv.append(divAttender);
    }
    attendeesContainer.prepend(attendeesTitle);
    attendeesContainer.append(attendeesDiv);

    return attendeesContainer

}