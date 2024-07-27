import { fetchApi } from "../fetchApi";
import { isAdmin } from "../IsAdmin/IsAdmin";


export const deleteUser = async (e, storedUser, token) => {
    const res = await fetchApi({endpoint:`users/${storedUser._id}`,method:"DELETE",token});
  
    if (res.ok) {
      const response = await res.json();
      alert("Cuenta Eliminada");
      if(!isAdmin()){
        localStorage.removeItem("tokenUser");
        localStorage.removeItem("user");
      }
      window.location.reload();
    }
  };