import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { AppBar, Toolbar, Typography, Grid, makeStyles, Hidden, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  navList: {
    display: 'flex'
  },
  centerText: {
    textAlign: "center"
  },
  navItem: {
    margin: 'auto',
    color: 'white',
    textDecoration: 'none',
  },
  drawerItem: {
    color: 'white',
    textDecoration: 'none'
  },
  drawerText: {
    paddingLeft: '25px',
  },
  list: {
    width: 250,
    backgroundColor: "#687864",
    height: '100%'
  }
});

function Nav(props) {
  /*Declaring variables from props*/
  const navObjects = props.navObjects;
  const classes = useStyles();

  const [mobileToggle, setMobileToggle] = useState(false);
  
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

  const drawerItems = navObjects.map(navObject => {
    return (
      <ListItem button key={navObject.name} onClick ={() => setMobileToggle(false)} >
        <NavLink to = {navObject.path} key = {navObject.id} className={classes.drawerItem}>
          <ListItemText className={classes.drawerText}>
            <Typography variant="subtitle1">
              {navObject.name}
            </Typography>
          </ListItemText>
        </NavLink>
        <Divider />
      </ListItem>
    );
  });


  const menu = (
    <Drawer anchor={"left"} open={mobileToggle} onClose={() => setMobileToggle(false)}>
      <div
        role= {"presentation"}
        className= {classes.list}
      >
        <List>
          {drawerItems}
        </List>
      </div>
    </Drawer>
    
  )

  const mobileIcon = (mobileToggle === true) ? 
  (<MenuOpenIcon onClick ={() => {setMobileToggle(!mobileToggle);}}/>) :
  (<MenuIcon onClick ={() => {setMobileToggle(!mobileToggle);}}/>) 

  return (
    <Grid item xs={12}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <Grid item xs={1}>
              {mobileIcon}
            </Grid>
            {menu}
          </Hidden>

          {/*TODO: Put a theme here so the name doesn't get screwed up.*/}
          <Grid item md={4} xs={11} className={classes.centerText}>
            <Hidden smDown>
              <Typography variant="h5">
                {'Ethical Landscape Initiative'}
              </Typography>
            </Hidden>
            <Hidden mdUp>
              <Typography variant="h6">
                {'Ethical Landscape Initiative'}
              </Typography>
            </Hidden>
          </Grid>

          <Hidden smDown>
            <Grid item md={4}/>
            <Grid item md={4}>
              <div className = {classes.navList}>
                {navListItems}
              </div>
            </Grid>          
          </Hidden>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default Nav;