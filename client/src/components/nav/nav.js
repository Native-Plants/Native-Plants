import React, {useState, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
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
          {navObject.name}
      </NavLink>
    );
  });

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <div className = "appBar">
            <Typography variant="h6">
              Ethical Landscape Initiative
            </Typography>
            <div className = "navigationContainer">
              {navListItems}
            </div>  
          </div>
          
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>

    </Fragment>
  );
}

export default Nav;
