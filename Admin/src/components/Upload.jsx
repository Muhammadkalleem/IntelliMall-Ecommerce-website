import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Must match the 'image' field in multer

        try {
            const response = await axios.post('http://localhost:4000/api/products/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setMessage(`File uploaded: ${response.data.filePath}`);
        } catch (error) {
            console.error("Upload Error:", error);
            setMessage("Upload failed");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default Upload;
