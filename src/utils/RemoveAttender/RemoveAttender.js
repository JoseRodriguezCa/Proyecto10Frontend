import { navigateTo } from "../../router/routes";
import { fetchApi } from "../fetchApi";
import "./RemoveAttender.css";

export const RemoveAttender = async (e, eventId, divMain, token, userAttending) => {
  if (e) {
    e.preventDefault();
  }
    const res = await fetchApi({endpoint:`attenders/${userAttending._id}`,method:"delete",token});
    if (res.ok) {
      alert("Asistente eliminado");
    }
    navigateTo(`/event/${eventId}`);
};
