import React, {useState, useEffect, Fragment} from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
  Hidden,
  makeStyles,
  Button,
  Drawer
} from "@material-ui/core/";
import Tabletop from 'tabletop';
import Filters from "./filters";
import Plants from "./plants/plants"

const useStyles = makeStyles({
  emptyResults: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    height:"100%"
  },
  backdrop: {
    zIndex: "999",
    color: "#fff",
  },
  filters: {
    paddingRight: "50px"
  }
});


function PlantList() {
  const classes = useStyles();
  //Internal State
  const [loading, setLoading] = useState(true);
  const [mobileFilterToggle, setMobileFilterToggle] = useState(false);

  //These states are used to filter 
  const [searchText, setSearchText] = useState("");
  const [favoritedFilter, setFavoritedFilter] = useState(false);

  const [shadeToleranceSelected, setShadeToleranceSelected] = useState([]);
  const [durationSelected, setDurationSelected] = useState([]);
  const [growthHabitSelected, setGrowthHabitSelected] = useState([]);
  const [activeGrowthPeriodSelected, setActiveGrowthPeriodSelected] = useState([]);
  const [commercialAvailabilitySelected, setCommercialAvailabilitySelected] = useState([]);

  //These are used for Plant object
  const [plantList, setPlantList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [plantsPerPage, setPlantsPerPage] = useState(10);
  const [favoritePlants, setFavoritePlants] = useState( () => {
    const localData = localStorage.getItem("favoritePlants");
    return (localData) ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritePlants', JSON.stringify(favoritePlants));

    async function fetchData() {
      Tabletop.init({
        key: '1xq_h1oDzlFt8wU4qLwVUHDN6P-z9v_A39bgNyb9rOng',
        callback: plants => {
          setLoading(false);
          setPlantList(plants);
        },
        simpleSheet: true
      })
    }
    fetchData();
  }, [favoritePlants]);

  function isValueIncluded(value, selectedList){
    let isValueIncluded = false;
    for (const item of selectedList) {
      if(value.toLowerCase().includes(item.toLowerCase()))
      {
        isValueIncluded = true;
      }
    }
    
    return isValueIncluded;
  };

  function isSearchIncluded(plant) {
    let count = 0;
    const searchList = searchText.split(' ');

    for(const searchItem of searchList) {
      if(searchItem.trim() === "") {
        continue;
      }
      if(plant.genus.toLowerCase().includes(searchItem.trim().toLowerCase())) {count += 1};
      if(plant.species.toLowerCase().includes(searchItem.trim().toLowerCase())) {count += 1};
      if(plant.commonName.toLowerCase().includes(searchItem.trim().toLowerCase())) {count += 1};
    }
    return count;
  }
  
  const filteredPlantList = plantList.filter(plant => {
    const favoritedResults = (favoritedFilter === false || favoritePlants.includes(plant.id));
    const shadeToleranceResults = (shadeToleranceSelected.length === 0 || shadeToleranceSelected.includes(plant.shadeTolerance));
    const durationResults = (durationSelected.length === 0 || isValueIncluded(plant.duration, durationSelected));
    const growthHabitResults = (growthHabitSelected.length === 0 || isValueIncluded(plant.growthHabit, growthHabitSelected))
    const activeGrowthPeriodResults = (activeGrowthPeriodSelected.length ===0 || plant.activeGrowthPeriod === "Year Round" || isValueIncluded(plant.activeGrowthPeriod, activeGrowthPeriodSelected))
    const commercialAvailabilityResults = (commercialAvailabilitySelected.length === 0 || commercialAvailabilitySelected.includes(plant.commercialAvailability))
    const searchResults = (searchText.trim() === "" || isSearchIncluded(plant));
    return (searchResults && shadeToleranceResults &&  durationResults && growthHabitResults && activeGrowthPeriodResults && commercialAvailabilityResults && favoritedResults);
  });
  const filteredPlantLength = filteredPlantList.length;
  const maxLength = ((pageNumber + plantsPerPage) > filteredPlantList.length) ? filteredPlantList.length : (pageNumber + plantsPerPage);
  

  function compare(a, b) {
    if (isSearchIncluded(a) < isSearchIncluded(b)) return 1;
    if (isSearchIncluded(b) < isSearchIncluded(a)) return -1;
  
    return 0;
  }

  //Now we sort the filtered plants based on the count.
  const sortedFilteredPlantList = [...filteredPlantList].sort(compare);
  const displayPlantList = sortedFilteredPlantList.slice(pageNumber, maxLength);
  
  const plantsProps = {
    pageStatusProps: {
      pageNumber, setPageNumber, plantsPerPage, setPlantsPerPage, maxLength, filteredPlantLength
    },
    plantCardsProps: {
      displayPlantList, favoritePlants, setFavoritePlants
    }
  };

  const filtersProps = {
    searchText, setSearchText, favoritedFilter, setFavoritedFilter, setPageNumber, setMobileFilterToggle,
    selects: 
      [{
        list: shadeToleranceSelected,
        setList: setShadeToleranceSelected,
        options: "shadeToleranceOptions",
        label: "Shade Tolerance"
      },
      {
        list: durationSelected,
        setList: setDurationSelected,
        options: "durationOptions",
        label: "Duration"
      },
      {
        list: growthHabitSelected,
        setList: setGrowthHabitSelected,
        options: "growthHabitOptions",
        label: "Growth Habit"
      },
      {
        list: activeGrowthPeriodSelected,
        setList: setActiveGrowthPeriodSelected,
        options: "activeGrowthPeriodOptions",
        label: "Active Growth Period"
      },
      {
        list: commercialAvailabilitySelected,
        setList: setCommercialAvailabilitySelected,
        options: "commercialAvailabilityOptions",
        label: "Commercial Availability"
      }]
    
  }

  const emptyResults = (
    <div className={classes.emptyResults}>
      <Typography variant="h3">{"There are no plants that match your filters"}</Typography>
    </div>
    );

  return (
      <Grid container>
      {loading ? null : (
        <Fragment>
          <Hidden smDown>
            <Grid item md={3} className={classes.filters} >
              <Filters props={filtersProps}/>
            </Grid>
          </Hidden>
          <Grid item md={9} xs={12}>
            <Hidden mdUp>
              <Button variant="outlined" color="secondary" fullWidth onClick={() => setMobileFilterToggle(true)}>
                {"Show Filters"}
              </Button>
              <Drawer anchor={"left"} open={mobileFilterToggle} onClose={() => setMobileFilterToggle(false)}>
                <Filters props={filtersProps}/>
              </Drawer>
            </Hidden>
            {(filteredPlantLength) ? (<Plants props= {plantsProps}/>) : emptyResults}
          </Grid>
        </Fragment>
      )}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}



export default PlantList;
