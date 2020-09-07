import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsStart,
  addProductStart,
  deleteProductStart,
  fetchCategoriesStart,
} from "../../../redux/Product/product.actions";

import Modal from "../../../components/Modal";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Button from "../../../components/forms/Button";

import "./styles.scss";
const mapState = (state) => ({
  products: state.product.products,
  categories: state.product.categories,
});

const ManageProduct = () => {
  // Global state
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, categories } = useSelector(mapState);

  // Local state
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    dispatch(fetchProductsStart());
  }, []); // []: Only runs on first initial render of Admin component

  const configCategoriesOption = categories.map((category) => {
    const { categoryName, documentID } = category;
    return { name: categoryName, value: categoryName };
  });

  const toggleModal = () => {
    setHideModal(!hideModal);
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      })
    );
    resetForm();
  };

  const handleEditClick = (documentID) => {
    history.push(`manageProduct/edit/${documentID}`);
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
  };

  return (
    <div className="manage-product">
      <h1>Manage Products</h1>

      <div className="manage-product__action">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add product</Button>
          </li>
        </ul>
      </div>

      <div className="manage-product__info">
        <table border="0" cellPadding="10" cellSpacing="0">
          <tbody>
            {products.map((product, index) => {
              const {
                productName,
                productThumbnail,
                productPrice,
                documentID,
              } = product;

              return (
                <tr key={index}>
                  <td>
                    <img
                      className="thumb"
                      src={productThumbnail}
                      alt={productName}
                    />
                  </td>
                  <td>{productName}</td>
                  <td>${productPrice}</td>
                  <td>
                    <Button onClick={() => handleEditClick(documentID)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => dispatch(deleteProductStart(documentID))}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal {...configModal}>
        <div className="addProductForm">
          <h2>Add product</h2>
          <form onSubmit={handleSubmit}>
            <FormSelect
              label="Category"
              options={configCategoriesOption}
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

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProduct;
