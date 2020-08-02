import React, {useState, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css';
import { AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@material-ui/core';
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
      <Grid item xs={1}>
        <NavLink to = {navObject.path} key = {navObject.id}>
            {navObject.name}
        </NavLink>
      </Grid>
    );
  });

  return (
    <Grid item xs={12}>
      <AppBar position="static">
        <Toolbar>
          <Grid item xs={4}>
            <Typography variant="h6">
              Ethical Landscape Initiative
            </Typography>
          </Grid>
            {navListItems}

          
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>

    </Grid>
  );
}

export default Nav;
