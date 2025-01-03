/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { UploadCloud, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  isEditMode,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const [image, setImage]= useState("");
  const inputRef = useRef(null);
  const handleImageFileChange = (event) => {
    console.log(event.target.files?.[0]);
    const selectFile = event.target.files?.[0];
    if (selectFile) setImageFile(selectFile);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files?.[0]);
    reader.onload = ()=>{
      console.log(reader.result);
      setImage(reader.result)
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto py-2 ">
      <Label className="text-lg font-semibold mb-2 block ">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? 'opacity-60' : ""} border-2 border-dashed p-1 rounded-lg `}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          disabled={isEditMode}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? 'cursor-not-allowed' : "cursor-pointer"} flex flex-col items-center p-4 `}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2  " />
            <span className=""> Drag & drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState ? 
          <Skeleton className=' h-16 bg-gray-300 ' /> :
          <div className="flex items-center justify-between  ">
            <div className="flex w-32 h-28 items-center">
              <img className="w-full h-full object-cover rounded-sm"  src={image} alt="imageFile.name" />
            </div>
            <p className="text-sm font-medium truncate">{imageFile.name}</p>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground "
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;