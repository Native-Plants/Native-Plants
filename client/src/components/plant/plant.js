import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Backdrop, CircularProgress } from '@material-ui/core';
import Tabletop from 'tabletop';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles({
    flex: {
        display:"flex"
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
    }
});


function Plant() {
    let { plantName } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true)
    const classes = useStyles();

    useEffect(() => {  
        async function fetchData() {
          Tabletop.init({
            key: '1xq_h1oDzlFt8wU4qLwVUHDN6P-z9v_A39bgNyb9rOng',
            callback: plants => {
                /* Find the desired plant */
                const plantList = plants.filter(item => {
                    return plantName === `${item.genus}-${item.species}`
                })
                console.log(plantList);
                if (plantList.length !== 0) {
                    setPlant(plantList[0])
                }
                console.log("Does this update");
                setLoading(false);
            },
            simpleSheet: true
          })
        }
        fetchData();
      }, [plantName]);

    let content = null;
    if (loading === false && plant === null) {
        content = (<div>{"Plant Not Found"}</div>)
    }
    else if (plant !== null) {
        const attribute = (<div>{`Photo by user ${plant.uploader} submitted to iNaturalist.org`}</div>);

        content = (
        <div className={classes.flex}>
          <div className={classes.pictureCard}>
              <img className={classes.imageFit} alt={plant.photoName}src={`../images/${plant.genus}-${plant.species}.jpg`}/>
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
      </div>)
    }
    return (
    <Grid container>
        <Grid item>
            {content}
        </Grid>
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
    </Grid>
    )
}
  
  export default Plant