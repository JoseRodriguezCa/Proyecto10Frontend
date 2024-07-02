import "./Loader.css"

export const Loader = (divMain) => {
    divMain.innerHTML = `<section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>`
}

export const LoginLoader = (form) => {
  const loaderLogin = document.querySelector(".loader-login")
  if(loaderLogin){
    return
  }else {
    const loaderLogin = document.createElement("div");
    loaderLogin.classList = "loader-login"
    loaderLogin.innerHTML += `
    <svg viewBox="25 25 50 50">
    <circle r="20" cy="50" cx="50"></circle>
  </svg>
    `
    form.append(loaderLogin)
  }

  return loaderLogin

}