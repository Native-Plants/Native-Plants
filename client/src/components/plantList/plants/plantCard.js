import React, { Fragment } from "react";
import { Grid, Typography, Icon, makeStyles, Hidden } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({

    flex: {
        display: 'flex',
        width: '85%'
    },
    columnFlex: {
        display: 'flex',
        flexDirection: 'column',
    },
    navLink: {
        textDecoration: 'none'
    },
    rightAligned: {
        marginRight: '0',
        marginLeft: 'auto'
    },
    pictureCard: {
        paddingTop: "15px",
        paddingBottom: "15px",
        height: '500px'
    },
    imageFit: {
        objectFit: "cover",
        width: '85%',
        height: '80%'
    },
    imageFitMobile: {
        objectFit: "cover",
        width: '100%',
        height: '80%'
    }
});

function PlantCard(props) {
    const {plant, favorited, onClickFavorite} = props.props;
    const classes = useStyles();
    
    //const attribute = (<div>{`Photo by user ${plant.uploader} submitted to iNaturalist.org`}</div>);
    const photoName = `${plant.genus}-${plant.species}`
    return (
        <Fragment>
            <Grid item xs={12} md={4} sm={6} className={classes.pictureCard}>
                <NavLink to = {`/plant/${photoName}`} className={classes.navLink}>
                    <Hidden smDown>
                        <img className={classes.imageFit} alt={photoName} src={`./images/${photoName}.jpg`}/>
                    </Hidden>
                    <Hidden mdUp>
                        <img className={classes.imageFitMobile} alt={photoName} src={`./images/${photoName}.jpg`}/>
                    </Hidden>
                </NavLink>
                    <div className={classes.flex}>
                        <NavLink to = {`/plant/${photoName}`} className={classes.navLink}>
                            <div className={classes.columnFlex}>
                                <Typography variant="h6" color={"secondary"}>
                                    {plant.commonName}
                                </Typography>
                                <Typography variant="subtitle1" color={"secondary"}>
                                    {`${plant.genus} ${plant.species}`}
                                </Typography>
                            </div> 
                        </NavLink>
                        <div className = {classes.rightAligned}>
                            <Icon>
                                {favorited ? <FavoriteIcon onClick = {() => onClickFavorite(false, plant.id)} /> : <FavoriteBorderIcon onClick={() => {onClickFavorite(true, plant.id)}}/>}
                            </Icon>
                        </div>
                    </div>
            </Grid>
        </Fragment>
    )
}

export default PlantCard