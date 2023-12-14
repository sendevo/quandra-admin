import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { 
    useMap, 
    useMapEvents,
    MapContainer, 
    TileLayer, 
    Polyline,
    Circle,
    Marker
} from 'react-leaflet';
import { INITIAL_LOCATION } from "../../model/constants";
import { FaTrash } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';

const LocationUpdater = ({lat, lng}) => {
    // This component allows to move the map center location
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
};

const MapClickHandler = ({onSetRoute}) => {
    // This component listen to map events
    useMapEvents({
        click: e => onSetRoute(prevPoints => [...prevPoints, e.latlng])
    });
    return null;
};

const mapStyle = {
    width:"100%", 
    height: "75vh", 
    cursor: "default"
};

const buttonStyle = { 
    position: 'absolute', 
    borderRadius: "50%",
    padding:"10px",
    zIndex: 1000,
    top: 10, 
    right: 10, 
    minWidth: 0,
    minHeight: 0
};

const MapView = ({route, setRoute}) => {
    const [location, setLocation] = useState({
        lat: INITIAL_LOCATION.lat, 
        lng: INITIAL_LOCATION.lng
    });

    useEffect(() => { // Move to users current location
        navigator.geolocation.getCurrentPosition(
            pos => {
                const coords = pos.coords;
                setLocation({
                    lat: coords.latitude, 
                    lng: coords.longitude
                });
            },
            err => console.error(err)
        );
    }, []);

    const handleClearRoute = e => {
        e.preventDefault();
        e.stopPropagation();
        setRoute([]);
    };

    return (
        <MapContainer 
            style={mapStyle}
            center={INITIAL_LOCATION} 
            zoom={14} 
            scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <LocationUpdater lat={location.lat} lng={location.lng} />
            <MapClickHandler onSetRoute={setRoute}/>
            {route.length > 1 && <Polyline positions={route} color="red" />}
            {route.map((point, index) => (
                <Circle 
                    key={index} 
                    center={[point.lat, point.lng]}
                    pathOptions={{ fillColor: 'blue' }}
                    radius={20} />
            ))}
            {route.length > 0 && (
                <Button 
                    variant="contained" 
                    size="small"
                    color="red" 
                    onClick={handleClearRoute}
                    sx={buttonStyle}>
                    <FaTrash size={18} />
                </Button>
            )}
        </MapContainer>
    );
};

export default MapView;