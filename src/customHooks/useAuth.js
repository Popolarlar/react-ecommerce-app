import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
