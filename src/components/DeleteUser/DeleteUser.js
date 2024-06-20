import { isAdmin } from "../IsAdmin/IsAdmin";


export const deleteUser = async (e, storedUser, token) => {
    const res = await fetch(
      `https://proyecto10-six.vercel.app/api/users/${storedUser._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
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