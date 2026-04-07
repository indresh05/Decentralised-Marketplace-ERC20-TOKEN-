import React, { useState } from 'react';
import { listProduct } from '../blockchain';
import { useNavigate } from 'react-router-dom';

export default function CreateListing({ onProductListed }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

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
            setLoadingText('Confirming On-Chain Transaction...');
            await listProduct(metadataCID, price);

            if (onProductListed) onProductListed();
            navigate("/"); // redirect home upon success
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message || 'Check console.'}`);
        } finally {
            setLoading(false);
            setLoadingText('');
        }
    };

    return (
        <main className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
            <form onSubmit={handleList} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Media Upload */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold font-headline tracking-tight mb-2">Create New Listing</h1>
                        <p className="text-on-surface-variant font-body">Deploy your digital assets to the decentralized marketplace through IPFS.</p>
                    </div>

                    <div className="group relative bg-surface-container-low rounded-3xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest opacity-40"></div>
                        
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />
                        ) : (
                            <div className="relative z-10 flex flex-col items-center p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                                </div>
                                <h3 className="text-xl font-bold font-headline mb-2">Upload Product Assets</h3>
                                <p className="text-on-surface-variant text-sm mb-6 max-w-[240px]">Drag and drop your high-resolution files or click to browse</p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/20">PNG</span>
                                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/20">JPG</span>
                                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/20">GIF</span>
                                </div>
                            </div>
                        )}
                        <input onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" type="file" accept="image/*" required />
                    </div>

                    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-secondary">security</span>
                            <span className="text-sm font-bold font-headline tracking-wide uppercase">IPFS Node: Pinata</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">Your files are encrypted and pinned to the IPFS network ensuring permanent availability and decentralized integrity.</p>
                    </div>
                </div>

                {/* Right Column: Details Form */}
                <div className="lg:col-span-7">
                    <div className="bg-surface-container-low p-8 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
                        
                        <div className="relative space-y-6 z-10">
                            <div className="space-y-2">
                                <label className="text-sm font-bold font-headline tracking-widest uppercase text-on-surface-variant px-1">Product Identity</label>
                                <input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-primary transition-all" 
                                    placeholder="Enter listing name..." 
                                    type="text" 
                                    required 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold font-headline tracking-widest uppercase text-on-surface-variant px-1">Detailed Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-primary transition-all" 
                                    placeholder="Elaborate on the technical specifications and utility..." 
                                    rows="5"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold font-headline tracking-widest uppercase text-on-surface-variant px-1">Listing Price</label>
                                    <div className="relative">
                                        <input 
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full bg-surface-container-lowest border-none rounded-xl p-4 pr-16 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-primary transition-all" 
                                            placeholder="0" 
                                            type="number" 
                                            required 
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary font-bold">
                                            <span>MKT</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold font-headline tracking-widest uppercase text-on-surface-variant px-1">Currency Standard</label>
                                    <div className="relative">
                                        <select disabled className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-0 opacity-50 transition-all appearance-none cursor-pointer">
                                            <option>ERC-20 (Standard)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 space-y-4">
                                <button disabled={loading} type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-black text-lg font-headline flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(143,245,255,0.2)] disabled:opacity-50 disabled:shadow-none">
                                    <span className="material-symbols-outlined">{loading ? 'hourglass_empty' : 'auto_awesome'}</span>
                                    {loading ? loadingText : 'List Product'}
                                </button>
                                <div className="flex items-center justify-between px-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Network: Base Testnet / L2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}
