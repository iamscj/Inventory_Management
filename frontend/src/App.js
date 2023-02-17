import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Outlet,
// } from "react-router-dom";
import Customer from './pages/Customer';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Employee from './pages/Employee';
import NotFound from './pages/NotFound';
import { BrowserRouter, Router, Route, Switch, Link, Routes } from 'react-router-dom';
import Protected from './pages/Protected';
import Protected1 from './pages/Protected1';
import Protected2 from './pages/Protected2';
import Protected3 from './pages/Protected3';
import PlaceOrder from './pages/PlaceOrder';
import PlaceOrderProtected from './pages/PlaceOrderProtected';
import Cart from './pages/Cart';
import { useState, useEffect } from 'react';
import { localStorageManager, useToast } from '@chakra-ui/react';
import Updateuser from "./pages/Updateuser";
import OrderHistory from './pages/OrderHistory';
import PanelsInOrder from './pages/PanelsInOrder';
import axios from 'axios';
import ModulesInPanel from './pages/ModulesInPanel';
import RequestWarranty from './pages/RequestWarranty';
import RequestHistory from './pages/RequestHistory';
import ValidateRequests from './pages/ValidateRequests';
import AddPanels from './pages/AddPanels';
import RequestForEmployee from './pages/RequestForEmployee';
import AddEmployees from './pages/AddEmployees';
import RemoveEmployee from './pages/RemoveEmployee';
import SearchBar from './components/SearchBar';
// const router = createBrowserRouter([
//   {
//     path: "/customer",
//     element: <Customer />,
//   },
//   {
//     path: "/admin",
//     element: <Admin />,
//   },
//   {
//     path: "/employee",
//     element: <Employee />,
//   },
//   {
//     path: "/register",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "*",
//     element: <NotFound />
//   }
// ]);

function App() {
  const [opdata, setData] = useState([])
  useEffect(() => {
    let login = localStorage.getItem('login');
    let key = localStorage.getItem('key');
    let key1 = localStorage.getItem('key1');

    let fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/getAllUsers')
        setData(res.data)
      } catch (err) {
        console.log(err);
        return 0;
      }
    };
    fetchData();
  }, []);
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);
  const id = 'test-toast'

  const setInitialCartItems = async (productItems) => {
    setCartItems(productItems);
  }

  const handleAddProduct = async (product) => {
    let customerID = localStorage.getItem("user-id");
    let panelNumber = product.id;
    let quantity = 1;
    const ProductExist = cartItems.find((item) => item.id === product.id);
    quantity = ProductExist.quantity + 1;
    setCartItems(cartItems.map((item) => item.id === product.id ?
      { ...ProductExist, quantity: ProductExist.quantity + 1 } : item
    ));
    console.log(customerID, panelNumber, quantity);
    await axios.post('http://localhost:4000/update-cart', {
      customerID: customerID,
      panelNumber: panelNumber,
      quantity: quantity
    });
    toast({
      id,
      title: `Panel ${product.id} Successfully Added to Cart`,
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "top",
    })
  }

  const handleRemoveProduct = async (product) => {
    let customerID = localStorage.getItem("user-id");
    let panelNumber = product.id;
    let quantity = 0;
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
    else {
      quantity = ProductExist.quantity - 1;
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...ProductExist, quantity: ProductExist.quantity - 1 } : item))
    }
    await axios.post('http://localhost:4000/update-cart', {
      customerID: customerID,
      panelNumber: panelNumber,
      quantity: quantity
    });
    toast({
      id,
      title: `Panel ${product.id} Successfully Removed From Cart`,
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "top",
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/customer' element={<Protected1 Component={Customer} />} />
          <Route path='/admin' element={<Protected2 Component={Admin} />} />
          <Route path='/employee' element={<Protected3 Component={Employee} />} />
          <Route path='/placeorder' element={<PlaceOrderProtected Component={PlaceOrder} handleAddProduct={handleAddProduct} setInitialCartItems={setInitialCartItems} />} />
          <Route path='/cart' element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} />} />
          <Route path='/updateprofile' element={<Updateuser />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/panels-in-order' element={<PanelsInOrder />} />
          <Route path='/modules-in-panel' element={<ModulesInPanel />} />
          <Route path='/request-warranty' element={<RequestWarranty />} />
          <Route path='/request-history' element={<RequestHistory />} />
          <Route path='/validate-requests' element={<ValidateRequests />} />
          <Route path='/add-panels' element={<AddPanels />} />
          <Route path='/raise-request' element={<RequestForEmployee />} />
          <Route path='/addemployees' element={<AddEmployees />} />
          <Route path='/removeemployees' element={<RemoveEmployee />} />
          <Route path='/getuserinfo' element={<SearchBar placeholder={"Search Any Field"} data={opdata} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;