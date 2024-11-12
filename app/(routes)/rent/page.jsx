import ListingMapView from "@/app/_components/ListingMapView";
import React from "react";

function forRent() {
  return (
    <div>
      <div className="px-10 p-10">
        <ListingMapView type="rent" />
      </div>
    </div>
  );
}

export default forRent;
