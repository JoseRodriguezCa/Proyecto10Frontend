import { ConfigUser } from "../ConfigUser/ConfigUser";
import { CreateButton } from "../CreateButton/CreateButton";
import { deleteUser } from "../../utils/DeleteUser/DeleteUser";
import { EventEditModal } from "../EventEditModal/EventEditModal";
import "./DisplayUsersAndEvents.css";

export const displayUsersAndEvents = (users, events, usersContainer, token) => {
  usersContainer.innerHTML = '';
  const eventsItems = events.items;
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-div");

    const userImgProfile = document.createElement("img");
    userImgProfile.src = user.profileimg;
    userImgProfile.classList.add("creator-image");
    userDiv.appendChild(userImgProfile);

    const userNameP = document.createElement("p");
    userNameP.textContent = `Nombre: ${user.userName}`;
    userDiv.appendChild(userNameP);

    const userEmailP = document.createElement("p");
    userEmailP.textContent = `Email: ${user.email}`;
    userDiv.appendChild(userEmailP);

    const userRoleP = document.createElement("p");
    userRoleP.textContent = `Rol: ${user.rol}`;
    userDiv.appendChild(userRoleP);

    const divUserBtn = document.createElement("div");
    divUserBtn.classList.add("div-user-btn");

    const editUserButton = CreateButton("edit-user-btn", "Editar Usuario", (e) => {
      ConfigUser(e, user, token);
    });

    const deleteUserButton = CreateButton("edit-user-btn", "Eliminar Usuario", (e) => {
      deleteUser(e, user, token);
    });

    divUserBtn.append(editUserButton, deleteUserButton);
    userDiv.append(divUserBtn);


    const userEvents = eventsItems.filter((event) => event.user._id === user._id);
    userEvents.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event-div");

      const eventTitleP = document.createElement("p");
      eventTitleP.textContent = `Título: ${event.title}`;
      eventDiv.appendChild(eventTitleP);

      const eventDateP = document.createElement("p");
      eventDateP.textContent = `Fecha: ${new Date(event.date).toLocaleString()}`;
      eventDiv.appendChild(eventDateP);

      const eventLocationP = document.createElement("p");
      eventLocationP.textContent = `Ubicación: ${event.location}`;
      eventDiv.appendChild(eventLocationP);

      const editEventButton = CreateButton("edit-event-btn", "Editar Evento", async () => {
        await EventEditModal(event, token);
      });

      eventDiv.appendChild(editEventButton);

      userDiv.appendChild(eventDiv);
    });

    usersContainer.appendChild(userDiv);
  });
};
