import "./TitleEvent.css";

export const TitleEvent = (event) => {
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

  const eventName = document.createElement("h1");
  eventName.classList.add("event-name");
  eventName.textContent = event.title;

  divContainerCreator.append(eventName, creatorEvent);
  creatorEvent.append(creatorImage, creatorName);

  return divContainerCreator;
};
