import { AddAttender } from "../components/AddAttender/AddAttender";
import { ConfigUser } from "../components/ConfigUser/ConfigUser";
import { CreateEvent } from "../components/CreateEvent/CreateEvent";
import { viewAdminPanel } from "../components/viewAdminPanel/viewAdminPanel";
import { EventPage } from "../pages/EventPage/EventPage";
import { Home } from "../pages/Home/Home";
import { LoginRegister } from "../pages/LoginRegister/LoginRegister";

export const routes = {
  "/events": (e, page = 1) => Home(e, page),
  "/login": (e) => LoginRegister(e, "login"),
  "/register": (e) => LoginRegister(e, "register"),
  "/create-event": (e) => CreateEvent(e),
  "/config-user": (e) => ConfigUser(e),
  "/event/:id": (e, eventId, divMain, token, storedUser) => EventPage(e, eventId, divMain, token, storedUser),
  "/event/:id/add-attender": (e, eventId) => AddAttender(e, eventId),
  "/admin-panel": (e, page = 1) => viewAdminPanel(page),
};

export const navigateTo = (path) => {
  const params = {};
  const [pathname, search] = path.split('?');
  const route = Object.keys(routes).find((r) => {
    const regex = new RegExp(`^${r.replace(/:[^\s/]+/g, "([\\w-]+)")}$`);
    const match = pathname.match(regex);
    if (match) {
      const keys = r.match(/:([^\s/]+)/g);
      keys &&
        keys.forEach((key, index) => {
          params[key.substring(1)] = match[index + 1];
        });
      return true;
    }
    return false;
  });

  if (route) {
    const urlParams = new URLSearchParams(search);
    const page = urlParams.get('page') || 1;
    window.history.pushState({}, route, window.location.origin + path);
    routes[route](null, ...Object.values(params), page);
  } else {
    console.error("Ruta no encontrada:", path);
  }
};

export const router = () => {
  const path = window.location.pathname;
  const search = window.location.search;
  navigateTo(path + search);
};

window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  const search = window.location.search;
  navigateTo(path + search);
});
