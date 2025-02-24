/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

const SearchItem = ({ cart, setCart, items }) => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const filteredData = () => {
      const data = items.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilterData(data);
    };

    filteredData();
  }, [term]);

  if (filterData.length === 0 || showAllProducts) {
    return (
      <div>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <p>No products found for "{term}"</p>
          <button
            onClick={() => setShowAllProducts(true)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Show All Products
          </button>
        </div>
        <Product cart={cart} setCart={setCart} items={items} />
      </div>
    );
  }

  return <Product cart={cart} setCart={setCart} items={filterData} />;
};

export default SearchItem;
