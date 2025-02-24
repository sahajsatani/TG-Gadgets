/* eslint-disable react/prop-types */
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { privateApi, publicApi } from "../utils/api";

const Product = ({ cart, setCart, items, setData }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    try {
      const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // Get email and password from user context
      const { email, password } = user;

      // Save to backend with required headers
      await privateApi.post(
        "/addtocart",
        { productId: item.id },
        {
          headers: {
            "Content-Type": "application/json",
            userEmail: email,
            userPassword: password,
          },
        }
      );

      // Update local state
      const updatedCart = [...currentCart, item];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 10 ,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart", {
        position: "top-right",
        autoClose: 10,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleRemoveFromCart = async (item) => {
    try {
      const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // Get email and password from user context
      const { email, password } = user;

      // Remove from backend
      await privateApi.post(
        "/removefromcart",
        { productId: item.id },
        {
          headers: {
            "Content-Type": "application/json",
            userEmail: email,
            userPassword: password,
          },
        }
      );

      // Update local state
      const updatedCart = currentCart.filter(
        (cartItem) => cartItem.id !== item.id
      );
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      toast.success("Item removed from cart", {
        position: "top-right",
        autoClose: 10,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart", {
        position: "top-right",
        autoClose: 10,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.isAuthenticated) {
      navigate("/");
      return;
    }

    try {
      const response = await publicApi.get("/user/getproducts");
      const allProducts = response.data;
      setData(allProducts);
      return;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products", {
        position: "top-right",
        autoClose: 10,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    navigate("/product");
  };

  // if user not authenticated then show welcome page
  if (!user.isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
          background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#270858",
            marginBottom: "1rem",
          }}
        >
          Welcome to TG Gadgets!
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#4a5568",
            marginBottom: "2rem",
            maxWidth: "600px",
          }}
        >
          Discover our wide range of products by logging in or creating an
          account.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "12px 24px",
              borderRadius: "25px",
              background: "linear-gradient(145deg, #667eea, #764ba2)",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Get Start
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container my-5">
        <div className="row">
          {items.length === 0 ? (
            <div
              key="no-products"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "60vh",
                textAlign: "center",
                padding: "2rem",
                background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                margin: "2rem 0",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#270858",
                  marginBottom: "1rem",
                }}
              >
                No Products Found
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#4a5568",
                  marginBottom: "2rem",
                  maxWidth: "600px",
                }}
              >
                We could not find any products matching your search. Try
                different keywords or check back later!
              </p>
              <button
                onClick={(e) => handleSubmit(e)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "25px",
                  background: "linear-gradient(145deg, #667eea, #764ba2)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "500",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                Browse All Products
              </button>
            </div>
          ) : (
            items.map((product) => (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 my-3 text-center"
              >
                <div
                  className="card"
                  style={{
                    width: "350px",
                    height: "550px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="img"
                    style={{
                      height: "300px",
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    <img
                      src={product.imgSrc}
                      className="card-img-top img"
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                  <div
                    className="card-body"
                    style={{
                      padding: "19px",
                      flexGrow: 0.3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "200px",
                    }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.1rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.title}
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontSize: "0.9rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </p>
                    <div>
                      <span
                        className="product-price"
                        style={{
                          fontSize: "1.5rem",
                          color: "black",
                          fontWeight: "900px",
                          marginRight: "50px",
                        }}
                      >
                        ${product.price}
                      </span>
                      {cart.some((cartItem) => cartItem.id === product.id) ? (
                        <button
                          id={"remove" + product.id}
                          onClick={() => handleRemoveFromCart(product)}
                          style={{
                            padding: "12px 24px",
                            fontSize: "1rem",
                            borderRadius: "25px",
                            alignSelf: "center",
                            background:
                              "linear-gradient(145deg, #ff416c, #ff4b2b)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            transition: "all 0.3s ease",
                            ":hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                            },
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          id={"addtocart" + product.id}
                          onClick={() => handleAddToCart(product)}
                          style={{
                            padding: "12px 24px",
                            fontSize: "1rem",
                            borderRadius: "25px",
                            alignSelf: "center",
                            background:
                              "linear-gradient(145deg, #667eea, #764ba2)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            transition: "all 0.3s ease",
                            ":hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                            },
                          }}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
