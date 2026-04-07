import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile({ products = [], account, balances = { eth: '0', mkt: '0' } }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    
    const myListings = useMemo(() => {
        if (!account) return [];
        return products.filter(p => p.seller.toLowerCase() === account.toLowerCase());
    }, [products, account]);

    const myAcquisitions = useMemo(() => {
        if (!account) return [];
        return products.filter(p => p.sold && p.seller.toLowerCase() !== account.toLowerCase());
    }, [products, account]);

    const totalVolume = useMemo(() => {
        return myAcquisitions.reduce((sum, item) => sum + parseFloat(item.price || 0), 0).toFixed(2);
    }, [myAcquisitions]);

    // Generates a mock avatar using a nice gradient
    const AvatarPlaceholder = () => (
        <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-tertiary opacity-80" />
    );

    const renderNavItems = () => {
        const tabs = [
            { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
            { id: 'activity', label: 'Activity', icon: 'swap_horiz' },
            { id: 'inventory', label: 'Inventory', icon: 'inventory_2' },
            { id: 'settings', label: 'Settings', icon: 'settings' }
        ];

        return tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all hover:translate-x-1 duration-200 ${
                        isActive 
                            ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary border-l-4 border-primary' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest border-l-4 border-transparent'
                    }`}
                >
                    <span className="material-symbols-outlined">{tab.icon}</span>
                    <span>{tab.label}</span>
                </button>
            );
        });
    };

    const renderDashboard = () => (
        <>
            {/* Hero Section: Wallet & Balance */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-12">
                {/* Wallet Card */}
                <div className="xl:col-span-2 bg-surface-container-low/60 backdrop-blur-xl rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[240px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                        <div className="text-on-surface-variant font-body text-sm uppercase tracking-widest mb-2 font-semibold">Connected Identity</div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <h1 className="text-3xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">
                                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet to Access'}
                            </h1>
                            {account && (
                                <button className="p-2 self-start rounded-full hover:bg-surface-bright/50 transition-colors text-primary" onClick={() => navigator.clipboard.writeText(account)}>
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-8 relative z-10">
                        <div className="px-4 py-2 bg-surface-container-high/50 rounded-full border border-outline-variant/15 flex items-center gap-2 backdrop-blur-md">
                            <div className={`w-2 h-2 rounded-full ${account ? 'bg-primary shadow-[0_0_8px_rgba(143,245,255,0.8)]' : 'bg-error shadow-[0_0_8px_rgba(255,113,108,0.8)]'}`}></div>
                            <span className="text-xs font-medium uppercase tracking-tighter">{account ? 'Mainnet Active' : 'Offline'}</span>
                        </div>
                        <div className="px-4 py-2 bg-surface-container-high/50 rounded-full border border-outline-variant/15 flex items-center gap-2 backdrop-blur-md">
                            <span className="material-symbols-outlined text-xs text-secondary">verified_user</span>
                            <span className="text-xs font-medium uppercase tracking-tighter text-on-surface">Verified Collector</span>
                        </div>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 flex flex-col justify-center relative overflow-hidden">
                    <div className="text-on-surface-variant font-body text-sm uppercase tracking-widest mb-4 font-semibold">Total Liquidity</div>
                    <div className="space-y-6 relative z-10">
                        <div>
                            <div className="flex items-baseline justify-between mb-1">
                                <span className="text-2xl font-headline font-bold">{account ? balances.eth : '0.00'} ETH</span>
                                <span className="text-xs text-on-surface-variant">≈ ${account ? (parseFloat(balances.eth) * 2500).toLocaleString() : '0.00'}</span>
                            </div>
                            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-primary to-secondary h-full w-[70%]"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/5">
                                <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-bold tracking-wider">MKT</div>
                                <div className="text-lg font-bold text-on-surface">{account ? balances.mkt : '0'}</div>
                            </div>
                            <div className="p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/5">
                                <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-bold tracking-wider">USDC</div>
                                <div className="text-lg font-bold text-on-surface">{account ? '1,240' : '0'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 blur-[60px] rounded-full"></div>
                </div>
            </section>

            {/* Bento Grid: My Listings */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-headline font-bold tracking-tight">Active Offerings</h2>
                        <span className="px-3 py-1 rounded-lg bg-surface-container-high text-primary text-sm font-bold border border-primary/10">{myListings.length.toString().padStart(2, '0')}</span>
                    </div>
                    {myListings.length > 0 && (
                        <Link to="/search" className="text-primary text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                            Explore Market <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {myListings.map((listing, i) => (
                        <div key={listing.id} className="group bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 flex flex-col">
                            <div className="relative aspect-square overflow-hidden bg-surface-container-highest">
                                {listing.imageUrl ? (
                                    <img 
                                        src={listing.imageUrl} 
                                        alt={listing.title || listing.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                                    />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-tr ${i % 2 === 0 ? 'from-primary/20 to-secondary/20' : 'from-secondary/20 to-tertiary/20'} flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700`}>
                                        <span className="material-symbols-outlined text-6xl text-outline-variant/50">deployed_code</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-background/60 backdrop-blur-md rounded-full text-[10px] font-bold text-primary border border-primary/10 uppercase tracking-widest whitespace-nowrap">
                                    {listing.sold ? 'Sold' : 'Live'}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 relative bg-surface-container-low border-t border-outline-variant/5">
                                <div className="flex justify-between items-start mb-2 gap-2">
                                    <h3 className="font-headline font-bold text-lg line-clamp-1">{listing.title || listing.name}</h3>
                                    <span className="text-primary text-sm font-bold whitespace-nowrap">{listing.price} MKT</span>
                                </div>
                                <div className="text-xs text-on-surface-variant mb-6 uppercase tracking-wider font-semibold">Decentralized Asset</div>
                                <div className="mt-auto">
                                    <button className="w-full py-3 rounded-xl border border-outline-variant/20 text-xs font-bold hover:bg-surface-bright hover:text-primary transition-colors disabled:opacity-50" disabled={listing.sold}>
                                        {listing.sold ? 'Transaction Complete' : 'Modify Asset'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Create Placeholder */}
                    <Link to="/create" className="min-h-[300px] border-2 border-dashed border-outline-variant/20 hover:border-primary/50 bg-surface-container-lowest/50 rounded-[2rem] flex flex-col items-center justify-center p-8 group hover:bg-surface-bright transition-all cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all shadow-[0_0_0_0_rgba(143,245,255,0)] group-hover:shadow-[0_0_20px_rgba(143,245,255,0.4)]">
                            <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">add</span>
                        </div>
                        <span className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors">Deploy New Asset</span>
                        <p className="text-sm text-on-surface-variant text-center mt-3 px-4 max-w-[200px] leading-relaxed">
                            Upload to IPFS & monetize your data.
                        </p>
                    </Link>
                </div>
            </section>
        </>
    );

    const renderActivity = () => (
        <>
            <header className="mb-12">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-2">Purchase History</h1>
                        <p className="text-on-surface-variant max-w-md">Track your decentralized acquisitions and transaction states across the Neon Observatory protocol.</p>
                    </div>
                </div>
            </header>

            {/* Stats Overview - Bento Style */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between group border border-outline-variant/10">
                    <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label font-bold">Wallet Balance</span>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-headline font-bold">{balances.eth}</span>
                        <span className="text-primary font-bold">ETH</span>
                    </div>
                    <div className="mt-2 text-xs text-primary/60">Actual funds in wallet</div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between border-l-4 border-secondary border-y border-r border-outline-variant/10">
                    <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label font-bold">Assets Owned</span>
                    <div className="mt-4">
                        <span className="text-3xl font-headline font-bold">{myAcquisitions.length}</span>
                    </div>
                    <div className="mt-2 text-xs text-secondary/60">Verified unique items</div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between border border-outline-variant/10">
                    <span className="text-on-surface-variant text-xs uppercase tracking-widest font-label font-bold">Last Active</span>
                    <div className="mt-4">
                        <span className="text-3xl font-headline font-bold">Recent</span>
                    </div>
                    <div className="mt-2 text-xs text-on-surface-variant/60">Last transaction processed</div>
                </div>
            </section>

            {/* Orders Table */}
            <section className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-outline-variant/15">
                                <th className="px-8 py-6 text-xs uppercase tracking-widest font-label text-on-surface-variant">Asset</th>
                                <th className="px-8 py-6 text-xs uppercase tracking-widest font-label text-on-surface-variant">Status</th>
                                <th className="px-8 py-6 text-xs uppercase tracking-widest font-label text-on-surface-variant">Price</th>
                                <th className="px-8 py-6 text-xs uppercase tracking-widest font-label text-on-surface-variant">Platform Identity</th>
                                <th className="px-8 py-6 text-xs uppercase tracking-widest font-label text-on-surface-variant">Network</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {myAcquisitions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-16 text-center text-on-surface-variant">
                                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">shopping_cart</span>
                                        <p>No transactions found on-chain.</p>
                                    </td>
                                </tr>
                            ) : myAcquisitions.map((item, index) => (
                                <tr key={item.id} className="hover:bg-surface-container-highest/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-surface-container-highest overflow-hidden border border-outline-variant/10 shrink-0">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className={`w-full h-full bg-gradient-to-tr ${index % 2 === 0 ? 'from-tertiary/20 to-secondary/20' : 'from-primary/20 to-tertiary/20'}`} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-on-surface line-clamp-1">{item.title || item.name}</div>
                                                <div className="text-xs text-on-surface-variant font-mono">From: {item.seller.slice(0, 6)}...{item.seller.slice(-4)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20 whitespace-nowrap">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(143,245,255,0.8)]"></span>
                                            Secured
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-headline font-bold text-primary whitespace-nowrap">{item.price} MKT</div>
                                    </td>
                                    <td className="px-8 py-6 font-mono text-xs">
                                        <Link to={`/product/${item.id}`} className="text-secondary hover:text-tertiary transition-colors flex items-center gap-1">
                                            Asset #{item.id}
                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        </Link>
                                    </td>
                                    <td className="px-8 py-6 text-on-surface-variant text-sm whitespace-nowrap">
                                        Neon Mainnet
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );

    return (
        <div className="flex bg-background text-on-surface min-h-screen pt-20 max-w-[1600px] mx-auto w-full">
            {/* SideNavBar */}
            <aside className="hidden lg:flex flex-col sticky top-20 h-[calc(100vh-5rem)] w-64 shrink-0 border-r border-outline-variant/15 bg-surface-container-low font-headline font-medium z-40">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
                            <AvatarPlaceholder />
                        </div>
                        <div>
                            <div className="text-sm font-black text-primary">Command Center</div>
                            <div className="text-xs text-on-surface-variant font-mono">
                                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected'}
                            </div>
                        </div>
                    </div>
                    
                    <nav className="flex flex-col gap-2">
                        {renderNavItems()}
                    </nav>
                </div>
                
                <div className="mt-auto p-6 space-y-4">
                    <Link to="/create" className="block w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-secondary-dim text-on-surface text-center font-bold hover:opacity-90 active:scale-95 transition-all outline-none">
                        Mint New Asset
                    </Link>
                    <div className="pt-4 border-t border-outline-variant/15 flex flex-col gap-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface transition-all">
                            <span className="material-symbols-outlined text-sm">help</span> Support
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface transition-all">
                            <span className="material-symbols-outlined text-sm">description</span> Docs
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content Canvas */}
            <main className="flex-1 p-6 lg:p-12 w-full min-w-0">
                {activeTab === 'activity' ? renderActivity() : renderDashboard()}
            </main>
        </div>
    );
}
