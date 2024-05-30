import { RemoveAttender } from "../RemoveAttender/RemoveAttender";
import "./DeleteAttenderFromEvent.css"

export const DeleteAttenderFromEvent = async (e,eventId,attender,token,divMain) => {
    e.preventDefault();
    const res = await fetch(
      `https://proyecto10-six.vercel.app/api/events/${eventId}/attender/${attender._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      RemoveAttender(e, eventId, divMain, token, attender);
    }
  };