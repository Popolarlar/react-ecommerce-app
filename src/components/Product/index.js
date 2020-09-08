import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";

const Product = ({
  product: {
    documentID,
    productCategory,
    productName,
    productThumbnail,
    productPrice,
  },
}) => {
  return (
    <div className="product">
      <div className="product__img">
        <Link to={`/products/${productCategory}/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <p className="product__name">{productName}</p>
      <p className="product__price">${productPrice}</p>
    </div>
  );
};

export default Product;
