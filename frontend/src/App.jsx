import { useState, useEffect, createContext } from "react";
const CartContext = createContext();
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchItem from "./components/SearchItem";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { privateApi, publicApi } from "./utils/api";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserCart = async (user) => {
    console.log("fetchUserCartApi");

    if (user?.isAuthenticated) {
      try {
        const response = await privateApi.get("/cart", {
          headers: {
            userEmail: user.email,
            userPassword: user.password,
          },
        });
        setCart(response.data);
        sessionStorage.removeItem("cart");
        sessionStorage.setItem("cart", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    }
  };

  const handleAddToCart = async (item, user) => {
    console.log("AddToCartApi");
    try {
      const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      await privateApi.post(
        "/addtocart",
        { productId: item.id },
        {
          headers: {
            "Content-Type": "application/json",
            userEmail: user.email,
            userPassword: user.password,
          },
        }
      );
      let flage = true;
      const checkforduplication = [...currentCart];
      checkforduplication.forEach((i) => {
        if (i.id == item.id) {
          flage = false;
        }
      });
      if (flage) {
        const updatedCart = [...currentCart, item];
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async (item, user) => {
    console.log("RemoveFromCartApi");

    try {
      const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      await privateApi.post(
        "/removefromcart",
        { productId: item.id },
        {
          headers: {
            "Content-Type": "application/json",
            userEmail: user.email,
            userPassword: user.password,
          },
        }
      );

      const updatedCart = currentCart.filter(
        (cartItem) => cartItem.id !== item.id
      );
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const cartContextValue = {
    cart,
    userCart,
    setCart,
    setUserCart,
    fetchUserCart,
    handleAddToCart,
    handleRemoveFromCart,
  };
  const fetchProducts = async () => {
    try {
      const response = await publicApi.get("/user/getproducts");

      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Initialize cart from sessionStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <CartContext.Provider value={cartContextValue}>
      <AuthProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Router>
            <Navbar cart={cart} setData={setProducts} items={products} />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route
                  path="/product"
                  element={
                    <Product
                      setCart={setCart}
                      cart={cart}
                      setData={setProducts}
                      items={products}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/search/:term"
                  element={
                    <SearchItem
                      cart={cart}
                      setCart={setCart}
                      items={products}
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={<Cart cart={cart} setCart={setCart} />}
                />
                <Route
                  path="/checkout"
                  element={<Checkout cart={cart} setCart={setCart} />}
                />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route
                  path="/"
                  element={<Login cart={cart} setCart={setCart} />}
                />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </AuthProvider>
    </CartContext.Provider>
  );
};

export { CartContext };
export default App;
