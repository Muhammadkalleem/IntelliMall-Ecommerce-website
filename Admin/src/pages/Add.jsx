import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendurl } from "../App";
import { toast } from "react-toastify";
import { addProduct } from "../lib/productaPI.JS";
import { useNavigate } from "react-router-dom";

export default function Add({ token }) {
  const navigate = useNavigate();

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState(""); // Fixed casing
  const [price, setprice] = useState(""); // Fixed casing
  const [category, setcategory] = useState("Men");
  const [subcategory, setsubcategory] = useState("Topwear");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);

  console.log(token);

  const onsubmithandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description); // Fixed variable reference
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subcategory", subcategory);

      formdata.append("sizes", JSON.stringify(sizes));

      image1 && formdata.append("image1", image1);
      image2 && formdata.append("image2", image2);
      image3 && formdata.append("image3", image3);
      image4 && formdata.append("image4", image4);

      console.log(formdata);

      const response = await addProduct(formdata);
      console.log(response);

      navigate("/list");
      toast.success(response.data.message);
      setname("");
      setdescription("");
      setprice("");
      setimage1(false);
      setimage2(false);
      setimage3(false);
      setimage4(false);
      setsizes([]); // Reset sizes after submission
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onsubmithandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Upload Image Section */}
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <label key={index + 1} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setimage1(file);
                  else if (index === 1) setimage2(file);
                  else if (index === 2) setimage3(file);
                  else setimage4(file);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Category & Subcategory */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setcategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Subcategory</p>
          <select
            onChange={(e) => setsubcategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setprice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px] border border-gray-300"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* Product Size Selection */}
      <div>
        <p className="mb-2">Product Size</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setsizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setbestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        Add
      </button>
    </form>
  );
}
