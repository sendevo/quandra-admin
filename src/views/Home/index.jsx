import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MainView from "../../components/MainView";
import MapView from "../../components/MapView";
import Preloader from "../../components/Preloader";
import { routeLength, routeToGeoJson } from "../../model/utils";
import { API_URL, PRELOADER_TIMEOUT } from "../../model/constants";


const View = () => {
   
    const [route, setRoute] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAPICall = () => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(routeToGeoJson(route))
        };
        setLoading(true);
        setTimeout(() => {setLoading(false);}, PRELOADER_TIMEOUT);
        console.log("Fetching data...");
        console.log(API_URL, request);
        fetch(API_URL, request)
            .then(res => {
                console.log("API response");
                console.log(res.json());
                setLoading(false);
            })
            .catch(err => console.error(err));
    };

    return (
        <MainView>
            <Box sx={{mt:3}}>
                <Typography variant="h6">Dibuje una ruta sobre el mapa</Typography>
            </Box>
            <Box sx={{mt:3}}>
                <MapView route={route} setRoute={setRoute} />
            </Box>
            {route.length > 0 &&
                <Box sx={{mt:3}}>
                    <Typography>Secciones: {route.length-1}</Typography>
                    <Typography>Longitud de trayecto: {routeLength(route).toFixed(2)} km</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            size={"large"}
                            variant="contained"
                            onClick={handleAPICall}>
                                Evaluar
                        </Button>
                    </Box>
                </Box>
            }
            {loading && <Preloader />}
        </MainView>
    );
};

export default View;