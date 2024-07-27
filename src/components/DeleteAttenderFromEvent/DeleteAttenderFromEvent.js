import { fetchApi } from "../../utils/fetchApi";
import { RemoveAttender } from "../../utils/RemoveAttender/RemoveAttender";
import "./DeleteAttenderFromEvent.css"

export const DeleteAttenderFromEvent = async (e,eventId,attender,token,divMain) => {
    e.preventDefault();
    const res = await fetchApi({endpoint:`events/${eventId}/attender/${attender._id}`,method:"DELETE",token});
    if (res.ok) {
      RemoveAttender(e, eventId, divMain, token, attender);
    }
  };