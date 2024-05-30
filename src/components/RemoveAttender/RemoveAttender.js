import { EventPage } from "../../pages/EventPage/EventPage";
import "./RemoveAttender.css"

export const RemoveAttender = async (e, eventId, divMain, token, userAttending) => {
    e.preventDefault();
    const res = await fetch(
      `https://proyecto10-six.vercel.app/api/attenders/${userAttending._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      alert("Asistente eliminado");
    }
    EventPage(null, eventId, divMain);
  };