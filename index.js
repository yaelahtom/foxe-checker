const axios = require('axios');
const fs = require('fs').promises

const apiKey = '';
const contractAddress = '0x378E1BE15BE6d6D1f23Cfe7090b6a77660dBF14d';
const walletsFile = 'wallets.txt';

async function getWallets() {
  const data = await fs.readFile(walletsFile, 'utf-8');
  const wallets = data.split('\n').filter((wallet) => wallet.trim() !== '');
  return wallets;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkBalances() {
  const wallets = await getWallets();

  for (const wallet of wallets) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${wallet}&tag=latest&apikey=${apiKey}`;
    const response = await axios.get(url);
    const balance = parseFloat(response.data.result) / Math.pow(10, 18); // Assuming the token has 18 decimals
    console.log(`Balance for wallet ${wallet}: ${balance}`);

    await delay(1000); // 1 sec
  }
}

checkBalances();
