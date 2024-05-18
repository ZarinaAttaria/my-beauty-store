import React, {useState, useEffect} from 'react'
import {Checkbox} from 'antd';
import Layoutt from '../components/Layout/Layoutt'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //get products
  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`);
      // setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };
  useEffect(()=>
  {
    getAllProducts();
  },[])

  return (
    <Layoutt title={"Best Offers - BeautyStore"}>
      <h1>Homepage</h1>
        <div className='row'>
          <div className="col-md-3">
            <h4 className="text-center"> Filter by Category</h4>
          </div>
<div classname="col-md-9">
<h1 className='text-center'>All Products</h1>
<div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  {/* <div className="card-name-price"> */}
                    <h5 className="card-title">{p.name}</h5>
                    {/* <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div> */}
                  <p className="card-text ">
                    {p.description}
                  </p>
                  {/* <div className="card-name-price"> */}
                    <button
                      class="btn btn-primary ms-1"
                      // onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      class="btn btn-secondary ms-1"
                      // onClick={() => {
                      //   setCart([...cart, p]);
                      //   localStorage.setItem(
                      //     "cart",
                      //     JSON.stringify([...cart, p])
                      //   );
                      //   toast.success("Item Added to cart");
                      // }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              // </div>
            ))}
          </div>
</div>
        </div>
    </Layoutt>
  )
}

export default HomePage
