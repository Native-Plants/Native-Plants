import React from 'react';
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer"
import Home from "./components/home/home";
import About from "./components/about/about";
import Plant from "./components/plant/plant";
import PlantList from "./components/plantList/plantList";
import Store from "./components/store/store";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  routeComponentContainer: {
    minHeight: 'calc(100vh - 128px)'
  }
});

function App() {
  const classes = useStyles();
  const pageObjects = [
      {id: 1, name: "Home",           path: "/",                exact: true,  display: true,  component: Home},
      {id: 2, name: "About",          path: "/about",           exact: true,  display: true,  component: About},
      {id: 3, name: "Plant Database", path: "/plants",          exact: true,  display: true,  component: PlantList},
      {id: 4, name: "Marketplace",    path: "/store",           exact: true,  display: true,  component: Store},
      {id: 5, name: "Plant",          path: "/plant/:plantName",exact: true,  display: false, component: Plant}
  ];

    const navObjects= pageObjects.filter(pageObject => {
      return(pageObject.display === true)
    })
    const pageRoutes= pageObjects.map(navObject => {
      return(<Route key={navObject.id} path={navObject.path} exact={navObject.exact} component={navObject.component} />);
    });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Grid container>
      <Nav navObjects={navObjects}/>
      <Switch>
        <Grid item xs={12} className={classes.routeComponentContainer}>
          {pageRoutes}
        </Grid>
      </Switch>
      </Grid>
      <Footer />
    </Router>

  );
}

export default App;
