import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import RelatedProduct from "../components/RelatedProduct";
import { GetProduct } from "../lib/productApi";
import ReviewProduct from "../components/ReviewProduct";

function Product() {
  const [productdata, setproductdata] = useState(null);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");

  const { productId } = useParams();
  const { currency, addcart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  const {id}=useParams()

  const getProduct = async () => {
    try {
      const response = await GetProduct();
      setProducts(response?.data?.products);
      console.log(response);
    } catch (error) {
      console.error("Get Product failed:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const fetchproductdata = () => {
    const product = products.find((item) => item?._id === productId);
    if (product) {
      setproductdata(product);
      setimage(product?.image[0]); // Set the first image as the default
    }
  };

  useEffect(() => {
    fetchproductdata();
  }, [productId, products]);

  useEffect(() => {
    if (products.length === 0) {
      console.log("Products not loaded yet.");
    }
  }, [products]);

  return productdata ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-start sm:w-[18.7%] w-full">
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Product Information Section */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productdata.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">{122}</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productdata.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productdata.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            {productdata.size && productdata.size.length > 0 ? (
              <div className="flex gap-2">
                {productdata.size.map((item, index) => (
                  <button
                    onClick={() => setsize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-gray-500">Select Size</p>
                <button
                  onClick={() => setsize("S")}
                  className="border py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  S
                </button>

                <button
                  onClick={() => setsize("L")}
                  className="border py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  L
                </button>
                <button
                  onClick={() => setsize("XL")}
                  className="border py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  XL
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => addcart(productdata._id, size)}
            className="text-small text-white bg-black px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description or Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews {122}</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Crafted with 100% premium cotton, this classic T-shirt is perfect
            for everyday comfort and style.
          </p>
          <p>
            Machine washable and resistant to shrinkage, this T-shirt is
            designed for hassle-free care.
          </p>
        </div>
      </div>
      {/** Review Section part  */}
      <ReviewProduct productId={productId} />

      {/* Related Products */}
      <RelatedProduct
        category={productdata.category}
        subcategory={productdata.subcategory}
        productId={productId}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
