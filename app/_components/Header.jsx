"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full bg-white z-10">
      <div className="flex gap-20">
        <Image src={"/logo.svg"} width={50} height={50} alt="Wait"></Image>
        <ul className="hidden md:flex gap-10 m-4 ">
          <Link href={"/"}>
            <li
              className={`' hover:text-primary font-medium cursor-pointer text-sm' ${
                path == "/" && "text-primary"
              }`}
            >
              For Sell
            </li>
          </Link>

          <Link href={"/rent"}>
            <li
              className={`' hover:text-primary font-medium cursor-pointer text-sm' ${
                path == "/rent" && "text-primary"
              }`}
            >
              For Rent
            </li>
          </Link>

          <Link href={"/user"}>
            <li
              className={`' hover:text-primary font-medium cursor-pointer text-sm' ${
                path == "/user" && "text-primary"
              }`}
            >
              Profile
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className=" flex gap-2">
            <Plus className=" h-10 w-10"></Plus>Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="user"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>My Listing</DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
