
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import About from './pages/About';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Layout/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Layout/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/user/ProductPage';
import PriceProduct from './pages/PriceProduct';
import Chatbot from './components/Chatbot'; // Import the Chatbot component
import "./App.css"
import FAQs from './pages/FAQs';
import TermsConditions from './pages/TermsConditions';
function App() {
  return (
   <>

   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/allproducts' element={<AllProducts/>} />
    



    <Route path='/product/:slug' element={<ProductDetails/>} />
    
    <Route path='/categories' element={<Categories/>} />
    <Route path='/cart' element={<CartPage/>} />

    <Route path='/category/:slug' element={<CategoryProduct/>} />
    <Route path='/price/:slug' element={<PriceProduct/>} />



    <Route path='/search' element={<Search/>} />

    <Route path='/dashboard' element={<PrivateRoute/>} >
    <Route path='user' element={<Dashboard/>} />
    <Route path='user/orders' element={<Orders/>} />
    <Route path='user/profile' element={<Profile/>} />

      </Route>
      <Route path='/dashboard' element={<AdminRoute/>} >
      <Route path='admin' element={<AdminDashboard/>} />
      <Route path='admin/create-category' element={<CreateCategory/>} />
      <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products/>} />
      <Route path='admin/users' element={<Users/>} />
      <Route path='admin/orders' element={<AdminOrders/>} />

      </Route>

    <Route path='/register' element={<Register/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>} />
    <Route path='/login' element={<Login/>} />


    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/policy' element={<Policy/>} />




    <Route path='*' element={<Pagenotfound/>} />
    <Route path='/chatbot' element={<Chatbot />} /> 
    <Route path='/faqs' element={<FAQs/>} />
    <Route path='/terms-condition' element={<TermsConditions/>} />
   </Routes>
   
   </>
  );
}

export default App;
