import "./Footer.css"

const app = document.querySelector("#app");
export const Footer = () => {
    const containerFooter = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = "Creado por josema"
    containerFooter.classList = "footer-container";
    containerFooter.append(h1)
    app.append(containerFooter);
}