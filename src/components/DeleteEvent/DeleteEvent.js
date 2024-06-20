import { Home } from "../../pages/Home/Home";
import { navigateTo } from "../../router/routes";
import "./DeleteEvent.css"

export const DeleteEvent = async (e, eventId, token) => {
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
    navigateTo("/events?page=1")
  };