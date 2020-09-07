import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategoriesStart,
  addCategoryStart,
  deleteCategoryStart,
} from "../../../redux/Product/product.actions";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/forms/FormInput";
import Button from "../../../components/forms/Button";

import "./styles.scss";

const mapState = (state) => ({
  categories: state.product.categories,
});

const ManageCategory = (props) => {
  // Global state
  const dispatch = useDispatch();
  const { categories } = useSelector(mapState);

  // Local state
  const [hideModal, setHideModal] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []); // []: Only runs on first initial render of Admin component

  const toggleModal = () => {
    setHideModal(!hideModal);
    setCategoryName("");
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addCategoryStart({
        categoryName,
      })
    );

    resetForm();
  };

  const resetForm = () => {
    setHideModal(true);
    setCategoryName("");
  };

  return (
    <div className="manage-category">
      <h1>Manage Users</h1>
      <div className="manage-category__action">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>New Category</Button>
          </li>
        </ul>
      </div>

      <div className="manage-category__info">
        <table border="0" cellPadding="10" cellSpacing="0">
          <tbody>
            {categories.map((category, index) => {
              const {
                categoryName,
                createdDate,
                categoryCount,
                documentID,
              } = category;
              return (
                <tr key={index}>
                  <td>{categoryName}</td>
                  <td>{categoryCount}</td>
                  <td>{createdDate.toString()}</td>
                  <td>
                    <Button
                      onClick={() => dispatch(deleteCategoryStart(documentID))}
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
        <div className="addCatForm">
          <form onSubmit={handleSubmit}>
            <h2>Add category</h2>

            <FormInput
              label="Name"
              type="text"
              value={categoryName}
              handleChange={(e) => setCategoryName(e.target.value)}
            />

            <Button type="submit">Create</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageCategory;
