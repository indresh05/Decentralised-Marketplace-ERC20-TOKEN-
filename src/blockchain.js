import { ethers } from "ethers";

export const MARKETPLACE_CONTRACT_ADDRESS = "0x10179374a90B33025Ad75132a958Fb1FE0425cf0";
export const TOKEN_CONTRACT_ADDRESS = "0x68212f22B1AD05E3ba7780B6FF983d61465b12C0";

const marketplaceABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "buyProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "listProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "rating",
        "type": "uint256"
      }
    ],
    "name": "rateSeller",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "getSellerRating",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "productCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "sold",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "sellerRatings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalRating",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ratingCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const erc20ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed. Please install it to use this DApp.");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
};

export const getMarketplaceContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, marketplaceABI, signer);
};

export const getTokenContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(TOKEN_CONTRACT_ADDRESS, erc20ABI, signer);
};

export const listProduct = async (name, price) => {
  const contract = await getMarketplaceContract();
  const tx = await contract.listProduct(name, price);
  await tx.wait(); // Wait for transaction to be mined
  return tx;
};

export const approveTokens = async (amount) => {
  console.group(`[Marketplace Action] Approve Tokens`);
  try {
    const contract = await getTokenContract();
    
    console.log(`1. Approving marketplace (${MARKETPLACE_CONTRACT_ADDRESS}) to spend MAX tokens...`);
    const tx = await contract.approve(MARKETPLACE_CONTRACT_ADDRESS, ethers.MaxUint256);
    console.log(`2. Approval transaction sent. Hash: ${tx.hash}`);
    
    const receipt = await tx.wait(); // Wait for the approval transaction
    console.log(`3. Approval transaction confirmed in block ${receipt.blockNumber}!`, receipt);
    
    console.groupEnd();
    return tx;
  } catch (error) {
    console.error(`[Error] Token Approval Failed:`, error);
    console.groupEnd();
    throw error;
  }
};

export const buyProduct = async (productId, price) => {
  console.group(`[Marketplace Action] Purchase Product ID #${productId}`);
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Step 0: Check token balance
    const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, erc20ABI, provider);
    const balance = await tokenContract.balanceOf(address);
    const priceBigInt = BigInt(price);
    
    if (balance < priceBigInt) {
      throw new Error(`Insufficient Token Balance. You need at least ${ethers.formatUnits(priceBigInt, 18)} tokens.`);
    }

    // Step 1: Approve tokens
    console.log(`Step 1: Initiating token approval...`);
    await approveTokens(price);

    // Step 2: Call buyProduct(productId)
    const contract = await getMarketplaceContract();
    const productIdBigInt = BigInt(productId);
    
    console.log(`Step 2: Calling marketplace contract buyProduct(${productIdBigInt.toString()})...`);
    const tx = await contract.buyProduct(productIdBigInt);
    console.log(`3. Purchase transaction sent. Hash: ${tx.hash}`);
    
    const receipt = await tx.wait(); // Wait for the buy transaction
    console.log(`4. Purchase transaction confirmed in block ${receipt.blockNumber}!`, receipt);
    
    console.groupEnd();
    return tx;
  } catch (error) {
    console.error(`[Error] Buy Product Execution Failed:`, error);
    console.groupEnd();
    throw error;
  }
};

export const getBalances = async (address) => {
  if (!address || !window.ethereum) return { eth: "0.00", mkt: "0.00" };
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  // Fetch ETH balance
  const ethBalanceRaw = await provider.getBalance(address);
  const ethBalance = ethers.formatEther(ethBalanceRaw);
  
  // Fetch MKT token balance
  let mktBalance = "0.00";
  try {
    const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, erc20ABI, provider);
    const mktBalanceRaw = await tokenContract.balanceOf(address);
    mktBalance = ethers.formatUnits(mktBalanceRaw, 18);
  } catch (e) {
    console.error("Failed to fetch MKT balance:", e);
  }

  return {
    eth: parseFloat(ethBalance).toFixed(4),
    mkt: parseFloat(mktBalance).toFixed(2)
  };
};

export const loadProducts = async () => {
  const contract = await getMarketplaceContract();

  // Read productCount
  const count = await contract.productCount();
  const productsArray = [];

  // Loop from 1 to productCount
  for (let i = 1n; i <= count; i++) {
    // Fetch each product
    const product = await contract.products(i);

    let title = product.name;
    let description = "No description available";
    let imageUrl = null;

    // Fetch IPFS metadata if product.name looks like a CID
    if (product.name && (product.name.startsWith("Qm") || product.name.startsWith("baf"))) {
      try {
        const res = await fetch(`https://gateway.pinata.cloud/ipfs/${product.name}`);
        if (res.ok) {
          const metadata = await res.json();
          if (metadata.title) title = metadata.title;
          if (metadata.description) description = metadata.description;
          if (metadata.imageUrl) imageUrl = metadata.imageUrl;
        }
      } catch (e) {
        console.warn(`Failed to fetch IPFS metadata for CID: ${product.name}`, e);
      }
    }

    // Return clean JSON objects for React UI
    productsArray.push({
      id: product.id.toString(),
      name: title,
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: product.price.toString(),
      seller: product.seller,
      sold: product.sold
    });
  }

  // Return array of products
  return productsArray;
};
