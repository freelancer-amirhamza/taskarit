import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { getAllProducts, getProductDetails } from "@/store/product-slice";
import { addToCart, getCartItems } from "@/store/cart-slice";
import ShoppingProductTile from "@/components/shop-view/product-tile";
import ProductDetailsDialog from "@/components/shop-view/productDetails";



const Home = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const { productsList, productDetails } = useSelector((state) => state.productsSlice);



  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
    console.log(getCurrentProductId);
  };

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItems());
        toast({
          title: "This Product added to cart!",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(
      getAllProducts()
    );
  }, [dispatch]);



  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
            {productsList && productsList.length > 0
              ? productsList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                    key={productItem.id}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Home;