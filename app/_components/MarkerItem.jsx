import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import MarkerListing from "./MarkerListing";

function MarkerItem({ item }) {
  const [selectedlisting, setselectedlisting] = useState(null);

  return (
    <div>
      <MarkerF
        position={item.coordinates}
        onClick={() => setselectedlisting(item)}
      >
        {selectedlisting &&
          selectedlisting.coordinates === item.coordinates && (
            <OverlayView
              position={selectedlisting.coordinates}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div>
                <MarkerListing
                  item={selectedlisting}
                  closetheButton={() => setselectedlisting(null)}
                />
              </div>
            </OverlayView>
          )}
      </MarkerF>
    </div>
  );
}

export default MarkerItem;
