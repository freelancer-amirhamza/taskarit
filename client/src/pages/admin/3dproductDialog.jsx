/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addProductFormElements } from "@/config";
import { addProduct } from "@/store/product-slice";
import { useToast } from "@/hooks/use-toast";

import { useRef, useState } from "react";
import axios from "axios";
import { Canvas } from '@react-three/fiber'
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CommonForm from "@/components/common/form";
import ModelViewer, { Picker } from "@/components/modelViewer";
import { Palette } from "lucide-react";

const initialFormData = {
  image: null,
  name: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
};


const ThreeDProductDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();
  const modelViewerRef = useRef();


  const uploadToCloudinary = async (dataURL) => {
    const formData = new FormData();
    formData.append('file', dataURL);
    formData.append('upload_preset', '3DImageUpload'); // Replace with your upload preset
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmh7euix6/image/upload`, // Replace with your cloud name
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageDataURL = modelViewerRef.current.captureImage();
      const uploadedImageUrl = await uploadToCloudinary(imageDataURL);
      dispatch(
        addProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          setOpen(false)
          setFormData(initialFormData);
          toast({
            title: 'The Product has been added successfully',
          });
          window.location.reload()
        }else{
          toast({
            title: 'The Product has not added, Please try again!',
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      console.log(error.message)
    }
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };


  return (
    <Dialog open={open} onOpenChange={() => { setOpen() }}>
      <DialogContent className=" h-full overflow-y-scroll md:p-12 p-2 max-w-[100vw] sm:max-w-[90vw] lg:max-w-[80vw] ">
        <div className="grid gap-8  md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg ">
            <div className="w-full max-sm:min-h-[22rem] canvas max-w-md mx-auto h-full ">
              <Canvas shadows className="bg-white rounded-md" camera={{ position: [0, 0, 4], fov: 45 }}>
                <ModelViewer ref={modelViewerRef} />
              </Canvas>
              <Picker />
            </div>
          </div>
          <div className="">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
              onSubmit={onSubmit}
            isBtnDisabled={!isFormValid()}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreeDProductDialog;