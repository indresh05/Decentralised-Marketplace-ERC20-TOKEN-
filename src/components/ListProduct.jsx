import { useState } from 'react';
import { listProduct } from '../blockchain';

export default function ListProduct({ onProductListed }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const handleList = async (e) => {
        e.preventDefault();
        if (!name || !price || !file) {
            alert("Please provide name, price, and select an image.");
            return;
        }

        try {
            setLoading(true);
            
            // 1. Upload Image to Pinata
            setLoadingText('Uploading Image to IPFS...');
            const formData = new FormData();
            formData.append("file", file);

            const pinataHeaders = {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
            };

            if (!pinataHeaders.pinata_api_key || !pinataHeaders.pinata_secret_api_key) {
                throw new Error("Pinata API keys are missing in the .env file.");
            }

            const imgRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: "POST",
                headers: pinataHeaders,
                body: formData,
            });

            if (!imgRes.ok) throw new Error("Failed to upload image to Pinata");
            const imgData = await imgRes.json();
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${imgData.IpfsHash}`;

            // 2. Create and Upload Metadata JSON to Pinata
            setLoadingText('Uploading Metadata to IPFS...');
            const metadata = {
                title: name,
                description: description,
                imageUrl: imageUrl,
                price: price
            };

            const jsonRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...pinataHeaders
                },
                body: JSON.stringify({
                    pinataContent: metadata,
                    pinataMetadata: { name: `${name}.json` }
                }),
            });

            if (!jsonRes.ok) throw new Error("Failed to upload metadata to Pinata");
            const jsonData = await jsonRes.json();
            const metadataCID = jsonData.IpfsHash;

            // 3. Call Smart Contract listItem with metadataCID as the name argument
            setLoadingText('Confirming Transaction...');
            await listProduct(metadataCID, price);

            setName('');
            setDescription('');
            setPrice('');
            setFile(null);
            setLoadingText('');
            if (onProductListed) onProductListed();
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message || 'Check console.'}`);
        } finally {
            setLoading(false);
            setLoadingText('');
        }
    };

    return (
        <div className="card list-product-card">
            <h2>List New Product</h2>
            <form onSubmit={handleList}>
                <div className="input-group">
                    <label>Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ padding: '0.4rem 0' }}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Product Title</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Magic Sword"
                    />
                </div>
                <div className="input-group">
                    <label>Description (Optional)</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. A rare mystical item"
                    />
                </div>
                <div className="input-group">
                    <label>Price (Token Wei)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="e.g. 100"
                    />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                    {loading ? loadingText : 'List Product'}
                </button>
            </form>
        </div>
    );
}
