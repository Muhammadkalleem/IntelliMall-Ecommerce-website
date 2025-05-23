import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [lastSearch, setLastSearch] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get('http://localhost:4000/api/recommendations/recommendations', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setLastSearch(data.lastSearchedProduct);
                setRecommendations(data.recommendations);
            } catch (error) {
                setError("Error fetching recommendations. Please try again later.");
                console.error("API Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div>
            <h2>Your Last Searched Product</h2>
            {loading ? <p>Loading...</p> : error ? <p style={{ color: "red" }}>{error}</p> : (
                lastSearch ? (
                    <p>{lastSearch.name} - {lastSearch.category} (${lastSearch.price})</p>
                ) : (
                    <p>No recent searches</p>
                )
            )}

            <h2>Similar Products You May Like</h2>
            {loading ? <p>Loading...</p> : (
                recommendations.length > 0 ? (
                    <ul>
                        {recommendations.map(product => (
                            <li key={product._id}>
                                {product.name} - ${product.price} ({product.color})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recommendations yet.</p>
                )
            )}
        </div>
    );
};

export default HomePage;
