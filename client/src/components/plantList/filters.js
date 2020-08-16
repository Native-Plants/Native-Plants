import { makeStyles, Divider, IconButton, TextField, Typography, Checkbox, Grid, FormControlLabel, Hidden } from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search'
import React, { useState, Fragment } from "react";
import data from '../shared/filterOptions';

// const GreenCheckbox = withStyles({
//     root: {
//       color: green[400],
//       '&$checked': {
//         color: green[600],
//       },
//     },
//     checked: {},
// })(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
    filters: {
        display: 'flex',
        flexDirection: 'column'
    },
    filter: {
        display: 'flex',
        paddingTop: '15px'
    },
    toggleIcon: {
        marginRight: '0',
        marginLeft: 'auto'
    },
    option: {
        paddingLeft: '25px'
    },
    searchBar: {
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    searchField: {
        flexGrow: 1
    },
    backIcon: {
        marginRight: '0',
        marginLeft: 'auto'
    }
});

function Filter(props) {
    const {searchText, setSearchText, favoritedFilter, setFavoritedFilter, selects, setPageNumber, setMobileFilterToggle} = props.props;
    const classes = useStyles();
    const displaySearchBar =  (
        <div className = {classes.searchBar}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <Search />
                </Grid>
                <Grid item className={classes.searchField}>
                    <TextField
                        id="Search Plants"
                        label="Search Plants"
                        fullWidth={true}
                        value={searchText}
                        color={"secondary"}
                        onChange={e => {
                            setSearchText(e.target.value);
                            setPageNumber(0);
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );

    const displayFilter = selects.map(select => {
        const displayFilterProps = {label: select.label, list: select.list, setList: select.setList, options: select.options, setPageNumber};
        return (<DisplayFilter key={select.label} props={displayFilterProps}/>)
    })
    
    const displayFavoritedFilter = (
        <div>
            <FormControlLabel control={<Checkbox checked={favoritedFilter} onChange={() => {setFavoritedFilter(!favoritedFilter); setPageNumber(0);}}/>} label="Show Favorite Plants" />
        </div>
    )

    return (
        <div className={classes.filters}>
            <Hidden mdUp>
                <IconButton onClick = {() => setMobileFilterToggle(false)}>
                    <ArrowBackIcon className={classes.backIcon}/>
                </IconButton>
            </Hidden>
            {displaySearchBar}
            <Hidden smDown>
                <Typography variant="h5" color={"secondary"}>
                    Filters
                </Typography>
            </Hidden>
            {displayFavoritedFilter}
            {displayFilter}
        </div>
    )
}

function DisplayFilter(props) {
    
    const {label, list, setList, options, setPageNumber} = props.props;
    const [toggle, setToggle] = useState(false);
    const classes = useStyles();

    const icon = (toggle === false) ? (<ExpandMoreIcon />) : (<ExpandLessIcon />);

    function handleClick(e) {
        let tempList = JSON.parse(JSON.stringify(list));
        if (list.includes(e)) {
            tempList = tempList.filter(item => {return(item !== e)})
        }
        else {
            tempList.push(e);
        }
        setList(tempList);
        setPageNumber(0);
    }

    const optionCheckboxes = data.data[options].map(option => {
        return(
            <div
                className={classes.option}
                key={option}
            >
                <FormControlLabel control={<Checkbox checked={list.includes(option)} value={option} onChange={()=> handleClick(option)}/>} label={option} />
            </div>
        )
    })

    const displayOptions = (toggle === false) ? null : optionCheckboxes;
    
    return (
        <Fragment>
            <div className={classes.filter}>
                <Typography variant="h6" color={"secondary"}>
                    {label}
                </Typography>
                <IconButton
                    onClick={() => setToggle(!toggle)}
                    className={classes.toggleIcon}
                >
                    {icon}
                </IconButton>
            </div>
            {displayOptions}
            <Divider />
        </Fragment>
    );
}

export default Filter;