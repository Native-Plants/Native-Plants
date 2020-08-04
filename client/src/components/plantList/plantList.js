import React, {useState, useEffect, Fragment} from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid
} from "@material-ui/core/";
import './plantList.css';
import Tabletop from 'tabletop';


import Filters from "./filters/filters";
import Plants from "./plants/plants"


function PlantList() {
  //Internal State
  const [loading, setLoading] = useState(true);

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
  
  const filteredPlantList = plantList.filter(plant => {
    const favoritedResults = (favoritedFilter === false || favoritePlants.includes(plant.id));
    const shadeToleranceResults = (shadeToleranceSelected.length === 0 || shadeToleranceSelected.includes(plant.shadeTolerance));
    const durationResults = (durationSelected.length === 0 || isValueIncluded(plant.duration, durationSelected));
    const growthHabitResults = (growthHabitSelected.length === 0 || isValueIncluded(plant.growthHabit, growthHabitSelected))
    const activeGrowthPeriodResults = (activeGrowthPeriodSelected.length ===0 || plant.activeGrowthPeriod === "Year Round" || isValueIncluded(plant.activeGrowthPeriod, activeGrowthPeriodSelected))
    const commercialAvailabilityResults = (commercialAvailabilitySelected.length === 0 || commercialAvailabilitySelected.includes(plant.commercialAvailability))
    const searchResults = (searchText === "" || plant.genus.toLowerCase().includes(searchText.toLowerCase()) || plant.species.toLowerCase().includes(searchText.toLowerCase()) || plant.commonName.toLowerCase().includes(searchText.toLowerCase()));
    return (searchResults && shadeToleranceResults &&  durationResults && growthHabitResults && activeGrowthPeriodResults && commercialAvailabilityResults && favoritedResults);
  });
  const filteredPlantLength = filteredPlantList.length;
  const maxLength = ((pageNumber + plantsPerPage) > filteredPlantList.length) ? filteredPlantList.length : (pageNumber + plantsPerPage);
  
  const displayPlantList = filteredPlantList.slice(pageNumber, maxLength);
  
  const plantsProps = {
    pageStatusProps: {
      pageNumber, setPageNumber, plantsPerPage, setPlantsPerPage, maxLength, filteredPlantLength
    },
    plantCardsProps: {
      displayPlantList, favoritePlants, setFavoritePlants
    }
  };

  const filtersProps = {
    searchText, setSearchText, favoritedFilter, setFavoritedFilter,
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

  return (
    <Grid container>
      {loading ? null : (
        <Fragment>
          <Grid item xs={3} className={"filters"}>
            <Filters props={filtersProps}/>
          </Grid>
          <Grid item xs={9}>
            <Plants props= {plantsProps}/>
    
          </Grid>
        </Fragment>
      )}
      <Backdrop className={"backdrop"} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}



export default PlantList;
