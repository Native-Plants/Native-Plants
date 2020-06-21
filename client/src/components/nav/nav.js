import React, {useState, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css';
/*
  This object is pretty basic and will only be modified for styling purposes. All new navbar objects will be modified in the navObjects object in the App component.
*/
function Nav(props) {
  /*Declaring variables from props*/
  const navObjects = props.navObjects;
  
  /*
    Creating a state variable to track the current page.
    The default value is by checking which navObject shares the same pathname as what is in the browser.
    This is currently being used for styling purposes.
  */
  
  const navListItems = navObjects.map(navObject => {
    return (
    <NavLink to = {navObject.path} key = {navObject.id}>
      <li key={navObject.id}>
        {navObject.name}
      </li>
    </NavLink>);
  });

  return (
    <Fragment>
      <ul className = "navList">
        {navListItems}
      </ul>
    </Fragment>
  );
}

export default Nav;
