import { firestore } from "./../../firebase/utils";

export const handleFetchProducts = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .get()
      .then((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          return { ...doc.data(), documentID: doc.id };
        });
        resolve(products);
      })
      .catch((err) => reject(err));
  });
};

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const handleUpdateProduct = ({ documentID, product }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .set(product)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const handleFetchCategories = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .orderBy("categorySortOrder")
      .get()
      .then((snapshot) => {
        const categories = snapshot.docs.map((doc) => {
          return { ...doc.data(), documentID: doc.id };
        });
        resolve(categories);
      })
      .catch((err) => reject(err));
  });
};

export const handleAddCategory = (category) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .doc()
      .set(category)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const handleDeleteCategory = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .doc(documentID)
      .delete()
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
