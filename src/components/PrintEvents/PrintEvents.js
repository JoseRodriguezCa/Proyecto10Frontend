import { EventPage } from "../../pages/EventPage/EventPage";
import { navigateTo } from "../../router/routes";
import { buscador } from "../Buscador/Buscador";
import "./PrintEvents.css";

export const printEvents = (events, undenifed, divMain) => {
  divMain.style.height = "";
  let divEvents = divMain.querySelector(".div-events");

  if (!divEvents) {
    divEvents = document.createElement("div");
    divEvents.classList.add("div-events");
    divMain.prepend(divEvents);
  }
  divEvents.classList.add("hidden");
  setTimeout(() => {
    divEvents.innerHTML = "";
    for (const event of events) {
      const divEvent = document.createElement("div");
      divEvent.classList.add("div-event");
      divEvent.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(`/event/${event._id}`);
      });

      const title = document.createElement("h1");
      title.classList.add("title");
      title.textContent = event.title;

      const date = document.createElement("h2");
      date.classList.add("date");
      date.textContent = new Date(event.date).toLocaleString();

      const location = document.createElement("h3");
      location.classList.add("location");
      location.textContent = event.location;

      const description = document.createElement("p");
      description.classList.add("description");

      const maxLength = 100;
      let truncatedDescription = event.description;

      if (event.description.length > maxLength) {
        truncatedDescription =
          event.description.substring(0, maxLength) + "...";
      }

      description.textContent = truncatedDescription;

      const posterContainer = document.createElement("div");
      posterContainer.classList.add("poster-container");
      const poster = document.createElement("img");
      poster.classList.add("poster");
      poster.src = event.poster;

      let userName;
      let userImg;
      if (event.user) {
        userName = event.user.userName;
        userImg = event.user.profileimg;
      }

      const creator = document.createElement("div");
      creator.classList.add("creator");
      const creatorImg = document.createElement("img");
      creatorImg.classList.add("creator-img");
      creatorImg.src = userImg;
      const creatorName = document.createElement("h1");
      creatorName.textContent = userName;

      posterContainer.append(poster);
      creator.append(creatorName, creatorImg);

      divEvent.append(
        creator,
        title,
        posterContainer,
        date,
        location,
        description
      );
      const b = buscador();
      divEvents.append(divEvent,b);
    }

    divEvents.classList.remove("hidden");
  }, 300);
};
