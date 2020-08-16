import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { AppBar, Toolbar, Grid, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  navList: {
    display: 'flex'
  },
  navItem: {
    margin: 'auto',
    color: 'white',
    textDecoration: 'none'
  },
  footer: {
    position: 'relative',
    left: '0',
    bottom: '0',
    right: '0'
  }
});

function Footer() {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <Grid item xs={12}>
        <AppBar position="static">
            <Toolbar>
              <Grid item xs={5}>

              </Grid>
              <Grid item xs={5}/>

              <Grid item xs={1}>
                <div className = {classes.navList}>
                <NavLink to = "/" className={classes.navItem}>
                  <InstagramIcon />
                </NavLink>
                <NavLink to = "/" className={classes.navItem}>

                  <FacebookIcon />
                  </NavLink>
                <NavLink to = "/" className={classes.navItem}>
                  <TwitterIcon />
                </NavLink>
                </div>
              </Grid>
            </Toolbar>
        </AppBar>

        </Grid>
      </footer>
  );
}

export default Footer;


