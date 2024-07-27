import { Home } from "../../pages/Home/Home";
import { navigateTo } from "../../router/routes";
import { fetchApi } from "../../utils/fetchApi";
import "./DeleteEvent.css"

export const DeleteEvent = async (e, eventId, token) => {
    e.preventDefault();
    const res = await fetchApi({endpoint:`events/${eventId}`,method:"DELETE",token});
    if (res.ok) {
      console.log("evento eliminado");
    }
    navigateTo("/events?page=1")
  };