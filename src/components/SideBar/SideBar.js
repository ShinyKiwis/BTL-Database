import { useEffect, useState } from "react";
import SideBarStyle from "./SideBar.module.css";

const FilterItem = ({ sort, text, optionA, optionB }) => {
  // true is optionA, A - Z, high - low
  // false is optionB, Z - A, low - high

  const [option, setOption] = useState(true);
  const toggle = () => {
    setOption(!option);
    sort();
  };
  return (
    <div className={SideBarStyle.filter_container}>
      <h3>{text}:</h3>
      <button onClick={toggle}>{option ? optionB : optionA}</button>
    </div>
  );
};

const SideBar = ({ products, setProducts, getProducts }) => {
  const [toggleAlpha, setToggleAlpha] = useState(true);
  const [togglePrice, setTogglePrice] = useState(true);
  const [selected, setSeleted] = useState(["Electronics"]);
  const categories = ["Electronics", "Football", "Real Estate", "Social Media"];
  const addToSeleted = (category) => {
    if (selected.includes(category)) {
      setSeleted((selected) => selected.filter((item) => item !== category));
    } else {
      setSeleted((selected) => [...selected, category]);
    }
  };
  useEffect(() => {
    if (selected.length > 1) {
      console.log(selected.length);
      selected.map((select) => {
        getProducts(select);
      });
    }
    sortAlpha();
    sortPrice();
  }, [selected]);

  const sortAlpha = () => {
    let tempProducts = [...products];
    if (toggleAlpha) {
      tempProducts.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else {
      tempProducts = tempProducts.reverse();
    }
    setProducts(tempProducts);
    setToggleAlpha(!toggleAlpha);
  };

  const sortPrice = () => {
    let tempProducts = [...products];
    tempProducts.sort(function (a, b) {
      return togglePrice ? a.price - b.price : b.price - a.price;
    });
    setProducts(tempProducts);
    setTogglePrice(!togglePrice);
  };
  return (
    <div className={SideBarStyle.side_bar}>
      <h2>Category</h2>
      <div className={SideBarStyle.item_container}>
        {categories.map((category, idx) => (
          <span
            className={SideBarStyle.item}
            style={
              selected.includes(category)
                ? { color: "#49465A" }
                : { color: "#D7D7D7" }
            }
            onClick={() => {
              addToSeleted(category);
            }}
            key={idx}
          >
            {category}
          </span>
        ))}
      </div>
      <h2>Filter by: </h2>
      <FilterItem
        text="Price"
        optionA="Increase"
        optionB="Decrease"
        sort={sortPrice}
      />
      <FilterItem
        text="Alphabet"
        optionA="A-Z"
        optionB="Z-A"
        sort={sortAlpha}
      />
    </div>
  );
};

export default SideBar;
