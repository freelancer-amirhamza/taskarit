export const headerMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      id: "products",
      label: "Products",
      path: "/products",
    },
    {
        id: "addProduct",
        label: "Admin Panel",
        path: "/admin/products",
      },

  ];



  export const addProductFormElements = [
    {
      label: "Title",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "foods", label: "Foods" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
  ];
  

  export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
  foods: "Foods",
};