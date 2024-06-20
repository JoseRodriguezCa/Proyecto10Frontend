import { Loader } from "../../components/Loader/Loader";
import { PaginationButtons } from "../../components/PaginationButtons/PaginationButtons";
import { printEvents } from "../../components/PrintEvents/PrintEvents";
import { fetchPaginationEvents } from "../../utils/fetchPaginationEvents";
import "./Home.css";

export const Home = async (e, page = 1) => {
  if (e) {
    e.preventDefault();
  }
  const token = localStorage.getItem("tokenUser");
  const divMain = document.querySelector(".div-main");
  Loader(divMain);

  const eventData = await fetchPaginationEvents(page);

  setTimeout(() => {
    divMain.innerHTML = "";
    printEvents(eventData.items,null, divMain);
    divMain.classList.remove("hidden");

    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination-container");

    if(eventData.totalPages > 1) {
      const eventsPaginationContainer = PaginationButtons(eventData.currentPage, eventData.totalPages, fetchPaginationEvents, printEvents, divMain, token, "/events", "page");
      paginationContainer.appendChild(eventsPaginationContainer);
    }

    divMain.appendChild(paginationContainer);
  }, 500);
};

