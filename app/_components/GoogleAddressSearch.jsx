"use client";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import React from "react";
import { MapPin } from "lucide-react";
function GoogleAddressSearch({selectedAddress,setCoordinates}) {
  return (
    <div className="flex w-full items-center">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200"/>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKBpf38zjcWz-HTO0Lxd1Onlu58rDCvZY&libraries=places"></script>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_GOOGLE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            console.log(place);
            selectedAddress(place);
            geocodeByAddress(place.label)
            .then(result=>getLatLng(result[0]))
            .then(({lat,lng})=>{
              // console.log(lat,lng)
              console.log(lat,lng)
              setCoordinates({lat,lng})
            })
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
