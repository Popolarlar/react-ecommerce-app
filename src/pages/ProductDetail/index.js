import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductByIDStart } from "../../redux/Product/product.actions";
import {
  getDetailProduct,
  getIsLoading,
  getError,
} from "./../../redux/selectors";
import Button from "./../../components/forms/Button";

import "./styles.scss";

const mapState = (state) => ({
  product: getDetailProduct(state),
  isloading: getIsLoading(state),
  error: getError(state),
});

const ProductDetail = (props) => {
  // Props
  const { documentID } = props;

  // Global state
  const { product, isloading, error } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductByIDStart(documentID));

    return () => {
      console.log("Do some cleanup");
    };
  }, [dispatch]);

  const {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
  } = product;

  const ProductDetailInfo = () => {
    return (
      <div className="product-detail">
        <div className="product-detail__gallery">
          <div className="product-image">
            <img className="active" src={productThumbnail} alt={productName} />
          </div>
          <ul className="image-list">
            <li className="image-item">
              <img
                src="https://source.unsplash.com/W1yjvf5idqA"
                alt={productName}
              />
            </li>
            <li className="image-item">
              <img
                src="https://source.unsplash.com/VgbUxvW3gS4"
                alt={productName}
              />
            </li>
            <li className="image-item">
              <img
                src="https://source.unsplash.com/5WbYFH0kf_8"
                alt={productName}
              />
            </li>
          </ul>
        </div>

        <div className="product-detail__info">
          <h1>{productName}</h1>
          <h2>${productPrice}</h2>
          <select>
            <option>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
          <Button>Add To Cart</Button>
          <h3>Product Details</h3>
          <p>
            Designed to stretch in all directions and with the finer details in
            mind to make every movement around the house comfortable.
            <br />- Ultra Stretch fabric stretches in all directions so it is
            super comfortable around the house when you are sitting or sleeping.
            <br />- Has a moderately loose cut for a relaxed feel and isn’t not
            too long so they are easy to walk in.
            <br />- The cuffs are designed to make it easy to roll up your
            sleeves.
            <br />- The bottoms feature convenient back pockets.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="second-nav">
        <nav>
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/products/all">All</Link>
            </li>
            {productCategory && (
              <li className="breadcrumb-item">
                <Link to={`/products/${productCategory}`}>
                  {productCategory}
                </Link>
              </li>
            )}
            {productName && (
              <li className="breadcrumb-item active">{productName}</li>
            )}
          </ol>
        </nav>
      </div>
      {isloading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ProductDetailInfo />
      )}

      <h3>You may also like</h3>
      <div className="related-products">
        <div className="related-products__item">
          <img
            src="https://source.unsplash.com/miziNqvJx5M"
            alt="related item"
          />
          <h4>Succulent</h4>
          <p className="price">$19.99</p>
        </div>
        <div className="related-products__item">
          <img
            src="https://source.unsplash.com/2y6s0qKdGZg"
            alt="related item"
          />
          <h4>Terranium</h4>
          <p className="price">$19.99</p>
        </div>
        <div className="related-products__item">
          <img
            src="https://source.unsplash.com/6Rs76hNbIWE"
            alt="related item"
          />
          <h4>Cactus</h4>
          <p className="price">$19.99</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
