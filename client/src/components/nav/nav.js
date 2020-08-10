import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css';
import { AppBar, Toolbar, Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navList: {
    display: 'flex'
  },
  navItem: {
    margin: 'auto'
  }
});

function Nav(props) {
  /*Declaring variables from props*/
  const navObjects = props.navObjects;
  const classes = useStyles();
  
  /*
    Creating a state variable to track the current page.
    The default value is by checking which navObject shares the same pathname as what is in the browser.
    This is currently being used for styling purposes.
  */
  
  const navListItems = navObjects.map(navObject => {
    return (
      <NavLink to = {navObject.path} key = {navObject.id} className={classes.navItem}>
          <Typography variant="subtitle1">
            {navObject.name}
          </Typography>
      </NavLink>
    );
  });

  return (
    <Grid item xs={12}>
      <AppBar position="static">
        <Toolbar>
          <Grid item xs={4}>
            <Typography variant="h5">
              {'Ethical Landscape Initiative'}
            </Typography>
          </Grid>
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <div className = {classes.navList}>
              {navListItems}
            </div>
          </Grid>

          
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>

    </Grid>
  );
}

export default Nav;
