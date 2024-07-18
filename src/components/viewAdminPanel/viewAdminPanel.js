// viewAdminPanel.js

import { navigateTo } from "../../router/routes";
import { fetchPaginationEvents } from "../../utils/fetchPaginationEvents";
import { fetchUsers } from "../../utils/fetchUsers";
import { searchAdmin } from "../Buscador/Buscador";
import { displayUsersAndEvents } from "../DisplayUsersAndEvents/DisplayUsersAndEvents";
import { PaginationButtons } from "../PaginationButtons/PaginationButtons";
import "./viewAdminPanel.css";

export const viewAdminPanel = async (page = 1) => {
  if (!document.querySelector(".admin-panel-container")) {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const token = localStorage.getItem("tokenUser");
    const adminPanel = document.createElement("div");
    adminPanel.classList.add("admin-panel-container");

    const usersContainer = document.createElement("div");
    usersContainer.classList.add("users-container");

    const closePanel = document.createElement("i");
    closePanel.classList.add("fa-solid", "fa-circle-xmark", "close-panel");
    closePanel.addEventListener("click", () => {
      adminPanel.classList.remove("active");
      setTimeout(() => {
        document.body.style.overflow = "auto";
        adminPanel.remove();
        navigateTo("/events?page=1");
      }, 300);
    });

    setTimeout(() => {
      adminPanel.classList.add("active");
    }, 700);

    const usersData = await fetchUsers(page);
    const users = usersData.items;

    const events = await fetchPaginationEvents(page);

    const paginationContainer = PaginationButtons(
      usersData.currentPage,
      usersData.totalPages,
      fetchUsers,
      displayUsersAndEvents,
      usersContainer,
      token,
      "/admin-panel",
      "page"
    );

    searchAdmin(adminPanel, closePanel, usersContainer, users, events, token, paginationContainer);
    displayUsersAndEvents(users, events, usersContainer, token);

    adminPanel.appendChild(usersContainer);
    adminPanel.appendChild(paginationContainer);
    document.getElementById('app').appendChild(adminPanel);
  }
};

export const filterUsers = (filteredUsers, events, usersContainer, token, allUsers, paginationContainer) => {
  usersContainer.innerHTML = '';

  if (filteredUsers === null) {
    const errorMessage = document.createElement('p');
    errorMessage.classList = "error-message";
    errorMessage.textContent = 'No se encontró el usuario que buscabas';
    paginationContainer.style.display = 'none';

    usersContainer.append(errorMessage);
  } else {
    displayUsersAndEvents(filteredUsers, events, usersContainer, token);
  }
};
