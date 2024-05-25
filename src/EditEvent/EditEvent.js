import { CreateEvent } from "../components/CreateEvent/CreateEvent";
import "./EditEvent.css"


export const EditEvent = (e, eventData) => {
    e.preventDefault()
    const token = localStorage.getItem("tokenUser");
  
    const onSubmit = async (e, form) => {
      e.preventDefault();
      const formData = new FormData(form);
  
      const response = await fetch(`https://proyecto10-six.vercel.app/api/events/${eventData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });
  
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
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        description: eventData.description
      }
    });
  };
  