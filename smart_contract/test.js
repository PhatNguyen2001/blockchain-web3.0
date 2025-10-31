const { ethers } = require("ethers");
const fs = require('fs');

// === 1. Thông tin contract ===
const contractAddress = "0x4551333B173C606665d39d66c4EB034D8046DFe5"; // replace bằng địa chỉ contract của bạn
const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/Transactions.sol/Transactions.json")).abi; // ABI từ Hardhat compile

// === 2. Kết nối provider & signer ===
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/z4WpA8UKgqnwbTYmrZu15yCOiijBKaRv`);

// Dùng private key của ví testnet (SepoliaETH)
const wallet = new ethers.Wallet('fd7d96b23854e9718479ce89b4ec5b056414982a3688c8ab4065cad58858ef17', provider);

// === 3. Tạo instance contract ===
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function main() {
    console.log("Connected to contract:", contractAddress);

    // --- 3a. Gọi hàm write: addToBlockchain ---
    const receiver = "0x97558802f4e1f3ca85eb801a9806a03bc52cf9e6"; // thay bằng ví nhận test
    const amount = ethers.utils.parseEther("0.001"); // gửi 0.001 ETH
    const message = "Hello from Node.js";
    const keyword = "test";

    console.log("Sending transaction...");
    const tx = await contract.addToBlockchain(receiver, amount, message, keyword);
    await tx.wait();
    console.log("Transaction mined:", tx.hash);

    // --- 3b. Gọi hàm read: getTransactionCount ---
    const count = await contract.getTransactionCount();
    console.log("Total transactions:", count.toString());

    // --- 3c. Gọi hàm read: getAllTransactions ---
    const allTx = await contract.getAllTransactions();
    console.log("All transactions:");
    allTx.forEach((t, i) => {
        console.log(`${i+1}: from ${t.sender} -> ${t.receiver}, amount: ${ethers.utils.formatEther(t.amount)}, message: ${t.message}, keyword: ${t.keyword}, timestamp: ${t.timestamp}`);
    });
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
