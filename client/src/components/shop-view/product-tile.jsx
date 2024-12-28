/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { categoryOptionsMap } from "@/config";

const ShoppingProductTile = ({
    product,
    handleGetProductDetails,
    handleAddToCart,
}) => {
    return (
        <Card className="w-full mex-w-sm mx-auto">
            <div className="" onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product.name}
                        className="w-full h-[300px] rounded-t-lg object-cover "
                    />
                    {product?.salePrice > 0 ? (
                        <Badge className=" absolute top-2 px-1 py-0 left-2 bg-red-500 hover:bg-red-600 ">
                            Sale
                        </Badge>
                    ) : null}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2  "> {product.name} </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                            {categoryOptionsMap[product?.category]}{" "}
                        </span>
                        
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? "line-through" : ""}`}>
                            ${product?.price}{" "}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg text-primary font-semibold ">
                                ${product?.salePrice}{" "}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                    <Button
                        onClick={() => handleAddToCart(product?._id)}
                        className="w-full"
                    >
                        Add to Cart
                    </Button>
                </CardFooter>
        </Card>
    );
};

export default ShoppingProductTile;