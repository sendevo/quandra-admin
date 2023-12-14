export const haversine = (pos1, pos2) => { // pos:{lat, lng}
    // https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
    const R = 6378.137; // Radius of Earth
    const dLat = pos2.lat * Math.PI / 180 - pos1.lat * Math.PI / 180;
    const dLon = pos2.lng * Math.PI / 180 - pos1.lng * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const dist = (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    return dist;
};

export const routeLength = route => {
    let totalDistance = 0;
    for(let i = 0; i < route.length - 1; i++)
        totalDistance += haversine(route[i], route[i + 1]);
    return totalDistance;
};

export const routeToGeoJson = route => ({
    type: "Feature",
    properties: {},
    geometry: {
        coordinates: [route.map(p => ([p.lng, p.lat]))],
        type: "LineString"
    }
});