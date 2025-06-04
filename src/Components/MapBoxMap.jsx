import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationContext } from '../contexts/locationContext';

mapboxgl.accessToken = 'pk.eyJ1IjoidmFudnUiLCJhIjoiY21iNXg0N3BrMXk4dDJrcjBxZDQwNDNybCJ9.99YEzE6o1GjDRg6LaCkazg';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const { location } = useContext(LocationContext);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: location || [106.7208, 10.7324],
            zoom: 14,
        });
    }, []);

    useEffect(() => {
        if (!map.current || !location) return;
        map.current.setCenter(location);
    }, [location]);

    return (
        <div>
            <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
        </div>
    );
};

export default Map;
