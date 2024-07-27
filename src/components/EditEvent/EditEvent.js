import { fetchApi } from "../../utils/fetchApi";

export const EditEvent = async (event) => {
  const token = localStorage.getItem("tokenUser");

  const eventDate = new Date(event.date);
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

    const response = await fetchApi({endpoint:`events/${event._id}`,method:"PUT",token,data:formData});

    if (response.ok) {
      const updatedEvent = await response.json();
      const modalNewEvent = document.getElementById("event-modal");
      modalNewEvent.classList.remove("active");
      setTimeout(() => {
        modalNewEvent.remove();
      }, 300);
      window.location.reload()
    } else {
      const errorResponse = await response.json();
      console.error("Error al actualizar el evento:", errorResponse);
    }
  };

  return { onSubmit, localTime };
};
