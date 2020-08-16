import React from "react";
import Status from "./status";
import PlantCard from "./plantCard";
import {Grid} from "@material-ui/core/";
    
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
            <PlantCard key={plant.id} props={plantCardProps}/>
        )
    });

    return (
        <div>
            <Status props={pageStatusProps}/>
            <Grid container>
                {plantCard}
            </Grid>
        </div>
    );
}

export default Plants;