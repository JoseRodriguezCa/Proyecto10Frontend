export const isAdmin = () => {
    const token = localStorage.getItem("tokenUser");
  
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));
      
      return decodedToken.rol === "admin";
    } else {
      console.log("No se encontró ningún token en el almacenamiento local.");
      return false;
    }
  };