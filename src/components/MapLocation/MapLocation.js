import "./MapLocation.css"

export const MapLocation = (event) => {
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
  
    divLocation.append(locationLogo, eventLocation);
    mapContainer.append(divLocation, googleMapsLink);
    return mapContainer
}