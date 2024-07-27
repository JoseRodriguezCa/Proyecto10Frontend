import "./PaginationButtons.css";
import { navigateTo } from "../../router/routes";
import { fetchPaginationData } from "../../utils/fetchPaginationData";
import { displayUsersAndEvents } from "../DisplayUsersAndEvents/DisplayUsersAndEvents";

export const PaginationButtons = (
  currentPage,
  totalPages,
  contentType,
  container,
  token,
  route,
  pageQueryParam
) => {
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");

  currentPage = parseInt(currentPage);
  totalPages = parseInt(totalPages);

  const updatePage = async (newPage) => {
    newPage = parseInt(newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      navigateTo(`${route}?${pageQueryParam}=${newPage}`);
      console.log("Navigating to page:", newPage);
      currentPage = newPage;
      numberPage.textContent = currentPage;
      await fetchAndDisplayItems(newPage);
      updateButtonState();
    }
  };

  const createPaginationButton = (text) => {
    const button = document.createElement("button");
    button.classList.add("pagination-button");
    button.innerHTML = `<i class="${text}"></i>`;
    button.addEventListener("click", () => {
      let nextPage;
      if (text === "fa-solid fa-circle-chevron-right") {
        nextPage = currentPage + 1;
      } else if (text === "fa-solid fa-circle-chevron-left") {
        nextPage = currentPage - 1;
      }
      const targetPage = Math.min(Math.max(nextPage, 1), totalPages);
      updatePage(targetPage);
    });
    return button;
  };

  const fetchAndDisplayItems = async (page) => {
    try {
      const eventData = await fetchPaginationData("events", page);
      const events = eventData;
      const usersData = await fetchPaginationData("users", page,2);
      const users = usersData.items;
      if (contentType === "events") {
        printEvents(eventData.items, null, container);
      } else if (contentType === "usersAndEvents") {
        const eventData = await fetchPaginationData("events", 1,1000);
      const events = eventData;
        displayUsersAndEvents(users, events, container, token);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const backButton = createPaginationButton("fa-solid fa-circle-chevron-left");
  const forwardButton = createPaginationButton(
    "fa-solid fa-circle-chevron-right"
  );

  const numberPage = document.createElement("span");
  numberPage.textContent = currentPage;

  paginationContainer.append(backButton, numberPage, forwardButton);

  const updateButtonState = () => {
    backButton.disabled = currentPage === 1;
    forwardButton.disabled = currentPage === totalPages;
  };

  updateButtonState();

  return paginationContainer;
};
