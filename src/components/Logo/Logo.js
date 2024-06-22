import "./Logo.css"

export const Logo = () => {
    const logo = document.createElement("div");
    const logoImg = document.createElement("img");
    logoImg.src = "https://res.cloudinary.com/dtgsaqjwa/image/upload/v1715847394/931cd261ad78d0c4f0b2ceda893e142b-logotipo-de-planificacion-de-eventos_gvxpwu.png";
    logoImg.classList = "h-logo";
    logo.classList = "div-logo"
    logo.append(logoImg)
    return logo;
}


