/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { deleteCartItems, updateCartItems } from "@/store/cart-slice";

const CartContent = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleUpdateCartQuantity = (getCartItem, typeOfAction) => {
    dispatch(
      updateCartItems({
        productId: getCartItem?.productId,
        quantity:
        typeOfAction === "plus"
        ? getCartItem?.quantity + 1
        : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data) {
        toast({
          title: "Cart is updated successfully!",
        });
      }
    });
  };

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItems({productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
    console.log(getCartItem?.productId, "it's ok");
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 object-cover rounded-lg "
      />
      <div className="flex-1">
        <h2 className="font-extrabold ">{cartItems?.title} </h2>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            onClick={() => handleUpdateCartQuantity(cartItems, "minus")}
            disabled={cartItems?.quantity == 1 }
            className="w-8 h-8 rounded-full "
          >
            <Minus className="w-1 h-1" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-bold">{cartItems?.quantity} </span>
          <Button
            onClick={() => handleUpdateCartQuantity(cartItems, "plus")}
            variant="outline"
            className="w-8 h-8 rounded-full "
          >
            <Plus className="w-1 h-1" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-semibold">
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className="cursor-pointer mt-1 text-red-500 "
          size={20}
        />
      </div>
    </div>
  );
};

export default CartContent;