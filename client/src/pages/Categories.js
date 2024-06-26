import React from 'react';
import Layoutt from '../components/Layout/Layoutt';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import "../styles/CategoryProductStyles.css";

const Categories = () => {
    const categories = useCategory();

    return (
        <div style={{ marginTop: "10px", background: "rgb(255, 240, 243)" }}>
            <Layoutt title={"All Categories"}>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {categories.map((c) => (
                            <div className="col mt-5 mb-3" key={c._id}>
                                <div className="card boxes">
                                    <Link to={`/category/${c.slug}`} className="btn cat-btn">
                                        {c.name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layoutt>
        </div>
    );
};

export default Categories;
