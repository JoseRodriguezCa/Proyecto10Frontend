import "./createInput.css"


export const createInput = ({ name, className, type, required, placeholder } = {}) => {

    const input = document.createElement('input');

  if (name) {
    input.name = name;
  }
  if (className) {
    input.className = className;
  }
  if (type) {
    input.type = type;
  } else {
    input.type = 'text';
  }
  if (required) {
    input.required = true;
  }
  if (placeholder) {
    input.placeholder = placeholder;
  }

  return input;

}