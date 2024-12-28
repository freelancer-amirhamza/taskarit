/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { addToCart, getCartItems } from "@/store/cart-slice";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { setProductDetails } from "@/store/product-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
    const dispatch = useDispatch();

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
    return (
        <Dialog open={open} onOpenChange={()=>{setOpen(), dispatch(setProductDetails())}}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[85vw] lg:max-w-[75vw] ">
                <div className="relative overflow-hidden rounded-lg ">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.name}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover "
                    />
                </div>
                <div className="">
                    <div className="">
                        <h1 className="text-3xl font-extrabold ">
                            {productDetails?.name}{" "}
                        </h1>
                        <p className="text-muted-foreground font-semibold text-xl py-3">
                            {productDetails?.description}{" "}
                        </p>
                    </div>
                    <div className="flex items-center justify-between ">
                        <p
                            className={`text-2xl font-bold text-muted-foreground ${productDetails?.salePrice > 0 ? "line-through" : ""
                                } `}
                        >
                            ${productDetails?.price}{" "}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-green-800  ">
                                ${productDetails?.salePrice}{" "}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center-gap-2 mt-2">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-5 h-5 fill-primary " />
                                <StarIcon className="w-5 h-5 fill-primary " />
                                <StarIcon className="w-5 h-5 fill-primary " />
                                <StarIcon className="w-5 h-5 fill-primary " />
                                <StarIcon className="w-5 h-5 fill-primary " />
                            </div>
                            <span className="text-muted-foreground">(4.5)</span>
                        </div>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button
                            // onClick={() => handleAddToCart(productDetails?._id)}
                            className="w-full"
                        >
                            Add to Cart
                        </Button>
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto ">
                        <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
                        <div className="grid gap-6  ">
                            <div className="flex gap-4">
                                <Avatar className="w-10  h-10 border ">
                                    <AvatarFallback className="bg-muted-foreground text-white font-bold">
                                        AH
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Amir Hamza</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                    </div>
                                    <p className="text-muted-foreground">
                                        This is an awesome product!
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Avatar className="w-10  h-10 border ">
                                    <AvatarFallback className="bg-muted-foreground text-white font-bold">
                                        AH
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Amir Hamza</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                        <StarIcon className="w-5 h-5 fill-primary " />
                                    </div>
                                    <p className="text-muted-foreground">
                                        This is an awesome product!
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Input className="" placeholder="Write your review" />
                                <Button>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailsDialog;