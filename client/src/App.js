import React from 'react';
import './App.css';
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import About from "./components/about/about";
import PlantList from "./components/plantList/plantList";
import Store from "./components/store/store";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Grid} from '@material-ui/core';



function App() {
  /*
    This list of objects below is what populates the items on the Navbar, and also takes care of the routing.
    To add to the navbar create and import a new component, then add to the navbar list. The Id is arbitrary, but is used only as a unique value to give context to what object we are iterating through.
  */
 const pageObjects = [
    {id: 1, name: "Home",           path: "/",               exact: true,  display: true,  component: Home},
    {id: 2, name: "About",          path: "/about",          exact: true,  display: true,  component: About},
    {id: 3, name: "Plant Database", path: "/plants",         exact: true,  display: true,  component: PlantList},
    {id: 4, name: "Marketplace",    path: "/store",          exact: true,  display: true,  component: Store}
  ];

  /*
    This is iterating through the object and populating all of the routes
  */

  const navObjects= pageObjects.filter(pageObject => {
    return(pageObject.display === true)
  })
  const pageRoutes= pageObjects.map(navObject => {
    return(<Route key={navObject.id} path={navObject.path} exact={navObject.exact} component={navObject.component} />);
  });

  /*
    This is what this function is returning. We are returning a JSX object so that it can be rendered directly to the index.html page.
    All components listed before the {navRoutes} is something that will always be present and will not be rerendered when a new route is selected.
  */
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Grid container className={"content"}>
      <Nav navObjects={navObjects}/>
        <Switch>
          {pageRoutes}
        </Switch>
      </Grid>
    </Router>

  );
}

export default App;
