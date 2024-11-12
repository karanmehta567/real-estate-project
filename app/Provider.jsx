"use client";
import React from "react";
import Header from "./_components/Header";
import { LoadScript } from "@react-google-maps/api";

function Provider({ children }) {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_GOOGLE_API_KEY}
        libraries={["places"]}
      ></LoadScript>
      <Header />
      <div className="mt-32">{children}</div>
    </div>
  );
}

export default Provider;
