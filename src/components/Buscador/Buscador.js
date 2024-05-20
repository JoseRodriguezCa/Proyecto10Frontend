import { crearBoton } from '../BtnHeader/BtnHeader'
import './Buscador.css'



export const buscador = () => {
    const divBuscador = document.createElement('div');
    const buscador = document.createElement('input');
    const iBuscador = document.createElement('i');
    const btnBuscar = crearBoton('Buscar');
    btnBuscar.removeAttribute('href')
    btnBuscar.classList = 'btnBuscar';
    iBuscador.classList = 'fa-solid fa-magnifying-glass';
    buscador.type = 'text';
    buscador.placeholder = 'Buscar Eventos';
    buscador.classList = 'buscador';
    divBuscador.classList = 'divBuscador';
    divBuscador.append(iBuscador,buscador,btnBuscar);
    return divBuscador
}


// export const buscar = (sumPage) => {
//     const buscador = document.querySelector('.buscador');
//     const btnBuscar = document.querySelector('.btnBuscar');
//     let valorBusqueda = '';

//     const realizarBusqueda = async () => {
//         const divApp = document.querySelector('#app');
//         valorBusqueda = buscador.value;
//         divApp.innerHTML = '';
//         console.log('Búsqueda realizada:', valorBusqueda);
//         const data = await URL_API(valorBusqueda, sumPage)
//         pintarCarta(data);
//     };

//     buscador.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             realizarBusqueda();
//         }
//     });

//     buscador.addEventListener('keyup', (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             realizarBusqueda();
//         }
//     });

//     btnBuscar.addEventListener('click', () => {
//         realizarBusqueda();
//     });

// };

