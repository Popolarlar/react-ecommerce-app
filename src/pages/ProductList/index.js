import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../redux/Product/product.actions";
import Product from "./../../components/Product";

import "./styles.scss";

const mapState = (state) => ({
  products: state.product.products,
});

const ProductList = () => {
  // Global state
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []); // []: Only runs on first initial render

  return (
    <div className="container">
      <div className="product-filter">
        <h2>All Products</h2>
        <select>
          <option value="default">Default</option>
          <option value="low-to-hight">Price low to high</option>
          <option value="high-to-low">Price high to low</option>
        </select>
      </div>
      <div className="product-list">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
