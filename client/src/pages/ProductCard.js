import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.name} src={`/product-photo/${product._id}`} />}
    >
      <Meta title={product.name} description={`$${product.price}`} />
      <Button type="primary" style={{ marginTop: '1rem' }}>
        <Link to={`/product/${product.slug}`}>View Details</Link>
      </Button>
    </Card>
  );
};

export default ProductCard;
