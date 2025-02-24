import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#270858" }}>Thank You for Your Order!</h2>
        <p style={{ fontSize: "18px", margin: "20px 0" }}>
          Your order has been successfully placed.
        </p>
        <p style={{ fontSize: "16px", color: "#6c757d" }}>
          You will receive a confirmation email shortly.
        </p>
        <p style={{ fontSize: "16px", color: "#6c757d" }}>
          If you have any questions, feel free to contact our support team.
        </p>
        <Link to={"/product"}>
        <button
          id="browseallbtn"
          style={{
            padding: "12px 24px",
            borderRadius: "25px",
            marginTop: "20px",
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
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
