export const fetchEvents = async () => {
    try {
      const eventsRes = await fetch("https://proyecto10-six.vercel.app/api/events");
      if (eventsRes.status === 200) {
        const arrayEvents = await eventsRes.json();
        return arrayEvents.events;
      } else {
        throw new Error("Error al obtener eventos");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };