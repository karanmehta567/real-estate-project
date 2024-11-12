"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../[components]/FileUpload";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function EditListing({ params }) {
  const { user } = useUser;
  const [listing, setListing] = useState([]);
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(params.id)
    user && verifyUserRecord();
  }, [user]);

  // const[projectId,setProjectId]=useState("")
  // useEffect(()=>{
  //   const getId=async()=>{
  //     const paramId=await params.id;
  //     setProjectId(paramId)
  //   }
  // },[params])
  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params?.id);

    if (data) {
      console.log(data);
      setListing(data[0]);
    }
    if (data?.length <= 0) {
      router.replace("/");
    }
    if (error) {
      console.log("error");
    }
  };
  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params?.id)
      .select("*,listingImages(listing_id,url)");
    if (data) {
      console.log(data);
      toast("Listing Published");
      setLoading(false);
    }
    for (const image of images) {
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split(".").pop();
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });
      if (error) {
        setLoading(false);
        toast("Error while uploading");
      } else {
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
        console.log(imageUrl);
        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: params?.id }])
          .select();
        if (data) {
          setLoading(false);
        }
      }
      setLoading(false);
      if (error) {
        setLoading(false);
      }
    }
  };
  const publishBtnHandler = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", params?.id)
      .select();
    if (data) {
      setLoading(false);
      toast("Listing Published");
    }
  };
  const publishHandler = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("list")
      .update({ active: "true" })
      .eq("id", params?.id)
      .select();
    if (data) {
      setLoading(false);
      console.log(data + "data");
    }
  };
  return (
    <div className="px-10 md:px-20">
      <h2 className="font-bold text-2xl">
        Enter more details about your listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          fullName: user?.fullName,
          profileImage: user?.imageUrl,
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    defaultValue="rent"
                    onValueChange={(v) => (values.type = v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select
                    onValueChange={(e) => (values.propertyType = e)}
                    name="propertyType"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Bedroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex 2"
                      name="bedroom"
                      onChange={handleChange}
                      defaultValue={listing?.bedroom}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Bathroom</h2>
                    <Input
                      placeholder="Ex 2"
                      type="number"
                      defaultValue={listing?.bathroom}
                      name="bathroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Built In</h2>
                    <Input
                      placeholder="Ex 1900 sq.ft"
                      name="builtin"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Parking</h2>
                    <Input
                      placeholder="Ex 2"
                      type="number"
                      defaultValue={listing?.parking}
                      name="parking"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Lot Size (Sq.ft)</h2>
                    <Input
                      placeholder=""
                      name="lotSize"
                      defaultValue={listing?.lotSize}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Area(Sq.ft)</h2>
                    <Input
                      placeholder="Ex 1900"
                      type="number"
                      defaultValue={listing?.area}
                      name="area"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">Selling Price ($)</h2>
                    <Input
                      type="number"
                      defaultValue={listing?.parking}
                      placeholder="Ex 50,000"
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3">HOA(Per Month)</h2>
                    <Input
                      type="number"
                      placeholder="Ex 100"
                      name="hoa"
                      defaultValue={listing?.hoa}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500 mt-3 ">Description</h2>
                    <Textarea
                      placeholder=""
                      name="description"
                      defaultValue={listing?.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="font-lg text-gray-400 my-2">
                    Upload Images of Property
                  </h2>
                  <FileUpload
                    setImages={(value) => setImages(value)}
                    imageList={listing.listingImages}
                  />
                </div>
                <div className="flex gap-7 justify-end mt-3 ">
                  <Button
                    disabled={loading}
                    className="'text-primary border-primary"
                    variant="outline"
                  >
                    {loading ? <Loader className="animate=spin" /> : "Save"}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" disabled={loading} className="">
                        {loading ? (
                          <Loader
                            className="animate=spin"
                            onClick={() => publishHandler()}
                          />
                        ) : (
                          "Save & Publish"
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will Submit your
                          response.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => publishBtnHandler()}>
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Continue"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
