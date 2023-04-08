import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from "../Components/utils/global.context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Navbar = () => {

  const {state, dispatch} = useContext(ContextGlobal);

  const switchTheme = (theme) => {
    dispatch({ type: 'SWITCH_THEME', theme });
  };

  return (
    <nav>
      {/* Aqui deberan agregar los liks correspondientes a las rutas definidas */}
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/favs">Favorites</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
      </ul>
      {/* Deberan implementar ademas la logica para cambiar de Theme con el button */}
      <button onClick={() => switchTheme(!state.theme)}>{state.theme ? "🌞" : "🌑"}</button>
    </nav>
  )
}

export default Navbar