
export const CreateButton = (className, textContent, onClickHandler) => {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = textContent;
    button.addEventListener("click", onClickHandler);
    return button;
  };
  