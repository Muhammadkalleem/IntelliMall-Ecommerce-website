import { useState, useEffect } from "react";
import { fetchProducts, addProduct } from "../api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("adminToken"); // Get admin token

    useEffect(() => {
        async function loadProducts() {
            const data = await fetchProducts();
            setProducts(data);
        }
        loadProducts();
    }, []);

    const handleAddProduct = async () => {
        if (!token) {
            alert("Unauthorized! Login as Admin.");
            return;
        }
        const newProduct = { name: productName, price };
        const response = await addProduct(newProduct, token);
        if (response.success) {
            alert("Product added successfully!");
            setProducts([...products, newProduct]); // Update product list
        } else {
            alert("Error adding product.");
        }
    };

    // ✅ Logout Function
    const handleLogout = () => {
        localStorage.removeItem("adminToken"); // Remove token
        navigate("/admin-login"); // Redirect to login
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout}>Logout</button> {/* ✅ Logout Button */}
            <input type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
            <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAddProduct}>Add Product</button>

            <h3>Product List</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
