import React, { useState, useEffect, useRef } from "react";
import { Checkbox, Radio,Carousel  } from "antd";
import Layoutt from "../components/Layout/Layoutt";

import axios from "axios";
import { toast } from "react-toastify";
import { Prices } from "../components/Layout/Prices";
import {  Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/Homepage.css"
import useCategory from "../hooks/useCategory";




const AllProducts = () => {
    
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(4);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [cart, setCart] = useCart()
  const [recommendations, setRecommendations] = useState([]);
  const categorie = useCategory();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const scrollRef = useRef(null);

  //fetured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/product/featured-products'); // Assuming your backend route is '/api/featured-products'
        setFeaturedProducts(response.data.featuredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);



//get total count
const getTotal=async()=>{
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/product/product-count"
    );
    setTotal(data?.total)
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  getAllCategory();
  getTotal()
}, []);

useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page]);
//load more
const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products, ...data?.products]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }

  };
  
  const fetchRecommendations = (productId) => {
    fetch(`http://localhost:5001/recommendations/${productId}`)
        .then(response => response.json())
        .then(data => setRecommendations(data));
  }
  return (
    <div className="allPage">

    <Layoutt title={"Best Offers - BeautyStore"}>
     
         <div className="container-fluid row mt-3 ">
           <div className="col-md-3 filters">
             <h4 className="text-center">Filter By Category</h4>
             <div className="d-flex flex-column">
               {categories?.map((c) => (
                 <Checkbox
                   key={c._id}
                   onChange={(e) => handleFilter(e.target.checked, c._id)}
                 >
                   {c.name}
                 </Checkbox>
               ))}
             </div>
             {/* price filter */}
             <h4 className="text-center mt-4">Filter By Price</h4>
             <div className="d-flex flex-column">
               <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                 {Prices?.map((p) => (
                   <div key={p._id}>
                     <Radio value={p.array}>{p.name}</Radio>
                   </div>
                 ))}
               </Radio.Group>
             </div>
             <div className="d-flex flex-column">
               <button
                 className="btn btn-danger"
                 onClick={() => window.location.reload()}
               >
                 RESET FILTERS
               </button>
             </div>
           </div>
           <div className="col-md-9 ">
           
      

      

             <h1 className="text-center">All Products</h1>
             <div className="d-flex flex-wrap">
               {products?.map((p) => (
                 <div className="card m-2" key={p._id}>
                   <img
                     src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                     className="card-img-top"
                     alt={p.name}
                   />
                   <div className="card-body">
                     <div className="card-name-price">
                       <h5 className="card-title">{p.name}</h5>
                       <h5 className="card-title card-price">
                         {p.price.toLocaleString("en-US", {
                           style: "currency",
                           currency: "USD",
                         })}
                       </h5>
                     </div>
                     <p className="card-text ">
                       {p.description.substring(0, 60)}...
                     </p>
                     <div className="card-name-price">
                       <button
                         className="btn btn-info btn-wide1 ms-2"
                         onClick={() => navigate(`/product/${p.slug}`)}
                       >
                         MORE DETAILS
                       </button>
                       <button
                         className="btn btn-dark btn-wide2 ms-1"
                         onClick={() => {
                           setCart([...cart, p]);
                           localStorage.setItem(
                             "cart",
                             JSON.stringify([...cart, p])
                           );
                           toast.success("Item Added to cart");
                         }}
                       >
                         ADD TO CART
                       </button>
                     </div>
                   </div>
                   
                 </div>
                 
               ))}
             </div>
           
             <div className="m-2 p-3">
               {products && products.length < total && (
                 <button
                   className="btn btn-info ms-1 loadmore"
                   onClick={(e) => {
                     e.preventDefault();
                     setPage(page + 1);
                   }}
                 >
                   {loading ? (
                     "Loading ..."
                   ) : (
                     <>
                       {" "}
                       Loadmore 
                     </>
                   )}
                 </button>
               )}
             </div>
           </div>
         </div>
    </Layoutt>
    </div>

  )
}

export default AllProducts
