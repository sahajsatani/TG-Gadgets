/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { privateApi } from "../utils/api";
import AuthContext from "../context/AuthContext";

const Cart = ({ cart, setCart }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = async (id) => {
    try {
      const { email, password } = user;

      // Remove from backend
      await privateApi.post(
        "/removefromcart",
        { productId: id },
        {
          headers: {
            "Content-Type": "application/json",
            userEmail: email,
            userPassword: password,
          },
        }
      );

      // Update local state
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <>
      <div
        className="container my-5"
        style={{ maxWidth: "900px", width: "90%", margin: "0 auto" }}
      >
        {cart.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              textAlign: "center",
              background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              padding: "2rem",
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
              Your Cart is Empty
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#4a5568",
                marginBottom: "2rem",
                maxWidth: "600px",
              }}
            >
              Looks like you haven not added any items yet. Start shopping to fill
              your cart!
            </p>
            <Link
              to="/product"
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
              Continue Shopping
            </Link>
          </div>
        ) : (
          cart.map((product) => {
            return (
              <div
                key={product.id}
                className="card mb-3 my-5"
                style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={product.imgSrc}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8" style={{ marginTop: "30px" }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <span
                        className="product-price"
                        style={{ fontSize: "1.5rem", color: "black" }}
                      >
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleRemove(product.id)}
                        id={"removebtn" + product.id}
                        style={{
                          padding: "12px 24px",
                          fontSize: "1rem",
                          borderRadius: "25px",
                          background:
                            "linear-gradient(145deg, #ff416c, #ff4b2b)",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                          transition: "all 0.3s ease",
                          marginLeft: "100px",
                          ":hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cart.length !== 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/checkout">
            <button
              style={{
                padding: "12px 24px",
                fontSize: "1rem",
                borderRadius: "25px",
                background: "linear-gradient(145deg, #667eea, #764ba2)",
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
              CheckOut
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
