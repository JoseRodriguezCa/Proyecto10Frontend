import { EditEvent } from "../../EditEvent/EditEvent";
import { crearBoton } from "../../components/BtnHeader/BtnHeader";
import { Home } from "../Home/Home";
import "./EventPage.css";

export const EventPage = async (e, eventId, divMain) => {
  const res = await fetch(
    `https://proyecto10-six.vercel.app/api/events/${eventId}`
  );
  const event = await res.json();

  divMain.classList.add("hidden");

  setTimeout(() => {
    divMain.innerHTML = "";
    printOneEvent(event, divMain, eventId);
    divMain.classList.remove("hidden");
  }, 500);
};

const printOneEvent = async (event, divMain, eventId) => {
  const token = localStorage.getItem("tokenUser");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const divOneEvent = document.createElement("div");
  divOneEvent.classList.add("event-details");

  const divSection = document.createElement("div");
  divSection.classList.add("div-section");

  const leftSection = document.createElement("div");
  leftSection.classList.add("left-section");

  const rightSection = document.createElement("div");
  rightSection.classList.add("right-section");

  const divButton = document.createElement("div");
  divButton.classList = "div-button-event";

  const h1Description = document.createElement("h2");
  h1Description.textContent = "Detalles";

  const divContainerCreator = document.createElement("div");
  divContainerCreator.classList.add("div-creator");

  const creatorEvent = document.createElement("div");
  creatorEvent.classList.add("creator-event");

  const creatorImage = document.createElement("img");
  creatorImage.classList.add("creator-image");
  creatorImage.src = event.user.profileimg;

  const creatorName = document.createElement("h2");
  creatorName.classList.add("creator-name");
  creatorName.textContent = event.user.userName;

  const eventImage = document.createElement("img");
  eventImage.classList.add("event-image");
  eventImage.src = event.poster;

  const eventName = document.createElement("h1");
  eventName.classList.add("event-name");
  eventName.textContent = event.title;

  const eventDescription = document.createElement("p");
  eventDescription.classList.add("event-description");
  eventDescription.innerHTML = event.description.replace(/\n/g, "<br>");

  const eventTime = document.createElement("div");
  eventTime.classList.add("event-time");

  const timeLogo = document.createElement("i");
  timeLogo.classList = "fa-regular fa-clock";

  const pTime = document.createElement("p");
  pTime.classList = "p-time";
  pTime.textContent = new Date(event.date).toLocaleString();

  const divLocation = document.createElement("div");
  divLocation.classList = "div-location";

  const eventLocation = document.createElement("a");
  eventLocation.classList.add("event-location");
  eventLocation.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    event.location
  )}`;
  eventLocation.target = "_blank";
  eventLocation.textContent = event.location;

  const locationLogo = document.createElement("i");
  locationLogo.classList = "fa-solid fa-location-dot";

  const mapContainer = document.createElement("div");
  mapContainer.classList.add("map-container");

  const staticMapImage = document.createElement("img");
  staticMapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    event.location
  )}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
    event.location
  )}&key=AIzaSyDdCS6ceR3AlHmM0w-S0z9Rv42VkU7VZmM`;
  staticMapImage.classList.add("static-map-image");
  staticMapImage.alt = `Mapa de ${event.location}`;

  const googleMapsLink = document.createElement("a");
  googleMapsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    event.location
  )}`;
  googleMapsLink.target = "_blank";
  googleMapsLink.appendChild(staticMapImage);

  const attendeesContainer = document.createElement("div");
  attendeesContainer.classList.add("attendees-container");

  const attendeesDiv = document.createElement("div");
  attendeesDiv.classList = "attendees-div";

  const attendeesTitle = document.createElement("h1");
  attendeesTitle.textContent = "Asistiran";

  const userAttending = event.attender.find(
    (attender) => attender.user._id === storedUser._id
  );

  for (const attender of event.attender) {
    const divAttender = document.createElement("div");
    const attendeesName = document.createElement("h2");
    const imgProfile = document.createElement("img");
    imgProfile.classList = "creator-image";
    imgProfile.src = attender.user.profileimg;
    attendeesName.textContent = attender.name;
    divAttender.append(imgProfile, attendeesName);
    attendeesDiv.append(divAttender);
  }

  attendeesContainer.append(attendeesDiv);
  divLocation.append(locationLogo, eventLocation);
  eventTime.append(timeLogo, pTime);
  mapContainer.append(divLocation, googleMapsLink);
  attendeesContainer.prepend(attendeesTitle);
  divContainerCreator.append(eventName, creatorEvent);
  creatorEvent.append(creatorImage, creatorName);
  leftSection.append(
    eventImage,
    h1Description,
    eventDescription,
    attendeesContainer
  );

  rightSection.append(eventTime, mapContainer, divButton);
  divSection.append(leftSection, rightSection);
  divOneEvent.append(divContainerCreator, divSection);

  if (userAttending) {
    const cancelAttendButton = crearBoton("Cancelar Asistencia");
    cancelAttendButton.classList.add("attend-button");
    leftSection.append(cancelAttendButton);

    cancelAttendButton.addEventListener("click", (e) =>
      removeAttender(e, eventId, divMain, token, userAttending)
    );
  } else {
    const attendButton = crearBoton("Asistiré");
    attendButton.classList.add("attend-button");
    leftSection.append(attendButton);

    attendButton.addEventListener("click", (e) =>
      addAttender(e, eventId, divMain, token)
    );
  }

  if (
    (storedUser && storedUser._id === event.user._id) ||
    storedUser.rol === "admin"
  ) {
    const editEvent = crearBoton("Editar");
    const deleteBtn = crearBoton("Eliminar");

    editEvent.addEventListener("click", (e) => {
      const eventData = {
        _id: eventId,
        title: "Título del evento",
        date: "2024-12-01",
        time: "12:00",
        location: "Ubicación del evento",
        description: "Descripción del evento"
      };
      EditEvent(e, eventData);
    });

    deleteBtn.addEventListener("click", (e) => deleteEvent(e, eventId, token));

    divButton.append(editEvent, deleteBtn);
  }

  divMain.append(divOneEvent);
};

const addAttender = async (e, eventId, divMain, token) => {
  e.preventDefault();
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  const containerForm = document.createElement("div");
  containerForm.classList.add("form-container");
  const form = document.createElement("form");
  const formTitle = document.createElement("h1");
  const closeForm = document.createElement("i");
  const labelFirstName = document.createElement("label");
  const inputfirstName = document.createElement("input");
  const labelLastName = document.createElement("label");
  const inputlastName = document.createElement("input");
  const buttonInput = crearBoton("Asistiré");
  inputfirstName.classList = "fisrtName-input";
  inputfirstName.id = "fisrtName-input";
  inputfirstName.setAttribute("required", "");
  inputlastName.classList = "lastName-input";
  inputlastName.id = "lastName-input";
  inputlastName.setAttribute("required", "");
  formTitle.classList = "form-title";
  form.classList = "form-attender";
  labelFirstName.textContent = "Nombre";
  labelLastName.textContent = "Apellido";
  labelFirstName.setAttribute("for", "fisrtName-input");
  labelLastName.setAttribute("for", "lastName-input");
  formTitle.textContent = "Completa tu Asistencia";
  closeForm.classList = "fa-solid fa-circle-xmark";
  closeForm.classList.add("close-form");
  form.append(
    closeForm,
    formTitle,
    labelFirstName,
    inputfirstName,
    labelLastName,
    inputlastName,
    buttonInput
  );
  containerForm.append(form);
  divMain.append(containerForm);
  setTimeout(() => {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    containerForm.classList.add("active");
  }, 500);

  closeForm.addEventListener("click", () => {
    document.body.style.overflow = "";
    document.body.style.backgroundColor = "";
    document.body.style.paddingRight = "";
    containerForm.classList.remove("active");
    setTimeout(() => {
      divMain.removeChild(containerForm);
    }, 500);
  });

  form.addEventListener("submit", (e) =>
    submitAttender(inputfirstName, inputlastName, e, divMain, eventId, token)
  );
};

const submitAttender = async (
  inputfirstName,
  inputlastName,
  e,
  divMain,
  eventId,
  token
) => {
  e.preventDefault();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const completeName = `${inputfirstName.value} ${inputlastName.value}`;
  const objetoFinal = JSON.stringify({
    name: completeName,
    email: storedUser.email,
    event: eventId,
    user: storedUser._id,
  });

  const res = await fetch("https://proyecto10-six.vercel.app/api/attenders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: objetoFinal,
  });

  if (res.ok) {
    document.body.style.overflow = "";
    document.body.style.backgroundColor = "";
    document.body.style.paddingRight = "";
    EventPage(null, eventId, divMain);
  }
};

const removeAttender = async (e, eventId, divMain, token, userAttending) => {
  e.preventDefault();
  const res = await fetch(
    `https://proyecto10-six.vercel.app/api/attenders/${userAttending._id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.ok) {
    console.log("Asistente eliminado");
  }
  EventPage(null, eventId, divMain);
};

const deleteEvent = async (e, eventId, token) => {
  e.preventDefault();
  const res = await fetch(
    `https://proyecto10-six.vercel.app/api/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.ok) {
    console.log("evento eliminado");
  }
  Home();
};
