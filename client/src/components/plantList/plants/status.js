
import React from "react";
import { Select, MenuItem, ListItemText, IconButton, makeStyles, Grid, Typography, Hidden } from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import data from '../../shared/pageViewOptions'

const useStyles = makeStyles({
    statusBar: {
        paddingTop: '15px',
    },
    statusItem: {
        display: 'flex',
        margin: 'auto',
        height: '100%'
    },
    centerText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
});

function Status(props) {
    const {pageNumber, setPageNumber, plantsPerPage, setPlantsPerPage, maxLength, filteredPlantLength} = props.props;
    const plantsPerPageOptions = data.data.plantsPerPageOptions;
    const classes = useStyles();

    const pageSizeSelect = (
        <div className={classes.statusItem}>
            <Typography variant= "body1" color={"secondary"} className={classes.centerText}>
                {'Rows Per Page'}
            </Typography>
            <Select
                style={{ width: "50px", marginLeft: "10px" }}
                value={plantsPerPage}
                onChange={e => {setPlantsPerPage(e.target.value); setPageNumber(0);}}
                color={"secondary"}
            >
                {plantsPerPageOptions.map(item => (
                <MenuItem key={item} value={item} id={item}>
                    <ListItemText primary={item} />
                </MenuItem>
                ))}
            </Select>
        </div>
    );

    const pageStatusInfo =(
        <div className={classes.statusItem}>
            <Typography variant= "body1" color={"secondary"} className={classes.centerText}>
                {`Showing Plants ${pageNumber + 1}-${maxLength} Of ${filteredPlantLength}`}
            </Typography>
        </div>
    );

    const pageNavigation = (
        <div className={classes.statusItem}>
            <IconButton
                disabled = {(pageNumber === 0) ? true : false}
                onClick={() => {const value = (pageNumber - plantsPerPage < 0) ? 0 : pageNumber- plantsPerPage; setPageNumber(value)}}
                color={"secondary"}
            >
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton
                disabled = {(pageNumber + plantsPerPage >= filteredPlantLength) ? true : false}
                onClick={() => setPageNumber(pageNumber + plantsPerPage)}
            >
                <KeyboardArrowRightIcon/>
            </IconButton>
        </div>
    )
    return (
        <Grid container>
            <Hidden smDown>
                <Grid item md={5}/>
            </Hidden>
            <Grid item sm={5} md={2} xs={12}>
                {pageSizeSelect}
            </Grid>
            <Grid item sm={5} md={3} xs={12}>
                {pageStatusInfo}
            </Grid>
            <Grid item sm={2} md={2} xs={12}>
                {pageNavigation}
            </Grid>
        </Grid> 
    )
}

export default Status