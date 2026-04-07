# 🌌 Neon Observatory - Decentralized Marketplace

Neon Observatory is a **beginner-friendly Web3 decentralized marketplace** where users can:

- 🛒 Buy products using crypto (ERC20 token)
- 🏪 Sell products directly from their wallet
- ☁️ Store images & data on IPFS (via Pinata)
- 🔗 Interact with smart contracts on blockchain

👉 In simple words:  
This is like **Amazon, but without a company controlling it** — everything runs on blockchain.

---

# 🚀 Features

- ✅ Decentralized peer-to-peer marketplace  
- 💰 Payments using ERC20 token  
- ☁️ IPFS storage via Pinata  
- 🔐 Secure smart contract transactions  
- 👤 User dashboard (listings + purchases)  
- 🎨 Modern UI (React + Tailwind)

---

# 🧠 Basic Concepts (For Beginners)

### 🔹 What is Blockchain?
A public digital ledger where transactions are stored permanently.

### 🔹 What is Ethereum?
A blockchain platform that supports smart contracts.

### 🔹 What is a Smart Contract?
A program that runs automatically on blockchain.

### 🔹 What is ERC20 Token?
A standard token used as currency in this marketplace.

### 🔹 What is MetaMask?
A crypto wallet used to connect and interact with blockchain.

### 🔹 What is IPFS (Pinata)?
A decentralized storage system used for images and metadata.

---

# 🛠 Tech Stack

- React + Vite  
- Tailwind CSS  
- ethers.js  
- Solidity  
- Remix IDE  
- Pinata (IPFS)

---

# 📦 Project Features

- 🛒 Buy products using ERC20 token  
- 🏪 List products for sale  
- 📊 View listings & purchases  
- 🔐 Blockchain-secured transactions  
- ☁️ Upload images to IPFS  

---

# 🧑‍💻 Setup Guide

## 1️⃣ Install Requirements

- Install Node.js → https://nodejs.org  
- Install MetaMask → https://metamask.io  

---

## 2️⃣ Clone Repository

git clone <your-repo-url>  
cd MARKETPLACE  

---

## 3️⃣ Install Dependencies

npm install  

---

## 4️⃣ Setup Environment Variables

1. Go to https://app.pinata.cloud  
2. Create API Key  
3. Create `.env` file in root:

VITE_PINATA_API_KEY=your_api_key  
VITE_PINATA_SECRET_KEY=your_secret_key  

---

## 5️⃣ Deploy Smart Contracts (Remix IDE)

Open 👉 https://remix.ethereum.org  

Deploy ERC20 token and marketplace contract, then copy their addresses.
CONTRACT_ADDRESS =
---

## 6️⃣ Configure Contract in Frontend

Update your config file:

export const MARKETPLACE_CONTRACT_ADDRESS = "your_marketplace_address";  
export const TOKEN_CONTRACT_ADDRESS = "your_token_address";  

---

## 7️⃣ Run Project

npm run dev  

Open: http://localhost:5173  

---

# 🔗 Connect Wallet

- Click **Connect Wallet**
- Select MetaMask
- Switch to correct network (Sepolia / Polygon)

---

# 💰 Important

- You must have ERC20 tokens  
- You must have ETH for gas  

---

# 📖 How to Use

## 🏪 List Product
- Go to Create Listing  
- Upload image  
- Enter details  
- Click List  

## 🛒 Buy Product
- Click Buy  
- Approve token  
- Confirm transaction  

---

# ⚙️ Smart Contract Functions

- listProduct → Add product  
- buyProduct → Buy product  
- rateSeller → Rate seller  
- getSellerRating → View rating  

---

# 🔄 How Buying Works

1. Approve tokens  
2. Call buyProduct  
3. Tokens transferred  
4. Product marked sold  

---

# ⚠️ Common Issues

- Insufficient balance  
- Wrong network  
- Missing approve()  

---

# 📄 License

MIT License
