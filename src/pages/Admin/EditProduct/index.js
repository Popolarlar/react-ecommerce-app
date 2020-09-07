import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProductStart,
  fetchProductsStart,
} from "../../../redux/Product/product.actions";

import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Button from "../../../components/forms/Button";

import "./styles.scss";
const mapState = (state) => ({
  products: state.product.products,
  categories: state.product.categories,
});

const EditProduct = (props) => {
  const { documentID } = props;

  // Global state
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, categories } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const initialState = products.find(
    (product) => product.documentID === documentID
  );

  const configCategoriesOption = categories.map((category) => {
    const { categoryName } = category;
    return { name: categoryName, value: categoryName };
  });

  // Local state
  const [productCategory, setProductCategory] = useState(
    initialState.productCategory
  );
  const [productName, setProductName] = useState(initialState.productName);
  const [productThumbnail, setProductThumbnail] = useState(
    initialState.productThumbnail
  );
  const [productPrice, setProductPrice] = useState(initialState.productPrice);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        documentID,
      })
    );
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack(1);
  };

  return (
    <div className="edit-product">
      <h1>Edit product</h1>
      <div className="edit-product__form">
        <form onSubmit={handleSubmit}>
          <FormSelect
            label="Category"
            options={configCategoriesOption}
            defaultValue={productCategory}
            handleChange={(e) => setProductCategory(e.target.value)}
          />

          <FormInput
            label="Name"
            type="text"
            value={productName}
            handleChange={(e) => setProductName(e.target.value)}
          />

          <FormInput
            label="Main image URL"
            type="url"
            value={productThumbnail}
            handleChange={(e) => setProductThumbnail(e.target.value)}
          />

          <FormInput
            label="Price"
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            value={productPrice}
            handleChange={(e) => setProductPrice(e.target.value)}
          />
          <div className="buttons">
            <Button type="submit">Update</Button>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
