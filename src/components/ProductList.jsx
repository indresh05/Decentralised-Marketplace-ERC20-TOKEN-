import { useState } from 'react';
import { buyProduct } from '../blockchain';

export default function ProductList({ products, account, onProductBought }) {
    const [buyingId, setBuyingId] = useState(null);

    const handleBuy = async (product) => {
        try {
            setBuyingId(product.id);

            // Detailed logging implicitly helps debug transactions
            console.log(`Approving and buying product ${product.id} for ${product.price} tokens...`);
            await buyProduct(product.id, product.price);

            console.log("Purchase complete!");
            if (onProductBought) onProductBought();
        } catch (err) {
            console.error(err);
            alert("Error buying product. Check console.");
        } finally {
            setBuyingId(null);
        }
    };

    if (!products || products.length === 0) {
        return <div className="empty-state">No products listed yet.</div>;
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card card">
                    {product.imageUrl && (
                        <div style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                            <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <div className="product-header">
                        <h3>{product.title}</h3>
                        <span className="price badge">{product.price} Tokens</span>
                    </div>
                    <div className="product-details">
                        {product.description && <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{product.description}</p>}
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Status:</strong> {product.sold ? 'Sold' : 'Available'}</p>
                        <p className="address-hash"><strong>Seller:</strong> {product.seller}</p>
                    </div>
                    <button
                        className="btn-buy"
                        disabled={product.sold || buyingId === product.id || product.seller.toLowerCase() === account?.toLowerCase()}
                        onClick={() => handleBuy(product)}
                    >
                        {buyingId === product.id ? 'Processing...' : product.sold ? 'Sold Out' : 'Buy Now'}
                    </button>
                </div>
            ))}
        </div>
    );
}
