import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connectWallet, loadProducts, buyProduct as buyProductContract, getBalances } from "./blockchain";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import "./index.css";

function App() {
  const [account, setAccount] = useState("");
  const [products, setProducts] = useState([]);
  const [balances, setBalances] = useState({ eth: '0', mkt: '0' });
  const [buyingId, setBuyingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (account) {
      fetchBalances(account);
    }
  }, [account]);

  const fetchBalances = async (addr) => {
    try {
      const bals = await getBalances(addr);
      setBalances(bals);
    } catch (e) {
      console.error("Failed to fetch balances:", e);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await loadProducts();
      // Reverse array so newest is first
      setProducts(data.reverse());
    } catch (e) {
      console.error("Failed to load products:", e);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const handleConnect = async () => {
    const acc = await connectWallet();
    if (acc) setAccount(acc);
  };

  const handleBuy = async (product) => {
    try {
      setBuyingId(product.id);
      await buyProductContract(product.id, product.price);
      await fetchProducts(); // Refresh after buy
    } catch (err) {
      console.error(err);
      alert(`Purchase failed: ${err.reason || err.data?.message || err.message}`);
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar account={account} onConnect={handleConnect} />
        
        <Routes>
          <Route 
            path="/" 
            element={<Home products={products} account={account} buyProduct={handleBuy} />} 
          />
          <Route 
            path="/search" 
            element={<Search products={products} account={account} buyProduct={handleBuy} />} 
          />
          <Route 
            path="/create" 
            element={<CreateListing onProductListed={fetchProducts} />} 
          />
          <Route 
            path="/product/:id" 
            element={<ProductDetail products={products} account={account} buyProduct={handleBuy} buyingId={buyingId} />} 
          />
          <Route 
            path="/profile" 
            element={<Profile products={products} account={account} balances={balances} />} 
          />
        </Routes>
        
        {/* Footer */}
        <footer className="w-full py-12 mt-auto bg-[#0b0e14] font-['Inter'] text-xs uppercase tracking-widest border-t border-outline-variant/15">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-[#a9abb3] opacity-80">© 2024 Neon Observatory Protocol. All systems operational.</span>
                </div>
                <div className="flex gap-8 text-[#a9abb3]">
                    <span className="hover:text-[#ff61c8] transition-colors cursor-pointer">Network Status</span>
                    <span className="hover:text-[#ff61c8] transition-colors cursor-pointer">Smart Contracts</span>
                </div>
            </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
