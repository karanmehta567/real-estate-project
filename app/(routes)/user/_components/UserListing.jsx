import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Bath, BedDouble, Link, MapPin, Ruler, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function UserListing() {
  const { user } = useUser();
  const [listing, setListing] = useState();
  useEffect(() => {
    user && getUserListing();
  }, [user]);
  const getUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress);
    setListing(data);
    console.log(data);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Manage Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {listing &&
          listing.map((item, index) => (
            <div className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg ">
              <Image
                src={item.listingImages?.[0]?.url} // Fallback URL if `url` is undefined
                width={800}
                height={250}
                alt="image "
                className="rounded-lg object-cover w-full h-auto"
              />
              <div className="flex mt-2 flex-col gap-2">
                <h2 className="font-bold text-xl">${item.price}</h2>
                <h2 className="flex gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {item.address}
                </h2>
                <div className="flex gap-2 my-2 justify-between">
                  <h2 className="flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <BedDouble className="h-4  w-4" />
                    {item.bedroom}
                  </h2>
                  <h2 className="flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Bath className="h-4  w-4" />
                    {item.bathroom}
                  </h2>
                  <h2 className="flex gap-2  w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Ruler className="h-4  w-4" />
                    {item.area}
                  </h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserListing;
