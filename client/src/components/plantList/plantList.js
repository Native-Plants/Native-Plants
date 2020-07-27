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
  const [durationOptions, setDurationOptions] = useState(data.durationOptions);
  const [durationSelected, setDurationSelected] = useState([]);
  const [growthHabitOptions, setGrowthHabitOptions] = useState(data.growthHabitOptions);
  const [growthHabitSelected, setGrowthHabitSelected] = useState([]);
  const [activeGrowthPeriodOptions, setActiveGrowthPeriodOptions] = useState(data.activeGrowthPeriodOptions);
  const [activeGrowthPeriodSelected, setActiveGrowthPeriodSelected] = useState([]);
  const [commercialAvailabilityOptions, setCommercialAvailabilityOptions] = useState(data.commercialAvailabilityOptions);
  const [commercialAvailabilitySelected, setCommercialAvailabilitySelected] = useState([]);
  //const [temperateZoneOptions, setTemperateZoneOptions] = useState(data.temperateZoneOptions);
  //const [temperateZoneOptionsSelectedIds, setTemperateZoneOptionsSelectedIds] = useState([]);
  const [favoratedFilter, setFavoratedFilter] = useState(false);

  const [loading, setLoading] = useState(true);
  const [plantList, setPlantList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [plantsPerPage, setPlantsPerPage] = useState(10);
  const [favoratePlants, setFavoratePlants] = useState( () => {
    const localData = localStorage.getItem("favoratePlants");
    return (localData) ? JSON.parse(localData) : [];
  });

  const plantsPerPageOptions = [10,25,50];
  const [searchInputText, setSearchInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  const [toggle, setToggle] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState({});

  useEffect(() => {
    localStorage.setItem('favoratePlants', JSON.stringify(favoratePlants));

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
  }, [favoratePlants]);

  // function lookupValueByName(options, value, name) {
  //   for(let index = 0; index < options.length; index++) {
  //     if(options[index]["id"] == value) {
  //       return options[index][name];
  //     }
  //   }
  //   return "";
  // }sear

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

  // const handleChipDelete = (data, options, onChange) => () => {
  //   onChange((options) => options.filter((option) => option.id !== data.key));
  // }

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
                        //onDelete={handleChipDelete(data, options, onChange)}
                        // deleteIcon={
                        //   <div
                        //     onMouseDown={(event: MouseEvent) => {
                        //       if (!props.disabled) {
                        //         event.stopPropagation()
                        //         onDelete(value)
                        //       }
                        //     }}
                        //   >
                        //     <DeleteIcon />
                        //   </div>
                        // }
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

  // function filterListByRange(min, max, list) {
  //   let isIncluded = false;
  //   for (const value of list)
  //   {
  //     if(value >= parseInt(min, 10) && value <= parseInt(max, 10)) {
  //       isIncluded = true;
  //       break;
  //     }
  //   }
  //   return isIncluded
  // }

  function searchButton() {
    return(<Button
      onClick={() => {
          setSearchText(searchInputText);
          setPageNumber(0);
        }
      }
    >
    {"Search"}
  </Button>)
  }

  function onClickFavorate(isLiked, id) {
    const favoratePlantsCopy = JSON.parse(JSON.stringify(favoratePlants));
    if (isLiked === false) {
      favoratePlantsCopy.splice(favoratePlantsCopy.indexOf(id),1);
      setFavoratePlants(favoratePlantsCopy);
    }
    else {
      setFavoratePlants(favoratePlants.concat(id));
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
    const favoratedFilterResults = (favoratedFilter === false || favoratePlants.includes(plant.id));
    const shadeToleranceResults = (shadeToleranceSelected.length === 0 || shadeToleranceSelected.includes(plant.shadeTolerance));
    const durationResults = (durationSelected.length === 0 || isValueIncluded(plant.duration, durationSelected));
    const growthHabitResults = (growthHabitSelected.length === 0 || isValueIncluded(plant.growthHabit, growthHabitSelected))
    const activeGrowthPeriodResults = (activeGrowthPeriodSelected.length ===0 || plant.activeGrowthPeriod === "Year Round" || isValueIncluded(plant.activeGrowthPeriod, activeGrowthPeriodSelected))
    const commercialAvailabilityResults = (commercialAvailabilitySelected.length === 0 || commercialAvailabilitySelected.includes(plant.commercialAvailability))
    const searchFilterResults = (searchText === "" || plant.genus.toLowerCase().includes(searchText.toLowerCase()) || plant.species.toLowerCase().includes(searchText.toLowerCase()) || plant.commonName.toLowerCase().includes(searchText.toLowerCase()));
    return (searchFilterResults && shadeToleranceResults &&  durationResults && growthHabitResults && activeGrowthPeriodResults && commercialAvailabilityResults && favoratedFilterResults);
  });
  const maxLength = ((pageNumber + plantsPerPage) > filteredPlantList.length) ? filteredPlantList.length : (pageNumber + plantsPerPage);
  
  const displayPlantList = filteredPlantList.slice(pageNumber, maxLength);

  const plantHeaderItems = (displayPlantList.length === 0) ? <div><h1>There are no plants that match this filter</h1></div>: displayPlantList.map(plant => {return (
  <div className={"plantConainter"}>
    <div className={"favoratePlantContainer"}>
      <Icon>
        {favoratePlants.includes(plant.id) ? <FavoriteIcon onClick = {() => onClickFavorate(false, plant.id)} /> : <FavoriteBorderIcon onClick={() => {onClickFavorate(true, plant.id)}}/>}
      </Icon>
    </div>
    <div className={"plantDetailContainer"} key={plant.id} onClick={() => {setToggle(true); setSelectedPlant(plant);}}>
      <span className={"plant"}> {"Common Name: " + plant.commonName} </span>
      <span className={"plant"}> {`Scientific Name: ${plant.genus} ${plant.species}.jpg`} </span>
      <div className={"content"}>
        <img alt={plant.photoName}className={"plantImage"} src={`./images/${plant.genus.toLowerCase()}-${plant.species}.jpg`}/>
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

  const favorateToggle = (
    <FormControlLabel
      control={
        <Switch
          color="primary" 
          checked={favoratedFilter}
          onChange={() => {setFavoratedFilter(!favoratedFilter);}}
        />
      }
      label="Show Favorates Only"
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
        {searchButton()}  
        {favorateToggle}
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
