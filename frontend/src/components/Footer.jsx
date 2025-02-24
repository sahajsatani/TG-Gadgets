
import logo from "../assets/TG Logo White.png";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#270858", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "45px", marginBottom: "15px" }}
        />
        <div
          style={{ color: "white", textAlign: "center", fontSize: "0.9rem" }}
        >
          <p>© 2024 TestGrid. All rights reserved.</p>
          <p>Contact: info@testgrid.com | +1 (555) 123-4567</p>
          <p>123 Tech Street, Silicon Valley, CA 94025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
