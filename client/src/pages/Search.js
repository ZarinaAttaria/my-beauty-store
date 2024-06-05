import React from 'react';
import Layoutt from '../components/Layout/Layoutt';
import { useSearch } from '../context/search';
import '../styles/SearchStyles.css'; // Import your custom CSS file
import { toast } from 'react-toastify';
import { useCart } from '../context/cart';
import { Navigate, useNavigate } from 'react-router-dom';

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();


  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };
  return (
    <div className='allPage'>
    <Layoutt>
   
        <div className="text-center">
          <h1 className='headi'>Search Results</h1>
          <h5 className='headi1'>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h5>
          <div className="search-results-grid">
            {values?.results.map((p) => (
              <div className="card search-card" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 50)}...
                  </p>
                  <p className="card-price">$ {p.price}</p>
                  <div className="card-buttons">
                    <button className="btn btn-primary"  onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn addbtn btn-secondary" onClick={() => addToCart(p)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

    </Layoutt>
    </div>
  );
};

export default Search;
