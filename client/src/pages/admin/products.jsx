
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";

import { addProductFormElements } from "@/config";
import {  Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminProductTile from "@/components/admin-view/product-tile";
import ProductImageUpload from "./imageUpload";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "@/store/product-slice";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import ThreeDProductDialog from "@/pages/admin/3DProductDialog";

const initialFormData = {
  image: null,
  name: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
};

const AdminProducts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [openThreeDProductDialog, setOpenThreeDProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productsList } = useSelector((state) => state.productsSlice);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate()


  const onSubmit = (event) => {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          updateProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            setIsLoading(true);
            setOpenCreateProductDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            setIsLoading(false);
            toast({
              title: "The Product is has been added successfully",
            });
            window.location.reload()
          } else {
            toast({
              title: "Something is wrong!, Please Try again!",
              variant: "destructive",
            });
          }
        });
  };

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProducts());
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
  return (
     <Fragment>
      <div className="flex w-full justify-between mb-5 ">
        <Button onClick={() => navigate("/")}>
          Back Home
        </Button>
        <Button onClick={() => setOpenThreeDProductDialog(true)}>
          Add 3D Products
        </Button>
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4  ">
        {!isLoading && productsList && productsList.length > 0
          ? productsList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setFormData={setFormData}
                product={productItem}
                key={productItem.id}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <ThreeDProductDialog
      open={openThreeDProductDialog}
      setOpen={setOpenThreeDProductDialog}
      />
      <Sheet
        open={openCreateProductDialog}
        className=" duration-500 "
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
          </SheetHeader>
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            formControls={addProductFormElements}
            onSubmit={onSubmit}
            isBtnDisabled={!isFormValid()}
          />
        </SheetContent>
      </Sheet>

      <Sheet
        open={openCreateProductDialog}
        className=" duration-500 "
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
          </SheetHeader>
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            formControls={addProductFormElements}
            onSubmit={onSubmit}
            isBtnDisabled={!isFormValid()}
          />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;