import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import "./css/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "New Arrivals", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);

  // Close the sort menu when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  // Scroll-in reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selected]); // re-observe after sort re-renders the grid

  // Filter by category, then sort based on the selected option
  const categoryProducts = useMemo(() => {
    const filtered = all_product.filter((item) => item.category === props.category);

    switch (selected.value) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.new_price - b.new_price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.new_price - a.new_price);
      case "new":
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [all_product, props.category, selected]);

  return (
    <div className="shop-category" ref={containerRef}>
      <img className="shopcategory-banner reveal" src={props.banner} alt="" />

      <div className="shopcategory-indexSort reveal">
        <p>
          <span>Showing 1-{categoryProducts.length}</span> out of {categoryProducts.length} products
        </p>

        <div className="shopcategory-sort-wrap" ref={wrapperRef}>
          <div
            className={`shopcategory-sort ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span>
              Sort by <strong>{selected.label}</strong>
            </span>
            <svg
              className="sort-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          {open && (
            <div className="shopcategory-sort-menu">
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={`sort-item ${selected.value === option.value ? "active" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="shopcategory-products">
        {categoryProducts.map((item, i) => (
          <div className="reveal" key={item.id ?? i}>
            <Item
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          </div>
        ))}
      </div>

      <div className="shopcategory-loadmore reveal">Explore More</div>
    </div>
  );
};

export default ShopCategory;