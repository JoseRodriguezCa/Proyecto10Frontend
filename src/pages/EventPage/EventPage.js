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
  const divOneEvent = document.createElement("div");
  divOneEvent.classList.add("event-details");

  const divSection = document.createElement("div");
  divSection.classList.add("div-section");

  const leftSection = document.createElement("div");
  leftSection.classList.add("left-section");

  const rightSection = document.createElement("div");
  rightSection.classList.add("right-section");

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
  eventDescription.textContent = event.description;

  const eventTime = document.createElement("div");
  eventTime.classList.add("event-time");

  const timeLogo = document.createElement("i");
  timeLogo.classList = "fa-regular fa-clock";

  const pTime = document.createElement("p");
  pTime.classList = "p-time";
  pTime.textContent = `${new Date(event.date).toLocaleString()}`;

  const eventLocation = document.createElement("div");
  eventLocation.classList.add("event-location");
  eventLocation.textContent = event.location;

  const locationLogo = document.createElement("i")
  locationLogo.classList = "fa-solid fa-location-dot"

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

  const attendeesTitle = document.createElement("h1");
  attendeesTitle.textContent = "Asistentes";

  const attendButton = document.createElement("button");
  attendButton.textContent = "Asistiré";
  attendButton.classList.add("attend-button");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  let attenderName;
  for (const attender of event.attender) {
    const attendeesCount = document.createElement("h2");
    attendeesCount.textContent = attender.name;
    attenderName = attender.name;

    attendeesContainer.append(attendeesCount);
  }

  attendButton.addEventListener("click", (e) =>
    addAttender(e, eventId, divMain)
  );

  eventTime.append(timeLogo,pTime)
  mapContainer.append(googleMapsLink);
  attendeesContainer.prepend(attendeesTitle);
  divContainerCreator.append(eventName, creatorEvent);
  creatorEvent.append(creatorImage, creatorName);
  leftSection.append(
    eventImage,
    eventDescription,
    attendeesContainer,
    attendButton
  );
  rightSection.append(eventTime, eventLocation, mapContainer);
  divSection.append(leftSection, rightSection);
  divOneEvent.append(divContainerCreator, divSection);

  if (!storedUser || storedUser.userName === attenderName) {
    attendButton.remove();
  }

  divMain.append(divOneEvent);
};

const addAttender = async (e, eventId, divMain) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const objetoFinal = JSON.stringify({
    name: storedUser.userName,
    email: storedUser.email,
    event: eventId,
    user: storedUser._id,
  });

  const token = localStorage.getItem("tokenUser");

  const res = await fetch("https://proyecto10-six.vercel.app/api/attenders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: objetoFinal,
  });

  if (res.ok) {
    EventPage(null, eventId, divMain);
  }
};
