

import { Route, Routes } from 'react-router-dom';
import Layout from './components/shop-view/layout';
import Home from './pages/home';
import Checkout from './components/shop-view/checkout';
import OrderSuccess from './pages/order-success';
import OrderCancel from './pages/order-cancel';
import AdminLayout from './components/admin-view/admin-layout';
import Dashboard from './pages/admin/dashboard';
import AdminProducts from './pages/admin/products';
import ProductsListing from './pages/productListing';



function App() {
  

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
      <Route path='/admin' element={<AdminLayout/>} >
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='products' element={<AdminProducts/>} />
        </Route>
        <Route element={<Layout/>} >
        <Route path='/' element={<Home/>} />
        <Route path='checkout' element={<Checkout/>} />
        <Route path='orders' element={<OrderSuccess/>} />
        <Route path='order-cancel' element={<OrderCancel/>} />
        <Route path='products' element={<ProductsListing/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App