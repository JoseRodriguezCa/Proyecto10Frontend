import "./EventPage.css";
import { LeftSection } from "../../components/LeftSection/LeftSection";
import { RightSection } from "../../components/RightSection/RightSection";
import { TitleEvent } from "../../components/TitleEvent/TitleEvent";

export const EventPage = async (e, eventId) => {
  
  if (e) {
    e.preventDefault();
  }
  const divMain = document.querySelector(".div-main");
  const response = await fetch(`https://proyecto10-six.vercel.app/api/events/${eventId}`);
  const event = await response.json();

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

  const leftSection = LeftSection(event, divMain, eventId, token, storedUser);
  const rightSection = RightSection(event, divMain, eventId, token, storedUser);
  const divContainerCreator = TitleEvent(event);

  divSection.append(leftSection, rightSection);
  divOneEvent.append(divContainerCreator, divSection);

  divMain.append(divOneEvent);
};
