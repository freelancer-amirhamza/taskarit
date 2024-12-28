/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ChartNoAxesCombined, LayoutDashboard, ShoppingBasket, ShoppingCart } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

const adminSidebarMenuItems = [
  {
      id: "dashboard",
      label: "Dashboard",
      pathname: "/admin/dashboard",
      icon: <LayoutDashboard />
  },
  {
      id: "products",
      label: "Products",
      pathname: "/admin/products",
      icon:<ShoppingBasket />
  },
  {
      id: "orders",
      label: "Orders",
      pathname: "/orders",
      icon: <ShoppingCart />
  },
]
const MenuItems = ({setOpen})=>{
  const navigate = useNavigate()
  return(
    <div className="flex flex-col mt-8 gap-2 ">
      {
        adminSidebarMenuItems.map((menuItem)=> (
          <div className="flex items-center border text-xl cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground  px-3 py-2 gap-2 rounded-md "
            onClick={()=> {
              navigate(menuItem.pathname);
              setOpen ? setOpen(false) : null;
            }}
            key={menuItem.id} >
            {menuItem.icon}
            <span className=" hover:text-foreground  font-semibold ">{menuItem.label} </span>
          </div>
        ) )
      }
    </div>
  )
}


const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate();
  return (
    <>
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetContent side="left" className="w-64" >
          <div className="flex flex-col h-full ">
            <SheetHeader className='border-b' >
              <SheetTitle className="flex items-center  gap-2 mt-5 mb-5 " >
              <ChartNoAxesCombined size={30} />
              <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden p-5 w-64 flex-col border-r bg-background lg:flex ' >
        <div onClick={()=> navigate("/admin/dashboard")}
         className="flex items-center border-b-2 gap-2 rounded-md px-3 py-2 cursor-pointer ">
        <ChartNoAxesCombined size={30} />
        <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
    </>
  )
}

export default AdminSidebar