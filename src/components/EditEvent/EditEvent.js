import { CreateEvent } from "../CreateEvent/CreateEvent";
import "./EditEvent.css";

export const EditEvent = (e, eventData) => {
  e.preventDefault();
  const token = localStorage.getItem("tokenUser");

  const eventDate = new Date(eventData.date);
  const localTime = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(11, 16);

  const onSubmit = async (e, form) => {
    e.preventDefault();

    const formData = new FormData(form);
    const dateValue = formData.get("date");
    const timeValue = formData.get("time");
    const combinedDateTime = new Date(`${dateValue}T${timeValue}`);
    formData.set('date', combinedDateTime);

    const response = await fetch(
      `https://proyecto10-six.vercel.app/api/events/${eventData._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const updatedEvent = await response.json();
      const modalNewEvent = document.getElementById("event-modal");
      modalNewEvent.classList.remove("active");
      setTimeout(() => {
        modalNewEvent.remove();
      }, 300);
    } else {
      const errorResponse = await response.json();
      console.error("Error al actualizar el evento:", errorResponse);
    }
  };

  CreateEvent(e, {
    formTitle: "Editar Evento",
    submitButtonText: "Editar Evento",
    onSubmit: onSubmit,
    eventData: {
      title: eventData.title,
      date: eventData.date.split("T")[0],
      time: localTime,
      location: eventData.location,
      description: eventData.description,
    },
  });
};
