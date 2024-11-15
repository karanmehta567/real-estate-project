import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ imageList }) {
  return (
    <div className="mt-5">
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem>
                <Image
                  src={item.url}
                  width={800}
                  height={300}
                  className="rounded-xl object-cover h-[300px] w-full"
                  alt="image"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
}

export default Slider;
