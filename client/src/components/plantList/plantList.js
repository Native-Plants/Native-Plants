import React, {useState, useEffect, Fragment} from 'react';
import green from '@material-ui/core/colors/green';
import Iframe from 'react-iframe'
//import DoneIcon from '@material-ui/icons/Done';
import {
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Dialog,
  Button,
  withStyles,
  ListItemText,
  Chip,
  IconButton,
  Icon,
  Backdrop,
  CircularProgress,
  InputAdornment,
  FormControlLabel,
  Switch
} from "@material-ui/core/";
import './plantList.css';
import Tabletop from 'tabletop';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const data = {};
data.shadeToleranceOptions = [
    "Tolerant",
    "Intermediate",
    "Intolerant"
];
data.durationOptions = [
  "Perennial",
  "Biennial",
  "Annual"
];

data.growthHabitOptions = [
  "Tree",
  "Shrub",
  "Forb",
  "Herb",
  "Graminoid",
  "Subshrub",
  "Vine"
];

data.activeGrowthPeriodOptions = [
  "Fall",
  "Winter",
  "Spring",
  "Summer"
];

data.commercialAvailabilityOptions = [
  "Contracting Only",
  "Field Collections Only",
  "Routinely Available"
];

function PlantList() {
  //These states are used to filter 
  const [shadetoleranceOptions, setShadeToleranceOptions] = useState(data.shadeToleranceOptions);
  const [shadeToleranceSelected, setShadeToleranceSelected] = useState([]);
  const [shadeToleranceActiveFilter, setShadeToleranceActiveFilter] = useState([]);
  const [durationOptions, setDurationOptions] = useState(data.durationOptions);
  const [durationSelected, setDurationSelected] = useState([]);
  const [durationActiveFilter, setDurationActiveFilter] = useState([]);
  const [growthHabitOptions, setGrowthHabitOptions] = useState(data.growthHabitOptions);
  const [growthHabitSelected, setGrowthHabitSelected] = useState([]);
  const [growthHabitActiveFilter, setGrowthHabitActiveFilter] = useState([]);
  const [activeGrowthPeriodOptions, setActiveGrowthPeriodOptions] = useState(data.activeGrowthPeriodOptions);
  const [activeGrowthPeriodSelected, setActiveGrowthPeriodSelected] = useState([]);
  const [activeGrowthPeriodActiveFilter, setActiveGrowthPeriodActiveFilter] = useState([]);
  const [commercialAvailabilityOptions, setCommercialAvailabilityOptions] = useState(data.commercialAvailabilityOptions);
  const [commercialAvailabilitySelected, setCommercialAvailabilitySelected] = useState([]);
  const [commercialAvailabilityActiveFilter, setCommercialActiveFilter] = useState([]);
  const [favoritedFilter, setFavoritedFilter] = useState(false);

  const [loading, setLoading] = useState(true);
  const [plantList, setPlantList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [plantsPerPage, setPlantsPerPage] = useState(10);
  const [favoritePlants, setFavoritePlants] = useState( () => {
    const localData = localStorage.getItem("favoritePlants");
    return (localData) ? JSON.parse(localData) : [];
  });

  const plantsPerPageOptions = [10,25,50];
  const [searchInputText, setSearchInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  const [toggle, setToggle] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState({});

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

  function displaySearchBar() {
    return (
      <div className={"plantFilter"}>
        <TextField
          style={{ width: "150px" }}
          label="Search"
          value={searchInputText}
          onChange={e => setSearchInputText(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end" onClick={() => {setSearchInputText(""); setSearchText("")}}>X</InputAdornment>,
          }}
        />
      </div>
    );
  }

  function displayFilterBars(inputText, value, onChange, options ) {
    const selectedOptions = options.filter(option => {
      return value.includes(option);
    })

    return (
      <div className={"plantFilter"}>
        <FormControl>
          <InputLabel>{inputText}</InputLabel>
          <Select
            renderValue={() => (
              <div>
                {
                  selectedOptions.map((selectedOption) => {
                    return (
                      <Chip
                        color={"primary"}
                        key={selectedOption} 
                        label={selectedOption}
                        variant={"outlined"}
                        id={selectedOption}
                      />)
                  })
                }
              </div>
            )}
            style={{ width: "150px" }}
            value={value}
            onChange={e => {onChange(e.target.value)}}
            multiple={true}
          >
            {options.map(item => (
              <MenuItem key={item} value={item} id={item}>
                <GreenCheckbox checked = {value.includes(item)}/>
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  };

  function applyFilterButton() {
    return(<Button
      onClick={() => {
          setSearchText(searchInputText);
          setShadeToleranceActiveFilter(shadeToleranceSelected);
          setDurationActiveFilter(durationSelected);
          setGrowthHabitActiveFilter(growthHabitSelected);
          setActiveGrowthPeriodActiveFilter(activeGrowthPeriodSelected);
          setCommercialActiveFilter(commercialAvailabilitySelected);
          setPageNumber(0);
        }
      }
    >
    {"Apply Filters"}
    </Button>)
  }
  function clearFiltersButton() {
    return(<Button
      onClick={() => {
          setSearchText("");
          setSearchInputText("");
          setShadeToleranceActiveFilter([]);
          setShadeToleranceSelected([]);
          setDurationActiveFilter([]);
          setDurationSelected([]);
          setGrowthHabitActiveFilter([])
          setGrowthHabitSelected([]);
          setActiveGrowthPeriodActiveFilter([]);
          setActiveGrowthPeriodSelected([]);
          setCommercialActiveFilter([]);
          setCommercialAvailabilitySelected([]);
          setPageNumber(0);
        }
      }
    >
    {"Clear Filters"}
    </Button>)
  }

  function onClickFavorite(isLiked, id) {
    const favoritePlantsCopy = JSON.parse(JSON.stringify(favoritePlants));
    if (isLiked === false) {
      favoritePlantsCopy.splice(favoritePlantsCopy.indexOf(id),1);
      setFavoritePlants(favoritePlantsCopy);
    }
    else {
      setFavoritePlants(favoritePlants.concat(id));
    }
  }

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
    const favoritedFilterResults = (favoritedFilter === false || favoritePlants.includes(plant.id));
    const shadeToleranceResults = (shadeToleranceActiveFilter.length === 0 || shadeToleranceActiveFilter.includes(plant.shadeTolerance));
    const durationResults = (durationActiveFilter.length === 0 || isValueIncluded(plant.duration, durationActiveFilter));
    const growthHabitResults = (growthHabitActiveFilter.length === 0 || isValueIncluded(plant.growthHabit, growthHabitActiveFilter))
    const activeGrowthPeriodResults = (activeGrowthPeriodActiveFilter.length ===0 || plant.activeGrowthPeriod === "Year Round" || isValueIncluded(plant.activeGrowthPeriod, activeGrowthPeriodActiveFilter))
    const commercialAvailabilityResults = (commercialAvailabilityActiveFilter.length === 0 || commercialAvailabilityActiveFilter.includes(plant.commercialAvailability))
    const searchFilterResults = (searchText === "" || plant.genus.toLowerCase().includes(searchText.toLowerCase()) || plant.species.toLowerCase().includes(searchText.toLowerCase()) || plant.commonName.toLowerCase().includes(searchText.toLowerCase()));
    return (searchFilterResults && shadeToleranceResults &&  durationResults && growthHabitResults && activeGrowthPeriodResults && commercialAvailabilityResults && favoritedFilterResults);
  });
  const maxLength = ((pageNumber + plantsPerPage) > filteredPlantList.length) ? filteredPlantList.length : (pageNumber + plantsPerPage);
  
  const displayPlantList = filteredPlantList.slice(pageNumber, maxLength);

  const plantHeaderItems = (displayPlantList.length === 0) ? <div><h1>There are no plants that match this filter</h1></div>: displayPlantList.map(plant => {return (
  <div className={"plantConainter"}>
    <div className={"favoritePlantContainer"}>
      <Icon>
        {favoritePlants.includes(plant.id) ? <FavoriteIcon onClick = {() => onClickFavorite(false, plant.id)} /> : <FavoriteBorderIcon onClick={() => {onClickFavorite(true, plant.id)}}/>}
      </Icon>
    </div>
    <div className={"plantDetailContainer"} key={plant.id} onClick={() => {setToggle(true); setSelectedPlant(plant);}}>
      <span className={"plant"}> {"Common Name: " + plant.commonName} </span>
      <span className={"plant"}> {`Scientific Name: ${plant.genus} ${plant.species}`} </span>
      <div className={"content"}>
        <img alt={plant.photoName}className={"plantImage"} src={`./images/${plant.genus}-${plant.species}.jpg`}/>
        <div className={"attributes"}>
          <div>{`States and Province: ${plant.stateAndProvince}`} </div>
          <div>{`Duration: ${plant.duration}`} </div>
          <div>{`Growth Habit: ${plant.growthHabit}`} </div>
          <div>{`Native Status: ${plant.nativeStatus}`} </div>
          <div>{`Active Growth Period: ${plant.activeGrowthPeriod}`} </div>
          <div>{`Shade Tolerance: ${plant.shadeTolerance}`} </div>
          <div>{`Commercial Availability: ${plant.commercialAvailability}`} </div>
        </div>
      </div>  
      <div>{`Photo by user ${plant.uploader} submitted to iNaturalist.org`}</div>

    </div>
  </div>
  )})

  const pageStatus = 
  (
    <div className={'plantsPerPage'}>
      <p>{`Showing Plants ${pageNumber + 1}-${maxLength} Of ${filteredPlantList.length}`}</p>

      <IconButton
        disabled = {(pageNumber === 0) ? true : false}
        onClick={() => {const value = (pageNumber - plantsPerPage < 0) ? 0 : pageNumber- plantsPerPage; setPageNumber(value)}}
      >
        <KeyboardArrowLeftIcon/>
      </IconButton>
      <IconButton
        disabled = {(pageNumber + plantsPerPage >= filteredPlantList.length) ? true : false}
        onClick={() => setPageNumber(pageNumber + plantsPerPage)}
      >
        <KeyboardArrowRightIcon/>
      </IconButton>
      <p>{'Rows Per Page'}</p>
      <Select
        style={{ width: "50px", marginLeft: "10px" }}
        value={plantsPerPage}
        onChange={e => {setPlantsPerPage(e.target.value)}}
      >
        {plantsPerPageOptions.map(item => (
          <MenuItem key={item} value={item} id={item}>
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>

    </div>

  )

  const favoriteToggle = (
    <FormControlLabel
      control={
        <Switch
          color="primary" 
          checked={favoritedFilter}
          onChange={() => {setFavoritedFilter(!favoritedFilter);}}
        />
      }
      label="Show Favorites Only"
      labelPlacement="start"
    />
  )
  
  const plantProps = {
    selectedPlant
  };

  return (
    <div className={"plantListContainer"}>
      <div className={"plantFilterBars"}>
        {displayFilterBars("Shade Tolerances", shadeToleranceSelected, setShadeToleranceSelected, shadetoleranceOptions)}
        {displayFilterBars("Durations", durationSelected, setDurationSelected, durationOptions)}
        {displayFilterBars("Growth Habits", growthHabitSelected, setGrowthHabitSelected, growthHabitOptions)}
        {displayFilterBars("Active Growth Habits", activeGrowthPeriodSelected, setActiveGrowthPeriodSelected, activeGrowthPeriodOptions)}
        {displayFilterBars("Commercial Availability", commercialAvailabilitySelected, setCommercialAvailabilitySelected, commercialAvailabilityOptions)}
        {displaySearchBar()}
        {applyFilterButton()}
        {clearFiltersButton()}
        {favoriteToggle}
      </div>
      {loading ? null : pageStatus}
      {loading ? null : plantHeaderItems}

      <Dialog fullScreen={true} open={toggle} onClose={() => {setToggle(false)} }>
        <Button className={"header"} onClick={() => {setToggle(false); setSelectedPlant({});}} >
          Close
        </Button>
        <Plant props={plantProps}/>
      </Dialog>

      <Backdrop className={"backdrop"} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>


  );
}

function Plant(props) {
  const {selectedPlant} = props.props; 
  return (<Iframe url={`https://www.inaturalist.org`}
  id="myId"
  className="dialogBody"
  display="initial"
  position="relative"/>);
}

export default PlantList;
