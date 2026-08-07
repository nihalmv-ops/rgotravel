
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const addToWishlist = (item) => {

    const exists = wishlist.find((p) => p.id === item.id);

    if (exists) return;

    const updated = [...wishlist, item];

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

  };

  const removeFromWishlist = (id) => {

    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

  };

  const isWishlisted = (id) => {

    return wishlist.some((item) => item.id === id);

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>

  );

}

export function useWishlist() {

  return useContext(WishlistContext);

}