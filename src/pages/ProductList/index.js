import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProductsStart,
  fetchCategoriesStart,
  filterProducts,
} from "../../redux/Product/product.actions";
import { getCategories, getProductsByCategory } from "./../../redux/selectors";
import Product from "./../../components/Product";

import "./styles.scss";

const mapState = (state, category) => ({
  products: getProductsByCategory(state, category),
  categories: getCategories(state),
});

const ProductList = (props) => {
  // Props
  const { category } = props;

  // Global state
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) =>
    mapState(state, category)
  );

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    dispatch(fetchProductsStart());
  }, []); // []: Only runs on first initial render

  return (
    <div className="container product-catalog">
      <div className="product-catalog__filter">
        <Link to={"/products/all"}>all</Link>
        {categories.map((category, index) => (
          <Link key={index} to={`/products/${category.categoryName}`}>
            {category.categoryName}
          </Link>
        ))}
      </div>

      <div className="product-catalog__list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Product key={index} product={product} />
          ))
        ) : (
          <div>no result</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
