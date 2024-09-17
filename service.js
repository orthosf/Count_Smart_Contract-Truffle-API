const express = require('express');
const Web3 = require('web3').default; // Note the .default
const app = express();
const port = 3000;

// Connect to Sepolia test network using your API key
//const web3 = new Web3('https://sepolia.infura.io/v3/5308390c999848168b13252dd0e0d0bc');
// Connect to Ganache blockchain using the RPC server URL
const web3 = new Web3('http://127.0.0.1:7545');

// ABI and contract address
const contractABI = [
  {
    "inputs": [],
    "name": "count",
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
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decrement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const contractAddress = '0x66CCdee81E20cE97e0c7527d349F4F169a3A260d';

const counterContract = new web3.eth.Contract(contractABI, contractAddress);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get the current count
app.get('/count', async (req, res) => {
  try {
    const count = await counterContract.methods.getCount().call();
    console.log(typeof count, count); // Check the type and value
    res.json({ count: count.toString() }); // Convert BigInt to string
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to increment the count
app.post('/increment', async (req, res) => {
  try {
    const accounts = await web3.eth.getAccounts();
    await counterContract.methods.increment().send({ from: accounts[0] });
    res.json({ message: 'Count incremented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to decrement the count
app.post('/decrement', async (req, res) => {
  try {
    const accounts = await web3.eth.getAccounts();
    await counterContract.methods.decrement().send({ from: accounts[0] });
    res.json({ message: 'Count decremented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});