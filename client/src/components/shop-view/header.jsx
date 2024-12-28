import {
  House,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartWrapper from "./cart-wrapper";
import { getCartItems } from "@/store/cart-slice";
import { headerMenuItems } from "@/config";

const MenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home"
        ? { category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
  };
  return (
    <nav className=" flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-6 ">
      {headerMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer "
        >
          {menuItem.label}{" "}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { cartItems } = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0)
console.log(cartItems , "it's true")
  useEffect(() => {
   
  }, [cartItems])
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  return (
    <div className="flex flex-col  gap-4 lg:items-center lg:flex-row ">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          className=" w-full justify-between  flex"
          variant="outline"
        >
          <ShoppingCart className=" w-8 h-8  " />
          <div className="flex flex-col ">
          <span className="text-xs  text-orange-600 text-start  font-extrabold ">
            {totalQty} items
          </span>
          <span className="text-xs  text-orange-600 text-start font-extrabold ">
            ${totalPrice}
          </span>
          </div>
          
        </Button>
        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems && cartItems?.length > 0
              ? cartItems
              : []
          }
        />
      </Sheet>
    </div>
  );
};

const Header = () => {
  return (
    <header className="sticky w-full z-40 border-b bg-background ">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 ">
        <Link to="/" className="flex items-center gap-2 ">
          <House className="h-7 w-7 " />
          <span className="font-extrabold sr-only text-3xl"> Ecommerce </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden ">
              <Menu className="w-8 h-8" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className=" w-full max-w-xs" side="left">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;