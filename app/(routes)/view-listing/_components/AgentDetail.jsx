import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function AgentDetail({ listingDetail }) {
  const { user } = useUser();
  console.log(user);
  if (!user) {
    return null;
  }
  return (
    <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6">
      <div className="flex items-center gap-6">
        <Image
          src={user.imageUrl}
          alt="image"
          height={60}
          width={50}
          className="rounded-full"
        />
        <div>
          <h3>Created By</h3>
          <h2 className="text-lg font-bold">{listingDetail?.fullName}</h2>
          <h2 className="text-gray-500">{listingDetail?.createdBy}</h2>
        </div>
      </div>
      <Button>Send Message</Button>
    </div>
  );
}

export default AgentDetail;
