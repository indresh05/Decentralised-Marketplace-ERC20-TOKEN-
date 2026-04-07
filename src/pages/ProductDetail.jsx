import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail({ products, account, buyProduct, buyingId }) {
    const { id } = useParams();
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="pt-32 text-center text-on-surface">Product not found. <Link to="/" className="text-primary hover:underline">Go back</Link></div>;
    }

    return (
        <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Media */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="relative group aspect-square overflow-hidden rounded-[2rem] bg-surface-container-low border border-outline-variant/15">
                        <img 
                            src={product.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
                            alt={product.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-surface-bright/40 backdrop-blur-md rounded-full flex items-center space-x-2 border border-outline-variant/15">
                            <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>dataset</span>
                            <span className="text-xs font-label uppercase tracking-widest text-on-surface">IPFS Verified</span>
                        </div>
                    </div>

                    {/* Bento Grid Extra Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                            <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label">Status</span>
                            <div className="text-2xl font-headline text-tertiary mt-2">{product.sold ? 'Acquired' : 'Legendary'}</div>
                        </div>
                        <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                            <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label">Royalties</span>
                            <div className="text-2xl font-headline text-secondary mt-2">5.0%</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-5 space-y-8 sticky top-32">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-secondary font-label text-sm uppercase tracking-[0.2em]">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span>Verified Collection: Neon Orbit</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-headline font-bold leading-none tracking-tight text-on-surface break-words">
                            {(() => {
                                const title = product.title || product.name || "Unknown Asset";
                                const parts = title.split(' ');
                                if (parts.length > 1) {
                                    return (
                                        <>
                                            {parts[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{parts.slice(1).join(' ')}</span>
                                        </>
                                    );
                                }
                                return <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{title}</span>;
                            })()}
                        </h1>
                    </div>

                    <div className="p-8 bg-surface-container-high rounded-[2rem] border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label block mb-2">Current Price</span>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-4xl font-headline font-bold text-primary">{product.price}</span>
                                    <span className="text-xl font-headline font-medium text-on-surface-variant">MKT</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label block mb-2">{product.sold ? 'Sale Concluded' : 'Auction Live'}</span>
                                <div className="text-lg font-headline font-medium text-on-surface">{product.sold ? 'Ended' : 'Active Flow'}</div>
                            </div>
                        </div>

                        <button 
                            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${product.sold || buyingId === product.id || product.seller.toLowerCase() === account?.toLowerCase() ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed active:scale-95 shadow-[0_0_30px_rgba(143,245,255,0.2)] hover:shadow-[0_0_40px_rgba(143,245,255,0.4)]'}`}
                            disabled={product.sold || buyingId === product.id || product.seller.toLowerCase() === account?.toLowerCase()}
                            onClick={() => buyProduct(product)}
                        >
                            {buyingId === product.id ? 'Processing Transaction...' : product.sold ? 'Sold Out' : product.seller.toLowerCase() === account?.toLowerCase() ? 'You own this' : 'Buy Now'}
                        </button>
                        {!product.sold && product.seller.toLowerCase() !== account?.toLowerCase() && (
                            <button className="w-full mt-4 py-4 bg-surface-bright/20 border border-outline-variant/20 text-on-surface rounded-2xl font-bold text-lg hover:bg-surface-bright/40 transition-all">
                                Make Offer
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-primary/30 to-secondary/30 flex items-center justify-center border border-primary/20 shrink-0`}>
                                    <span className="material-symbols-outlined text-primary">person</span>
                                </div>
                                <div className="min-w-0">
                                    <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label block">Listed By</span>
                                    <span className="font-headline font-medium text-on-surface truncate block">{product.seller.slice(0, 8)}...{product.seller.slice(-6)}</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-primary">open_in_new</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-bold">Description</h3>
                            <p className="text-on-surface-variant leading-relaxed font-body">
                                {product.description || "The Neural metadata is procedurally generated using smart-contract entropy from the moment of minting. Represents a convergence of biological intent and mechanical precision."}
                            </p>
                        </div>

                        {/* Smart Contract Details */}
                        <div className="p-6 bg-surface-container-low rounded-3xl space-y-4 border border-outline-variant/5">
                            <h3 className="font-headline font-bold text-lg flex items-center space-x-2">
                                <span className="material-symbols-outlined text-secondary">database</span>
                                <span>Chain Intelligence</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant">Contract Address</span>
                                    <span className="text-primary font-mono">0xBE...f938</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant">Token ID</span>
                                    <span className="text-on-surface">#{product.id}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant">Token Standard</span>
                                    <span className="text-on-surface">ERC-721</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant">Metadata</span>
                                    <span className="text-on-surface">Frozen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History / Detail Section */}
            <section className="mt-24 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-headline font-bold text-on-surface">Provenance Flow</h2>
                    <div className="flex space-x-2">
                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-label uppercase tracking-widest hidden sm:block">Active Transmissions</span>
                    </div>
                </div>

                <div className="overflow-x-auto bg-surface-container-low rounded-3xl border border-outline-variant/10">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="text-on-surface-variant text-xs uppercase tracking-widest font-label bg-surface-container-highest/20">
                            <tr>
                                <th className="p-6 font-normal border-b border-outline-variant/10">Event</th>
                                <th className="p-6 font-normal border-b border-outline-variant/10">Price</th>
                                <th className="p-6 font-normal border-b border-outline-variant/10">From</th>
                                <th className="p-6 font-normal border-b border-outline-variant/10">To</th>
                                <th className="p-6 font-normal border-b border-outline-variant/10">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-body divide-y divide-outline-variant/5">
                            {product.sold && (
                                <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                                    <td className="p-6 flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-secondary text-sm">swap_horiz</span>
                                        </div>
                                        <span className="font-medium text-on-surface">Sale</span>
                                    </td>
                                    <td className="p-6 text-primary font-headline font-bold">{product.price} MKT</td>
                                    <td className="p-6 font-mono text-on-surface-variant">{product.seller.slice(0,6)}...{product.seller.slice(-4)}</td>
                                    <td className="p-6 font-mono text-on-surface-variant">0x3fA...28e1</td>
                                    <td className="p-6 text-on-surface-variant">Recently</td>
                                </tr>
                            )}
                            <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                                <td className="p-6 flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-sm">sell</span>
                                    </div>
                                    <span className="font-medium text-on-surface">Listed</span>
                                </td>
                                <td className="p-6 text-primary font-headline font-bold">{product.price} MKT</td>
                                <td className="p-6 font-mono text-on-surface-variant">{product.seller.slice(0,6)}...{product.seller.slice(-4)}</td>
                                <td className="p-6 font-mono text-on-surface-variant">—</td>
                                <td className="p-6 text-on-surface-variant">Live</td>
                            </tr>
                            <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                                <td className="p-6 flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-tertiary text-sm">auto_awesome</span>
                                    </div>
                                    <span className="font-medium text-on-surface">Minted</span>
                                </td>
                                <td className="p-6 text-on-surface-variant">—</td>
                                <td className="p-6 font-mono text-on-surface-variant">NullAddress</td>
                                <td className="p-6 font-mono text-on-surface-variant">{product.seller.slice(0,6)}...{product.seller.slice(-4)}</td>
                                <td className="p-6 text-on-surface-variant">Genesis</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
