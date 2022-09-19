import { useState } from "react";

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('')
    const [latLng, setLatLng] = useState("");
    const [isFindingLocation, setIsFindingLocation] = useState(false);

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLng(`${latitude},${longitude}`);
        // setLocationErrorMsg("");
        setIsFindingLocation(false);
    }

    const error = () => {
        setIsFindingLocation(false);
        setLocationErrorMsg('Unable to retrieve your location');
        
    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg('Geolocation is not supported by your browser');
          } else {
            // status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }
    
    return {
        latLng,
        locationErrorMsg,
        handleTrackLocation,
        isFindingLocation,
    }
}

export default useTrackLocation;