import React, { ReactNode, createContext, useMemo, useState } from "react";

type CartContextType = {
  cartItemsCount: number | undefined;
  setCartItemsCount: (number: number) => void;
};

const CartContext = createContext<CartContextType>({
  cartItemsCount: 0,
  setCartItemsCount: () => {},
});

function CartProvider({ children }: { children: ReactNode }) {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const contextValue = useMemo(
    () => ({ cartItemsCount, setCartItemsCount }),
    [cartItemsCount],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export { CartContext, CartProvider };
