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
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

const HomePage = () => {
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
    <Layoutt title={"Best Offers - BeautyStore"}>
      <div className="top">
      <section className="banner">
        <Carousel autoplay>
        <div className="carousel-item">
        <img src="/p3.webp" alt="Banner 1" />
        </div>

        <div className="carousel-item">
        {categories.map(category => (
      <Link key={category._id} to={`/price/${category.slug}`} className="category">
        {category.name === 'maybelline' &&   <img src="/p1.png" alt="Banner 2" />}
            
      </Link>
        ))}
        
        </div>
        <div className="carousel-item">
          <img src="/p2.webp" alt="Banner 3" />
        </div>
        </Carousel>
      </section>
    
      <h1 className="headings">FEATURED PRODUCTS</h1>
      <div className="product-grid" ref={scrollRef}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          featuredProducts.map(product => (
            <div className="product-card" key={product._id}>
              <Link to={`/product/${product.slug}`}>
                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} />
              </Link>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <section className="category-section">
  <h1 className="headings">SHOP BY CATERGORY</h1>
  <div className="category-list">
    {categories.map(category => (
      <Link key={category._id} to={`/category/${category.slug}`} className="category">
        {category.name === 'makeup' && <img src="makeup.png" alt="Makeup" className="category-image" />}
        {category.name === 'skincare' && <img src="skincare.png" alt="Skincare" className="category-image" />}
        {category.name === 'haircare' && <img src="haircare.png" alt="Haircare" className="category-image" />}
        {category.name === 'bathAndBody' && <img src="body.png" alt="Haircare" className="category-image" />}


      </Link>
    ))}
  </div>
</section>
   
      <div>
        <h1 className="headings">BRAND OF THE WEEK</h1>
        <img src="WEBSITE-7.webp" alt="Makeup" className="allitems" />
      </div>
      <div className="best-in-less">
  <h1 className="headings">BEST IN LESS</h1>
  <div className="category-images">
    {categories.map(category => (
      <Link key={category._id} to={`/price/${category.slug}`}>
        {category.name === 'krylon' && <img src="kryolan.png" alt="Makeup" />}
        {category.name === 'maybelline' && <img src="maybelline.png" alt="Skincare" />}
      </Link>
    ))}
  </div>
</div>
      <div>
      <h1 className="headings">SHOP ALL PRODUCTS</h1>
      </div>
      <Link to={'/allproducts'}>
     < img src="all.webp" alt="Makeup" className="allitems" />
        </Link>  
        </div>  
    </Layoutt>
  );
};

export default HomePage;
