import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ account, onConnect }) {
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0b0e14]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto font-['Space_Grotesk'] tracking-tight">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                    Neon Observatory
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={`pb-1 transition-colors duration-300 active:scale-95 transition-transform ${location.pathname === '/' ? 'text-primary border-b-2 border-primary' : 'text-on-surface/60 hover:text-primary'}`}>Market</Link>
                    <Link to="/search" className={`pb-1 transition-colors duration-300 active:scale-95 transition-transform ${location.pathname === '/search' ? 'text-primary border-b-2 border-primary' : 'text-on-surface/60 hover:text-primary'}`}>Search</Link>
                    <Link to="/create" className={`pb-1 transition-colors duration-300 active:scale-95 transition-transform ${location.pathname === '/create' ? 'text-primary border-b-2 border-primary' : 'text-on-surface/60 hover:text-primary'}`}>Create</Link>
                    <Link to="/profile" className={`pb-1 transition-colors duration-300 active:scale-95 transition-transform ${location.pathname === '/profile' ? 'text-primary border-b-2 border-primary' : 'text-on-surface/60 hover:text-primary'}`}>Profile</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex space-x-4">
                        <button className="material-symbols-outlined text-on-surface/60 hover:text-primary transition-colors">account_balance_wallet</button>
                        <button className="material-symbols-outlined text-on-surface/60 hover:text-primary transition-colors">notifications</button>
                    </div>
                    {account ? (
                        <div className="px-6 py-2 bg-surface-container-high text-on-surface rounded-xl font-semibold border border-outline-variant/15 flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
                        </div>
                    ) : (
                        <button onClick={onConnect} className="px-6 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed rounded-xl font-semibold active:scale-95 transition-transform shadow-[0_0_20px_rgba(143,245,255,0.3)]">
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
