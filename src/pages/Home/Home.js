import { EventPage } from "../EventPage/EventPage";
import "./Home.css";

export const Home = async (e) => {
  if (e) {
    e.preventDefault();
  }
  const divMain = document.querySelector(".div-main");
  const page = 1;
  const res = await fetch(`https://proyecto10-six.vercel.app/api/events?page=${page}`);
  const events = await res.json();
  divMain.classList.add("hidden");

  setTimeout(() => {
    divMain.innerHTML = "";
    printEvents(events.events, divMain);
    divMain.classList.remove("hidden");
  }, 500);
};

export const printEvents = (events, divMain) => {
  divMain.style.height = "";
  const divEvents = document.createElement("div");
  divEvents.classList = "div-events";
  for (const event of events) {
    console.log(event);
    const divEvent = document.createElement("div");
    divEvent.classList = "div-event";
    divEvent.addEventListener("click", (e) => EventPage(e, event._id, divMain));
    const title = document.createElement("h1");
    title.classList = "title";
    title.textContent = event.title;

    const date = document.createElement("h2");
    date.classList = "date";
    date.textContent = new Date(event.date).toLocaleString();

    const location = document.createElement("h3");
    location.classList = "location";
    location.textContent = event.location;

    const description = document.createElement("p");
    description.classList.add("description");

    const maxLength = 100;
    let truncatedDescription = event.description;

    if (event.description.length > maxLength) {
      truncatedDescription = event.description.substring(0, maxLength) + "...";
    }

    description.textContent = truncatedDescription;

    const posterContainer = document.createElement("div");
    posterContainer.classList = "poster-container";
    const poster = document.createElement("img");
    poster.classList = "poster";
    poster.src = event.poster;

    let userName;
    let userImg;
    if (event.user) {
      userName = event.user.userName;
      userImg = event.user.profileimg;
    }

    const creator = document.createElement("div");
    creator.classList = "creator";
    const creatorImg = document.createElement("img");
    creatorImg.classList = "creator-img";
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
    divEvents.append(divEvent);
  }
  divMain.append(divEvents);
};
