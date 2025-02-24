/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { privateApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ setCart }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error] = useState("");

  const { user } = useContext(AuthContext);
  // const { clearCart } = useContext(CartContext);

  const handleSubmit = async () => {
    try {
      
      // Clear cart from backend
      await privateApi.post("/clearcart", {
        headers: {
          userEmail: user.email,
          userPassword: user.password,
        },
      });
      sessionStorage.removeItem("cart");
      setCart([]);
      toast.success("Order placed successfully!", {
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
      console.error("Error clearing cart:", error);
      toast.error(`Failed to place order: ${error.message}`, {
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

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <form
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            width: "600px",
          }}
        >
          <h2 style={{ color: "#270858", textAlign: "center" }}>Checkout</h2>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <div style={{ marginBottom: "15px" }}>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              id="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              id="lastname"
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Zip Code:</label>
            <input
              type="number"
              value={zipCode}
              id="zip"
              onChange={(e) => setZipCode(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <Link to="/confirmation">
            <button
              type="submit"
              id="submitbtn"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#270858",
                color: "white",
                border: "none",
              }}
              disabled={!firstName || !lastName || !zipCode}
              onClick={()=> handleSubmit()}
            >
              Continue
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Checkout;
