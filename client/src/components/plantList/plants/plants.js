import React, { useState, Fragment } from "react";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
    IconButton, Select, MenuItem, ListItemText, makeStyles, Icon, Grid, Typography, Dialog, Button
} from "@material-ui/core/";
import data from '../../shared/pageViewOptions'
    
const useStyles = makeStyles({
    statusBar: {
        display: 'flex',
        paddingTop: '15px'
    },
    flex: {
        display: 'flex'
    },
    columnFlex: {
        display: 'flex',
        flexDirection: 'column'
    },
    rightAligned: {
        marginRight: '0',
        marginLeft: 'auto'
    },
    fitContent: {
        width:"fit-content"
    },
    pictureCard: {
        paddingTop: "15px",
        paddingBottom: "15px"
    }
});

function Plants(props) {
    const {pageStatusProps, plantCardsProps} = props.props;

    function onClickFavorite(isLiked, id) {
        const favoritePlantsCopy = JSON.parse(JSON.stringify(plantCardsProps.favoritePlants));
        if (isLiked === false) {
          favoritePlantsCopy.splice(favoritePlantsCopy.indexOf(id),1);
          plantCardsProps.setFavoritePlants(favoritePlantsCopy);
        }
        else {
            plantCardsProps.setFavoritePlants(plantCardsProps.favoritePlants.concat(id));
        }
    }

    const plantCard = plantCardsProps.displayPlantList.map(plant => {
        const favorited = plantCardsProps.favoritePlants.includes(plant.id);
        const plantCardProps = {
            plant, favorited, onClickFavorite
        };

        return (
            <PlantCard props={plantCardProps}/>
        )
    })

    return (<div>
        <Status props={pageStatusProps}/>
        <Grid container>
            {plantCard}
        </Grid>
    </div>)
}

function Status(props) {
    const {pageNumber, setPageNumber, plantsPerPage, setPlantsPerPage, maxLength, filteredPlantLength} = props.props;
    const plantsPerPageOptions = data.data.plantsPerPageOptions;
    const classes = useStyles();
    return (
        <div className={classes.statusBar}>
            <p>{`Showing Plants ${pageNumber + 1}-${maxLength} Of ${filteredPlantLength}`}</p>
            <IconButton
                disabled = {(pageNumber === 0) ? true : false}
                onClick={() => {const value = (pageNumber - plantsPerPage < 0) ? 0 : pageNumber- plantsPerPage; setPageNumber(value)}}
            >
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton
                disabled = {(pageNumber + plantsPerPage >= filteredPlantLength) ? true : false}
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
}

function PlantCard(props) {
    const {plant, favorited, onClickFavorite} = props.props;
    const [detailsToggle, setDetailsToggle] = useState(false);
    const classes = useStyles();

    const plantDetailProps = {
        plant
    }
    
    const attribute = (<div>{`Photo by user ${plant.uploader} submitted to iNaturalist.org`}</div>);
    return (
        <Fragment>
            <Grid xs={4} className={classes.pictureCard}>
                <div className = {classes.fitContent}>
                    <img alt={plant.photoName}src={`./images/${plant.genus}-${plant.species}.jpg`} onClick={() => setDetailsToggle(!detailsToggle)}/>
                    {/* {attribute} */}
                    <div className={classes.flex}>
                        <div className={classes.columnFlex} onClick={() => setDetailsToggle(!detailsToggle)}>
                            <Typography variant="p">
                                {plant.commonName}
                            </Typography>
                            <Typography variant="p">
                                {`${plant.genus} ${plant.species}`}
                            </Typography>
                        </div>
                        <div className = {classes.rightAligned}>
                            <Icon>
                                {favorited ? <FavoriteIcon onClick = {() => onClickFavorite(false, plant.id)} /> : <FavoriteBorderIcon onClick={() => {onClickFavorite(true, plant.id)}}/>}
                            </Icon>
                        </div>
                    </div>
                </div>
            </Grid>
            
            <Dialog fullScreen={true} open={detailsToggle} onClose={() => {setDetailsToggle(false)} }>
                <Button className={"header"} onClick={() => setDetailsToggle(false)}>
                    Close
                </Button>
                <PlantDetails props={plantDetailProps}/>
            </Dialog>
        </Fragment>
    )
}


function PlantDetails(props) {
  const {plant} = props.props;
  const classes = useStyles();
  const attribute = (<div>{`Photo by user ${plant.uploader} submitted to iNaturalist.org`}</div>);
  return (
    <div className={classes.flex}>
        <div>
            <img alt={plant.photoName}src={`./images/${plant.genus}-${plant.species}.jpg`}/>
            {attribute}
        </div>
        <div>
            <div>{"Common Name: " + plant.commonName} </div>
            <div>{`Scientific Name: ${plant.genus} ${plant.species}`} </div>
            <div>{`States and Province: ${plant.stateAndProvince}`} </div>
            <div>{`Duration: ${plant.duration}`} </div>
            <div>{`Growth Habit: ${plant.growthHabit}`} </div>
            <div>{`Native Status: ${plant.nativeStatus}`} </div>
            <div>{`Active Growth Period: ${plant.activeGrowthPeriod}`} </div>
            <div>{`Shade Tolerance: ${plant.shadeTolerance}`} </div>
            <div>{`Commercial Availability: ${plant.commercialAvailability}`} </div>
        </div>
    </div>
  );
}

export default Plants;
