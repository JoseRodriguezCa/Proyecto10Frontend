import { navigateTo } from "../../router/routes";
import "./RemoveAttender.css";

export const RemoveAttender = async (e, eventId, divMain, token, userAttending) => {
  if (e) {
    e.preventDefault();
  }
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
    navigateTo(`/event/${eventId}`);
};
