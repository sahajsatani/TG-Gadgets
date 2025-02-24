/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
// import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { publicApi } from "../utils/api";
import logo from "../assets/TG Logo White.png";
import "./Navbar.css";


const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useContext(AuthContext);
  const fetchProducts = async () => {
    try {
      // console.log("Call all product by logo");
      
      const response = await publicApi.get("/user/getproducts");
      setData(response.data);
    } catch (err) {
      console.log("Failed to fetch products");
    } 
  };
  const filterByCategory = async (category) => {
    try {
      const response = await publicApi.get("/user/getproducts");
      const allProducts = response.data;

      const filteredProducts =
        category === "all"
          ? allProducts
          : allProducts.filter((product) => product.category === category);

      setData(filteredProducts);
    } catch (error) {
      console.error("Error filtering products:", error);
      toast.error("Failed to filter products", {
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

      if (!searchTerm.trim()) {
        setData(allProducts);
        return;
      }

      const filteredItems = allProducts.filter((item) => {
        if (!item || !item.title) return false;

        const title = item.title.toLowerCase().trim();
        const search = searchTerm.toLowerCase().trim();

        // Check for exact match
        if (title === search) return true;

        // Check for partial match
        if (title.includes(search)) return true;

        // Check for word-by-word match
        const titleWords = title.split(" ");
        const searchWords = search.split(" ");

        // Check if all search words appear in title in order
        let searchIndex = 0;
        for (let i = 0; i < titleWords.length; i++) {
          if (titleWords[i].includes(searchWords[searchIndex])) {
            searchIndex++;
            if (searchIndex === searchWords.length) return true;
          }
        }

        return false;
      });

      if (filteredItems.length === 0) {
        setData([]);
        toast.error("No matching products found", {
          position: "top-right",
          autoClose: 10,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      setData(filteredItems);
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
    setSearchTerm("");
    navigate("/product");
  };

  // shows
  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/product"} onClick={() => fetchProducts()} className="brand">
            <div
              style={{ display: "flex", alignItems: "center", margin: "3px" }}
            >
              <img src={logo} alt="Logo" style={{ height: "24px" }} />
              <span
                style={{
                  fontSize: "26px",
                  marginTop: "4px",
                  marginLeft: "9px",
                }}
              >
                Gadgets
              </span>
            </div>
          </Link>

          {user.isAuthenticated && (
            <form
              onSubmit={handleSubmit}
              className="search-bar"
              style={{ position: "relative" }}
            >
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search Products"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "10px 40px",
                }}
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              ></button>
            </form>
          )}

          {user.isAuthenticated && (
            <div className="cart">
              <Link
                to={"/cart"}
                id="cartbtn"
                className="btn btn-primary position-relative"
              >
                <BsFillCartCheckFill style={{ fontSize: "1.5rem" }} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cursor-pointer-none">
                  {cart.length}
                  {/* <span className="visually-hidden"></span> */}
                </span>
              </Link>
            </div>
          )}

          <div className="auth-links">
            {user.isAuthenticated ? (
              <div
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                id="logoutbtn"
                className="logout-link"
                style={{
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "linear-gradient(145deg, #4b1b78, #3a145d)",
                  color: "white",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <span style={{ fontWeight: "500" }}>Logout</span>
                <i
                  className="fas fa-sign-out-alt"
                  style={{ marginLeft: "0px" }}
                ></i>
              </div>
            ) : (
              <div
                className="auth-box"
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "linear-gradient(145deg, #4b1b78, #3a145d)",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Link
                  to="/"
                  id="loginbtn"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Login
                </Link>
                <span style={{ color: "white" }}>|</span>
                <Link
                  to="/signup"
                  id="signupbtn"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>

        {location.pathname === "/product" && user.isAuthenticated && (
          <div
            className="nav-bar-wrapper"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <label htmlFor="filter-dropdown" style={{ marginRight: "10px" }}>
              Filter by:
            </label>
            <select
              id="filter-dropdown"
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                padding: "1px",
                backgroundColor: "#4b1b78",
                color: "white",
              }}
              onChange={(e) => filterByCategory(e.target.value)}
              className="filter-dropdown"
            >
              <option id="1" value="all">
                All Products
              </option>
              <option id="2" value="mobiles">
                Mobiles
              </option>
              <option id="3" value="laptops">
                Laptops
              </option>
              <option id="4" value="tablets">
                Tablets
              </option>
            </select>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
