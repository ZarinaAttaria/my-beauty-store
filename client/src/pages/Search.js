import React from 'react';
import Layoutt from '../components/Layout/Layoutt';
import { useSearch } from '../context/search';
import '../styles/SearchStyles.css'; // Import your custom CSS file

const Search = () => {
  const [values, setValues] = useSearch();

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
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn addbtn btn-secondary">Add to Cart</button>
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
