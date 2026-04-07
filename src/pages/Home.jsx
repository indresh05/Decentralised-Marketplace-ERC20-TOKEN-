import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ products, account, buyProduct }) {
    // We will render products mapped from blockchain state, or a placeholder if loading.
    
    return (
        <main className="pt-32 pb-20 px-6 lg:px-16 w-full max-w-[1920px] mx-auto">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low border border-outline-variant/20 p-10 md:p-16 mb-20 flex flex-col md:flex-row items-center justify-between min-h-[400px]">
                <div className="md:w-1/2 z-10">
                    <span className="text-secondary font-label text-sm uppercase tracking-[0.2em] mb-4 block">New Genesis Collection</span>
                    <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight tracking-tight mb-6">
                        Discover & Collect <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Anomalies</span>
                    </h1>
                    <p className="text-on-surface-variant font-body text-lg mb-8 max-w-lg leading-relaxed">
                        The premiere decentralized exchange for curated digital assets, verified by IPFS and secured on-chain.
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/search" className="bg-primary hover:bg-primary-container text-on-primary-fixed px-8 py-4 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(143,245,255,0.2)] hover:shadow-[0_0_30px_rgba(143,245,255,0.4)]">
                            Start Exploring
                        </Link>
                        <Link to="/create" className="bg-surface-container-highest hover:bg-surface-bright text-on-surface border border-outline-variant/30 px-8 py-4 rounded-xl font-bold transition-colors">
                            Create Asset
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-full md:w-3/5 h-full opacity-60 md:opacity-100 mix-blend-screen pointer-events-none">
                    {/* Placeholder for hero graphic, gradient or 3d element */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent"></div>
                </div>
            </section>

            {/* Trending Grid Section */}
            <section className="mb-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-headline font-bold mb-2">Live Auctions & Listings</h2>
                        <p className="text-on-surface-variant text-sm uppercase tracking-widest font-label">Verified Smart Contract Inventory</p>
                    </div>
                    <Link to="/search" className="text-primary hover:text-primary-container flex items-center gap-1 font-label text-sm uppercase tracking-wider transition-colors">
                        View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.length === 0 ? (
                        <p className="text-on-surface-variant">No products found. Start by creating a listing.</p>
                    ) : (
                        products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <div className="group bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                                    <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-highest">
                                        <img 
                                            src={product.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/5">
                                            {product.sold ? 'SOLD OUT' : 'AVAILABLE'}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow justify-between">
                                        <div className="mb-4">
                                            <h4 className="font-headline text-lg font-bold truncate">{product.title || product.name}</h4>
                                            <p className="text-xs text-on-surface-variant truncate">Seller: {product.seller}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                                            <div>
                                                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Price</p>
                                                <p className="text-primary font-bold">{product.price} MKT</p>
                                            </div>
                                            <button 
                                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${product.sold || product.seller.toLowerCase() === account?.toLowerCase() ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed' : 'bg-surface-container-highest hover:bg-primary hover:text-on-primary-fixed'}`}
                                                disabled={product.sold || product.seller.toLowerCase() === account?.toLowerCase()}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    buyProduct(product);
                                                }}
                                            >
                                                {product.sold ? 'Sold' : 'Buy'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-8 lg:px-16 py-24 bg-surface-container-low/30 rounded-[2.5rem] mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-[2rem] bg-surface-container-high border border-outline-variant/10 flex flex-col justify-between h-48">
                        <p className="text-xs text-on-surface-variant uppercase tracking-widest">Protocol Volume</p>
                        <h2 className="text-4xl font-headline font-bold text-on-surface">54K MKT</h2>
                        <div className="h-1 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-3/4"></div>
                        </div>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-surface-container-high border border-outline-variant/10 flex flex-col justify-between h-48">
                        <p className="text-xs text-on-surface-variant uppercase tracking-widest">Global Nodes</p>
                        <h2 className="text-4xl font-headline font-bold text-on-surface">Active</h2>
                        <p className="text-xs text-primary font-bold">100% UPTIME</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-primary text-on-primary-fixed flex flex-col justify-between h-48">
                        <p className="text-xs uppercase tracking-widest opacity-70">Total Assets</p>
                        <h2 className="text-4xl font-headline font-bold text-on-primary-fixed">{products.length}</h2>
                        <span className="material-symbols-outlined self-end text-4xl">public</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
