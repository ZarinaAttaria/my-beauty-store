import React, { useEffect, useState } from 'react';
import Layoutt from '../components/Layout/Layoutt';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/ProductDetailsStyles.css";

import { toast } from 'react-toastify';
import { useCart } from '../context/cart';
import ReviewsList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useCart();

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      fetchReviews(data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch reviews
  const fetchReviews = async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/review/product-reviews/${productId}`);
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  return (
    <div className='pd'>
      <Layoutt>
        <div className="row container product-details">
          <div className="col-md-6 product-image">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="300"
              width={"350px"}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1 className="contactus1 p-2 text-white text-center">Product Details</h1>
            <hr />
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6 className='headr1'>
              Price : {product.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6>Category : {product?.category?.name}</h6>
            <h6>Rating : {product?.ratings} / 5 ({product?.numReviews} reviews)</h6>
            <button className="btn btn-secondary cartbtn ms-1" onClick={() => addToCart(product)}>ADD TO CART</button>
          </div>
        </div>
        <hr />
        <div className="row container related-products">
          <h6>Similar Products ➡️</h6>
          {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2 " style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
               
              className='mycard'
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
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <div className="card-name-price">
                    <button className="btn btn-secondary  ms-1"   onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary cartbtn ms-1 mt-1" onClick={() => addToCart(p)}>ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <ReviewForm productId={product._id} fetchReviews={() => fetchReviews(product._id)} />

        <ReviewsList reviews={reviews} />
      </Layoutt>
    </div>
  );
};

export default ProductDetails;
