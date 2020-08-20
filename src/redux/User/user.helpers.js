import { auth, firestore } from "./../../firebase/utils";

export const handleFetchUsers = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((doc) => {
          return { ...doc.data(), documentID: doc.id };
        });
        resolve(users);
      })
      .catch((err) => reject(err));
  });
};

export const handleRetrievePasswordAPI = (email) => {
  // Redirect location after reset password
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};
