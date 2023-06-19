import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Landingpage from './Components/Landingpage';
import Login from './Components/Login';
import Register from './Components/Register';
import Products from './Components/Products';
import Forgot from './Components/Forgot';
import Reset from './Components/Reset';
import Verify from './Components/Verify';
import UploadForm from './Components/UploadForm';
import Details from './Components/Details';
import Myproducts from './Components/Myproducts';
import Profile from './Components/Profile';
import Form from './Components/Form';
import PostForm from './Components/PostForm';
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <Landingpage /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/products', element: <Products /> },
      { path: '/forgot', element: <Forgot /> },
      { path: '/reset-password', element: <Reset /> },
      { path: '/verify', element: < Verify/> },
      {path:'/products/postitem',element:<Form />},
      {path:'/details',element:<Details/>},
      {path:'/products/myproducts',element:<Myproducts/>},
      {path:'/products/profile',element:<Profile/>},
      {path:'/products/details/:id',element:<Details/>},
      {path:'/form',element:<Form />}
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
