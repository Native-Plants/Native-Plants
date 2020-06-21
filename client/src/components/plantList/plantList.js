import React, {useState, useEffect} from 'react';
import green from '@material-ui/core/colors/green';
import DoneIcon from '@material-ui/icons/Done';
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
  Chip
} from "@material-ui/core/";
import './plantList.css';
import Tabletop from 'tabletop';

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
data.lightOptions = [
    {id:1, name: "Sun"},
    {id:2, name: "Partial Sun"},
    {id:3, name: "Shade"},
];
data.temperateZoneOptions = [
    {id:1, name: "1a"},
    {id:2, name: "1b"},
    {id:3, name: "2a"},
    {id:4, name: "2b"},
    {id:5, name: "3a"},
    {id:6, name: "3b"},
    {id:7, name: "4a"},
    {id:8, name: "4b"},
    {id:9, name: "5a"},
    {id:10, name: "5b"},
    {id:11, name: "6a"},
    {id:12, name: "6b"},
    {id:13, name: "7a"},
    {id:14, name: "7b"},
    {id:15, name: "8a"},
    {id:16, name: "8b"},
    {id:17, name: "9a"},
    {id:18, name: "9b"},
    {id:19, name: "10a"},
    {id:20, name: "10b"}
];
// data.plantList = [
//     {id: 1, photoName: "achillea-millefolium-flower-closeup-sef", extension: "jpg", commonName: "Yarrow", scientificName: "Achillea millefolium",  description: "A good garden plant with fern-like foliage, showy flowers, and fragrant leaves. Introduced to America in colonial times and has since spread throughout the U.S. A tough plant which tolerates drought and poor soils as long as drainage is good. With its aggressive spreading habit, plants can naturalize into substantial colonies. Plant stems tend to flop in hot, humid climates or if grown in rich, moist soils. Species is rarely sold in nurseries but cultivars are common and include a range of colors. Attracts butterflies and bees.", lightId: 1, temperateZoneId: 13 },
//     {id: 2, photoName: "dolls_eyes_baneberry", extension: "jpg", commonName: "Doll's Eyes, White Baneberry", scientificName: "Actaea pachypoda", description: "Attractive plant with white fruit.  Berries poisonous.", lightId: 3, temperateZoneId: 13 },
//     {id: 3, photoName: "aga-yellow-giant-hyssop1", extension: "jpg", commonName: "Yellow Giant Hyssop", scientificName: "Agastache nepetoides", description: "Fast-growing, low maintenance plant in the mint family. Masses well. Dislikes dry sunny areas and foliage will wilt in hot dry summer weather.  Attracts butterflies and bees.", lightId: 2, temperateZoneId: 13}
// ];

function PlantList() {
  const [lightOptions, setLightOptions] = useState(data.lightOptions);
  const [lightOptionsSelectedIds, setLightOptionsSelectedIds] = useState([]);
  const [temperateZoneOptions, setTemperateZoneOptions] = useState(data.temperateZoneOptions);
  const [temperateZoneOptionsSelectedIds, setTemperateZoneOptionsSelectedIds] = useState([]);
  const [plantList, setPlantList] = useState([]);
  
  const [searchText, setSearchText] = useState("");

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      Tabletop.init({
        key: '1xq_h1oDzlFt8wU4qLwVUHDN6P-z9v_A39bgNyb9rOng',
        callback: plants => {
          setPlantList(plants);
        },
        simpleSheet: true
      })
    }

    fetchData();
  }, []);

  function lookupValueByName(options, value, name) {
    for(let index = 0; index < options.length; index++) {
      if(options[index]["id"] == value) {
        return options[index][name];
      }
    }
    return "";
  }

  function displaySearchBar() {
    return (
      <div className={"plantFilter"}>
        <TextField
          style={{ width: "250px" }}
          label="Search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
    );
  }

  const handleChipDelete = (data, options, onChange) => () => {
    onChange((options) => options.filter((option) => option.id !== data.key));
  }

  function displayFilterBars(inputText, value, onChange, options ) {
    const selectedOptions = options.filter(option => {
      return value.includes(option.id);
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
                        key={selectedOption.id} 
                        label={selectedOption.name}
                        variant={"outlined"}
                        id={selectedOption.id}
                        onDelete={handleChipDelete(data, options, onChange)}
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
            style={{ width: "250px" }}
            value={value}
            onChange={e => {onChange(e.target.value)}}
            multiple={true}
          >
            {options.map(item => (
              <MenuItem key={item.id} value={item.id} id={item.id}>
                <GreenCheckbox checked = {value.includes(item.id)}/>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    )
  };

  function filterListByRange(min, max, list) {
    let isIncluded = false;
    for (const value of list)
    {
      if(value >= parseInt(min, 10) && value <= parseInt(max, 10)) {
        isIncluded = true;
        break;
      }
    }
    return isIncluded
  }

  function clearFilters() {
    return(<Button
      onClick={() => {
          setSearchText("");
          setLightOptionsSelectedIds([]);
          setTemperateZoneOptionsSelectedIds([]);
        }
      }
    >
    {"Clear Filters"}
  </Button>)
  }

  const filteredPlantList = plantList.filter(plant => {
    const temperateZoneFilterResults = (temperateZoneOptionsSelectedIds.length === 0 || filterListByRange(plant.temperateZoneMinId, plant.temperateZoneMaxId, temperateZoneOptionsSelectedIds));
    const lightFilterResults = (lightOptionsSelectedIds.length === 0 || lightOptionsSelectedIds.includes(parseInt(plant.lightId, 10)));
    const searchFilterResults = (searchText === "" || plant.scientificName.toLowerCase().includes(searchText.toLowerCase()) || plant.commonName.toLowerCase().includes(searchText.toLowerCase()) || plant.description.toLowerCase().includes(searchText.toLowerCase()));
    return (lightFilterResults && temperateZoneFilterResults && searchFilterResults);
  });

  const plantHeaderItems = filteredPlantList.map(plant => {return (
    <div className={"plantContainer"} key={plant.id} onClick={() => setToggle(true)}>
      <span className={"plant"}> {"Common Name: " + plant.commonName} </span>
      <span className={"plant"}> {"Scientific Name: " + plant.scientificName} </span>
      <div className={"content"}><img alt={plant.photoName}className={"plantImage"} src={`./images/${plant.photoName}.${plant.extension}`}/> <div className={"plantDescription"}>{plant.description}</div></div>
      <div className={"plantCategories"}>
        <div className={"plantCategory"}>{"Light Requirement: " + lookupValueByName(lightOptions, plant.lightId, "name")}</div>
        <div className={"plantCategory"}>{"Temperature Zone Range: " + lookupValueByName(temperateZoneOptions, plant.temperateZoneMinId, "name") + " - " + lookupValueByName(temperateZoneOptions, plant.temperateZoneMaxId, "name")}</div>
      </div>
    </div>
  )})

  return (
    <div className={"plantListContainer"}>
      <div className={"plantFilterBars"}>

        {displayFilterBars("Light Requirements", lightOptionsSelectedIds, setLightOptionsSelectedIds, lightOptions)}
        {displayFilterBars("Temperate Zones", temperateZoneOptionsSelectedIds, setTemperateZoneOptionsSelectedIds, temperateZoneOptions)}
        {displaySearchBar()}
        {clearFilters()}
      </div>

      {plantHeaderItems}

      <Dialog fullScreen={true} open={toggle} onClose={() => {setToggle(false)} }>
        <Button onClick={() => {setToggle(false)}} >
          Close
        </Button>
      </Dialog>
    </div>


  );
}

export default PlantList;
