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
