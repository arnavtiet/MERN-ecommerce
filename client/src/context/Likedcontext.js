import { useState, useContext, createContext, useEffect } from "react";

const LikedContext = createContext();
const LikeProvider = ({ children }) => {
  const [like, setLike] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("like");
    if (existingCartItem) setLike(JSON.parse(existingCartItem));
  }, []);

  return (
    <LikedContext.Provider value={[like, setLike]}>
      {children}
    </LikedContext.Provider>
  );
};

// custom hook
const useLike = () => useContext(LikedContext);

export { useLike, LikeProvider };
