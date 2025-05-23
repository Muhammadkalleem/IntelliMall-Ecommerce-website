import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import { GetProduct } from "../lib/productApi";

function Collection() {
  const { search, showsearch } = useContext(ShopContext);
  const [products, setproducts] = useState([]);
  const [showfilter, setshowfilter] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sorttype, setsorttype] = useState("relevant");

  const togglecategory = (e) => {
    const value = e.target.value;
    setcategory((prev) =>
      prev.includes(value)
        ? prev?.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const tooglesubcategory = (e) => {
    const value = e.target.value;
    setsubcategory((prev) =>
      prev.includes(value)
        ? prev?.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const getProduct = async () => {
    try {
      const response = await GetProduct();
      setproducts(response?.data?.products);
      console.log("All products:", response?.data?.products);
    } catch (error) {
      console.error("Get Product failed:", error);
    }
  };

  const getSearchHistoryProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId"); // get user ID
  
      if (!token || !userId) {
        console.error("User token or user ID not found.");
        return;
      }
  
      const response = await fetch(`http://localhost:4000/api/feed/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const text = await response.text(); // get raw response text
      console.log("Raw response:", text);
  
      try {
        const data = JSON.parse(text);
  
        if (data?.feed?.length > 0) {
          setproducts(data.feed);
          console.log("Fetched feed products:", data.feed);
        } else {
          console.log("No products in feed.");
          setproducts([]);
        }
      } catch (jsonErr) {
        console.error("❌ Response is not valid JSON:", jsonErr);
      }
    } catch (error) {
      console.error("Error fetching search history products:", error);
    }
  };
     

  useEffect(() => {
    getProduct(); // Only fetch all products on load
  }, []);

  const applyfilter = () => {
    let productscopy = [...products];

    if (showsearch && search) {
      productscopy = productscopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category?.length > 0) {
      productscopy = productscopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory?.length > 0) {
      productscopy = productscopy.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }

    setfilterproduct(productscopy);
  };

  const sortproduct = () => {
    let Cpproduct = [...filterproduct];
    switch (sorttype) {
      case "low-high":
        setfilterproduct(Cpproduct.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setfilterproduct(Cpproduct.sort((a, b) => b.price - a.price));
        break;
      default:
        applyfilter();
        break;
    }
  };

  useEffect(() => {
    setfilterproduct(products);
  }, [products]);

  useEffect(() => {
    applyfilter();
  }, [category, subcategory, search, showsearch]);

  useEffect(() => {
    sortproduct();
  }, [sorttype]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setshowfilter(!showfilter)}
          className="my-2 text-ul flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showfilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  onChange={togglecategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <label key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={type}
                  onChange={tooglesubcategory}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Load History Button */}
        <button
          onClick={getSearchHistoryProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-6"
        >
          Load My Search History
        </button>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <h1 className="text-2xl font-bold">ALL COLLECTIONS</h1>
          <select
            name="sort"
            id="sort"
            className="border border-gray-300 text-sm px-2"
            onChange={(e) => setsorttype(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {filterproduct?.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterproduct?.map((item, index) => (
              <ProductItem
                key={index}
                id={item?._id}
                image={item?.image}
                name={item?.name}
                price={item?.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
