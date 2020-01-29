import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import './styles.css';

export default () => {
  return (
    <div className="menu-container">
      <label htmlFor="show-menu" className="show-menu">Abrir Menu</label>
      <input type="checkbox" id="show-menu" role="button" />
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-post">Novo Post</Link></li>
      </ul>
    </div>
  );
}


