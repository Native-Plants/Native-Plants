import { makeStyles, withStyles, ListItemText, Divider, IconButton, TextField, Typography, Checkbox } from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState, Fragment } from "react";
import green from '@material-ui/core/colors/green';
import data from '../../shared/filterOptions';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

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
        display: 'flex'
    },
    searchBar: {
        paddingTop: '15px',
        paddingBottom: '15px'
    }
});

function Filter(props) {
    const {searchText, setSearchText, favoritedFilter, setFavoritedFilter, selects} = props.props;
    const classes = useStyles();

    const displaySearchBar =  (
        <div className = {classes.searchBar}>
            <TextField
                style={{ width: "250px"}}
                label="Search Plants"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
        </div>
    );

    const displayFilter = selects.map(select => {
        const displayFilterProps = {label: select.label, list: select.list, setList: select.setList, options: select.options};
        return (<DisplayFilter props={displayFilterProps}/>)
    })
    
    const displayFavoritedFilter = (
        <div
            className={classes.option}
            onClick={() => {setFavoritedFilter(!favoritedFilter)}}
        >
            <GreenCheckbox
                checked = {favoritedFilter}
            />
            <ListItemText primary={"Show Favorited Plants"} />
        </div>

    )

    return (
        <div className={classes.filters}>
            {displaySearchBar}
            <Typography variant="h5">
                Filters
            </Typography>
            {displayFavoritedFilter}
            {displayFilter}
            
        </div>
    )

}

function DisplayFilter(props) {
    
    const {label, list, setList, options} = props.props;
    const [toggle, setToggle] = useState(false);
    const classes = useStyles();

    const icon = (toggle === false) ? (<ExpandMoreIcon />) : (<ExpandLessIcon />);

    function handleClick(e) {
        let tempList = JSON.parse(JSON.stringify(list));
        console.log(tempList)
        if (list.includes(e)) {
            tempList = tempList.filter(item => {return(item != e)})
        }
        else {
            tempList.push(e);
        }
        setList(tempList);
    }

    const optionCheckboxes = data.data[options].map(option => {
        return(
            <div className={classes.option}
                onClick = {()=> handleClick(option)}
            >
                <GreenCheckbox
                    checked = {list.includes(option)}
                    value ={option}
                />
                <ListItemText primary={option} />
            </div>
        )
    })

    const displayOptions = (toggle === false) ? null : optionCheckboxes;


    return (
        <Fragment>
            <div className={classes.filter}>
                <Typography variant="h6">
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