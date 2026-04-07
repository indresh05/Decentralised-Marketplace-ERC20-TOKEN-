import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search({ products, account, buyProduct }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p => 
        (p.title || p.name).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getBadgeStyle = (index) => {
        const styles = [
            'text-primary border-primary/20',
            'text-secondary border-secondary/20',
            'text-tertiary border-tertiary/20'
        ];
        return styles[index % styles.length];
    };

    const getBadgeText = (index) => {
        const texts = ['New Arrival', 'Rare Edition', 'Verified', 'Trending'];
        return texts[index % texts.length];
    };

    return (
        <div className="flex pt-20 min-h-screen max-w-[1600px] mx-auto">
            {/* Sidebar Filters */}
            <aside className="hidden lg:flex w-80 bg-background/50 flex-col p-8 gap-8 border-r border-outline-variant/10 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">tune</span>
                    <h2 className="font-headline text-lg font-bold">Advanced Filters</h2>
                </div>

                {/* Category Filter */}
                <section className="flex flex-col gap-3">
                    <label className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Category</label>
                    <div className="flex flex-col gap-2">
                        <button className="flex justify-between items-center bg-surface-container-low p-3 rounded-xl text-sm hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                            <span>Hardware Components</span>
                            <span className="material-symbols-outlined text-xs">expand_more</span>
                        </button>
                    </div>
                </section>

                {/* Price Range */}
                <section className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <label className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Price Range</label>
                        <span className="text-primary text-xs font-headline">ETH / USDC</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Min" className="bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                        <input type="number" placeholder="Max" className="bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                    </div>
                    <div className="h-1 bg-surface-container-highest rounded-full relative mt-2">
                        <div className="absolute left-0 right-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-[0_0_10px_rgba(143,245,255,0.5)]"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full border-2 border-background shadow-[0_0_10px_rgba(191,129,255,0.5)]"></div>
                    </div>
                </section>

                {/* Condition */}
                <section className="flex flex-col gap-3">
                    <label className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Condition</label>
                    <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold hover:bg-primary/20 transition-colors">New</button>
                        <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant border border-outline-variant/10 rounded-full text-xs hover:text-on-surface transition-colors">Used</button>
                        <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant border border-outline-variant/10 rounded-full text-xs hover:text-on-surface transition-colors">Refurbished</button>
                    </div>
                </section>

                {/* IPFS Verified Toggle */}
                <section className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">IPFS Verified</span>
                        <span className="text-[10px] text-on-surface-variant">Immutable Metadata</span>
                    </div>
                    <div className="w-12 h-6 bg-gradient-to-r from-primary to-primary-container rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(0,238,252,0.3)]">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full shadow-sm"></div>
                    </div>
                </section>

                <button className="mt-4 w-full py-4 bg-surface-container-low border border-outline-variant/20 rounded-xl font-bold text-sm hover:bg-surface-container-high hover:border-primary/50 transition-all text-on-surface">
                    Clear All Filters
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 lg:p-12 max-w-7xl">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <nav className="flex gap-2 text-xs text-on-surface-variant mb-4 uppercase tracking-tighter font-medium">
                            <span className="hover:text-primary cursor-pointer transition-colors">Market</span>
                            <span>/</span>
                            <span className="hover:text-primary cursor-pointer transition-colors">Explore</span>
                            <span>/</span>
                            <span className="text-primary font-bold">Search</span>
                        </nav>
                        
                        <div className="relative mb-6 max-w-xl">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
                            <input 
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                type="text" 
                                placeholder="Search decentralized assets..." 
                                className="w-full bg-surface-container-low/50 backdrop-blur-md border border-primary/20 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-low transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]" 
                            />
                        </div>

                        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                            {searchQuery ? (
                                <>Search Results: <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">"{searchQuery}"</span></>
                            ) : (
                                <>Explore <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Marketplace</span></>
                            )}
                        </h1>
                        <p className="text-on-surface-variant mt-3 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(143,245,255,0.8)]"></span>
                            {filteredProducts.length} verified assets found on-chain
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-surface-container-low/50 backdrop-blur-md p-2 rounded-xl border border-outline-variant/10 shadow-sm shrink-0">
                        <span className="text-xs font-bold text-on-surface-variant ml-2 uppercase tracking-wide">Sort By</span>
                        <button className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-bright px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Highest Rating
                            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                        </button>
                    </div>
                </header>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-surface-container-low/30 rounded-3xl border border-dashed border-outline-variant/30">
                            <span className="material-symbols-outlined text-border-outline-variant/30 text-6xl mb-4">search_off</span>
                            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">No assets found</h3>
                            <p className="text-on-surface-variant max-w-md">Try adjusting your search query or filters to find what you're looking for on the decentralized network.</p>
                        </div>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="block group">
                                <article className="bg-surface-container-low rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col h-full border border-outline-variant/10 hover:border-primary/30 relative">
                                    <div className="relative h-64 overflow-hidden bg-surface-container-highest">
                                        <img 
                                            src={product.imageUrl || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop`} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                                        
                                        <div className={`absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getBadgeStyle(index)}`}>
                                            {getBadgeText(index)}
                                        </div>
                                        
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-xl flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors border border-outline-variant/20 group/btn" onClick={(e) => e.preventDefault()}>
                                                <span className="material-symbols-outlined text-lg group-hover/btn:[font-variation-settings:'FILL'1] transition-all">favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-transparent to-surface-container-low">
                                        <div className="flex justify-between items-start mb-2 gap-4">
                                            <h3 className="font-headline text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">{product.title || product.name}</h3>
                                            <div className="flex items-center gap-1 text-primary text-sm font-bold shrink-0 bg-primary/10 px-2 py-0.5 rounded text-xs border border-primary/20">
                                                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
                                                {(4.5 + (index % 5) * 0.1).toFixed(1)}
                                            </div>
                                        </div>
                                        
                                        <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px]">account_circle</span>
                                            <span className="font-mono text-xs">{product.seller.slice(0, 6)}...{product.seller.slice(-4)}</span>
                                        </p>
                                        
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Current Price</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-headline font-bold text-primary">{product.price}</span>
                                                    <span className="text-sm font-bold text-primary/70">MKT</span>
                                                </div>
                                            </div>
                                            <button 
                                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                                    product.sold || product.seller.toLowerCase() === account?.toLowerCase() 
                                                        ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed border border-outline-variant/10' 
                                                        : 'bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed shadow-[0_0_15px_rgba(0,238,252,0.3)] hover:shadow-[0_0_25px_rgba(0,238,252,0.5)] hover:-translate-y-0.5 active:scale-95'
                                                }`}
                                                disabled={product.sold || product.seller.toLowerCase() === account?.toLowerCase()}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    buyProduct(product);
                                                }}
                                            >
                                                {product.sold ? 'Sold Out' : 'Buy Now'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                    <nav className="mt-16 mb-8 flex justify-center items-center gap-2 md:gap-4">
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:bg-primary hover:text-on-primary-fixed transition-colors border border-outline-variant/10">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold shadow-[0_0_15px_rgba(0,238,252,0.4)]">1</button>
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-bold border border-outline-variant/10">2</button>
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-bold border border-outline-variant/10">3</button>
                        <span className="text-on-surface-variant tracking-widest px-2">...</span>
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-bold border border-outline-variant/10">8</button>
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:bg-primary hover:text-on-primary-fixed transition-colors border border-outline-variant/10">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </nav>
                )}
            </main>
        </div>
    );
}

